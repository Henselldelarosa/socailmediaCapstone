import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as postActions from '../../../store/post'
import PostCard from '../GetAllPostComponent/PostCard'

import './PostDetail.css'

function PostDetail() {
  const dispatch = useDispatch()
  const {id} = useParams()
  const post = useSelector(state => state.posts[id])
  const sessionUser = useSelector(state => state.session.user)
  console.log(sessionUser)
  console.log(post)

  console.log(post)
 useEffect(() =>{
  dispatch(postActions.getPostById(id))
 },[dispatch, id])

  return (
    post?
    <div>
      <PostCard
      userUrl = {post.user.userUrl}
      firstName={post.user.firstName}
      lastName={post.user.lastName}
      dateCreated={post.dateCreated}
      post={post.post}
      postUrl={post.postUrl}
      />
    </div>
    :<></>
  )
}

export default PostDetail
