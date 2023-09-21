import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom/cjs/react-router-dom'
import {getTheSearch} from '../../store/search'
import SingleUser from '../../Components/user/SingleUser'
import Sidebar from '../../Components/sidebar/Sidebar'
import './Search.scss'
import Rightbar from '../../Components/rightbar/Rightbar'
import UserSearchCard from '../../Components/userSerach/UserSearchCard'

const Search = () => {
  const sessionUser = useSelector(state => state.session.user)
      return (
        <div className="search">
          <div className="searchContainer">
            <Sidebar sessionUser={sessionUser}/>
            <UserSearchCard/>
            <Rightbar/>
          </div>
        </div>
      )
}


export default Search
