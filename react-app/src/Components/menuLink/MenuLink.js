import React,{useContext} from 'react'
import './MenuLink.scss'
import { DarkModeContext } from '../../context/darkMode/darkModeContext'
import { useSelector } from 'react-redux'

const MenuLink = ({Icon, text}) => {
  const {darkMode} = useContext(DarkModeContext)
  const sessionUser = useSelector(state => state.session.user)
  return (
    <div className='menuLink'>
      {Icon}
      <span className={darkMode ? 'menuLinkText dark' : 'menuLinkText'}>{text}</span>
      <span className={darkMode ? "menuLinkTextName dark" : 'menuLinkTextName'}>{text==='Logout' && `${sessionUser?.firstName}`}</span>
    </div>
  )
}

export default MenuLink
