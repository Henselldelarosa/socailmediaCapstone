import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThumbUp, ThumbUpOutlined } from '@mui/icons-material'
import { addRemoveTheReplyLike } from '../../store/like'
import './ReplyLike.scss'

const ReplyLike = ({id, likes}) => {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()




  return (
    <div>
      {likes ? (
        <div className="userLiked">
          <ThumbUp
          className='userLikedIcon'
          onClick={(e) => {
            e.preventDefault()
            dispatch(addRemoveTheReplyLike(id))
          }}
          />
          {likes.length}
        </div>
      ):(

        <div className="userNotLiked">
          <ThumbUpOutlined
          className='userNotLikedIcon'
          onClick={(e) => {
            e.preventDefault()
            dispatch(addRemoveTheReplyLike(id, sessionUser.id))
          }}
          />
        </div>
      )

      }
    </div>
  )
}

export default ReplyLike
