import React from 'react';
// @ts-ignore
import uuid from 'react-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import ErrorModal from '../error-modal/error-modal';
import { postOrderItems, RESET_ORDER, RESET_ORDER_FAILED } from '../../services/actions/order';
import {
  ADD_BASKET_INGREDIENT,
  BASKET_UPDATE_BY_SORT,
  RESET_BASKET,
} from '../../services/actions/constructor';
import BurgerConstructorItem from './burger-constructor-item';
import IIngredientItem from '../../types/IngredientsItem';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const {
    basket,
    bun,
    orderNumber,
    postOrderFailed,
    postOrderRequest,
    error,
  } = useSelector((store) => ({
    // @ts-ignore
    basket: store.constructorData.basket,
    // @ts-ignore
    bun: store.constructorData.basket.find((item) => item.type === 'bun'),
    // @ts-ignore
    orderNumber: store.orderData.orderNumber,
    // @ts-ignore
    postOrderFailed: store.orderData.postOrderFailed,
    // @ts-ignore
    postOrderRequest: store.orderData.postOrderRequest,
    // @ts-ignore
    error: store.orderData.error,
  }));
  const [, dropTarget] = useDrop({
    accept: 'ingredient-item',
    drop(item: IIngredientItem) {
      dispatch({
        type: ADD_BASKET_INGREDIENT,
        item: { ...item, id: uuid() },
      });
    },
  });
  const totalPrice = basket.reduce((total: number, item: IIngredientItem) => total + item.price, 0);

  function moveCard(dragIndex: number, hoverIndex: number) {
    dispatch({
      type: BASKET_UPDATE_BY_SORT,
      dragIndex,
      hoverIndex,
    });
  }

  function handleOpenOrderDetailsModal() {
    const orderIdList = basket?.map(({ _id }:IIngredientItem) => _id);

    dispatch(postOrderItems(orderIdList));
  }

  function handleCloseOrderModal() {
    dispatch({ type: RESET_ORDER });
    dispatch({ type: RESET_BASKET });
  }

  function handleResetOrderFailed() {
    dispatch({ type: RESET_ORDER_FAILED });
  }

  return (
    <div ref={dropTarget} className={`${burgerConstructorStyles.constructor_wrapper} pl-4`}>
      <div className="pl-8 pr-4">
        {bun
          && (
            <ConstructorElement
              type="top"
              isLocked
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
      </div>
      <div className={burgerConstructorStyles.cards_inner_wrapper}>
        <div className={`${burgerConstructorStyles.cards_wrapper} custom-scroll pr-1`}>
          <div className={burgerConstructorStyles.cards_list}>
            {basket.map((item: IIngredientItem & {id: string}, index: number) => item.type !== 'bun' && (
              <BurgerConstructorItem
                key={item.id}
                item={item}
                id={item.id}
                index={index}
                moveCard={moveCard}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pl-8 pr-4">
        {bun
          && (
            <ConstructorElement
              type="bottom"
              isLocked
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
      </div>
      <div className={`${burgerConstructorStyles.btn_wrapper} mt-10`}>
        <span className={`${burgerConstructorStyles.price_wrapper} mr-10`}>
          <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
          <span className={burgerConstructorStyles.icon}>
            <CurrencyIcon type="primary" />
          </span>
        </span>
        <Button
          type="primary"
          size="large"
          onClick={handleOpenOrderDetailsModal}
          disabled={postOrderRequest}
        >
          Оформить заказ
        </Button>
      </div>
      {orderNumber
        && (
          <Modal onClose={handleCloseOrderModal}>
            <OrderDetails orderNumber={orderNumber} />
          </Modal>
        )}

      {postOrderFailed
        && (
          <Modal onClose={handleResetOrderFailed}>
            <ErrorModal errorMsg={error} />
          </Modal>
        )}
    </div>
  );
}

export default BurgerConstructor;