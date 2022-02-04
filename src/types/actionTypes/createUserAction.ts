import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
} from '../../services/actions/create-user';

export interface ICreateUserRequest {
  readonly type: typeof CREATE_USER_REQUEST;
}

export interface ICreateUserSuccess {
  readonly type: typeof CREATE_USER_SUCCESS;
}

export interface ICreateUserFailed {
  readonly type: typeof CREATE_USER_FAILED;
  readonly error: string;
}

export type TCreateUserActions =
  | ICreateUserRequest
  | ICreateUserSuccess
  | ICreateUserFailed;
