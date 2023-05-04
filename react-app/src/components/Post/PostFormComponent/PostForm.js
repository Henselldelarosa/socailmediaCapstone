import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './PostForm.css'
import { addPost } from '../../../store/post'
import { Avatar } from '@mui/material'
// import ScrollDialog from './ScrollDialog'
// import {useForm} from 'react-hook-form'


function PostForm() {
const dispatch = useDispatch()
const user = useSelector(state => state.session.user)

const [error, setError] = useState([])
const [post, setPost] = useState('')
const [postUrl, setPostUrl] = useState(null)
const [imageLoading, setImageLoading] = useState(false)

const updatePost = (e) => setPost(e.target.value)
// const updatePostUrl = (e) => setPostUrl(e.target.value)


let formRef = useRef()

useEffect(() =>{
if(!updatePost){
  formRef.current?.reset()
}
})

const handleUpload = async (e) =>{
  e.preventDefault()
  
  const formData = new FormData()
  formData.append('image', postUrl)
  setImageLoading(true)

  const res = await fetch('/api/images', {
    method: 'POST',
    body:formData
  })

  console.log(res)

  if (res.ok){
    await res.json()
    setImageLoading(false)
  }else{
    setImageLoading(false)
    console.log('error on upload')
  }

}

const updateImage = (e) =>{
  handleUpload(e)
  const file = e.target.files[0]
  setPostUrl(file)
}

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


  // if (payload.postUrl !== '' && payload.post) {
  //   if(payload.postUrl.endsWith(validImage[0]) || payload.postUrl.endsWith(validImage[1]) || payload.postUrl.endsWith(validImage[2]) || payload.postUrl.endsWith(validImage[3]) || payload.postUrl.endsWith(validImage[4]) || payload.postUrl.endsWith(validImage[5]) || payload.postUrl.endsWith(validImage[6])) {
  //     dispatch(addPost(payload))
  //   }else{
  //     error.push("Not a valid Image")
  //   }
  // }
  else{
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

        <form ref={formRef} onSubmit={handleUpload}>

          <ul className='post_error'>
            {error && error.map((error, id) => <li key={id}>{error}</li>)}
          </ul>

          {/* <input
          type='text'
          className='form_post_poster'
          placeholder={`whats on your mind, ${user.firstName}?`}
          value={post}
          onChange={updatePost}
          /> */}

          <input
          type='file'
          placeholder='image URL (opional)'
          accept='image/*'
          onChange={updateImage}
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
      {/* <ScrollDialog/> */}
    </div>
  )
}

export default PostForm
