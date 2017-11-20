import io from 'socket.io-client';
import socketIOWildcard from 'socketio-wildcard';


export default store => {
  let socket;

  const connect = data => {
    socket = io('http://localhost:3001');
    socketIOWildcard(io.Manager)(socket);
    socket.emit('SOCKET__CONNECT', data);
    socket.on('ACTION', action => {
      store.dispatch(action);
    })
  }

  const disconnect = data => {
    socket.emit('SOCKET__DISCONNECT', data);
    socket.disconnect();
  }


}
