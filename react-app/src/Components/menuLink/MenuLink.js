import React from 'react'
import './MenuLink.css'
import { useSelector } from 'react-redux'

const MenuLink = ({Icon, text}) => {
  const user = useSelector(state => state.session.user)
  return (
    <div className='menuLink'>
      {Icon}
      <span className="menuLinkText">{text}</span>
      <span className="menuLinkTextName">{text==='Logout' && `${user?.firstName}`}</span>
    </div>
  )
}

export default MenuLink
