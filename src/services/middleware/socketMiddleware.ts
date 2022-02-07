import type { Middleware, MiddlewareAPI } from 'redux';
import { TWsAction, TWsActions } from '../../types/wsActionTypes/wsAction';

import { AppDispatch, RootState } from '../../types';

const socketMiddleware = (wsUrl: string, wsActions: TWsActions): Middleware => {
  return ((middlewareStore: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TWsAction) => {
      const { dispatch } = middlewareStore;
      const { type } = action;
      const {
        wsOpen,
        wsClose,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;

      if (type === wsOpen) {
        socket = new WebSocket(wsUrl);
      }

      if (type === wsClose) {
        socket?.close();
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError });
        };

        socket.onmessage = (event) => {
          const { data } = event;

          dispatch({ type: onMessage, payload: JSON.parse(data) });
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        };
      }

      next(action);
    };
  }) as Middleware;
};

export default socketMiddleware;
