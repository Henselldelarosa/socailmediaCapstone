import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as postActions from '../../../store/post'
import PostCard from '../GetAllPostComponent/PostCard'
import UpdatePost from '../UpdatePostComponent/UpdatePost'
import { getAllReplies } from '../../../store/reply'
import './PostDetail.css'


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

        {replies && replies.reverse().map((reply) => {
          return(
            <div key={reply.id}>
            <ReplyForm
            id={reply.id}
            reply={reply.reply}
            replyUrl={reply.replyUrl}
            dateCreated={reply.dateCreated}
            postId={reply.postId}
            firstName={reply.user.firstName}
            lastName={reply.user.lastName}
            userUrl = {reply.user.userUrl}
            userId={reply.userId}
            />
            </div>
          )
          })}

        <div>
        </div>
      </div>:<></>
      )
    }
  }
  return content
}

export default PostDetail
