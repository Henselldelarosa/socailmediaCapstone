import React from 'react'
import './MenuLink.css'
import { useSelector } from 'react-redux'

const MenuLink = ({Icon, text}) => {
  const sessionUser = useSelector(state => state.session.user)
  return (
    <div className='menuLink'>
      {Icon}
      <span style={{color:'black'}} className="menuLinkText">{text}</span>
      <span className="menuLinkTextName">{text==='Logout' && `${sessionUser?.firstName}`}</span>
    </div>
  )
}

export default MenuLink
