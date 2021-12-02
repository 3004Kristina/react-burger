import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import {postOrder} from '../../api/apiClient';
import {AppContext} from '../../services/app-context/app-context';
import ErrorModal from '../error-modal/error-modal';


const initialPriceState = {price: 0};

function priceReducer(state, action) {
    switch (action.type) {
        case 'add':
            return {price: state.price + action.price};
        case 'reset':
            return  {...initialPriceState};
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

        if (bun) {
            priceDispatch({
                type: 'add',
                price: bun.price
            });
        }
    }, [ingredients, bun]);

    function handleOpenOrderDetailsModal() {
        const ingredients_list_id = ingredients.map(item => item._id);

        postOrder(ingredients_list_id)
            .then(res => {
                setOrderNumber(res.order.number);
                setModalOpened(true);
                priceDispatch({
                    type: 'reset'
                });
            })
            .catch(e => {
                setHasError(true);
            });
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
            {modalOpened &&
            <Modal close={() => setModalOpened(false)}>
                <OrderDetails orderNumber={orderNumber}/>
            </Modal>
            }

            {hasError &&
            <Modal close={() => setHasError(false)}>
                <ErrorModal/>
            </Modal>
            }
        </div>
    );
}

export default BurgerConstructor;