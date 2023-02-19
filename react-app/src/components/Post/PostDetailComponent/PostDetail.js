import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as postActions from '../../../store/post'

import './PostDetail.css'

function PostDetail() {
  const dispatch = useDispatch()
  const {id} = useParams()
  const post = useSelector(state => state.posts[id])

  console.log(post)
 useEffect(() =>{
  dispatch(postActions.getPostById(id))
 },[dispatch, id])

  return (
    <div>PostDetail</div>
  )
}

export default PostDetail
