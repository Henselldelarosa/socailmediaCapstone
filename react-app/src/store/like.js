const GET_LIKES = 'like/GET_LIKE'

const addRemoveReplyLike = (id, like) => {
  return {
    type: GET_LIKES,
    id,
    like
  }
}

export const addRemoveTheReplyLike = (id) => async (dispatch) => {
  const response = fetch(`/api/likes/replies/${id}`)
  console.log(id)
  if(response.ok){
    const data = await response.json()
    dispatch(addRemoveReplyLike(data, id))
    return data
  }
}


let initialState = {}

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET_LIKES:{
    //   const newState = {}
    //   action.likes.like.forEach((like) =>{
    //     newState[like.id] = like
    //   })
    //   return newState
    // }

    case GET_LIKES:{
      return {

        [action.like.id] : action.like
      }
    }

    default:
      return state
  }
}

export default likeReducer
