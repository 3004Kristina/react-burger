import { combineReducers } from 'redux';
import ingredientsReducer from './ingredients';
import constructorReducer from './constructor';
import orderReducer from './order';
import ingredientsDetailReducer from './ingredients-detail-modal';
import orderIngredientsDetailReducer from './order-ingredients-detail-modal';
import createUserReducer from './create-user';
import loginUserReducer from './login';
import resetPasswordInitialState from './password-reset';
import updatePasswordReducer from './set-new-password';
import getUserReducer from './get-user-info';
import wsOrdersReducer from './ws-orders';

const rootReducer = combineReducers({
  ingredientsData: ingredientsReducer,
  constructorData: constructorReducer,
  orderData: orderReducer,
  ingredientsDetail: ingredientsDetailReducer,
  orderIngredientsDetail: orderIngredientsDetailReducer,
  createUserData: createUserReducer,
  loginData: loginUserReducer,
  resetPasswordData: resetPasswordInitialState,
  updatePasswordData: updatePasswordReducer,
  getUserData: getUserReducer,
  wsData: wsOrdersReducer,
});

export default rootReducer;
