import { combineReducers } from 'redux'

 const authDefaultState = {
   authObj: null
 };


 const authReducer = (state = authDefaultState, action) => {
   switch (action.type) {
     case 'ADD_AUTH':
       return {
         ...state,
         authObj: action.authObj
       }
     case 'LOG_OUT':
       return authDefaultState
     default:
       return state;
   }
 };

 const objectifyArray = (array, idKey = 'id') => {
   return array.reduce((accum, item) => {
     accum[item[idKey]] = item

     return accum;
   }, {})
 };

  const entitiesDefaultState = {
   events: {},
   otherUsers: [],
   date: new Date(),
   messages: [],
  };


  const entitiesReducer = (state = entitiesDefaultState, action) => {
    switch (action.type) {
     case 'SET_NEW_DATE':
       return {
         ...state,
         date: action.data.time
       }
     case 'SEND_MESSAGE':
     console.log(23);
     // console.log('sent action', action)
       return {
         ...state,
         messages: [...state.messages, action.socket.data]
       }
     case 'MESSAGE_RECEIVED':
     console.log('received action', action);
       return {
         ...state,
         messages: [...state.messages, action.data]
       }
      case 'ADD_EVENTS':
        return {
          ...state,
         events: objectifyArray(action.events)
       }
     case 'LOG_OUT':
       return entitiesDefaultState
     case 'ADD_OTHER_USERS':
       return {
         ...state,
         otherUsers: action.otherUsers
       }
     default:
       return state;
   }
 };

 const reducer = combineReducers({
   auth: authReducer,
   entities: entitiesReducer,
 });

 export default reducer;
