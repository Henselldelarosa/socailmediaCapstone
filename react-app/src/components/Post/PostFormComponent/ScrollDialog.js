// // libraries
// import React, {useRef, useState, useEffect}from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// // components and style sheets
// import './ScrollDialog.css'


// // redux actions
// import { addPost } from '../../../store/post';

// // Icon and material UI
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

// export default function ScrollDialog() {
//   const dispatch = useDispatch()
//   const user = useSelector(state => state.session.user)

//   // slice of state
//   const [open, setOpen] = React.useState(false);
//   const [scroll, setScroll] = React.useState('paper');
//   const [post, setPost] = useState('')
//   const [postUrl, setPostUrl] = useState('')
//   const [imageLoading, setImageLoading] = useState(false)
//   const [errorMessage, setErrorMessage] = useState([])

//   const handleClickOpen = (scrollType) => () => {
//     setOpen(true);
//     setScroll(scrollType);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const descriptionElementRef = useRef(null);
//   useEffect(() => {
//     if (open) {
//       const { current: descriptionElement } = descriptionElementRef;
//       if (descriptionElement !== null) {
//         descriptionElement.focus();
//       }
//     }
//   }, [open]);

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const payload = {
//       userId: user.id,
//       post,
//       // postUrl
//     }

//     let error = []
//     let validImage = ['.png' , '.jpg' , '.jpeg' , '.gif' , '.bmp' , '.tif' , '.tiff']

//     if(!payload.post){
//       error.push("Post field can't be empty")
//     }

//     // if (payload.postUrl !== null && payload.post) {
//     //   if(payload.postUrl.endsWith(validImage[0]) || payload.postUrl.endsWith(validImage[1]) || payload.postUrl.endsWith(validImage[2]) || payload.postUrl.endsWith(validImage[3]) || payload.postUrl.endsWith(validImage[4]) || payload.postUrl.endsWith(validImage[5]) || payload.postUrl.endsWith(validImage[6])) {
//     //     dispatch(addPost(payload))
//     //     // handleClose()
//     //   }else{
//     //     error.push("Not a valid Image")
//     //   }
//     // }
//     else if(payload.post){
//       dispatch(addPost(payload))
//       // handleClose()
//     }
//     setErrorMessage(error)
//     setPost('')
//     // setPostUrl(null)
//   }

//   const updatePost = (e) => setPost(e.target.value)

//   const updateImage = (e) =>{
//     const file = e.target.files[0]
//     setPostUrl(file)
//   }

//   return (
//     <div>
//       <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
//       {/* <Button onClick={handleClickOpen('body')}>scroll=body</Button> */}
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         scroll={scroll}
//         aria-labelledby="scroll-dialog-title"
//         aria-describedby="scroll-dialog-description"
//       >
//         <DialogTitle id="scroll-dialog-title">Create a post</DialogTitle>
//         {/* <DialogContent dividers={scroll === 'paper'}> */}
//           {/* <DialogContentText
//             id="scroll-dialog-description"
//             ref={descriptionElementRef}
//             tabIndex={-1}
//             onChange=''
//           > */}

//             <form onClick={handleSubmit}>
//               <input
//               type='text'
//               className='dialog_form_post'
//               placeholder={`Whats on your mind, ${user.firstName}`}
//               value={post}
//               onChange={updatePost}
//               />
//             <Button type='submit' >Post</Button>
//             </form>

//         {/* </DialogContent> */}
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import './ScrollDialog.css'


function ScrollDialog() {
  const user = useSelector(state => state.session.user)

  const [modal, setModal] = useState(false)

  const toggleModal = () =>{
    setModal(!modal)
  }

  return (
    <div>
      <button
      className='btn-modal'
      onClick={toggleModal}
      >
        Open
      </button>

      <div className='modal'>

        <div className='overlay'></div>

        <div className='mode-content'>
          <h2>hello</h2>
          <p>hey</p>
          <button className='close-model'
          onClick={toggleModal}>
            close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ScrollDialog
