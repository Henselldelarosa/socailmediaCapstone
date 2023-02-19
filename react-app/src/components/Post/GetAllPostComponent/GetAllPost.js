import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../../../store/post'
import { Avatar } from '@mui/material'
import LoginFormPage from '../../LoginFormPage'
import './GetAllPost.css'


function GetAllPost() {
  const dispatch = useDispatch()
  const sessionuUser = useSelector(state=> state.session.user)
  const posts = useSelector(state => Object.values(state.posts))


  useEffect(() =>{
    dispatch(getAllPosts())
  },[dispatch])


 console.log(posts)
  let profileView;
  if (sessionuUser){
    profileView =(
      <div>
        {posts && posts.map((post) =>{
          return (
            <div key={post.id}>
            </div>
          )
        })}
      </div>
    )
  }else{
    profileView=(
      <LoginFormPage/>
    )
  }
  return (profileView)
}

export default GetAllPost
