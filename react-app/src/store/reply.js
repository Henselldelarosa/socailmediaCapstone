const GET_REPLIES = 'reply/GET_REPLIES'
const ADD_REPLY = 'reply/ADD_REPLY'
const DELETE_REPLY = 'reply/DELETE_REPLY'
const UPDATE_REPLY = 'reply/UPDATE_REPLY'


const gets = (replies,id) =>({
  type:GET_REPLIES,
  replies,
  id
})


const addReply = (reply) =>({
  type:ADD_REPLY,
  reply
})


const removeReply = (id) =>({
  type:DELETE_REPLY,
  id
})


const update = (reply, id, postId) =>({
  type:UPDATE_REPLY,
  reply,
  id,
  postId
})


export const getAllReplies= (id) => async(dispatch) =>{
  const response = await fetch(`/api/replies/posts/${id}`)

  if(response.ok){
    const data = await response.json()
    dispatch(gets(data, id))
    return data
  }
}



export const addAReply = (reply) => async(dispatch) =>{
  const response = await fetch(`/api/replies/posts/${reply.postId}`, {
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reply)
  })


  if (response.ok){
    const data = await response.json()
    dispatch(addReply(data))
    console.log(data)
    return data
  }
}



export const deleteReplies= (id) => async(dispatch) =>{
  const response = await fetch(`/api/replies/posts/${id}`, {
    method:'DELETE'
  })

  if(response.ok){
    const data = await response.json()
    dispatch(removeReply(id))
    return data
  }
}



export const updateReplies = (replyData, id, postId) => async(dispatch) =>{
  const response = await fetch(`/api/replies/${id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(replyData)
  })

  if (response.ok){
    const data = await response.json()
    dispatch(update(data, id, postId))
    return data
  }
}





let initialState ={}
const replyReducer = (state = initialState, action) => {
  switch(action.type){

    case GET_REPLIES:{
      const newState = {}
      action.replies.replies.forEach((reply) => {
        newState[reply.id] = reply
      })
      return newState
    }

    case UPDATE_REPLY:{
      console.log(action)
      const newState = {...state}
      newState[action.id].reply = action.reply
      return newState
    }
    case ADD_REPLY:{
      return{
        ...state,
        [action.reply.id] : action.reply
      }

    }

    case DELETE_REPLY:{
      const newState ={...state}
      delete newState[action.id]
      return newState
    }
    default:
      return state
  }
}

export default replyReducer
