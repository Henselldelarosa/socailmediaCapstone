import React, {useState} from 'react'
import { Modal } from '../../context/Modal'
import { useSelector } from 'react-redux'
import CollectionsIcon from '@mui/icons-material/Collections';
import ShareModal from './ShareModal';

import './ShareModalRender.css'

const ShareModalRender = () => {
  const [showModal, setShowModal] = useState(false)
  const sessionUser = useSelector(state => state.session.user)

  return (
    <>
    <button style={{border:'none'}}onClick={() => setShowModal(true)}>

    <div className="shareOption">
    <CollectionsIcon
     className="shareIcon"
     style={{ color: "#bb0000f2" }}
    />
    <span className="shareOptionText">Photos</span>

    </div>

    </button>
    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <ShareModal setShowModal={setShowModal} sessionUser={sessionUser}/>
      </Modal>
    )}
  </>
  )
}

export default ShareModalRender
