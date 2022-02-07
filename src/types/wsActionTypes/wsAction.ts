import {
  WS_CONNECTION_CLOSE_ALL, WS_CONNECTION_CLOSE_PROFILE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_OPEN_ALL,
  WS_CONNECTION_OPEN_PROFILE,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from '../../services/actions/ws-orders';
import IWsMessage from '../WsMessage';

export interface IWsConnectionOpenAll {
  readonly type: typeof WS_CONNECTION_OPEN_ALL;
}

export interface IWsConnectionOpenProfile {
  readonly type: typeof WS_CONNECTION_OPEN_PROFILE;
}

export interface IWsConnectionCloseAll {
  readonly type: typeof WS_CONNECTION_CLOSE_ALL;
}

export interface IWsConnectionCloseProfile {
  readonly type: typeof WS_CONNECTION_CLOSE_PROFILE;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IWsMessage;
}

export interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
}

export type TWsActions = {
  wsOpen: typeof WS_CONNECTION_OPEN_ALL | typeof WS_CONNECTION_OPEN_PROFILE;
  wsClose: typeof WS_CONNECTION_CLOSE_ALL | typeof WS_CONNECTION_CLOSE_PROFILE;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_MESSAGE;
}

export type TWsAction =
  | IWsConnectionOpenAll
  | IWsConnectionOpenProfile
  | IWsConnectionCloseAll
  | IWsConnectionCloseProfile
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetMessage
  | IWsSendMessage;
