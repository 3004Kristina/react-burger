import { combineReducers } from 'redux';
import ingredientsReducer from './ingredients';
import constructorReducer from './constructor';
import orderReducer from './order';
import ingredientsDetailReducer from './ingredients-detail-modal';
import createUserReducer from './create-user';
import loginUserReducer from './login';
import emailCheckReducer from './password-reset';
import updatePasswordReducer from './set-new-password';
import getUserReducer from './get-user-info';

const rootReducer = combineReducers({
  ingredientsData: ingredientsReducer,
  constructorData: constructorReducer,
  orderData: orderReducer,
  ingredientsDetail: ingredientsDetailReducer,
  createUserData: createUserReducer,
  loginData: loginUserReducer,
  emailCheckData: emailCheckReducer,
  updatePasswordData: updatePasswordReducer,
  getUserData: getUserReducer,
});

export default rootReducer;
