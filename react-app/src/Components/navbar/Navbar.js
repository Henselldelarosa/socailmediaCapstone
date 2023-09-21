import React,{useState} from 'react'

import { getTheSearch } from '../../store/search';
import './Navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import BasicMenuSignedIn from '../../components/Navigation/HeaderSignedIn/HeaderSigned';
import { NavLink, Link } from 'react-router-dom/cjs/react-router-dom.min'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Navbar = ({isLoaded}) => {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const [searchQuery, setSearchQuery] = useState('')

  const search = (e) => {
    e.preventDefault()
    dispatch(getTheSearch(searchQuery))
    history.push(`/searches/users/${searchQuery}`)
    setSearchQuery('')
  }

  let sessionLinks;

  if (sessionUser){
    sessionLinks =(
      <div className='navbarContainer'>

      <NavLink to='/' className="navbarLeft" style={{textDecoration:'none'}}>
        <span className="logo">Sagebook</span>
      </NavLink>

      <div className="navbarCenter">

        <form onSubmit={search} className="searchBar">
          <SearchIcon className='searchIcon'/>
          <input type="text"
           className="searchInput"
           placeholder={`Search for friends ${sessionUser?.firstName}`}
           value={searchQuery}
           onChange={ (e) => setSearchQuery(e.target.value)}
           />
           <button type='submit' hidden className="header_search_button">hidden</button>
        </form>
      </div>

      <div className="navbarRight">

        <div className="navbarLinks">

          <span title='Linkedin' className="navbarLink">
          <a
          className='link'
          target='to_blank'
          href='https://www.linkedin.com/in/hensell-delarosa/'>
            <LinkedInIcon className='linkedinLink'/>
          </a>
          </span>

          <span title='Github' className="navbarLink">
            <a
            className='link'
            target='to_blank'
            href='https://github.com/Henselldelarosa'>
              <GitHubIcon className='githubLink'/>
              </a>
            </span>
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
