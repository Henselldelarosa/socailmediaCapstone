import React from 'react'
import { NavLink, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import './RightbarProfile.css'
import { useSelector } from 'react-redux'
const RightbarProfile = () => {
  const {id} = useParams()
  const user = useSelector(state => state.users[id])
  console.log(user?.following[0])

  const mutualFollow = []

  for (let i = 0; i < user?.following.length; i++){
    let follow = user?.following[i]

    for(let j = 0; j <user?.followers.length; j++){
      let follower = user?.followers[j]

      if((follow?.userId === follower?.userId) && (!mutualFollow.includes(follow?.userId))){
        mutualFollow.push(follow)
      }
    }
  }

  console.log(mutualFollow)

  return (
    <div className='profileRightbar'>

      <div className="profileRightbarHeading">
        <span className="profileRightbarTitle">User Information</span>

        {/* <NavLink to='/profile/userId/edit' style={{textDecoration:'none'}}>
        <span className="editButton">Edit Profile</span>
        </NavLink> */}
      </div>

      <div className="profileRightbarInfo">

        <div className="profileRightbarInfoItem">
          <span className="profileRightbarInfoKey">Email: </span>
          <span className="profileRightbarInfoVal"> {user?.email}</span>
        </div>

        <div className="profileRightbarInfoItem">
          <span className="profileRightbarInfoKey">Phone Number: </span>
          <span className="profileRightbarInfoVal"> +4 123 456 7890</span>
        </div>

        <div className="profileRightbarInfoItem">
          <span className="profileRightbarInfoKey">Address: </span>
          <span className="profileRightbarInfoValue"> 123 something st, bronx, NY </span>
        </div>

        <div className="profileRightbarInfoItem">
          <span className="profileRightbarInfoKey">Crountry: </span>
          <span className="profileRightbarInfoVal"> United States</span>
        </div>

        <div className="profileRightbarInfoItem">
          <span className="profileRightbarInfoKey">Relationship: </span>
          <span className="profileRightbarInfoVal"> Single</span>
        </div>

      </div>

      <h4 className="profileRightbarCloseFriends">Mutual Follow</h4>

      {mutualFollow.map((f) => {
        return (
        <div key={f.id} className="profileRightbarFollowings">
            <NavLink className="profileRightbarFollowing" to={`/profile/${f.userId}`} style={{textDecoration:'none'}}>
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
