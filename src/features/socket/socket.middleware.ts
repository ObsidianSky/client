import {
    SOCKET_CONNECT,
    SOCKET_CONNECTED, SOCKET_DISCONNECTED, SOCKET_MESSAGE,
    socketConnectedAction,
    socketDisconnectAction
} from './socket.actions';
import io from 'socket.io-client';
import { handleSocketMessage } from './socket-message-handler';

const socketMiddleware = () => {
    let socket: any = null;
    const queue: any[] = [];

    const onConnected = store => () => {
        store.dispatch(socketConnectedAction());
    };

    const onDisconnect = store => () => {
        store.dispatch(socketDisconnectAction());
    };

    const onMessage = store => (event, data) => {
        handleSocketMessage(data, store.dispatch);
    };

    // the socket part of this function
    return store => next => action => {
        switch (action.type) {
            case SOCKET_CONNECT:
                socket = io('http://localhost:3002', {
                    query: {
                        userId: action.payload
                    }
                });

                socket.on('message', onMessage(store));
                socket.on('connect', onConnected(store));
                socket.on('disconnect', onDisconnect(store));

                break;
            case SOCKET_CONNECTED:
                while(queue.length) {
                    store.dispatch(queue.shift());
                }

                break;
            case SOCKET_DISCONNECTED:

                console.log('something happened with socket closed');
                break;
            case SOCKET_MESSAGE:
                if (!socket || !socket.connected) {
                    console.log('socket is not open, adding message in the queue...');
                    queue.push(action);
                    break;
                }

                console.log('sending a message', action);

                const wsAction = {
                    type: action.command,
                    payload: action.payload
                };

                // socket.send(JSON.stringify(wsAction));
                socket.send(wsAction);
                break;
            default:
                console.log('the next action:', action);
                return next(action);
        }
    };
};

const wsMiddleware = socketMiddleware();

export default wsMiddleware;