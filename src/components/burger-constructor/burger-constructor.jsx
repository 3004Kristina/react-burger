import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import {ORDER_URL} from '../../utils/consts';
import {AppContext} from '../../services/app-context/app-context';

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        label: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.shape({
            calories: PropTypes.number,
            carbohydrates: PropTypes.number,
            fat: PropTypes.number,
            price: PropTypes.number,
            proteins: PropTypes.number,
            type: PropTypes.string,
            image: PropTypes.string,
            image_large: PropTypes.string,
            image_mobile: PropTypes.string,
            _id: PropTypes.string
        }))
    }))
};

const initialPriceState = {price: 0};


function priceReducer(state, action) {
    switch (action.type) {
        case 'add':
            return {price: state.price + action.price};
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}


function BurgerConstructor() {
    const {bun, ingredients} = React.useContext(AppContext).basket;
    const [modalOpened, setModalOpened] = React.useState(false);
    const [orderNumber, setOrderNumber] = React.useState(null);
    const [hasError, setHasError] = React.useState(false);
    const [priceState, priceDispatch] = React.useReducer(priceReducer, initialPriceState, undefined);

    React.useEffect(() => {
        ingredients.forEach(item => {
            return priceDispatch({
                type: 'add',
                price: item.price
            });
        });

        if(bun){
            priceDispatch({
                type: 'add',
                price: bun.price
            });
        }}, [ingredients, bun]);


    function handleOpenOrderDetailsModal() {
        const ingredients_id = {
            'ingredients': ingredients.map(item => item._id)
        };

        const getOrderData = () => {
            fetch(ORDER_URL, {
                method: 'POST',
                body: JSON.stringify(ingredients_id),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
                .then(res => res.json())
                .then(res => setOrderNumber(res.order.number))
                .then(() => setModalOpened(true))
                .catch(e => {
                    setHasError(true);
                });
        };

        getOrderData();
    }

    function handleCloseOrderDetailsModal() {
        setModalOpened(false);
    }

    return (
        <div className={`${burgerConstructorStyles.constructor_wrapper} pl-4`}>
            <div className="pl-8 pr-4">
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun?.name} (верх)`}
                    price={bun?.price}
                    thumbnail={bun?.image}
                />
            </div>
            {/* @todo Выводятся данные для примера - временно */}
            <div className={burgerConstructorStyles.cards_inner_wrapper}>
                <div className={`${burgerConstructorStyles.cards_wrapper} custom-scroll pr-1`}>
                    <ul className={burgerConstructorStyles.cards_list}>
                        {ingredients.map(item => (
                            <li key={item._id}>
                                <DragIcon type="primary"/>
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="pl-8 pr-4">
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun?.name} (низ)`}
                    price={bun?.price}
                    thumbnail={bun?.image}
                />
            </div>
            <div className={`${burgerConstructorStyles.btn_wrapper} mt-10`}>
                <span className={`${burgerConstructorStyles.price_wrapper} mr-10`}>
                    <span className="text text_type_digits-medium mr-2">{priceState.price}</span>
                    <span className={burgerConstructorStyles.icon}>
                        <CurrencyIcon type="primary"/>
                    </span>

                </span>
                <Button type="primary" size="large" onClick={handleOpenOrderDetailsModal}>
                    Оформить заказ
                </Button>
            </div>
            <Modal opened={modalOpened} close={handleCloseOrderDetailsModal}>
                <OrderDetails orderNumber={orderNumber}/>
            </Modal>
        </div>
    );
}

export default BurgerConstructor;