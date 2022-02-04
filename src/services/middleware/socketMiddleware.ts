import type { Middleware, MiddlewareAPI } from 'redux';
import { store } from '../store';

import { TWsActions } from '../../types/wsActionTypes/wsAction';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_START_PROFILE,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from '../actions/ws-orders';
import { getCookie } from '../../utils/cookie';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((middlewareStore: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TWsActions) => {
      const { dispatch } = middlewareStore;
      const { type } = action;
      const accessToken = getCookie('accessToken')?.replace('Bearer ', '');

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(`${wsUrl}/all`);
      }

      if (type === WS_CONNECTION_START_PROFILE) {
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: WS_CONNECTION_SUCCESS });
        };

        socket.onerror = () => {
          dispatch({ type: WS_CONNECTION_ERROR });
        };

        socket.onmessage = (event) => {
          const { data } = event;

          dispatch({ type: WS_GET_MESSAGE, payload: JSON.parse(data) });
        };

        socket.onclose = () => {
          dispatch({ type: WS_CONNECTION_CLOSED });
        };
      }

      next(action);
    };
  }) as Middleware;
};
