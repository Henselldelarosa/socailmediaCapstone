import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts, deletePost} from '../../../store/post'
// import { Avatar } from '@mui/material'
import LoginFormPage from '../../LoginFormPage'
import './GetAllPost.css'
import PostCard from './PostCard'
import PostForm from '../PostFormComponent/PostForm'
import { NavLink} from 'react-router-dom'


function GetAllPost() {
  const dispatch = useDispatch()
  const sessionuUser = useSelector(state=> state.session.user)
  const posts = useSelector(state => Object.values(state.posts))


  useEffect(() =>{
    dispatch(getAllPosts())
  },[dispatch])


const handleDelete = (e,id,postId) =>{
e.preventDefault()
dispatch(deletePost(id, postId))
}

  let profileView;



    if (sessionuUser){
      posts?
      profileView =(
        <div>
          <PostForm/>

          {posts && posts.map((post) =>{
            return (
              <div className='post_container'key={post.id}>

                {(post.userId === sessionuUser.id) && (
                  <div>
                    <button className='all_post_delete_button' onClick={(e) => {handleDelete(e, post.id)}}><i className="fa-solid fa-xmark"/></button>
                  </div>
                    )}

                  <div>
                    <NavLink className='posts_link' to={`/posts/${post.id}`}>

                  <PostCard
                  userUrl={post.user?.userUrl}
                  firstName={post.user?.firstName}
                  lastName={post.user?.lastName}
                  dateCreated={post.dateCreated}
                  post={post.post}
                  postUrl={post.postUrl}
                  />
                    </NavLink>
                  </div>
              </div>
            )})
        }
        </div>
      )
      :<></>
    }else{
      profileView=(
        <LoginFormPage/>
      )
    }

  return (profileView)
}

export default GetAllPost
