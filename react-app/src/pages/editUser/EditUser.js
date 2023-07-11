import React, {useState} from 'react'
import './EditUser.css'

import { editUser } from '../../store/user'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'

const EditUser = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const history = useHistory()

  return (
    <div>EditUser</div>
  )
}

export default EditUser
