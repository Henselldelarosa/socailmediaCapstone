import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import Sidebar from '../../Components/sidebar/Sidebar'
import Feed from '../../Components/feed/Feed'
import Rightbar from '../../Components/rightbar/Rightbar'
import { getUserById } from '../../store/user'
import { useDispatch, useSelector } from 'react-redux'

import './Profile.css'
import EditUser from '../editUser/EditUser'
import { authenticate } from '../../store/session'
const Profile = () => {
  let {id} = useParams()
  const user = useSelector(state => state.users[id])
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()




  console.log(user)
  const [isLoaded, setIsLoaded] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false)

  useEffect(() => {
    dispatch(getUserById(id))
    dispatch(authenticate()).then(() => setIsLoaded(true));
  },[dispatch])
  let content;

  if(!sessionUser) return <Redirect to='/'/>


  if(showEditProfile){
    content = (
      <EditUser sessionUser={sessionUser}
      hideForm={() => setShowEditProfile(false)}
      />
    )
  }
  else if(sessionUser?.id === user?.id){
    user?
    content = (
            <div className='profile'>

              {user?.id === sessionUser?.id && (
                <div className="profileWrapper">
                 <Sidebar sessionUser={sessionUser}/>

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
                          <div className="editUserDiv">
                            {(!showEditProfile) && (
                              <div className="editDiv">
                                <button onClick={() => setShowEditProfile(true)} className="editButton">Edit Profile</button>
                              </div>
                            )}
                            </div>

                     </div>
                   </div>

                   <div className="profileRightBottom">
                     <Feed/>
                     <Rightbar sessionUser={user} profile/>
                   </div>
                 </div>
                </div>
              )}
            </div>
    )
    :<></>
  }
  else if(user?.id !== sessionUser?.id){
    // user?
    content = (
      <div className='profile'>

                 <div className="profileWrapper">
                   <Sidebar sessionUser={sessionUser}/>

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
                      <Rightbar sessionUser={sessionUser} profile/>
                    </div>
                  </div>
                </div>
              </div>
    )
    // :<></>
  }

  return (isLoaded, content)
}

export default Profile
