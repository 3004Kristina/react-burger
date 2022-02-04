import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import stylesIngredients from './ingredients.module.css';
import OrderIngredientsDetails
  from '../components/order-ingredients-details/order-ingredients-details';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
  WS_CONNECTION_START_PROFILE,
} from '../services/actions/ws-orders';
import { useDispatch } from '../services/hooks';

export default function OrderIngredientsDetailPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { orderId } = useParams<{ orderId: string }>();

  useEffect(() => {
    if (location.pathname.indexOf('feed') !== -1) {
      dispatch({ type: WS_CONNECTION_START });
    } else {
      dispatch({ type: WS_CONNECTION_START_PROFILE });
    }

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED })
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
