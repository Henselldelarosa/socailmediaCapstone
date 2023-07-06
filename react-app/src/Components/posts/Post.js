import React from 'react'

import './Post.css'

import { IconButton } from '@mui/material'
import { ChatBubbleOutline, Favorite, FavoriteOutlined, MoreVert, ShareOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material'

const Post = ({post}) => {
  return (
    <div className='post'>

      <div className="postWrapper">

        <div className="postTop">

          <div className="postTopLeft">
            <img src={post?.user.userUrl}
            alt=""
            className="postProfileImg" />
            <span className="postUsername">{`${post?.user.firstName} ${post?.user.lastName}`}</span>
            <span className="postDate">{post?.dateCreated}</span>
          </div>

          <div className="postTopRight">
            <IconButton>
              <MoreVert className='postVertButton'/>
            </IconButton>
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post?.post}</span>
          <img src={post?.postUrl} alt="" className="postImg" />
        </div>

      <div className="postBottom">

        <div className="postBottomLeft">
          <ThumbUp className='bottomLeftIcon' style={{color:'#1877f2'}}/>
          {/* <span className="postLikeCounter">{post.like}</span> */}
        </div>

        <div className="postBottomRight">
            <span className="postCommentText">
              comments · share
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
            <span className="footerText">Comment</span>
          </div>

          <div className="postBottomFooterItem">
            <ShareOutlined className='footerIcon'/>
            <span className="footerText">Share</span>
          </div>

      </div>
      </div>

    </div>
  )
}

export default Post
