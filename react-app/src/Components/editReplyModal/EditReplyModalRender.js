import React, {useState, useContext} from 'react'
import {Modal} from '../../context/Modal'
import {useSelector} from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import EditReplyModal from './EditReplyModal';
import ReplyEditImageUpload from '../replyEditImageUpload/ReplyEditImageUpload';
import './EditReplyModalRender.scss'

const EditReplyModalRender = ({reply, replyUrl, id}) => {
  const [showModal, setShowModal] = useState(false)
  const sessionUser = useSelector(state => state.session.user)
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
         <EditReplyModal
         setShowModal={setShowModal}
         id={id}
         sessionUser={sessionUser}
         firstName={sessionUser?.firstName}
         lastName={sessionUser?.lastName}
         userUrl={sessionUser?.userUrl}
         reply={reply}
         replyUrl={replyUrl}
         />
        </Modal>
      )
    } </div>
  )
}

export default EditReplyModalRender
