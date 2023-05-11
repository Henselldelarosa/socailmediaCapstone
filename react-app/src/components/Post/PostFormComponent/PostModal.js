import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import {addPost} from '../../../store/post'
import { Avatar } from '@mui/material'
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import Button from '@mui/material/Button';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

// import UploadPicture from './PostImageUpload';


// components and style sheets
import './PostModal.css'
import ImageUploadComponent from './PostImageUpload';

function PostModal({setShowModal, user}) {
  const dispatch = useDispatch()

  const [post, setPost] = useState('')
  const [postUrl, setPostUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState([])

  const updatePost = (e) => setPost(e.target.value)
  const updatePostUrl =(e) => setPost(e.target.files[0])

useEffect(() => {
  (async () => {
      const res = await fetch('/api/images');
      if (res.ok) {
          const data = await res.json();
          console.log(data, 'before setPostUrl')
          setPostUrl(data.images[0].url)
          console.log(data.images[0].url, 'after set postUrl')
      } else {
          console.log("error")
      }

  })();
}, [postUrl])

let content = null

postUrl?(
content = (
  <center>

    <img className='uploaded_image_modal'src={postUrl}/>
  </center>
)
):(

  content =(
    <Button
    as='label'
    htmlFor='modal_file_upload'
    cursor='pointer'
    mb={4}
    >
      <div className='image_modal_upload'>


        <div className='modal_center_info'>

          <center>

        <AddToPhotosIcon/>
        <p>Add Photos</p>

          </center>

        </div>

      </div>

    </Button>
  )
)


  const handleSubmit = async (e) =>{
    e.preventDefault()
    setErrorMessage([])


    const payload ={
      userId:user.id,
      post,
      postUrl
    }

    let error = []

    if(!payload.post){
      error.push("Post field can't be empty")
    }

    if (payload.postUrl && payload.post) {
      dispatch(addPost(payload))
      setShowModal(false)

    }


    setErrorMessage(error)
    setPostUrl('')
    setPost('')
  }

  return(
    <div className='post_modal_form'>

      <center>
        <div className='modal_closing_title_div'>
          <p className='post_form_modal_title'>Create post</p>
          <button className='modal_closing_button' onClick={() => setShowModal(false)}> <CloseSharpIcon/></button>
        </div>
      </center>


      <div className='post_modal_form_user_info'>

        <Avatar src={user.userUrl}/>
        <h3>{user.firstName} {user.lastName}</h3>

      </div>

        <div className='modal_form'>

        <form className='post_modal_form_input' onSubmit={handleSubmit}>

          <ul className='post_modal_error'>
            {errorMessage && errorMessage.map((error, id) => <li key={id}>{error}</li>)}
          </ul>

          <textarea
          className='post_input'
          value={post}
          rows='4'
          onChange={updatePost}
          placeholder={`Whats on your mind, ${user.firstName}?`}
          />
          
            <ImageUploadComponent setPostUrl={setPostUrl}/>
          <div className='modal_file_upload_div'>

          <input
          type='file'
          accept='image/*'
          hidden
          id='modal_file_upload'
          onChange={updatePostUrl}
          />


            {content}

          </div>

          <button className='post_modal_button' type='submit'> Post </button>

        </form>

      </div>
    </div>
  )
}

export default PostModal
