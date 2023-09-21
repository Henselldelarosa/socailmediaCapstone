import React, { useEffect } from 'react'
import './UserSearchCard.scss'
import { useDispatch, useSelector } from 'react-redux'
import SingleUser from '../user/SingleUser'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import searchReducer, { getTheSearch } from '../../store/search'

const UserSearchCard = () => {
  const dispatch = useDispatch()
  const {searchQuery} = useParams()
  const sessionUser = useSelector(state => state.session.user)
  const allSearches = useSelector(state => Object.values(state.searches))

  useEffect(() => {
    dispatch(getTheSearch(searchQuery))
  },[dispatch, searchQuery])


  let content = null
  if (allSearches.length) {
    content = (
      <div className='userSearchCard'>
        <div className="userSearchCard__wrapper">
          {allSearches && allSearches.map((search, id) => {
            return (
              <div key={search.id}>
                <SingleUser
                  id={search?.id}
                  userUrl={search?.userUrl}
                  firstName={search?.firstName}
                  lastName={search?.lastName}
                  email={search?.email}
                  address={search?.address}
                  country={search?.country}
                  followers={search?.followers}
                  following={search?.following}
                  phoneNumber={search?.phone_number}
                  relationship={search?.relationship}

                />
              </div>
            )
          })}
      </div>
    </div>
    )

  }else content = (
    <div className='userSearchCard'>
    <div className="userSearchCard__wrapper">
      <center>
      <h5 className='noUserFound'>
        No User Found
      </h5>
        </center>
    </div>
  </div>
  )
  return content
}

export default UserSearchCard

{/* <div key={
  search.id
}>
  <SingleUser userUrl={
      search ?. userUrl
    }
    firstName={
      search ?. firstName
    }
    lastName={
      search ?. lastName
    }
    email={
      search ?. email
    }
    address={
      search ?. address
    }
    country={
      search ?. country
    }
    followers={
      search ?. followers
    }
    following={
      search ?. following
    }
    phoneNumber={
      search ?. phoneNumber
    }
    relationship={
      search ?. relationship
    }/>
</div> */}
