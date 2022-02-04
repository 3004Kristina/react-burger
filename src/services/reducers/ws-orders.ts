import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from '../actions/ws-orders';

import { TWsActions } from '../../types/wsActionTypes/wsAction';
import { TWsInitialState } from '../../types/wsReducersTypes/wsReducer';

const initialState: TWsInitialState = {
  wsConnected: false,
  messages: [],
};

const wsOrdersReducer = (state = initialState, action: TWsActions)
  : TWsInitialState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...initialState,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            ...action.payload,
            timestamp: new Date().getTime() / 1000,
          },
        ],
      };

    default:
      return state;
  }
};

export default wsOrdersReducer;
