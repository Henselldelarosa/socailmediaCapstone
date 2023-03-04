import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as postActions from '../../../store/post'
import PostCard from '../GetAllPostComponent/PostCard'
import UpdatePost from '../UpdatePostComponent/UpdatePost'
import { getAllReplies } from '../../../store/reply'
import './PostDetail.css'

import ReplyCard from '../../Replies/ReplyDetailComponent/ReplyCard'
import { Avatar } from '@mui/material'
import CreateReply from '../../Replies/CreateReplyComponent/CreateReply'
import ReplyForm from '../../Replies/ReplyDetailComponent/ReplyForm'

function PostDetail() {
  const dispatch = useDispatch()
  const {id} = useParams()
  const post = useSelector(state => state.posts[id])
  const replies = useSelector(state => Object.values(state.replies))
  const sessionUser = useSelector(state => state.session.user)
  const [showEditPostForm, setShowEditPostForm] = useState(false)


  useEffect(() =>{
    dispatch(postActions.getPostById(id))
    dispatch(getAllReplies(id))
  },[dispatch, id])

  const replyRender = (replyObj) => {
    const allReply = []

    for (let reply in replyObj){
      allReply.push(
        <ReplyForm
         id={replyObj[reply].id}
         reply={replyObj[reply].reply}
         replyUrl={replyObj[reply].replyUrl}
         dateCreated={replyObj[reply].dateCreated}
         postId={replyObj[reply].postId}
         firstName={replyObj[reply].user.firstName}
         lastName={replyObj[reply].user.lastName}
         userUrl = {replyObj[reply].user.userUrl}
         userId={replyObj[reply].userId}
         />
      )
    }
    return allReply.reverse()
  }

  let content = null
  if(showEditPostForm){
    content = (
      <UpdatePost
       post={post}
        hideForm={() => setShowEditPostForm(false)}/>
    )
  }else{
    if(sessionUser){
      content = (
        post?
        <div className='post'>
          {(sessionUser.id === post.userId) && (
            <div>
              {(!showEditPostForm) && (
                <div>
                  <button className='edit_button' onClick={() => setShowEditPostForm(true)}>Edit</button>
                </div>
              )}
            </div>
          )}

        <PostCard
        userUrl = {post.user.userUrl}
        firstName={post.user.firstName}
        lastName={post.user.lastName}
        dateCreated={post.dateCreated}
        post={post.post}
        postUrl={post.postUrl}
        />
        <CreateReply/>

        {replies && replyRender(replies)}

        {/* {replies && replies.map((reply) => {
          return (
            <div key ={reply.id}>
              <ReplyCard
              userUrl={reply.user.userUrl}
              firstName={reply.user.firstName}
              lastName={reply.user.lastName}
              dateCreated={reply.dateCreated}
              reply={reply.reply}
              replyUrl={reply.replyUrl}
              />
            </div>
          )
        })} */}
        <div>
        </div>
      </div>:<></>
      )
    }
  }
  return content
}

export default PostDetail
