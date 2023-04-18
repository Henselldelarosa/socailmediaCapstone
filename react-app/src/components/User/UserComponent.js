import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function UserComponent() {
  const dispatch = useDispatch()
  const allUsers = useSelector(state => Object.values(state.users))

  return (
    <div>UserComponent</div>
  )
}

export default UserComponent
