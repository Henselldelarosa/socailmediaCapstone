import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateReplies } from '../../store/reply'

import './ReplyEdit.css'
import ReplyEditImageUpload from '../replyEditImageUpload/ReplyEditImageUpload'
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

const ReplyEdit = ({firstName, lastName, reply, replyUrl, hideForm, id, dateCreated}) => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)

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
      hideForm()
      dispatch(updateReplies(payload, id))
    }

    if(error){
      setErrors(error)
    }

  }

  const handleCancel = (e) => {
    e.preventDefault()
    hideForm()
  }

   return (
    <div className='editReply'>

       <div className="editReplyWrapper">

        <div className="editReplyTop">

          <div className="replyTopLeft">

            <img
            src={sessionUser?.userUrl}
            alt=""
            className="editReplyUserImg"
            />
            <span className="editReplyName">{`${firstName} ${lastName}`}</span>
            <span className="editReplyDate">{dateCreated}</span>
          </div>


          <div className="editReplyTopRight">
            <CloseSharpIcon onClick={handleCancel} className="editReplyCancelButton"/>
          </div>

        </div>

        {/* <hr className="editReplyHr" /> */}

        <div className="editReplyCenter">

          <form className="editReplyForm">
            <ul>
              {errors && errors.map((error,id) => <li className='editReplyError' key={id}>{error}</li>)}
            </ul>

            <textarea
            type="text"
            className='editReplyInput'
            value={replyData}
            placeholder='What would you like to edit?'
            onChange={updateReply}
            />


          </form>
          </div>

          <div className="editReplyBottom">
            <ReplyEditImageUpload replyUrl={replyUrl} setReplyUrl={setReplyUrlData}/>
            <button onClick={handleEdit} type="submit" className="ediReplyButton">Update</button>
          </div>

        </div>
    </div>
  )
}

export default ReplyEdit
