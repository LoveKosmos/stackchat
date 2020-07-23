import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

//Action TYPE
const GOT_MESSAGES_FROM_SERVER = "GOT_MESSAGES_FROM_SERVER";

//Action Creator
export const gotMessagesFromServer = (messages) => ({
  type: GOT_MESSAGES_FROM_SERVER,
  messages
});

//initial state
let initialState = {
  messages:[]
}

//thunk
const fetchMessages = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/messages')
    dispatch (gotMessagesFromServer(data))
  }
}

//reducer
const reducer = (state = initialState, action) =>{
  switch(action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return {...state, messages: action.messages}
    default:
      return state

  }
}

//store
const store = createStore(reducer, applyMiddleware(thunkMiddleware))
export default store