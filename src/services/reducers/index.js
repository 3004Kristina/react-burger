import {combineReducers} from 'redux';
import {ingredientsReducer} from './ingredients';
import {constructorReducer} from './constructor';
import {orderReducer} from './order';
import {ingredientsDetailReducer} from './ingredients-detail-modal';


export const rootReducer = combineReducers({
    ingredientsData: ingredientsReducer,
    constructorData: constructorReducer,
    orderData: orderReducer,
    ingredientsDetail: ingredientsDetailReducer
});