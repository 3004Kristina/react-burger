import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../services/store';
import { TSetNewPasswordActions } from './actionTypes/setNewPasswordAction';
import { TConstructorActions } from './actionTypes/constructorAction';
import { TCreateUserActions } from './actionTypes/createUserAction';
import { TGetUserActions } from './actionTypes/getUserInfoAction';
import { TIngredientsActions } from './actionTypes/ingredientsAction';
import { TIngredientsDetail } from './actionTypes/ingredientsDetailModalAction';
import { TLoginUser } from './actionTypes/loginAction';
import { TOrderAction } from './actionTypes/orderAction';
import { TPasswordReset } from './actionTypes/passwordResetAction';

type TApplicationActions =
  | TSetNewPasswordActions
  | TConstructorActions
  | TCreateUserActions
  | TGetUserActions
  | TIngredientsActions
  | TIngredientsDetail
  | TLoginUser
  | TOrderAction
  | TPasswordReset;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
  >;
