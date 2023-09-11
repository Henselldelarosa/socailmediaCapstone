import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as postActions from '../../store/post'
import CloseShapIcon from '@mui/icons-material/CloseSharp'
import { Avatar } from '@mui/material'
import ShareImageUpload from '../shareImageUpload/ShareImageUpload'
import './PostEditModal.scss'
import ReplyEditImageUpload from '../replyEditImageUpload/ReplyEditImageUpload'
import PostEditImageUpload from '../posteditImageUpload/PostEditImageUpload'
const PostEditModal = ({setShowModal, sessionUser, post, postUrl, hideForm, id, firstName, lastName, userUrl}) => {
  const dispatch = useDispatch()
  const currentPost = useSelector(state => state.posts[id])
  // state
  const [postData, setPostData] = useState(post)
  const [postUrlData, setPostUrlData] = useState(postUrl)
  const [errorMessage, setErrorMessage] = useState([])

  //updates
  const updatePost = (e) => setPostData(e.target.value)
  const updatePostUrl =(e) => setPostUrlData(e.target.value)


  useEffect(() => {
    dispatch(postActions.getPostById(id))
  },[dispatch])

  console.log(id)
  console.log(currentPost)
  const handleSubmit = async(e) => {
    e.preventDefault()
    setErrorMessage([])
    const error = []

    const payload = {
      ...currentPost,
      post: postData,
      postUrl:postUrlData
    }

    if(!payload.post){
      error.push(`${firstName} The Post field can't be empty`)
    }

    if(!error.length){
      setErrorMessage([])
      hideForm()
      dispatch(postActions.updateAPost(payload, id))
    }



    if(error){
      setErrorMessage(error)
    }
  }

  // const handleEdit = (e) => {
  //   e.preventDefault()
  //   setErrorMessage([])
  // }

  return (
    <div className='postEdit'>

      <center>
        <div className="postEdit__div">

          <p className="postEdit__title">Edit Post</p>
          <button className="postEdit__button__close" onClick={() => setShowModal(false)}>
            <CloseShapIcon className='postEdit__button__icon'/>
          </button>
        </div>

      </center>

      <div className="postEdit__form__userInfo">
        <Avatar className='postEdit__form__userInfo__icon' src={userUrl}/>
        <h3 className="postEdit__form__userInfo__name">{firstName} {lastName}</h3>
      </div>

      <div className="postEdit__form__inner">

        <form className="postEdit__form__input">

          <ul className="postEdit__error">
            {errorMessage && errorMessage.map((error, id) => <li key={id}>{error}</li>)}
          </ul>

          <textarea
          className="postEdit__form__input__field"
          value={postData}
          onChange={updatePost}
          rows="4"
          />
        </form>

        <input
            type="text"
            className="shareInput"

            hidden
            value={postUrl}
            onChange={updatePostUrl}
            />

            <PostEditImageUpload setPostUrl={setPostUrlData} postUrl={postUrl}/>
        <button onClick={handleSubmit} type="submit" className="postEdit__button--submit">Update</button>
      </div>
    </div>
  )
}

export default PostEditModal
