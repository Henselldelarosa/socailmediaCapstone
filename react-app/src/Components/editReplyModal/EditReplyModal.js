import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as replyActions from '../../store/reply'
import CloseShapIcon from '@mui/icons-material/CloseSharp'
import { Avatar } from '@mui/material'
import ReplyEditImageUpload from '../replyEditImageUpload/ReplyEditImageUpload';


const EditReplyModal = ({setShowModal, reply, replyUrl, id, firstName, lastName, userUrl}) => {
  const dispatch = useDispatch()

  const [replyData, setReplyData] = useState(reply)
  const [replyUrlData, setReplyUrlData] = useState(replyUrl)
  const [errors, setErrors] = useState([])

  const updateReply = (e) => setReplyData(e.target.value)
  const updateReplyUrl = (e) => setReplyUrlData(e.target.value)

  const handleEdit = (e) => {
    e.preventDefault()
    setErrors([])
    const error = []

    const payload = {
      reply: replyData,
      replyUrl: replyUrlData
    }

    if(!payload.reply){
      error.push(`${firstName} The Reply field can't be empty`)
    }

    if(!error.length){
      setErrors()
      setShowModal(false)
      dispatch(replyActions.updateReplies(payload, id))
    }

    if(error){
      setErrors(error)
    }

  }

  return (
    <div className='postEdit'>

      <center>
        <div className="postEdit__div">

          <p className="postEdit__title">Edit Post</p>
          <button className="postEdit__button__close" onClick={() => setShowModal(false)}>
            <CloseShapIcon className='postEdit__button__icon'/>
          </button>
        </div>

      </center>

      <div className="postEdit__form__userInfo">
        <Avatar className='postEdit__form__userInfo__icon' src={userUrl}/>
        <h3 className="postEdit__form__userInfo__name">{firstName} {lastName}</h3>
      </div>

      <div className="postEdit__form__inner">

        <form className="postEdit__form__input">

          <ul className="postEdit__error">
            {errors && errors.map((error, id) => <li key={id}>{error}</li>)}
          </ul>

          <textarea
          className="postEdit__form__input__field"
          value={replyData}
          onChange={updateReply}
          rows="4"
          />
        </form>

        <div>
          {console.log(id)}
        <ReplyEditImageUpload setReplyUrl={setReplyUrlData} replyUrl={replyUrl}/>
        <button onClick={handleEdit} type="submit" className="postEdit__button--submit">Update</button>
        </div>
      </div>
    </div>
  )
}

export default EditReplyModal
