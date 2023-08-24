import React, { useContext, useState } from 'react'
import './ReplyModal.scss'
import { useDispatch } from 'react-redux'
import { addAReply } from '../../store/reply'
import { Avatar } from '@mui/material'
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import ShareImageUpload from '../shareImageUpload/ShareImageUpload'

import { DarkModeContext } from '../../context/darkMode/darkModeContext';

const ReplyModal = ({setShowModal, sessionUser, postId}) => {
  const dispatch = useDispatch()
  const {darkMode} = useContext(DarkModeContext)
  const [reply, setReply] = useState('')
  const [replyUrl, setReplyUrl] = useState('')
  const [errors, setErrors] = useState([])

  const updateReply = (e) => setReply(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      userId: sessionUser.id,
      postId,
      reply,
      replyUrl
    }

    let error = []
    if(!payload.reply){
      error.push('Reply area is required')
    }

    if(!payload.replyUrl){
      error.push('Image is required')
    }

    if(error.length){
      setErrors(error)
    }else{
      dispatch(addAReply(payload,postId))
      setShowModal(false)
      setReply('')
      setReplyUrl('')
    }

  //   setErros(error)
  //   dispatch(addAReply(payload,postId))
  //   setShowModal(false)
  //   setReply('')
  //   setReplyUrl('')
  }

  return (
    <div className={darkMode ? 'creteReplyForm dark' : 'creteReplyForm'}>

    <center>
      <div className={darkMode ? 'creteReplyModalClosingTitleDiv dark' : 'creteReplyModalClosingTitleDiv'}>
        <p className={darkMode ? 'creteReplyModaTitle dark' : 'creteReplyModaTitle'}>Reply To This Post</p>
        <button className={darkMode ? 'createReplyClosingButton dark' : 'createReplyClosingButton'} onClick={() => setShowModal(false)}> <CloseSharpIcon className='replyModalCLoseIcon'/></button>
      </div>
    </center>


    <div className={darkMode ? 'createReplyModalUserInfo dark' : 'createReplyModalUserInfo'}>

      <Avatar className={darkMode ? 'createReplyUserIcon dark' : 'createReplyUserIcon'} src={sessionUser.userUrl}/>
      <h3 className={darkMode ? 'createReplyUserInfo dark' : 'createReplyUserInfo'}>{sessionUser.firstName} {sessionUser.lastName}</h3>

    </div>

      <div className={darkMode ? 'createReplyModalForm dark' : 'createReplyModalForm'}>

      <form className={darkMode ? 'createReplyModalFormInput dark' : 'createReplyModalFormInput'}>

        <ul className={darkMode ? 'createReplyModalError dark' : 'createReplyModalError'}>
          {errors && errors.map((error, id) => <li key={id}>{error}</li>)}
        </ul>

        <textarea
        className={darkMode ? 'createReplyModalInput dark': 'createReplyModalInput'}
        value={reply}
        rows='4'
        onChange={updateReply}
        placeholder={`Whats on your mind, ${sessionUser.firstName}?`}
        />

      </form>

        <ShareImageUpload setPostUrl={setReplyUrl}/>

        <button onClick={handleSubmit} className={darkMode ? 'createReplyModalButton dark' : 'createReplyModalButton'} type='submit'> Reply </button>
    </div>
  </div>
  )
}

export default ReplyModal
