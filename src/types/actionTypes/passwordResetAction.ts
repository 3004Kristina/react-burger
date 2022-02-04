import {
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
} from '../../services/actions/password-reset';

export interface IPasswordResetRequest {
  readonly type: typeof PASSWORD_RESET_REQUEST;
}

export interface IPasswordResetSuccess {
  readonly type: typeof PASSWORD_RESET_SUCCESS;
}

export interface IPasswordResetFailed {
  readonly type: typeof PASSWORD_RESET_FAILED;
  readonly error: string;
}

export type TPasswordReset =
  | IPasswordResetRequest
  | IPasswordResetSuccess
  | IPasswordResetFailed;
