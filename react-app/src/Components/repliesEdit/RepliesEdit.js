import React from 'react'
import './RepliesEdit.css'
import { useDispatch, useSelector } from 'react-redux'

const RepliesEdit = () => {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  return (
    <div>RepliesEdit</div>
  )
}

export default RepliesEdit
