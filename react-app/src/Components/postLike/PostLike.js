import React from 'react'
import './PostLike.scss'
import { ThumbUp, ThumbUpOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import {addRemoveThePostLike} from '../../store/postLike'

const PostLike = ({id, postLike}) => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)

  return (
    <div>

      {postLike ? (
        <div className="postUserLiked"
        onClick={(e) => {
          e.preventDefault()
          dispatch(addRemoveThePostLike(id))
        }}>
          <ThumbUp
          className='postUserLiked__Icon'
          style={{fontSize: '30px'}}
          />
           <span className="postLikeSpam">Like</span>
        </div>
        ):(
          <div className="postUserNotLiked"
          onClick={(e) => {
            e.preventDefault()
            dispatch(addRemoveThePostLike(id, sessionUser.id))
          }}>
            <ThumbUpOutlined
            className='postUserNotLiked__Icon'
            style={{fontSize: '30px'}}
            />
            <span className="postLikeSpam">Like</span>
          </div>
        )}

    </div>
  )
}

export default PostLike
