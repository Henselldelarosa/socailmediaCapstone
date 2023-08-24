import React, { useEffect,useState } from 'react'

import './Post.scss'

import { IconButton } from '@mui/material'
import { ChatBubbleOutline, Create, More, MoreVert, Replay, ShareOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material'

import { getAllReplies } from '../../store/reply'
import { useDispatch, useSelector } from 'react-redux'
import Replies from '../replies/Replies'
import CreateReply from '../createReply/CreateReply'

const Post = ({id ,post ,postUrl, userUrl, firstName, lastName, dateCreated}) => {
  const replies = useSelector(state => Object.values(state.replies))
  const posts = useSelector(state => state.posts[id])
  const singleReply = []
  const sessionUser = useSelector(state => state.session.user)

    replies.map((reply) =>{
    if((reply.postId) === id){
      singleReply.push(reply)
    }
    return singleReply
  })

  const [showReply, setShowReply] = useState(false)


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllReplies(id))
  },[dispatch,id])

  const handleShow = (e) =>{
    e.preventDefault()

    if(showReply){
      setShowReply(false)
    }else{
      setShowReply(true)
    }
  }

  let content;

  if (posts){
    content = (
      <div className='post'>

      <div className="postWrapper">

        <div className="postTop">

          <div className="postTopLeft">
            <img src={userUrl}
            alt=""
            className="postProfileImg" />
            <span className="postUsername">{`${firstName} ${lastName}`}</span>
            <span className="postDate">{dateCreated}</span>
          </div>

          <div className="postTopRight">
            <IconButton>
              <MoreVert className='postVertButton'/>
            </IconButton>
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post}</span>
          <img src={postUrl} alt="" className="postImg" />
        </div>

      <div className="postBottom">

        <div className="postBottomLeft">
          <ThumbUp className='bottomLeftIcon' style={{color:'#1877f2'}}/>
          {/* <span className="postLikeCounter">{post.like}</span> */}
        </div>

        <div className="postBottomRight">
            <span className="postCommentText">
            { singleReply.length } comments · share
            </span>
          </div>
        </div>

        <hr className="footerHr" />

        <div className="postBottomFooter">

          <div className="postBottomFooterItem">
            <ThumbUpOutlined className='footerIcon'/>
            <span className="footerText">Like</span>
          </div>

          <div className="postBottomFooterItem">
            <ChatBubbleOutline className='footerIcon'/>
            <span onClick={handleShow} className="footerText">Comment</span>
          </div>

          <div className="postBottomFooterItem">
            <ShareOutlined className='footerIcon'/>
            <span className="footerText">Share</span>
          </div>
        </div>
      </div>
      <hr className="posthr" />
      {showReply && (
        <>
          {singleReply && singleReply.reverse().map((reply) => {
            return(
              <div key={reply.id}>
                <Replies
                  reply={reply?.reply}
                  id={reply?.id}
                  replyUrl={reply?.replyUrl}
                  dateCreated={reply?.dateCreated}
                  postId={id}
                  userId = {reply?.user.id}
                  userUrl={reply?.user?.userUrl}
                  firstName={reply?.user?.firstName}
                  lastName={reply?.user?.lastName}
                />
              </div>
            )
          })}
          <CreateReply postId={id}/>
        </>
      )}

    </div>
    )
  }
  return (content)
}

export default Post
