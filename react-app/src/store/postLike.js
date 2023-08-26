const GET_POST_LIKES = 'postlikes/GET_POST_LIKES'
const ADD_REMOVE_POST_LIKE = 'AddRemovePostLike/ADD_REMOVE_POST_LIKE'


const gets = (postLikes, id) => (
  {
    type: GET_POST_LIKES,
    postLikes,
    id
  }
)

const addRemovePost = (postLike, id) => (
  {
    type:ADD_REMOVE_POST_LIKE,
    postLike,
    id
  }
)

export const getAllPostLikes = (id) => async(dispatch) =>{
  const response = await fetch(`/api/post_likes/${id}`)

  if (response.ok){
    const data = await response.json()
    dispatch(gets(data, id))
    return data
  }
}

export const addRemoveThePostLike = (id, userId) => async(dispatch) =>{
   const response = await fetch(`/api/post_likes/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },

    body:JSON.stringify({
      post_id:id,
      user_id:userId
    })
   })

   if(response.ok){
    const data = await response.json()
    dispatch(addRemovePost(data, id))
    return data
   }
}

let initialState = {}

const postLikeReducer = (state = initialState, action) => {
  switch (action.type){

    case GET_POST_LIKES: {
      const newState = {}
      action.postLikes.postLikes.forEach((like) => {
        newState[like.post_id] = like
      })
      return newState
    }

    case ADD_REMOVE_POST_LIKE:{
      const newState = {...state}
      if(newState[action.postLike.post_id]){
        delete newState[action.postLike.post_id]

      }else{
        newState[action.postLike.post_id] = action.postLike
      }
      return newState
    }

    default:
      return state
  }
}
 export default postLikeReducer
