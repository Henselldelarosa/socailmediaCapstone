import React, {useEffect, useState} from 'react'
import './EditUser.css'
import { authenticate } from '../../store/session'
import { editUser, getUserById } from '../../store/user'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import ProfileImageUpload from '../../Components/profileImageUpload/ProfileImageUpload'
// import { Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


const EditUser = ({hideForm}) => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const user = useSelector(state => state.users[id])
  const sessionUser = useSelector(state => state.session.user)
  const history = useHistory()


  const [firstName, setFirstName] = useState(sessionUser.firstName)
  const [lastName, setLastName] = useState(sessionUser.lastName)
  const [email, setEmail] = useState(sessionUser.email)
  const [userUrl, setUserUrl] = useState(sessionUser?.userUrl)
  const [profile_url, setProfileUrl] = useState(sessionUser.profile_url)
  const [phone_number, setPhoneNumber] = useState(sessionUser.phone_number)
  const [country, setCountry] = useState(sessionUser.country)
  const [address, setAddress] = useState('')
  const [relationship, setRelationship] = useState(sessionUser.relationship)
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



  const handleCancel = (e) => {
    e.preventDefault()
    hideForm()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])

    const error =[]

    const payload = {
      ...sessionUser,
      firstName,
      lastName,
      email,
      userUrl,
      profile_url,
      phone_number,
      country,
      address,
      relationship
    }


    if(!payload.firstName){
      error.push('First name is Required')
    }

    if(!payload.lastName){
      error.push('Last name is Required')
    }

    if(!payload.email){
      error.push('Email is Required')
    }

    if((!payload.phone_number.length === 10)){
      error.push('Phone Number must be 10 digits long or set it to N/A')
    }

    if(error.length === 0){
      await dispatch(editUser(payload))
      history.push(`/profile/${sessionUser.id}`)
    }else{
      setErrors(error)
    }
    hideForm()
  }

  return (
    <div className='editProfile'>

      <div className="editProfileWrapper">

      <div className="profileRight">
          <div className="profileRightTop">

            <div className="profileCover">
              <img
              src={sessionUser?.profile_url}
              alt=""
              className="profileCoverImg"/>

              <img
              src={sessionUser?.userUrl}
              alt=""
              className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="prodileInfoName">{`${sessionUser?.firstName} ${sessionUser?.lastName}`}</h4>
              <span className="profileInfoDesc">Hi Friends!</span>
            </div>
          </div>

          <div className="editProfileRightBottom">
            <div className="top">
              <h1 className='editTitle'>Edit User Profile</h1>
            </div>

            <div className="bottom">
              <div className="left">
                <ProfileImageUpload sessionUser={sessionUser} setUserUrl={setUserUrl}/>
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
                  placeholder={`${sessionUser?.firstName}`}
                  onChange={updateFirstName}
                  />
                </div>

                <div className="formInput">
                  <label className="editLabel">Last Name</label>
                  <input
                  type="text"
                  className="editInput"
                  value={lastName}
                  placeholder={`${sessionUser?.lastName}`}
                  onChange={updateLastName}
                  />
                </div>


                <div className="formInput">
                  <label className="editLabel">Email</label>
                  <input
                  type="email"
                  className="editInput"
                  value={email}
                  placeholder={`${sessionUser?.email}`}
                  onChange={updateEmail}
                  />
                </div>


                <div className="formInput">
                  <label className="editLabel">Phone Number</label>
                  <input
                  type="text"
                  className="editInput"
                  value={phone_number}
                  placeholder={`${sessionUser?.phone_number}`}
                  onChange={updatePhoneNumber}
                  />
                </div>


                <div className="formInput">
                  <label className="editLabel">Country</label>
                  <input
                  type="text"
                  className="editInput"
                  value={country}
                  placeholder={`${sessionUser?.country}`}
                  onChange={updateCountry}
                  />
                </div>

                <div className="formInput">
                  <label className="editLabel">Address</label>
                  <input
                  type="text"
                  className="editInput"
                  value={address}
                  placeholder={`${sessionUser?.address}`}
                  onChange={updateAddress}
                  />
                </div>

                <div className="formInput">
                  <label className="editLabel">Relationship</label>

                    <select className='selectInput'value={relationship} onChange={updateRelationship}>
                      <option className='selectInputOption'> N/A </option>
                      <option className='selectInputOption'> Single </option>
                      <option className='selectInputOption'>Married</option>
                      <option className='selectInputOption'>Divorce</option>
                      <option className='selectInputOption'>Is Complicated</option>
                      <option className='selectInputOption'>Open Relationship</option>
                    </select>
                </div>


              <div className="editFormButtons">
                <button  type="submit" className='updateButton'>
                   Update Profile
                </button>
              </div>
              </form>
                <CloseIcon className='cancelEditButtton' onClick={handleCancel}/>


              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUser
