export const addAuth = (authObj) => ({
  type: 'ADD_AUTH',
  authObj
})

export const logOut = () => ({
  type: 'LOG_OUT'
})

export const addEvents = (events) => ({
  type: 'ADD_EVENTS',
  events
})

export const addOtherUsers = (otherUsers) => ({
  type: 'ADD_OTHER_USERS',
  otherUsers
})

export const getUsersList = (data) => ({
  type: 'All_USERS',
  data
})

export const socketConnect = (data) => ({
  type: 'SOCKET__CONNECT',
  data
})

export const messageReceived = (data) => ({
  type: 'MESSAGE_RECEIVED',
  data
})


export const sendMessage = (room, msg) => ({
   type: 'SEND_MESSAGE',
   socket: {
     command: 'SEND_MESSAGE',
     data: {
       room,
       msg
     }
   }
 });

 export const getMessage = (msg) => ({
    type: 'GET_MESSAGE',
    socket: {
      command: 'GET_MESSAGE',
      data: {
        msg
      }
    }
  });
