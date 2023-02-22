import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './PostForm.css'
import { addPost } from '../../../store/post'
import { Avatar } from '@mui/material'



function PostForm() {
const dispatch = useDispatch()
const user = useSelector(state => state.session.user)

const [error, setError] = useState([])
const [post, setPost] = useState('')
const [postUrl, setPostUrl] = useState('')


const updatePost = (e) => setPost(e.target.value)
const updatePostUrl = (e) => setPostUrl(e.target.value)


const handleSubmit = async (e) =>{
  e.preventDefault()
  setError([])

  const payload ={
    userId: user.id,
    post,
    postUrl
  }

  await dispatch(addPost(payload))
}
  return (
    <div className='post_create_form'>

      <div className='post_form_top'>
        <Avatar src={user.userUrl}/>
        <form onSubmit={handleSubmit}>

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
        <div className='options'>
      <i className="fa-solid fa-image" style={{color:'red'}}/>
      <h3>Photo</h3>
        </div>
        <div>

        </div>

      </div>
    </div>
  )
}

export default PostForm
