import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import './Navigation.css';
import BasicMenuSignedIn from './HeaderSignedIn/HeaderSigned';

// thunk
import {
  userSearches,
  deleteASearch,
  deleteSearchHistory,
  get,
  getTheSearch
} from '../../store/search';

// icon
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';

function Navigation({isLoaded}) {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks;

  const [searchQuery, setSearchQuery] = useState('')

  const search = (e) => {
    e.preventDefault()
    dispatch(getTheSearch(searchQuery))
		// console.log(searchQuery)
		history.push(`/searches/users/${searchQuery}`)
    setSearchQuery('')
  }

  if (sessionUser) {
    sessionLinks = (
      <div className='header'>
        <div className='header_left'>

          <NavLink className='link' to='/'>
            <h1 className='logo'>Sagebook</h1>
          </NavLink>

          <div className='header_input'>
            <SearchIcon/>
            <input type='search' name='q'
              value={searchQuery}
              onChange={
                (e) => setSearchQuery(e.target.value)
              }
							placeholder='Search for other users...'
							/>
							<button className='header_search_button' onClick={search}>Search</button>
          </div>
        </div>


        <div className='header_center'>

          <div title='Home' className='header_icons_home'>
            <NavLink className='header_link' to='/'>
              <HomeIcon fontSize='large'/>
            </NavLink>
          </div>

        </div>

        <div className='header_right'>
          <div className='header_info'>
            <h3>{
              sessionUser.firstName
            }
              {
              sessionUser.lastName
            }</h3>
            <BasicMenuSignedIn/>
          </div>
        </div>
      </div>
    )
  } else {
    sessionLinks = (

      <div className='header'></div>
    )
  }


  return(isLoaded, sessionLinks)

}

export default Navigation;
