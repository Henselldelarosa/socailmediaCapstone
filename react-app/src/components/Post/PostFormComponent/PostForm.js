import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './PostForm.css'
import { addPost } from '../../../store/post'
import { Avatar } from '@mui/material'
// import {useForm} from 'react-hook-form'


function PostForm() {
const dispatch = useDispatch()
const user = useSelector(state => state.session.user)

const [error, setError] = useState([])
const [post, setPost] = useState('')
const [postUrl, setPostUrl] = useState('')

const updatePost = (e) => setPost(e.target.value)
const updatePostUrl = (e) => setPostUrl(e.target.value)


let formRef = useRef()

useEffect(() =>{
if(!updatePost){
  formRef.current?.reset()
}
})

const handleSubmit =  (e) =>{
  e.preventDefault()
  setError([])

  const payload ={
    userId: user.id,
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
    }else{
      error.push("Not a valid Image")
    }
  }else if(payload.post){
    dispatch(addPost(payload))
  }
  
  setError(error)
  setPostUrl('')
  setPost('')
}
  return (
    <div className='post_create_form'>

      <div className='post_form_top'>
        <Avatar src={user.userUrl}/>
        <form ref={formRef} onSubmit={handleSubmit}>
          <ul className='post_error'>
            {error && error.map((error, id) => <li key={id}>{error}</li>)}
          </ul>

          <input
          type='text'
          className='form_post_poster'
          placeholder={`whats on your mind, ${user.firstName}?`}
          value={post}
          onChange={updatePost}
          />

          <input
          placeholder='image URL (opional)'
          accept='image/*'
          value={postUrl}
          onChange={updatePostUrl}
          />

          <button type='submit'>
            Hidden submit
          </button>

        </form>

      </div>

      <div className='post_form_bottom'>
        {/* <div className='options'>
      <i className="fa-solid fa-image" style={{color:'red'}}/>
      <h3>Photo</h3>
        </div> */}
        <div>

        </div>

      </div>
    </div>
  )
}

export default PostForm
