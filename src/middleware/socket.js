import io from 'socket.io-client';


 export default store => {
   let socket;


  const connect = (data) => {
     socket = io('http://localhost:3001');
     socket.on('ACTION', action => {
       console.log('RECEIVE ACTION!', action);
       store.dispatch(action);

    });
   }

   const disconnect = data => {
     socket.emit('SOCKET__DISCONNECT', data);
     socket.disconnect();
   }

   const getMessages = data => socket.emit('GET_MESSAGES', data);

   const broadcastMessage = data => socket.emit('NEW_MESSAGE', data);

  connect()


  return next => action => {
    switch(action.type){
      case 'SOCKET__CONNECT':
        console.log('in middleware');
        socket.emit('SOCKET__CONNECT', action.data);
        break;
      case 'GET_MESSAGE':
        console.log('in get Messages');
        connect(action.data)
        break;
    }

    // check if action is interesting to me
    console.log('action-socket', action.socket);
      if (action.socket) {
        socket.emit(action.socket.command, action.socket.data);
      } else next(action);
    }
 }
