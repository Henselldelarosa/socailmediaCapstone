import { useSelector } from 'react-redux'
import '../../../context/Modal.css'
import CollectionsIcon from '@mui/icons-material/Collections';
import {Modal} from '../../../context/Modal'

import React, { useState } from 'react'
import PostModal from './PostModal';

function PostModalRender() {
  const [showModal, setShowModal] = useState(false)
  const sessionUser = useSelector(state => state.session.user)


  return (
    <>
      <button onClick={() => setShowModal(true)}>
      <CollectionsIcon/>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostModal setShowModal={setShowModal} sessionUser={sessionUser}/>
        </Modal>
      )}
    </>
  )
}

export default PostModalRender
