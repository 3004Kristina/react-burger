import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  RESET_ORDER_FAILED,

  RESET_ORDER,
} from '../../services/actions/order';

export interface IPostOrderRequest {
  readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderSuccess {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly orderNumber: number;
}

export interface IPostOrderFailed {
  readonly type: typeof POST_ORDER_FAILED;
  readonly error: string | null;
}

export interface IResetOrderFailed {
  readonly type: typeof RESET_ORDER_FAILED;
}

export interface IResetOrder {
  readonly type: typeof RESET_ORDER;
}

export type TOrderAction =
  | IPostOrderRequest
  | IPostOrderSuccess
  | IPostOrderFailed
  | IResetOrderFailed
  | IResetOrder;
