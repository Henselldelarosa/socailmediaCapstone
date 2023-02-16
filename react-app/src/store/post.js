const GET_POSTS = 'post/GET_POSTS'
const GET_POST = 'post/GET_POST'
const DELETE_POST = 'post/DELETE_POST'
const ADD_POST = 'post/ADD_POST'
const UPDATE_POST = 'post/UPDATE_POST'

const gets = (posts) =>({
  type:GET_POSTS,
  posts
})


const get = (post) =>({
  type:GET_POST,
  post
})

const update = (post) =>({
  type: UPDATE_POST,
  post
})

const remove = (postId) =>({
  type:DELETE_POST,
  postId
})

const add = (post) =>({
  type: ADD_POST,
  post
})


export const getAllPosts = () => async(dispatch) => {
       const response = await fetch('/api/posts/')

       if (response.ok) {
        const data = await response.json()

        dispatch(gets(data.posts))
        return data
       }
}


let initialState = {}
const postReducer = (state = initialState, action) => {

   switch(action.type){
      case GET_POSTS:{
      const newState = {...state}
      action.posts.forEach(post => {
        newState[post.id] = post
      })
      return newState

    }
      default:
        return state
   }
}

export default postReducer
