import React,{ useEffect, useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './CreateReply.css'

// thunks
import {addAReply} from '../../../store/reply'
import { getPostById } from '../../../store/post'
import { Avatar } from '@mui/material'

function CreateReply() {
  const dispatch = useDispatch()
  const {id} = useParams()
  const user = useSelector(state => state.session.user)
  const post = useSelector(state => state.posts[id])
  console.log(post)

  const [errorMesaage , setErrorMesaage] = useState([])
  const [reply, setReply] = useState('')
  const [replyUrl, setReplyUrl] = useState('')

  const updateReply = (e) => setReply(e.target.value)
  const updateReplyUrl = (e) => setReplyUrl(e.target.value)

  useEffect(() => {
    dispatch(getPostById(id))
  },[dispatch, id])

  const handleSubmit = (e) =>{
    e.preventDefault()
    setErrorMesaage([])

    const payload ={
      userId: user.id,
      postId: post.id,
      reply,
      replyUrl
    }

    let error = []
    if(!payload.reply){
      error.push("Reply can't be empty")
    }

    if(payload.replyUrl !== ''){
      if(!payload.replyUrl.endsWith('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tif', '.tiff')){
        error.push('Not a Valid Image')
      }
    }
    dispatch(addAReply(payload))
    setErrorMesaage(error)
    setReply('')
    setReplyUrl('')
  }
  return (
    <div className='reply_create_form'>
      <Avatar src={user.userUrl}/>

      <form className='reply_form' onSubmit={handleSubmit}>

        <input
        type='text'
        placeholder='Write a comment...'
        value={reply}
        onChange={updateReply}
        />

        <input
         placeholder='image URL (opional)'
         accept='image/*'
         value={replyUrl}
         onChange={updateReplyUrl}
        />

        <button type='submit'>
          Hidden Submit
        </button>

      </form>

    </div>
  )
}

export default CreateReply
