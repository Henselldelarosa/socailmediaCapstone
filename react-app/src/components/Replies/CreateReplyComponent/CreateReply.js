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
  // const actualId= parseInt(id)
  const post = useSelector(state => state.posts[id])

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

    let errors = []
    let validImage = ['.png' , '.jpg' , '.jpeg' , '.gif' , '.bmp' , '.tif' , '.tiff']

    if(!payload.reply){
      errors.push("Reply field can't be empty")
    }

    if ((payload.replyUrl !== '' && payload.reply)) {
      if(payload.replyUrl.endsWith(validImage[0]) || payload.replyUrl.endsWith(validImage[1]) || payload.replyUrl.endsWith(validImage[2]) || payload.replyUrl.endsWith(validImage[3]) || payload.replyUrl.endsWith(validImage[4]) || payload.replyUrl.endsWith(validImage[5]) || payload.replyUrl.endsWith(validImage[6])) {
        dispatch(addAReply(payload, id))
      }else{
        errors.push("Not a valid Image")
      }
    }else if(payload.reply){
      dispatch(addAReply(payload, id))
    }


    setErrorMesaage(errors)
    setReply('')
    setReplyUrl('')
  }
  return (
    <div className='reply_create_form'>

      <div className='reply_form_top'>
      <Avatar src={user.userUrl}/>

      <form  onSubmit={handleSubmit}>

         <ul>
            {errorMesaage && errorMesaage.map((error, id) => <li key={id}>{error}</li>)}
          </ul>

        <input
        type='text'
        className='form_reply_post'
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

    </div>
  )
}

export default CreateReply
