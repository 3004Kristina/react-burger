import React from 'react';
import uuid from 'react-uuid';
import burgerConstructorStyles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import {useDrop} from 'react-dnd';
import ErrorModal from '../error-modal/error-modal';
import {useDispatch, useSelector} from 'react-redux';
import {postOrderItems, RESET_ORDER, RESET_ORDER_FAILED} from '../../services/actions/order';
import {ADD_BASKET_INGREDIENT, BASKET_UPDATE_BY_SORT, RESET_BASKET} from '../../services/actions/constructor';
import BurgerConstructorItem from './burger-constructor-item';


function BurgerConstructor() {
    const dispatch = useDispatch();
    const {basket, bun, orderNumber, postOrderFailed} = useSelector(store => ({
        basket: store.constructorData.basket,
        bun: store.constructorData.basket.find(item => item.type === 'bun'),
        orderNumber: store.orderData.orderNumber,
        postOrderFailed: store.orderData.postOrderFailed
    }));
    const [, dropTarget] = useDrop({
        accept: 'items',
        drop(item) {
            dispatch({
                type: ADD_BASKET_INGREDIENT,
                item: {...item, id: uuid()}
            });
        }
    });
    const totalPrice = basket.reduce((total, item) => total + item.price, 0);
    const moveCard = (dragIndex, hoverIndex) => {
        dispatch({
            type: BASKET_UPDATE_BY_SORT,
            dragIndex,
            hoverIndex
        });
    };

    function handleOpenOrderDetailsModal() {
        const order_id_list = basket?.map(item => item._id);

        dispatch(postOrderItems(order_id_list));
    }

    function handleCloseOrderModal() {
        dispatch({type: RESET_ORDER});
        dispatch({type: RESET_BASKET});
    }

    return (
        <div ref={dropTarget} className={`${burgerConstructorStyles.constructor_wrapper} pl-4`}>
            <div className="pl-8 pr-4">
                {bun &&
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                }
            </div>
            <div className={burgerConstructorStyles.cards_inner_wrapper}>
                <div className={`${burgerConstructorStyles.cards_wrapper} custom-scroll pr-1`}>
                    <div className={burgerConstructorStyles.cards_list}>
                        {basket.map((item, index) => {
                            if (item.type === 'bun') {
                                return null;
                            }
                            return (
                                <BurgerConstructorItem key={item.id} item={item} id={item.id} index={index} moveCard={moveCard}/>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="pl-8 pr-4">
                {bun &&
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                }
            </div>
            <div className={`${burgerConstructorStyles.btn_wrapper} mt-10`}>
                <span className={`${burgerConstructorStyles.price_wrapper} mr-10`}>
                    <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
                    <span className={burgerConstructorStyles.icon}>
                        <CurrencyIcon type="primary"/>
                    </span>

                </span>
                <Button type="primary" size="large" onClick={handleOpenOrderDetailsModal}>
                    Оформить заказ
                </Button>
            </div>
            {orderNumber &&
                <Modal close={handleCloseOrderModal}>
                    <OrderDetails orderNumber={orderNumber}/>
                </Modal>
            }

            {postOrderFailed &&
                <Modal close={() => dispatch({type: RESET_ORDER_FAILED})}>
                    <ErrorModal/>
                </Modal>
            }
        </div>
    );
}

export default BurgerConstructor;