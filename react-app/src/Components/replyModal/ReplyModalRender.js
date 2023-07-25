import React, {useState, useContext} from 'react'
import './ReplyModalRender.css'

import { Modal } from '../../context/Modal'
import { useSelector } from 'react-redux'
import CollectionsIcon from '@mui/icons-material/Collections';
import ReplyModal from './ReplyModal';
import { DarkModeContext } from '../../context/darkMode/darkModeContext';

const ReplyModalRender = ({postId}) => {
  const [showModal, setShowModal] = useState(false)
  const sessionUser = useSelector(state => state.session.user)
  const {darkMode} = useContext(DarkModeContext)

  return (
    <div className='replyModal'>
    <button style={{border:'none', backgroundColor:'transparent'}}onClick={() => setShowModal(true)}>

    <div className="replyOption">
    <CollectionsIcon
     className="replyIcon"
     style={{ color: "#bb0000f2" }}
    />
    <span className={darkMode ? 'replyOptionText dark' : 'replyOptionText' }>Photos</span>

    </div>

    </button>
    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <ReplyModal postId={postId} setShowModal={setShowModal} sessionUser={sessionUser}/>
      </Modal>
    )}
  </div>
  )
}

export default ReplyModalRender
