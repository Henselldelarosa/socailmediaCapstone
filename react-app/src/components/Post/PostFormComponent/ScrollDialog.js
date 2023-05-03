// libraries
import React, {useRef, useState, useEffect}from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components and style sheets
import './ScrollDialog.css'


// redux actions
import { addPost } from '../../../store/post';

// Icon and material UI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ScrollDialog() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  // slice of state
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [post, setPost] = useState('')
  const [postUrl, setPostUrl] = useState(null)
  const [imageLoading, setImageLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState([])

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault()

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
        dispatch(addPost(payload))
        // handleClose()
      }else{
        error.push("Not a valid Image")
      }
    }else if(payload.post){
      dispatch(addPost(payload))
      // handleClose()
    }
    setErrorMessage(error)
    setPost('')
    // setPostUrl(null)
  }

  const updatePost = (e) => setPost(e.target.value)

  const updateImage = (e) =>{
    const file = e.target.files[0]
    setPostUrl(file)
  }

  return (
    <div>
      <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
      {/* <Button onClick={handleClickOpen('body')}>scroll=body</Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Create a post</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          {/* <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            onChange=''
          > */}

            {/* <form onClick={handleSubmit}> */}
              <input
              type='text'
              className='dialog_form_post'
              placeholder={`Whats on your mind, ${user.firstName}`}
              value={post}
              onChange={updatePost}
              />

              {/* <input
              type='file'
              accept='image/*'
              onChange={updateImage}
              /> */}
            <Button type='submit' onClick={handleSubmit}>Post</Button>
            {/* </form> */}
            {/* {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')} */}

          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
