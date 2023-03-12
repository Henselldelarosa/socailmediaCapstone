const GET_REACTIONS = 'reactions_GET_REACTIONS'
const ADD_REACTION = 'reactions_ADD_REACTION'


const gets = (reactions, id) => (
  {
    type: GET_REACTIONS,
    reactions,
    id
  }
)

export const getAllReactions = (id) => async(dispatch) =>{
  const response = await fetch(`/api/reactions/replies/${id}`)

  if (response.ok){
    const data = await response.json()
    dispatch(gets(data, id))
    return data
  }
}
const add = (reaction) => (
  {
    type: ADD_REACTION,
    reaction
  }
)


let initialState = {}
const reactionReducder = (state = initialState, action) => {
  switch (action.type) {

    case GET_REACTIONS:{
      const newState = {}
      action.reactions.reactions.forEach((reaction) => {
        newState[reaction.id] = reaction
      })
      console.log(action.reactions)
      return newState
    }

    default:
      return state
  }
}

export default reactionReducder
