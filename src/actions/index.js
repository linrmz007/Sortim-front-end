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

export const sendMessage = (msg) => ({
  type: 'SEND_MESSAGE',
  socket: {
    command: 'SEND_MESSAGE',
    data: {
      msg
    }
  }
});
