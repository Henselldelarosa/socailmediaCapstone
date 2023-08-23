import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as replyActions from '../../store/reply'

import './CreateReply.css'
import ReplyModalRender from '../replyModal/ReplyModalRender'
const CreateReply = ({postId}) => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)

  const [reply, setReply] = useState('')
  const [replyUrl, setReplyUrl] = useState('')
  const [errors, setErrors] = useState([])

  const updateReply = (e) => setReply(e.target.value)
  const updateReplyUrl = (e) => setReplyUrl(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    const payload = {
      userId: sessionUser.id,
      postId,
      reply,
      replyUrl
    }

    let error =[]
    if(!payload.reply){
      error.push("Can't submit an empty reply")
    }

    if(error.length){
      // setErrors(error)
      alert(`${error}`)
    }else{
      dispatch(replyActions.addAReply(payload, postId))
      setReply('')
      setReplyUrl('')
    }

  }

  return (
    <div className='createReply'>

      <div className="createReplyWrapper">

        <div className="createReplyTop">
          <img
          src={sessionUser?.userUrl}
          alt=""
          className="createReplyUserImg"
          />

        <form onSubmit={handleSubmit} className="createReplyForm">
            <ul>
              {errors && errors.map((error,id) => {
                <li className='createReplyError' key={id}>{error}</li>
              })}
            </ul>

             <input
             type="text"
             placeholder={`What would you like to reply?`}
             className="formReplyInput"
             value={reply}
             size='40'
             onChange={updateReply}
             />

             <input
             type="file"
             name=""
             id=""
             hidden
             />
           <button hidden type="submit">hidden</button>
          </form>
        </div>

        <hr className="createReplyHr" />

        <div className="createReplyBottom">

          <div className="createReplyOptions">

            <div className="createReplyOption">
              <ReplyModalRender postId={postId}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateReply
