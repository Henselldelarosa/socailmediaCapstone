import React from 'react'

import {useSelector} from 'react-redux'

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

<span className="rightbarTitle">Following</span>

<ul className="rightbarFriendList">
  {/* {Usersonline.map((u) => {
    return(
      <Online key={u.id} onlineUser={u}/>
    )
  })} */}


  {user?.following.map((f) => {
    return (
      <Following key={f.id} following={f}/>
    )
  })}
</ul>
</div>


    </div>
  )
}

export default RightbarHome
