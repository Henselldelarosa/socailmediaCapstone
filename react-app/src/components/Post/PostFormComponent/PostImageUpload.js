// import React, { useEffect, useState } from 'react'
// import './PostImageUpload.css'
// import  Dialog  from '@mui/material/Dialog';
// import { useDispatch, useSelector } from 'react-redux';
// import { addPost } from '../../../store/post';
// import CloseIcon from '@mui/icons-material/Close';

// function PostImageUpload() {
//   const dispatch = useDispatch()
//   const user = useSelector(state => state.session.user)
//   const [open, setOpen] = useState(false)
//   const [image, setImage] = useState('')
//   const [postUrl, setPostUrl] = useState('')
//   const [post, setPost] = useState('')
//   const [progress, setProgress] = useState(0)
//   const [scroll, setScroll] = React.useState('paper')

//   const handleChange = (e) => {
//     if (e.target.files[0]){
//       setImage(e.target.files[0])
//     }
//     setPostUrl(URL.createObjectURL(e.target.files[0]))
//   }

//   const uploadFileWithClick = () => {
//     document.getElementsByClassName('img')[0].click()
//   }

//   const handleOpen = (scrollType) =>{
//     setOpen(true)
//     setScroll(scrollType)
//   }

//   const handleClose = () => {
//     setOpen(false)
//     setImage('')
//     setPostUrl('')
//   }

//   const description = React.useRef(null)

//   useEffect (() => {
//     if(open){
//       const {current: descriptionEle} = description
//       if(descriptionEle !== null){
//         descriptionEle.focus()
//       }
//     }
//   },[open])

//   const handleUpload = async(e) =>{
//     if (document.getElementsByClassName('hidden')[0]){
//       document.getElementsByClassName('hidden')[0].classList.add('disabled')
//     }
//     document.getElementsByClassName('postButton').disabled = true
//     document.getElementsByClassName('postButton')[0].classList.add('disabled')

//     if(post === '' && postUrl ===''){
//       console.log('prevent')
//     }else{
//       e.preventDefault()
//       if(postUrl === '' ){
//         const payload = {

//         }
//         // const formData = new FormData()

//         // const res = await fetch('/api/images', {
//         //   method:'POST',
//         //   body:formData,
//         // })

//         // if(res.ok){
//         //   await res.json()
//         // }
//         // else{
//         //   console.log('error')
//         // }
//       }

//     }




//   }
//   return (
//     <div className='imageUpload'>
//       <Dialog
//       open={open}
//       onClose={handleClose}
//       scroll={scroll}
//       />

//     </div>
//   )
// }

// export default PostImageUpload

import React, {useState} from 'react'
import Button from '@mui/material/Button';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Dialog } from '@mui/material';

function PostImageUpload() {

  const [open, setOpen] = useState(false)
  const [image, setImage] = useState(null)
  const [scroll, setScroll] = 'paper'
  const [isLoading, setIsLoading] = useState(false)

  const handleUpload = async(e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('images', image)

    setIsLoading(true)
    const res= await fetch('/api/images', {
      method: 'POST',
      body: formData
    })

    if(res.ok) {
      await res.json()
      setIsLoading(false)
    }else{
      setIsLoading(false)
      console.log('error at uploading')
    }
  }

  const updateImage = (e) =>{
    const file = e.target.files[0]
    setImage(file)
    console.log(image)
  }

  const handleClose = (e) =>{
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  return (
    <div>
      <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      >
        <div className='makeStyle-paper-1'>
          <div className='modalInit'>
            <h1>Create Post</h1>
          </div>
        </div>
      </Dialog>

      {/* <form onSubmit={handleUpload}>

      <input
      id='imageUpload'
      type='file'
      // hidden
      onChange={updateImage}
      />

      {/* <Button
      as='label'
      htmlFor='imageUpload'
      colorSchem = 'blue'
      variant = 'outline'
      mb={4}
      cursor='pointer'
      type='submit'

      > */}
      {/* <button type = 'submit'> */}
        {/* {(isLoading) && <p>Loading...</p>} */}
        {/* <PhotoCameraIcon
        cursor = 'pointer'/> */}
      {/* </button> */}
      {/* </Button> */}
      {/* </form> */}
    </div>
  )
}

export default PostImageUpload
