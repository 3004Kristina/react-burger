import IIngredientItem from './IngredientsItem';
import { TUser } from './User';

export type TApiRequestRegisterNewUser = {
  email: string;
  password: string;
  name: string;
};

export type TApiResponseRegisterNewUser = {
  success: boolean;
  refreshToken?: string;
  accessToken?: string;
};

export type TApiRequestLogin = {
  email: string;
  password: string;
};

export type TApiResponseLogin = {
  success: boolean;
  message?: string;
  refreshToken?: string;
  accessToken?: string;
  user: TUser;
};

export type TApiResponseIngredients = {
  success: boolean;
  message?: string;
  data: Array<IIngredientItem>
};

export type TApiRequestPasswordReset = {
  email: string;
};

export type TApiResponsePasswordReset = {
  success: boolean;
  message?: string;
};

export type TApiRequestUpdatePassword = {
  password: string;
  token: string;
};

export type TApiResponseUpdatePassword = {
  success: boolean;
  message?: string;
};

export type TApiResponseGetUserData = {
  success: boolean;
  message?: string;
  refreshToken?: string;
  accessToken?: string;
  user: TUser;
};

export type TApiRequestUpdateUserData = {
  email: string;
  name: string;
};

export type TApiResponseUpdateUserData = {
  success: boolean;
  message?: string;
  user: TUser;
};

export type TApiResponseLogout = {

};

export type TApiResponseRefreshToken = {
  success: boolean;
  refreshToken?: string;
  accessToken?: string;
  user: TUser;
};
