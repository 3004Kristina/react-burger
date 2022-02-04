import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import socketMiddleware from './middleware/socketMiddleware';
import { getCookie } from '../utils/cookie';
import { TWsActions } from '../types/wsActionTypes/wsAction';
import {
  WS_CONNECTION_OPEN_PROFILE,
  WS_CONNECTION_OPEN_ALL,
  WS_CONNECTION_CLOSE_PROFILE,
  WS_CONNECTION_CLOSE_ALL,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
} from './actions/ws-orders';

const wsActionsProfileOrders: TWsActions = {
  wsOpen: WS_CONNECTION_OPEN_PROFILE,
  wsClose: WS_CONNECTION_CLOSE_PROFILE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const wsActionsAllOrders: TWsActions = {
  wsOpen: WS_CONNECTION_OPEN_ALL,
  wsClose: WS_CONNECTION_CLOSE_ALL,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const accessToken = getCookie('accessToken')?.replace('Bearer ', '');

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware('wss://norma.nomoreparties.space/orders/all', wsActionsAllOrders),
    socketMiddleware(`wss://norma.nomoreparties.space/orders?token=${accessToken}`, wsActionsProfileOrders),
  ),
);

export const store = createStore(rootReducer, enhancer);
