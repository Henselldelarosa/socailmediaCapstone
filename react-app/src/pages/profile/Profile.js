import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import Sidebar from '../../Components/sidebar/Sidebar'
import Feed from '../../Components/feed/Feed'
import Rightbar from '../../Components/rightbar/Rightbar'
import { getTheUser } from '../../store/user'
import { useDispatch, useSelector } from 'react-redux'

import './Profile.css'
const Profile = () => {
  const {id} = useParams()
  const user = useSelector(state => state.users[id])
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()


  return (
    <div className='profile'>

      <div className="profileWrapper">
        <Sidebar user={sessionUser}/>

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

          <div className="profileRightBottom">
            <Feed/>
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
