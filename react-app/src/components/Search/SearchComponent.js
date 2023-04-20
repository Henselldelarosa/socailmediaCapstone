import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTheSearch } from '../../store/search'

// component
import { getTheUsers } from '../../store/user'
import IndividualUser from '../User/IndividualUser'

import './SearchComponent.css'
function SearchComponent() {
  const {searchQuery} = useParams()
  const allSearches = useSelector(state => Object.values(state.searches))
  const userSearches = allSearches.map((search) => {
    return search
  })

  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(getTheSearch(searchQuery)).then(() =>{})
  },[dispatch, searchQuery])

  let content = null
  if(allSearches.length){
    content =(
      allSearches && allSearches.map((search,id) =>{
        return (

          <center>
        <div key={search.id}>
          <IndividualUser
          userUrl={search.userUrl}
          firstName={search.firstName}
          lastName={search.lastName}
          email={search.email}/>
        </div>
          </center>
        )
      })
    )
  }
  else{
    content = (
      <div>
        <h1 className='no_user'>User Not Found</h1>
      </div>
    )
  }
  return content
}

export default SearchComponent
