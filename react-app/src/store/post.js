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

const remove = (id,replyId) =>({
  type:DELETE_POST,
  id,
  replyId
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

export const getPostById =(id) => async(dispatch) =>{
  const response = await fetch(`/api/posts/${id}`)

  if(response.ok){
    const data = await response.json()
    dispatch(get(data))
    return data
  }

}

export const addPost = (postData) => async(dispatch)=>{
  const {post, postUrl, userId} = postData
  const response = await fetch(`/api/posts/`, {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      post,
      postUrl
    })
  })

  const data = await response.json()
  console.log(data)
  if(response.ok){
    data['postUrl'] = postUrl
    dispatch(add(post))
    return data

  }else{
    return data
  }
}

export const deletePost = (id, replyId) => async(dispatch) => {
    const response = await fetch(`/api/posts/${id}`, {
      method:'delete'
    })
    if(response.ok){
      const data = await response.json()
      dispatch(remove(id, replyId))
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

      case GET_POST:{
        return {
          ...state,
          [action.post.id] : action.post
        }
      }

      case ADD_POST:{
        return{
          ...state,
          [action.post.id] : action.post
        }
      }
      case DELETE_POST:{
        const newState = {...state}
        delete newState[action.id]
        return newState
      }
      default:
        return state
   }
}

export default postReducer
