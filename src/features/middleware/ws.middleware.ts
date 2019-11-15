import * as actions from './ws.actions';
import {handleSocketMessage} from "../../socket-message-handler";

const socketMiddleware = () => {
    let socket: any = null;
    const queue: any[] = [];

    const onOpen = store => (event) => {
        console.log('websocket open', event.target.url);
        store.dispatch(actions.wsConnected(event.target.url));
    };

    const onClose = store => () => {
        store.dispatch(actions.wsDisconnected());
    };

    const onMessage = store => (event) => {
        let socketMessage;

        try {
            socketMessage = JSON.parse(event.data);
        } catch {
            console.warn('Can not parse socket message ', event.data);
        }

        socketMessage && handleSocketMessage(socketMessage, store.dispatch);
    };

    // the middleware part of this function
    return store => next => action => {
        switch (action.type) {
            case 'WS_CONNECT':
                if (socket !== null) {
                    socket.close();
                }

                // connect to the remote host
                socket = new WebSocket(action.host);

                // websocket handlers
                socket.onmessage = onMessage(store);
                socket.onclose = onClose(store);
                socket.onopen = onOpen(store);

                break;
            case 'WS_CONNECTED':
                while(queue.length) {
                    store.dispatch(queue.shift());
                }

                break;
            case 'WS_DISCONNECT':
                if (socket !== null) {
                    socket.close();
                }
                socket = null;
                console.log('websocket closed');
                break;
            case 'WS_MESSAGE':
                if (!socket || socket.readyState !== 1) {
                    console.log('socket is not open, adding message in the queue...');
                    queue.push(action);
                    break;
                }

                console.log('sending a message', action);

                const wsAction = {
                    type: action.command,
                    payload: action.payload
                };

                socket.send(JSON.stringify(wsAction));
                break;
            default:
                console.log('the next action:', action);
                return next(action);
        }
    };
};

const wsMiddleware = socketMiddleware();

export default wsMiddleware;