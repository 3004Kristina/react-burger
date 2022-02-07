import React from 'react';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/hooks';
import styles from './order-ingredients-details.module.css';
import IIngredientItem from '../../types/IngredientsItem';
import formatRelativeTime from '../../formatters/relative-time';

export default function OrderIngredientsDetails() {
  const { orderId } = useParams<{ orderId: string }>();
  const { order } = useSelector((store) => ({
    order: store.wsData.messages[store.wsData.messages.length - 1]?.orders
      .find(({ _id }) => _id === orderId),
  }));

  const { ingredients } = useSelector((store) => ({
    ingredients: store.ingredientsData.ingredients,
  }));

  const orderIngredients = ingredients
    .filter((item) => order?.ingredients.includes(item._id));

  const totalPrice = orderIngredients
    .reduce((total: number, item: IIngredientItem) => total + item.price, 0);

  if (!order) {
    return null;
  }

  return (
    <div className={styles.content_wrapper}>
      <div
        className="text text_type_digits-default mb-10"
        style={{ textAlign: 'center' }}
      >
        {`#${order.number}`}
      </div>
      <div
        className="text text_type_main-medium mb-3"
      >
        {order.name}
      </div>
      <div
        style={{ color: '#00CCCC' }}
        className="text text_type_main-default mb-15"
      >
        {order.status === 'done'
          ? 'Выполнен'
          : 'В работе'}
      </div>
      <div
        className="text text_type_main-medium mb-6"
      >
        Состав:
      </div>
      <div className={styles.cards_inner_wrapper}>
        <div className={`${styles.cards_wrapper} custom-scroll pr-1`}>
          {orderIngredients.map((item, index, arr) => {
            return (
              <div
                key={item._id}
                className={styles.order_item}
              >
                <img
                  style={{ marginLeft: '-38px' }}
                  src={item.image_mobile}
                  alt=""
                />
                <div
                  style={{ width: '414px' }}
                  className="text text_type_main-default mr-4"
                >
                  {item.name}
                </div>
                <div className={styles.order_amount}>
                  <span className="text text_type_digits-default mr-2">
                    {arr.filter(({ _id }) => item._id === _id).length}
                  </span>
                  x
                  <span
                    className="text text_type_digits-default mr-2 ml-2"
                  >
                    {item.price}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.bottom_wrapper}>
        <div>
          {formatRelativeTime(order.createdAt)}
        </div>
        <div className={styles.order_item}>
          <span
            className="text text_type_digits-default mr-2"
          >
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
