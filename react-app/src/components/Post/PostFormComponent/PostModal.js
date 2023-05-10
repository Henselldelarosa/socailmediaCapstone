import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import {addPost} from '../../../store/post'
import { Avatar } from '@mui/material'
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import Button from '@mui/material/Button';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

import './PostModal.css'
function PostModal({setShowModal, user}) {
  const dispatch = useDispatch()

  const [post, setPost] = useState('')
  const [postUrl, setPostUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState([])

  const updatePost = (e) => setPost(e.target.value)
  const updatePostUrl =(e) => setPost(e.target.value)

useEffect(() => {
  (async () => {
      const res = await fetch('/api/images');
      if (res.ok) {
          const data = await res.json();
          console.log(data)
          setPostUrl(data.images[0])
          console.log(data.images[0])
      } else {
          console.log("error")
      }

  })();
}, [])

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setErrorMessage([])

    const payload ={
      userId:user.id,
      post,
      postUrl
    }

    let error = []
    let validImage = ['.png' , '.jpg' , '.jpeg' , '.gif' , '.bmp' , '.tif' , '.tiff']

    if(!payload.post){
      error.push("Post field can't be empty")
    }

    if (payload.postUrl !== '' && payload.post) {
      if(payload.postUrl.endsWith(validImage[0]) || payload.postUrl.endsWith(validImage[1]) || payload.postUrl.endsWith(validImage[2]) || payload.postUrl.endsWith(validImage[3]) || payload.postUrl.endsWith(validImage[4]) || payload.postUrl.endsWith(validImage[5]) || payload.postUrl.endsWith(validImage[6])) {
        dispatch(addPost(payload))
        setShowModal(false)
      }else{
        error.push("Not a valid Image")
      }
    }
    // else{
    //   dispatch(addPost(payload))
    //   setShowModal(false)
    // }

    setErrorMessage(error)
    setPostUrl('')
    setPost('')
  }

  return(
    <div className='post_modal_form'>

      <center>
        <div className='modal_closing_title_div'>
          <p className='post_form_modal_title'>Create a post</p>
          <button className='modal_closing_button' onClick={() => setShowModal(false)}> <CloseSharpIcon/></button>
        </div>
      </center>


      <div className='post_modal_form_user_info'>

        <Avatar src={user.userUrl}/>
        <h3>{user.firstName} {user.lastName}</h3>

      </div>

        <div className='modal_form'>

        <form className='post_modal_form_input' onSubmit={handleSubmit}>

          <ul className='post_modal_error'>
            {errorMessage && errorMessage.map((error, id) => <li key={id}>{error}</li>)}
          </ul>

          <textarea
          className='post_input'
          value={post}
          rows='4'
          onChange={updatePost}
          placeholder={`Whats on your mind, ${user.firstName}?`}
          />

          <div className='modal_file_upload_div'>

          <input
          type='file'
          accept='image/*'
          hidden
          id='modal_file_upload'
          onChange={updatePostUrl}
          />

          <Button
          as='label'
          htmlFor='modal_file_upload'
          cursor='pointer'
          mb={4}
          >
            <div className='image_modal_upload'>


              <div className='modal_center_info'>

                <center>

              <AddToPhotosIcon/>
              <p>Add Photos</p>

                </center>

              </div>

            </div>

          </Button>

          </div>

          <button className='post_modal_button' type='submit'> Post </button>

        </form>

      </div>
    </div>
  )
}

export default PostModal
