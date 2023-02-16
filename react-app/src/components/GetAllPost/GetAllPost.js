import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../../store/post'

function GetAllPost() {
  const dispatch = useDispatch()
  const posts = useSelector(state => Object.values(state.posts))
  console.log(posts)

  useEffect(() =>{
    dispatch(getAllPosts())
  },[dispatch])

  return (
    <div>GetAllPost</div>
  )
}

export default GetAllPost
