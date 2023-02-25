const GET_REPLIES = 'reply/GET_REPLIES'
// const ADD_REPLY = 'reply/ADD_REPLY'
// const DELETE_REPLY = 'reply/DELETE_REPLY'
// const UPDATE_REPLY = 'reply/UPDATE_REPLY'


const gets = (replies,id) =>({
  type:GET_REPLIES,
  replies,
  id
})


// const addReply = () =>({
//   type:ADD_REPLY
// })


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
    dispatch(gets(data))
    // return data
  }
}



// export const addAReplies= () => async(dispatch) =>{
//   const response = null
// }



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
      const newState = {...state}
      action.replies.replies.forEach((reply) => {
        newState[reply.id] = reply
      })
      return newState
    }
    default:
      return state
  }
}

export default replyReducer
