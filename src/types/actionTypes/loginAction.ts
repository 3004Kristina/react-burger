import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
} from '../../services/actions/login';

export interface ILoginUserRequest {
  readonly type: typeof LOGIN_USER_REQUEST;
}

export interface ILoginUserSuccess {
  readonly type: typeof LOGIN_USER_SUCCESS;
}

export interface ILoginUserFailed {
  readonly type: typeof LOGIN_USER_FAILED;
  readonly error?: string;
}

export type TLoginUser =
  | ILoginUserRequest
  | ILoginUserSuccess
  | ILoginUserFailed;
