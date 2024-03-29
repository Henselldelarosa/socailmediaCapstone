import React,{useContext} from 'react'
import { NavLink, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import './RightbarProfile.scss'
import { useSelector } from 'react-redux'
import { DarkModeContext } from '../../context/darkMode/darkModeContext'
const RightbarProfile = () => {
  const {darkMode} = useContext(DarkModeContext)
  const {id} = useParams()
  const user = useSelector(state => state.users[id])
  const sessionUser = useSelector(state => state.session.user)

  const mutualFollow = []

  for (let i = 0; i < sessionUser?.following.length; i++){
    let follow = sessionUser?.following[i]

    for(let j = 0; j <sessionUser?.followers.length; j++){
      let follower = sessionUser?.followers[j]

      if((follow?.userId === follower?.userId) && (!mutualFollow.includes(follow?.userId))){
        mutualFollow.push(follow)
      }
    }
  }


  return (
    <div className='profileRightbar'>

      <div className="profileRightbarHeading">
        <span className="profileRightbarTitle">User Information</span>
{/*
        {(user?.id === sessionUser?.id) && (
        <NavLink to={`/user/${user.id}/edit`} style={{textDecoration:'none'}}>
        <span className="editButton">Edit Profile</span>
        </NavLink>
        )} */}
      </div>

      <div className="profileRightbarInfo">

        <div className="profileRightbarInfoItem">
          <span className="profileRightbarInfoKey">Email: </span>
          <span className="profileRightbarInfoVal"> {user?.email}</span>
        </div>

        <div className="profileRightbarInfoItem">
          <span className="profileRightbarInfoKey">Phone Number: </span>
          <span className="profileRightbarInfoVal"> {user?.phone_number}</span>
        </div>

        <div className="profileRightbarInfoItem">
          <span className="profileRightbarInfoKey">Address: </span>
          <span className="profileRightbarInfoValue"> {user?.address} </span>
        </div>

        <div className="profileRightbarInfoItem">
          <span className="profileRightbarInfoKey">Crountry: </span>
          <span className="profileRightbarInfoVal"> {user?.country}</span>
        </div>

        <div className="profileRightbarInfoItem">
          <span className="profileRightbarInfoKey">Relationship: </span>
          <span className="profileRightbarInfoVal"> {user?.relationship} </span>
        </div>

      </div>

      <h4 className="profileRightbarCloseFriends">Mutual Follow</h4>

      {mutualFollow.map((f) => {
        return (
        <div key={f.id} className="profileRightbarFollowings">
            <NavLink className={darkMode ? "profileRightbarFollowing dark" :'profileRightbarFollowing'} to={`/profile/${f.userId}`}>
            {/* // className={darkMode? 'followers dark' : 'followers' */}
              <img
              src={f?.userUrl}
              alt=""
              className="profileRightbarFollowingImg"
              />
              <span className="profileRightbarFollowingName">{f?.firstName}</span>
            </NavLink>
        </div>
        )
      })}

    </div>
  )
}

export default RightbarProfile
