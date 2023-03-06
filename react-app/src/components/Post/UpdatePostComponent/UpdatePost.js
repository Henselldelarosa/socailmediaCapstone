
import { Avatar } from '@mui/material'
import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateAPost } from '../../../store/post'
import './UpdatePost.css'

function UpdatePost({hideForm}) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
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

    const payload = {
      ...currentPost,
      post,
      postUrl
    }

    await dispatch(updateAPost(payload))
    hideForm()
  }

  const handleCancer = (e) =>{
    e.preventDefault()
    hideForm()
  }

  return (
    <div className='update_post_div_container'>
      <div className='update_post_user_info'>

        <Avatar src={currentPost.user?.userUrl}/>

        <div className='update_post_user_name'>
        <h3>{currentPost.user?.firstName} {currentPost.user?.lastName} </h3>
        </div>

      </div>
      <form className='update_form'onSubmit={handleSubmit}>

        <label className='update_label'>
          <div className='update_post_ele'>Post:
        <input
         type='text'
         className='update_ele'
         value={post}
         required
         onChange={updatePost}
         />
          </div>
        </label>

        <label>

        <div className='update_post_ele'>PostUrl:
         <input
          type='text'
          className='update_ele'
          value={postUrl}
          onChange={updatePostUrl}
          />
        </div>

        </label>
          <div className='update_post_buttons'>
          <button className='submit_button' type='submit'>Submit</button>

          <div className='update_cancel_div'>

          <button className='cancel_button' type='button'onClick={handleCancer}>Cancel</button>
          </div>
          </div>
      </form>

    </div>
  )
}

export default UpdatePost
