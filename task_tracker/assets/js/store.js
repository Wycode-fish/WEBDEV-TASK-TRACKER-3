import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';
import _ from 'underscore'
/*
 *  state layout:
 *  {
 *   posts: [... Posts ...],
 *   users: [... Users ...],
 *   form: {
 *     user_id: null,
 *     body: "",
 *   }
    login: {
 *
 * }
    register: {

  }
 *
 * */


function editing(state=false, action) {
  switch (action.type) {
    case 'EDITING_TASK':
      return action.editing;
    default:
      return state;
  }
}


 function tasks(state = [], action) {
   // console.log("***** here in tasks: ", action.tasks);
   switch (action.type) {
   case 'TASKS_LIST':
     return [...action.tasks];
   case 'ADD_TASK':
     return [action.tasks, ...state];
   case 'UPDATE_TASK':
     let modified_task = action.data;
     return _.map(state, (tt) => {
       if (tt.id == modified_task.id) {
         let nt = Object.assign({}, modified_task);
         return nt;
       }
       else return tt;
     })
   case 'DROP_TASK':
     let delete_id = action.delete_id;
     return _.filter(state, (tt) =>
         tt.id!=delete_id
       )
   case 'FINISH_TASK':
     let task = action.data;
     return _.map(state, (tt) => {
       if (tt.id == task.id) {
         let nt = Object.assign({}, tt);
         nt['is_finish'] = true;
         nt['end_time'] = task.end_time;
         return nt;
       }
       else return tt;
     })
   default:
     return state;
   }
 }

 function users(state = [], action) {
   switch (action.type) {
   case 'USERS_LIST':
     return [...action.users];
   case 'ADD_USER':
     return [action.users, ...state];
   default:
     return state;
   }
 }

let empty_form = {
  assignee_id: "",
  title: "",
  description: "",
  creator_id: "",
  start_time: 0,
  end_time: 0,
  is_finish: false,
  token: "",
  message: "",
  fid: "",
};

function form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_FORM':
      return empty_form;
    case 'SET_TOKEN':
      return Object.assign({}, state, action.token);
    default:
      return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    case 'DROP_TOKEN':
      return null;
    default:
      return state;
  }
}

let empty_login = {
  email: "",
  password: "",
  message: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

let empty_register = {
  email: "",
  name: "",
  password: "",
  message: "",
};

function register(state = empty_register, action) {
  switch (action.type) {
    case 'UPDATE_REGISTER_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  let reducer = combineReducers({tasks, users, form, token, login, register, editing});
  let state1 = reducer(state0, action);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
