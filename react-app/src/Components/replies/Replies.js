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
import DateCreated from '../date/DateCreated';
const Replies = ({
  id,
  reply,
  replyUrl,
  dateCreated,
  userUrl,
  firstName,
  lastName,
}) => {
  const {darkMode} = useContext(DarkModeContext)
  const dispatch = useDispatch()
  const likes = useSelector(state => state.likes[id])

  useEffect(() => {
    dispatch(getAllReplyLikes(id))
  },[dispatch,id])

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteReplies(id))
  }

  return (
    <div className='reply'>

    <div className="replyWrapper">

               <div className="replyTop">

                 <div className="replyTopLeft">
                   <img
                  src={userUrl}
                  alt=""
                  className="replyProfileImg"
                  />
                  <span className="replyUsername">{`${firstName} ${lastName}`}</span>
                  <DateCreated dateCreated={dateCreated}/>
                </div>

                <div className="replyTopRight">
                  <ReplyEditDeleteDrop
                  handleDelete={handleDelete}
                  reply={reply}
                  replyUrl={replyUrl}
                  id={id}
                  />
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
          </div>

    </div>

  )
}

export default Replies
