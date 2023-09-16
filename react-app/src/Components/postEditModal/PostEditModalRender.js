import React, {useState, useContext} from 'react'
import {Modal} from '../../context/Modal'
import {useSelector} from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import PostEditModal from './PostEditModal';
import './PostEditModalRender.scss'
import ShareImageUpload from '../shareImageUpload/ShareImageUpload';
const PostEditModalRender = ({post, postUrl,id}) => {
  const [showModal, setShowModal] = useState(false)
  const sessionUser = useSelector(state => state.session.user)
  // const [setHide, setHide] = useState(false)
  const handleModel = (e) =>{
    e.preventDefault()
    setShowModal(true)
  }

  return (
    <div>

      <button style={
          {
            border: 'none',
            backgroundColor: 'transparent'
          }
        }
        onClick={handleModel}
        className='postEditModalButton'
      >
        <EditIcon
        className="shareEditIcon"

          style={
            {color: "#FAD02C"}
          }/>
        <span className="postEditButtonText">Edit</span>
      </button>

      {
      showModal && (
        <Modal
        onClose={
          () => setShowModal(false)
        }
        >
          <PostEditModal
          setShowModal={setShowModal}
          id={id}
          sessionUser={sessionUser}
          firstName={sessionUser ?. firstName}
          lastName={sessionUser ?. lastName}
          userUrl={sessionUser ?. userUrl}
          post={post}
          postUrl={postUrl}
          // hideForm={() => setShowModal(false)}
          />
          {/* <ShareImageUpload setPostUrl={setPostUrl}/> */}
        </Modal>
      )
    } </div>
  )
}

export default PostEditModalRender
