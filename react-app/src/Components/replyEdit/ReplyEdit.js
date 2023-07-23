import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateReplies } from '../../store/reply'

const ReplyEdit = ({firstName, lastName, reply, replyUrl, setShowEdit, id}) => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)

  const [editReply, setEditReply] = useState(reply)
  const [editReplyUrl, setEditReplyUrl] = useState(replyUrl)
  const [errors, setErrors] = useState([])

  const updateReply = (e) => setEditReply(e.target.value)
  const updateReplyUrl = (e) => setEditReplyUrl(e.target.value)

  const handleEdit = async(e) => {
    e.preventDefault()
    setErrors([])
    const error = []

    const payload = {
      reply: editReply,
      replyUrl: editReplyUrl
    }

    if(!payload.reply){
      error.push(`${firstName} The Reply field can't be empty`)
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setShowEdit(false)
  }
   return (
    <div className='editReply'>

       <div className="editReplyWrapper">

        <div className="editReplyTop">
          <img
          src={sessionUser?.userUrl}
          alt=""
          className="editReplyUserImg"
          />

          <span className="editReplyName">{`${firstName} ${lastName}`}</span>

          <form onSubmit={handleEdit} className="editReplyForm">

            <input
            type="text"
            className='editReplyInput'
            value={editReply}
            onChange={updateReply}
            />

            <button type="submit" className="ediReplyButton">Edit</button>
            <button onClick={handleCancel} className="cancelEditButton">Cancel</button>
          </form>
        </div>

       </div>
    </div>
  )
}

export default ReplyEdit
