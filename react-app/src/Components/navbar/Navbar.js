import React,{useState} from 'react'

import { getTheSearch } from '../../store/search';
import './Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import BasicMenuSignedIn from '../../components/Navigation/HeaderSignedIn/HeaderSigned';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

const Navbar = ({isLoaded}) => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const [searchQuery, setSearchQuery] = useState('')

  const search = (e) => {
    e.preventDefault()
    dispatch(getTheSearch(searchQuery))
    history.push(`/search/user/${searchQuery}`)
    setSearchQuery('')
  }

  let sessionLinks;

  if (user){
    sessionLinks =(
      <div className='navbarContainer'>

      <NavLink to='/' className="navbarLeft" style={{textDecoration:'none'}}>
        <span className="logo">Sagebook</span>
      </NavLink>

      <div className="navbarCenter">

        <div className="searchBar">
          <SearchIcon className='searchIcon'/>
          <input type="text"
           className="searchInput"
           placeholder={`Search for friends ${user?.firstName}`}
           value={searchQuery}
           onChange={ (e) => setSearchQuery(e.target.value)}
           />
           <button hidden className="header_search_button" onClick={search}>hidden</button>
        </div>
      </div>

      <div className="navbarRight">

        <div className="navbarLinks">
          <span className="navbarLink">Profile</span>
          <span className="navbarLink">{user?.firstName}</span>
        </div>

        <div className="navbarIcons">

          <div className="navbarIconItem">
            <HomeIcon/>
          </div>

        </div>

        <BasicMenuSignedIn/>
      </div>
    </div>
    )
  }else{
    sessionLinks = (
      <div>

      </div>
    )
  }

  return (isLoaded, sessionLinks)
}

export default Navbar
