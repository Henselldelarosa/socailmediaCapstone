import React,{useEffect, useState, useContext} from 'react'
import './Replies.css'
import { useDispatch, useSelector } from 'react-redux'

import { updateReplies, deleteReplies } from '../../store/reply'
import {getAllReplyLikes, addRemoveTheReplyLike} from '../../store/reply'

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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

  const dispatch = useDispatch()
  const seesionUser = useSelector(state => state.session.user)
  const likes = useSelector(state => state.likes[id])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

   useEffect (() => {
    dispatch(getAllReplyLikes(id))
  })

  return (
    <div>Replies</div>
  )
}

export default Replies
