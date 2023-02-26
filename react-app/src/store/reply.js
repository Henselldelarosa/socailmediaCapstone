const GET_REPLIES = 'reply/GET_REPLIES'
const ADD_REPLY = 'reply/ADD_REPLY'
// const DELETE_REPLY = 'reply/DELETE_REPLY'
// const UPDATE_REPLY = 'reply/UPDATE_REPLY'


const gets = (replies,id) =>({
  type:GET_REPLIES,
  replies,
  id
})


const addReply = (reply,postId) =>({
  type:ADD_REPLY,
  reply,
  postId
})


// const removeReply = () =>({
//   type:DELETE_REPLY
// })


// const updateReply = () =>({
//   type:UPDATE_REPLY
// })


export const getAllReplies= (id) => async(dispatch) =>{
  const response = await fetch(`/api/replies/posts/${id}`)

  if(response.ok){
    const data = await response.json()
    dispatch(gets(data, id))
    return data
  }
}



export const addAReply= (postId,replyData,user) => async(dispatch) =>{
  // const {reply, replyUrl} = replyData
  const response = await fetch(`/api/replies/posts/${postId}`, {
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(replyData)
  })

  if (response.ok){
    const data = await response.json()
    // data['replyUrl'] = replyUrl
    dispatch(addReply(data, postId))
    return data
  }
}



// export const deleteReplies= () => async(dispatch) =>{
//   const response = null
// }



// export const updateReplies = () => async(dispatch) =>{
//   const response = null
// }





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

    case ADD_REPLY:{
      return{
        ...state,
        [action.reply.id] : action.reply
      }
    }
    default:
      return state
  }
}

export default replyReducer
