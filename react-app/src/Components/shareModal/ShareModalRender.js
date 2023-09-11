import React, {useState, useContext} from 'react'
import { Modal } from '../../context/Modal'
import { useSelector } from 'react-redux'
import CollectionsIcon from '@mui/icons-material/Collections';
import ShareModal from './ShareModal';

import './ShareModalRender.scss'

import { DarkModeContext } from '../../context/darkMode/darkModeContext';

const ShareModalRender = () => {
  const [showModal, setShowModal] = useState(false)
  const sessionUser = useSelector(state => state.session.user)
  const {darkMode} = useContext(DarkModeContext)

  return (
    <div>
    <button style={{border:'none', backgroundColor:'transparent'}}onClick={() => setShowModal(true)}>

    <div className="shareOption">
    <CollectionsIcon
     className="shareIcon"
     style={{ color: "#bb0000f2" }}
    />
    <span className={darkMode ? 'shareOptionText dark' : 'shareOptionText' }>Photos</span>

    </div>

    </button>
    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <ShareModal
        setShowModal={setShowModal}
        sessionUser={sessionUser}/>
      </Modal>
    )}
  </div>
  )
}

export default ShareModalRender
