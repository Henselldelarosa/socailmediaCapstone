
import { Avatar } from '@mui/material'
import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateAPost } from '../../../store/post'
import './UpdatePost.css'

function UpdatePost({hideForm}) {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const {id} = useParams()
  const currentPost = useSelector(state => state.posts[id])


  const [ error, setError] = useState([])
  const [ post, setPost] = useState(currentPost.post)
  const [ postUrl, setPostUrl] = useState(currentPost.postUrl)

  if (currentPost.postUrl === null){
    currentPost.postUrl = ''
    return currentPost.postUrl
  }

  const updatePost = (e) =>setPost(e.target.value)
  const updatePostUrl = (e) =>setPostUrl(e.target.value)

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setError([])

    let error = []
    let validImage = ['.png' , '.jpg' , '.jpeg' , '.gif' , '.bmp' , '.tif' , '.tiff']

    const payload = {
      ...currentPost,
      post,
      postUrl
    }


  if(!payload.post){
    error.push("Post field can't be empty")
  }


    if (payload.postUrl !== '' && payload.post) {
      if(payload.postUrl.endsWith(validImage[0]) || payload.postUrl.endsWith(validImage[1]) || payload.postUrl.endsWith(validImage[2]) || payload.postUrl.endsWith(validImage[3]) || payload.postUrl.endsWith(validImage[4]) || payload.postUrl.endsWith(validImage[5]) || payload.postUrl.endsWith(validImage[6])) {
        dispatch(updateAPost(payload))
        hideForm()
      }else{
        error.push("Not a valid Image")
      }
    }else if(payload.post){
      dispatch(updateAPost(payload))
      hideForm()
    }

    setError(error)
    // await dispatch(updateAPost(payload))
  }

  const handleCancer = (e) =>{
    e.preventDefault()
    hideForm()
  }

  return (
    <div className='post_update_form'>
      <center>

      <div className='updatePost_userInfo'>
        <Avatar src={sessionUser.userUrl}/>
        <h3>{sessionUser.firstName} {sessionUser.lastName}</h3>


      <div className='cancel_div'>
        <button className='cancel_button' type='button'onClick={handleCancer}>Cancel</button>
      </div>

      </div>


      <div className='update_post_form_top'>


      <form onSubmit={handleSubmit}>

          <ul className='post_error'>
            {error && error.map((error, id) => <li key={id}>{error}</li>)}
          </ul>

            <input
            type='text'
            className='form_post_poster'
            placeholder='Edit your Post'
            value={post}
            onChange={updatePost}
            />



            <input
            type='text'
            placeholder='Edit Image (opnional)'
            value={postUrl}
            onChange={updatePostUrl}
            />




          <button className='submit_button' type='submit'>Submit</button>

            </form>
        </div>

      </center>
    </div>
  )
}

export default UpdatePost
