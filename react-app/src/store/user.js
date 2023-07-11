const GET_USERS = "users/GET_USERS";
const GET_USER = "users/GET_USER";
const EDIT_USER = 'users/EDIT_USER'

const gets = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

const edit = (user) =>({
  type: EDIT_USER,
  user
})

const get = (user) => {
  return {
    type: GET_USERS,
    user
  };
};

export const getTheUsers = () => async (dispatch) => {
  const response = await fetch("/api/users/");

  if (response.ok) {
    const data = await response.json();
    dispatch(gets(data.users));
    return data;
  }
};

export const getTheUser = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(get(data));
    return data;
  }
};

export const editUser = (data) => async (dispatch) => {
  const response = await fetch(`/api/users/${data.id}`, {
    method:'put',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if(response.ok){
    const user = await response.json()
    dispatch(edit(user))
    return user
  }
}

let initialState = {};
const usersReducer = (state = initialState, action) => {
  // let newState;
  switch (action.type) {
    case GET_USERS:{
      const newState = {}
      action.users.forEach(user => {
        newState[user.id] = user
      })
      return newState;

    }

    case EDIT_USER:{
      return{
        ...state,
        [action.user.id] : action.user
      }
    }

    case GET_USER:{
      return {
        ...state,
        [action.user.id] : action.user
      }
    }


    default:
      return state;
  }
};

export default usersReducer;
