import React, {useState} from 'react'
import './Share.css'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../../store/post'
import ShareModalRender from '../shareModal/ShareModalRender'

const Share = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)

  const [error, setError] = useState([])
  const [post, setPost] = useState('')
  const [postUrl, setPostUrl] = useState('')

  const updatePost = (e) => setPost(e.target.value)
  const updatePostUrl = (e) => setPostUrl(e.target.value)

  const handleSubmit =  (e) =>{
    e.preventDefault()
    setError([])

    const payload ={
      userId: sessionUser.id,
      post,
      postUrl
    }

  let error = []
  let validImage = ['.png' , '.jpg' , '.jpeg' , '.gif' , '.bmp' , '.tif' , '.tiff']



    if(!payload.post){
      error.push("Post field can't be empty")
    }

    if (payload.postUrl !== '' && payload.post) {
      if(payload.postUrl.endsWith(validImage[0]) || payload.postUrl.endsWith(validImage[1]) || payload.postUrl.endsWith(validImage[2]) || payload.postUrl.endsWith(validImage[3]) || payload.postUrl.endsWith(validImage[4]) || payload.postUrl.endsWith(validImage[5]) || payload.postUrl.endsWith(validImage[6])) {
        dispatch(addPost(payload))
      }else{
        error.push("Not a valid Image")
      }
    }
    else{
      dispatch(addPost(payload))
    }


    setError(error)
    setPostUrl('')
    setPost('')
  }


  return (
    <div className='share'>

      <div className="shareWrapper">

        <div className="shareTop">
          <img
          src={sessionUser?.userUrl}
          alt=""
          className="shareProfileImg"
          />

          <form onSubmit={handleSubmit}>

            <input
            type="text"
            className="shareInput"
            placeholder={`What's on your mind ${sessionUser?.firstName}?`}
            value={post}
            size='35'
            onChange={updatePost}
            />

            <input
            type="text"
            className="shareInput"

            hidden
            value={postUrl}
            onChange={updatePostUrl}
            />

            <button type='submit' hidden>hidden</button>
          </form>
        </div>

        <hr className="shareHr" />

        <div className="shareBottom">

          <div className="shareOptions">
            <div className="shareOption">
              <ShareModalRender/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Share
