const GET_LIKES = 'like/GET_LIKE'
const ADD_REMOVE_LIKE = 'reactions/ADD_REMOVE_LIKE'

const gets = (likes, id) => (
  {
    type: GET_LIKES,
    likes,
    id
  }
)

const addRemove = (like,id) => (
  {
    type:ADD_REMOVE_LIKE,
    like,
    id
  }
  )


  export const getAllLikes = (id) => async(dispatch) =>{
    const response = await fetch(`/api/likes/replies/${id}`)

    if (response.ok){
      const data = await response.json()
      dispatch(gets(data, id))
      return data
    }
  }
  export const addRemoveTheReplyLike = (id, userId) => async(dispatch) => {
    console.log(id)
    const response = await fetch(`/api/likes/replies/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body:JSON.stringify({
        replyId:id,
        userId:userId
      })
    })
    if (response.ok){
      const data = await response.json()
      dispatch(addRemove(data,id))
      return data;
    }
  }


let initialState = {}

const likeReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_LIKES:{
      const newState = {}
      action.likes.likes.forEach((like) => {
        newState[like.id] = like
      })
      return newState
    }

    case ADD_REMOVE_LIKE:{
      return{
        [action.like.id]: action.like
      }
    }

    default:
      return state
  }
}

export default likeReducer
