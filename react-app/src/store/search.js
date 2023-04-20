const GET_SEARCHES = 'search/GET_SEARCHES'
const GET_USER_SEARCHES = 'search/GET_USER_SEARCHES'
const DELETE_SEARCHES_HISTORY = 'search/DELETE_SEARCHES_HISTORY'
const DELETE_SEARCH = 'search/DELETE_SEARCH'

const getSearch = (searches) => {
  return {
    type: GET_SEARCHES,
    searches
  }
}

const userSearch = (userId) => {
  return {
    type:GET_USER_SEARCHES,
    userId
  }
}

const deleteSearch = (id) => {
  return {
    type: DELETE_SEARCH,
    id
  }
}

const deleteHistory = () => {
  return {
    type: DELETE_SEARCHES_HISTORY
  }
}

export const getTheSearch = (searchQuery) => async (dispatch) =>{
  const response = await fetch(`/api/searches/users/${searchQuery}`)
  if (response.ok){
    const data = await response.json()
    dispatch(getSearch(data))
    return data
  }else{
    const data = await response.json()
    console.log(data)
  }
}

export const userSearches = (userId) => async (dispatch) => {
  const response = await fetch(`/api/searches/${userId}`)
  if (response.ok){
    const data = response.json()
    dispatch(userSearch)
    return data
  }
}

export const deleteSearchHistory = () => async (dispatch) => {
  const response = await fetch('/api/searches', {
    method:'DELETE',
  })
  const data = await response.json()
  dispatch(deleteHistory)
  if (response.ok){
    return data
  }
}

export const deleteASearch = (id) => async (dispatch) => {
  const response = await fetch(`/api/searches/${id}`, {
    method:'DELETE'
  })
  if(response.ok){
    const data = response.json()
    dispatch(deleteSearch(id))
    return data
  }
}
const initialState = {}
const searchReducer = (state = initialState, action ) => {
  switch (action.type) {
    case GET_SEARCHES:{

      const newState = action.searches
      newState.search.forEach((search) => {
        newState[search.id] = search.firstName
      })
      console.log(newState.search)
      return newState.search

    }
    case GET_USER_SEARCHES:{

      const newState = {...state}
      newState.searches = action.searches
      return newState

    }

    case DELETE_SEARCHES_HISTORY:{

      const newState = {...state}
      delete newState[action.searches]
      return newState
    }

    case DELETE_SEARCH:{

      const newState = {...state}
      delete state[action.id]
      return newState

    }
    default:
      return state
  }

}

export default searchReducer
