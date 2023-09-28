import React,{useEffect, useState, useContext} from 'react'
import { DarkModeContext } from '../../context/darkMode/darkModeContext';

import './Replies.scss'
import { useDispatch, useSelector } from 'react-redux'

import { updateReplies, deleteReplies } from '../../store/reply'
import ReplyEditImageUpload from '../replyEditImageUpload/ReplyEditImageUpload';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { IconButton } from '@mui/material'
import { ChatBubbleOutline, Favorite, FavoriteOutlined, More, MoreVert, ShareOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material'
import ReplyEdit from '../replyEdit/ReplyEdit';

import {addRemoveTheReplyLike, getAllReplyLikes} from '../../store/like'

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ReplyLike from '../replyLike/ReplyLike';
import EditReplyModalRender from '../editReplyModal/EditReplyModalRender';
import ReplyEditDeleteDrop from '../replyEditDeleteDrop/ReplyEditDeleteDrop';
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
  const likes = useSelector(state => state.likes[id])

  const [showButton, setShowButton] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  useEffect(() => {
    dispatch(getAllReplyLikes(id))
  },[dispatch,id])

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
      <>
      {/* <EditReplyModalRender
      id={id}
      reply={reply}
      replyUrl={replyUrl}
      sessionUser={sessionUser}
      /> */}
        {/* <ReplyEdit
        id={id}
        firstName={firstName}
        lastName={lastName}
        reply={reply}
        replyUrl={replyUrl}
        dateCreated={dateCreated}
        hideForm={() => setShowEdit(false)}
        /> */}
         {/* <ReplyEditImageUpload replyUrl={replyUrl} setReplyUrl={setReplyData}/> */}
      </>

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
                  <ReplyEditDeleteDrop
                  handleDelete={handleDelete}
                  reply={reply}
                  replyUrl={replyUrl}
                  id={id}
                  setShowModal={handleClose}
                  />
                  {/* <IconButton>
                    {userId === sessionUser.id &&(
                      <>
                    <MoreVert onClick={handleShow} className='replyVertButton'/>
                    {showButton && (
                      <div className='replyActionButton'>
                        <button onClick={handleDelete}>Delete</button>
                        <button onClick={() =>
                         { setShowEdit(true)
                         handleClose()}}>Edit</button>
                      </div>
                    )}
                    </>
                    )}
                  </IconButton> */}
                </div>
              </div>

              <div className="replyCenter">
                <span className="replyText">{reply}</span>
                {replyUrl ?
                <>
                <img
                src={replyUrl}
                alt=""
                style={{height:'400px'}}
                className="replyImg"
                />

                </>
                :<></>}
              </div>

              <hr className="replyHr" />

              <div className="replyBottom">

                <ReplyLike
                id={id}
                likes={likes}
                />

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
