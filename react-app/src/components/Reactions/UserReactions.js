import React, { useEffect } from 'react'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {addRemoveTheReplyLike} from '../../store/like'
import { useDispatch, useSelector } from 'react-redux';
function UserReactions({userId, replyId}) {
  const dispatch = useDispatch()
  const like = useSelector(state => Object.values(state.likes))


  useEffect(() =>{
    dispatch(addRemoveTheReplyLike(replyId))
  },[dispatch, replyId])

  console.log(like)
  return (
    <div>
      <FavoriteOutlinedIcon/>
    </div>
  )
}

export default UserReactions
