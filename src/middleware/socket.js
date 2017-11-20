import io from 'socket.io-client';
import socketIOWildcard from 'socketio-wildcard';


export default store => {
  let socket;

  const connect = () => {
    socket = io('http://localhost:3001');
    socket.on('ACTION', action => {
      // console.log('RECEIVE ACTION!', action);
      store.dispatch(action);
    });
  }

  const disconnect = data => {
    socket.emit('SOCKET__DISCONNECT', data);
    socket.disconnect();
  }

  connect()

  return next => action => {
    // check if action is interesting to me
    if (action.socket) {
      socket.emit(action.socket.command, action.socket.data);
    } else next(action);
  }

}
