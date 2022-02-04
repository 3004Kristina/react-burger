import { TUser } from '../User';

export type TGetInitialState = {
  getUserFailed: boolean;
  getUserRequest: boolean;
  user: TUser | null;
  userIsChecked: boolean;

  updateUserFailed: boolean;
  updateUserRequest: boolean;
  error?: string | null;
};
