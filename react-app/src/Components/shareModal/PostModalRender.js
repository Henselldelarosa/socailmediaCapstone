import React, {useState} from 'react'
import { Modal } from '../../context/Modal'
import { useSelector } from 'react-redux'
import CollectionsIcon from '@mui/icons-material/Collections';

const PostModalRender = () => {
  const [showModal, setShowModal] = useState(false)
  const user = useSelector(state => state.session.user)

  return (
    <>
    <button onClick={() => setShowModal(true)}>
    <CollectionsIcon/>
    </button>
    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <PostModal setShowModal={setShowModal} user={user}/>
      </Modal>
    )}
  </>
  )
}

export default PostModalRender
