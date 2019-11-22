import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { createRootReducer } from "./rootReducer";
import { composeWithDevTools } from 'redux-devtools-extension'
import wsMiddleware from "./features/socket/socket.middleware";
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga';

export const history = createBrowserHistory();

export default function configureStore(preloadedState?) {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [
        wsMiddleware,
        sagaMiddleware,
        routerMiddleware(history)
    ];

    const store = createStore(
        createRootReducer(history),
        preloadedState,
        composeWithDevTools(
            applyMiddleware(...middlewares)
        )
    );


    sagaMiddleware.run(rootSaga);

    return store
}