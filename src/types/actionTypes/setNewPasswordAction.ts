import {
  SET_NEW_PASSWORD_REQUEST,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_FAILED,
} from '../../services/actions/set-new-password';

export interface ISetNewPasswordRequest {
  readonly type: typeof SET_NEW_PASSWORD_REQUEST;
}

export interface ISetNewPasswordSuccess {
  readonly type: typeof SET_NEW_PASSWORD_SUCCESS;
}

export interface ISetNewPasswordFailed {
  readonly type: typeof SET_NEW_PASSWORD_FAILED;
  readonly error: string;
}

export type TSetNewPasswordActions =
  | ISetNewPasswordRequest
  | ISetNewPasswordSuccess
  | ISetNewPasswordFailed;
