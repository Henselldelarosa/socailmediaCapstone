import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux actions
import * as postActions from '../../../store/post'



// icon and material UI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Avatar } from '@mui/material';

import './ScrollDialog.css'

export default function ScrollDialog() {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  // slice of state
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [post, setPost] = useState('')
  const [postUrl, setPostUrl] = useState(null)
  const [imageLoading, setImageLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('image', postUrl)
    setImageLoading(true)

    const res = await fetch('/api/images', {
      method:'POST',
      body: formData
    })
    if(res.ok){
      await res.json()
      setImageLoading(false)
    }
    else{
      setImageLoading(false)
      console.log('error at upload')
    }

    const payload = {
      userId: user.id,
      post,
      postUrl
    }

    let error = []
    let validImage = ['.png' , '.jpg' , '.jpeg' , '.gif' , '.bmp' , '.tif' , '.tiff']

    if(!payload.post){
      error.push("Post field can't be empty")
    }

    if (payload.postUrl !== null && payload.post) {
      if(payload.postUrl.endsWith(validImage[0]) || payload.postUrl.endsWith(validImage[1]) || payload.postUrl.endsWith(validImage[2]) || payload.postUrl.endsWith(validImage[3]) || payload.postUrl.endsWith(validImage[4]) || payload.postUrl.endsWith(validImage[5]) || payload.postUrl.endsWith(validImage[6])) {
        dispatch(postActions.addPost(payload))
      }else{
        error.push("Not a valid Image")
      }
    }else if(payload.post){
      dispatch(postActions.addPost(payload))
    }

    setErrorMessage(error)
    setPost('')
    setPostUrl(null)
  }

  const updateImage = (e) => {
    const file = e.target.files[0]
    setPostUrl(file)
  }

  const updatePost = (e) => setPost(e.target.value)


  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button onClick={handleClickOpen('paper')}><PhotoLibraryIcon/></Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <div className='dialog_post_header'>
          <h2>Create A Post</h2>
          <Button onClick={handleClose}><CancelOutlinedIcon/></Button>
        </div>
          <hr/>

          <div>
            <div className='dialog_post_user_info'>
            <Avatar src = {user.userUrl}/>
            <h3>{user.firstName} {user.lastName}</h3>
            </div>

            <form onSubmit={handleSubmit}>
              <input
              type='text'
              className='form_post_poster'
              placeholder={`Whats on your mind ${user.firstName}?`}
              value = {post}
              onChange={updatePost}
              />




            </form>
          </div>

          <Button onClick={handleClose}>Post</Button>
      </Dialog>
    </div>
  );
}
