import React from 'react'

import {useSelector} from 'react-redux'
import { NavLink, useParams } from 'react-router-dom/cjs/react-router-dom.min'

import './RightbarHome.css'
import Following from '../following/Following'

const RightbarHome = () => {

  const user = useSelector(state => state.session.user)
console.log(user)

  return (
    <div className='rightbarHome'>

<div className='rightbarHome'>

{/* <div className="birthdayContainer">
  <img
  src="/assets/birthdaygifts/gift.png"
  alt=""
  className="birthdayImg"
  />

  <span className="birthdayText">
    <b>Sarah Dane</b> and <b>other friends</b> have a birthday today
  </span>
</div> */}

{/* <img src="/assets/ads/adv.jpg" alt="" className="rightbarAdvert"/> */}

<h3 className="rightbarTitle">Following</h3>

<ul className="rightbarFriendList">
  {/* {Usersonline.map((u) => {
    return(
      <Online key={u.id} onlineUser={u}/>
    )
  })} */}


  {user?.following.map((f) => {
    return (
      <NavLink style={{textDecoration:'none'}} to={`/profile/${f.userId}`}>
        <Following key={f.id} following={f}/>
      </NavLink>
    )
  })}
</ul>
</div>


    </div>
  )
}

export default RightbarHome
