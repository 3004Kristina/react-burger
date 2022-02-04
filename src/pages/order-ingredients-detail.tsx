import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import stylesIngredients from './ingredients.module.css';
import OrderIngredientsDetails
  from '../components/order-ingredients-details/order-ingredients-details';
import {
  WS_CONNECTION_CLOSE_ALL,
  WS_CONNECTION_CLOSE_PROFILE,
  WS_CONNECTION_OPEN_ALL,
  WS_CONNECTION_OPEN_PROFILE,
} from '../services/actions/ws-orders';
import { useDispatch } from '../services/hooks';

export default function OrderIngredientsDetailPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.indexOf('feed') !== -1) {
      dispatch({ type: WS_CONNECTION_OPEN_ALL });
    } else {
      dispatch({ type: WS_CONNECTION_OPEN_PROFILE });
    }

    return () => {
      if (location.pathname.indexOf('feed') !== -1) {
        dispatch({ type: WS_CONNECTION_CLOSE_ALL });
      } else {
        dispatch({ type: WS_CONNECTION_CLOSE_PROFILE });
      }
    }
  }, []);
  return (
    <div className="container">
      <div className={stylesIngredients.ingredients_wrapper}>
        <div className="text text_type_main-medium pt-20">Детали заказа</div>
        <OrderIngredientsDetails />
      </div>
    </div>
  );
}
