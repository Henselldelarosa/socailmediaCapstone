import React,{useEffect, useState, useContext} from 'react'
import { DarkModeContext } from '../../context/darkMode/darkModeContext';

import './Replies.css'
import { useDispatch, useSelector } from 'react-redux'

import { updateReplies, deleteReplies } from '../../store/reply'
import {getAllReplyLikes, addRemoveTheReplyLike} from '../../store/reply'

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { IconButton } from '@mui/material'
import { ChatBubbleOutline, More, MoreVert, ShareOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material'
import ReplyEdit from '../replyEdit/ReplyEdit';

const Replies = ({
  id,
  user,
  reply,
  replyUrl,
  dateCreated,
  postId,
  reactions,
  userUrl,
  firstName,
  lastName,
  userId
}) => {
  const {darkMode} = useContext(DarkModeContext)
  const dispatch = useDispatch()
  const replies = useSelector(state => Object.values(state.replies))
  const sessionUser = useSelector(state => state.session.user)

  console.log(replies)
  const [showButton, setShowButton] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const handleShow = (e) => {
    e.preventDefault()

    if(showButton) {
      setShowButton(false)
    }else{
      setShowButton(true)
    }
  }

  const handleClose =() =>{
    setShowButton(false)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteReplies(id))
    handleClose()
  }

  return (
    <div className='reply'>
    {showEdit ? (
      <div>
        <ReplyEdit
        setShowEdit={setShowEdit}
        firstName={firstName}
        lastName={lastName}
        reply={reply}
        />
      </div>

    ):(<div className="replyWrapper">

               <div className="replyTop">

                 <div className="replyTopLeft">
                   <img
                  src={userUrl}
                  alt=""
                  className="replyProfileImg"
                  />
                  <span className="replyUsername">{`${firstName} ${lastName}`}</span>
                  <span className="replyDate">{dateCreated}</span>
                </div>

                <div className="replyTopRight">
                  <IconButton>
                    {userId === sessionUser.id &&(
                      <>
                    <MoreVert onClick={handleShow} className='replyVertButton'/>
                    {showButton && (
                      <div className='replyActionButton'>
                        <button onClick={handleDelete}>Delete</button>
                        <button onClick={() => (setShowEdit(true))}>Edit</button>
                      </div>
                    )}
                    </>
                    )}
                  </IconButton>
                </div>
              </div>

              <div className="replyCenter">
                <span className="replyText">{reply}</span>
                <img
                src={replyUrl}
                alt=""
                className="replyImg"
                />
              </div>

              <div className="replyBottom">

                <div className="replyBottomLeft">
                  <ThumbUp className='replyButtomLeftIcon'/>
                </div>
              </div>
          </div>)}
    </div>

  )
}

export default Replies

//     <div className='reply'>
    //         <div className="replyWrapper">

    //           <div className="replyTop">

    //             <div className="replyTopLeft">
    //               <img
    //               src={userUrl}
    //               alt=""
    //               className="replyProfileImg"
    //               />
    //               <span className="replyUsername">{`${firstName} ${lastName}`}</span>
    //               <span className="replyDate">{dateCreated}</span>
    //             </div>

    //             <div className="replyTopRight">
    //               <IconButton>
    //                 {replies[id]?.userId !== sessionUser.id &&(
    //                   <>
    //                 <MoreVert onClick={handleShow} className='replyVertButton'/>
    //                 {showButton && (
    //                   <div className='replyActionButton'>
    //                     <button onClick={handleDelete}>Delete</button>
    //                     <button onClick={() => (setShowEdit(true))}>Edit</button>
    //                   </div>
    //                 )}
    //                 </>
    //                 )}
    //               </IconButton>
    //             </div>
    //           </div>

    //           <div className="replyCenter">
    //             <span className="replyText">{reply}</span>
    //             <img
    //             src={replyUrl}
    //             alt=""
    //             className="replyImg"
    //             />
    //           </div>

    //           <div className="replyBottom">

    //             <div className="replyBottomLeft">
    //               <ThumbUp className='replyButtomLeftIcon'/>
    //             </div>
    //           </div>
    //       </div>
    // </div>
