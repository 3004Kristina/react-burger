import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import feedListStyles from './feed-list.module.css';
import IWsMessageOrder from '../../types/WsMessageOrder';
import IIngredientItem from '../../types/IngredientsItem';
import { useDispatch, useSelector } from '../../services/hooks';
import {
  ACTIVATE_ORDER_INGREDIENTS_DETAILS,
} from '../../services/actions/order-ingredients-detail-modal';
import formatRelativeTime from '../../formatters/relative-time';

export interface IFeedListItemProps {
  order: IWsMessageOrder;
  profile?: boolean
}

function FeedListItem({ order, profile }: IFeedListItemProps) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const { ingredients } = useSelector((store) => ({
    ingredients: store.ingredientsData.ingredients,
  }));

  const orderIngredients = ingredients
    .filter((item) => order.ingredients.includes(item._id));

  const totalPrice = orderIngredients
    .reduce((total: number, item: IIngredientItem) => total + item.price, 0);

  const orderTime = formatRelativeTime(order.createdAt);

  function handleOpenOrderIngredientDetailsModal() {
    dispatch({
      type: ACTIVATE_ORDER_INGREDIENTS_DETAILS,
      id: order._id,
    });
  }

  return (
    <div>
      <Link to={{
        pathname: `${pathname}/${order._id}`,
        state: { background: location },
      }}
      >
        <div
          style={{ cursor: 'pointer' }}
          role="group"
          onKeyDown={() => {
          }}
          className={feedListStyles.feed_item_wrapper}
          onClick={handleOpenOrderIngredientDetailsModal}
        >
          <div className={feedListStyles.top_wrapper}>
            <div className="text text_type_digits-default">{`#${order.number}`}</div>
            <div
              className="text text_type_main-default text_color_inactive"
            >
              {orderTime}
            </div>
          </div>
          <div className={`text text_type_main-medium mb-6 ${feedListStyles.name_wrapper}`}>
            <span className={feedListStyles.name}>
              {order.name}
            </span>
          </div>
          {profile
            && (
              order.status === 'done'
                ? <span style={{ color: '#00CCCC' }}>Выполнен</span>
                : <span>Готовится</span>
            )}
          <div className={feedListStyles.feed_item_info}>
            <div className={feedListStyles.img_wrapper}>
              {orderIngredients.reverse().map((item) => {
                return (
                  <img
                    key={item._id}
                    className={feedListStyles.order_img}
                    src={item.image_mobile}
                    alt=""
                  />
                );
              })}
            </div>
            <div className={feedListStyles.cost}>
              <span
                className="text text_type_digits-default"
              >
                {totalPrice}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default FeedListItem;
