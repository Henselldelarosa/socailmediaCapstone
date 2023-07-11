import React, {useState} from 'react'
import './EditUser.css'

import { editUser } from '../../store/user'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'

import { DriveFolderUploadOutlined } from '@mui/icons-material'

const EditUser = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const user = useSelector(state => state.users[id])
  const history = useHistory()

  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const [email, setEmail] = useState(user?.email)
  const [userUrl, setUserUrl] = useState(user?.userUrl)
  const [profileUrl, setProfileUrl] = useState(user?.profile_url)
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number)
  const [country, setCountry] = useState(user?.country)
  const [address, setAddress] = useState(user?.address)
  const [relationship, setRelationship] = useState(user?.relationship)
  const [errors, setErrors] = useState([])

  const updateFirstName = (e) => setFirstName(e.target.value)
  const updateLastName = (e) => setLastName(e.target.value)
  const updateEmail = (e) => setEmail(e.target.value)
  const updateUserUrl = (e) => setUserUrl(e.target.value)
  const updateProfileUrl = (e) => setProfileUrl(e.target.value)
  const updatePhoneNumber = (e) => setPhoneNumber(e.target.value)
  const updateCountry = (e) => setCountry(e.target.value)
  const updateAddress = (e) => setAddress(e.target.value)
  const updateRelationship = (e) => setRelationship(e.target.value)


  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])

    const error =[]

    const payload = {
      id,
      firstName,
      lastName,
      email,
      userUrl,
      profileUrl,
      phoneNumber,
      country,
      address,
      relationship
    }
    // First name is Required'

    if(!payload.firstName){
      error.push('First name is Required')
    }

    if(!payload.lastName){
      error.push('Last name is Required')
    }

    if(!payload.email){
      error.push('Email is Required')
    }

    if(error.length === 0){
      dispatch(editUser(payload))
      setFirstName('')
      setLastName('')
      setEmail('')
      setUserUrl('')
      setProfileUrl('')
      setPhoneNumber('')
      setCountry('')
      setAddress('')
      setRelationship('')
      history.push(`/profile/${user.id}`)
    }else{
      setErrors(error)
    }

  }

  return (
    <div className='editProfile'>

      <div className="editProfileWrapper">

      <div className="profileRight">
          <div className="profileRightTop">

            <div className="profileCover">
              <img
              src={user?.profile_url}
              alt=""
              className="profileCoverImg"/>

              <img
              src={user?.userUrl}
              alt=""
              className="profileUserImg"
              />
            </div>

            <div className="profileInfo">
              <h4 className="prodileInfoName">{`${user?.firstName} ${user?.lastName}`}</h4>
              <span className="profileInfoDesc">Hi Friends!</span>
            </div>
          </div>

          <div className="editProfileRightBottom">
            <div className="top">
              <h1 className='editTitle'>Edit User Profile</h1>
            </div>

            <div className="bottom">
              <div className="left">
                <img
                src={user?.userUrl}
                alt=""
                className='editImg'/>
              </div>

              <div className="right">

              <form onSubmit={handleSubmit} className='editForm'>
                <ul>
                  {errors && errors.map((error,id) => <li key={id}>{error}</li>)}
                </ul>
                <div className="formInput">
                  <label className="editLabel">First Name</label>
                  <input
                  type="text"
                  className="editInput"
                  value={firstName}
                  onChange={updateFirstName}
                  />
                </div>

                <div className="formInput">
                  <label className="editLabel">Last Name</label>
                  <input
                  type="text"
                  className="editInput"
                  value={lastName}
                  onChange={updateLastName}
                  />
                </div>


                <div className="formInput">
                  <label className="editLabel">Email</label>
                  <input
                  type="email"
                  className="editInput"
                  value={email}
                  onChange={updateEmail}
                  />
                </div>


                <div className="formInput">
                  <label className="editLabel">Phone Number</label>
                  <input
                  type="text"
                  className="editInput"
                  value={phoneNumber}
                  onChange={updatePhoneNumber}
                  />
                </div>


                <div className="formInput">
                  <label className="editLabel">Country</label>
                  <input
                  type="text"
                  className="editInput"
                  value={country}
                  onChange={updateCountry}
                  />
                </div>

                <div className="formInput">
                  <label className="editLabel">Address</label>
                  <input
                  type="text"
                  className="editInput"
                  value={address}
                  onChange={updateAddress}
                  />
                </div>

                <div className="formInput">
                  <label className="editLabel">Relationship</label>
                  <input
                  type="text"
                  className="editInput"
                  value={relationship}
                  onChange={updateRelationship}
                  />
                </div>

                <button type="submit" className='updateButton'>
                   Update Profile
                </button>

              </form>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUser
