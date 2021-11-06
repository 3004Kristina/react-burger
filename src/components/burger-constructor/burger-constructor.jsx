import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import bun2 from '../../images/bun-02.png';
import PropTypes from 'prop-types';

BurgerConstructor.propTypes = {
    groupedData: PropTypes.array
};

function BurgerConstructor({groupedData}) {
    return (
        <div className={`${burgerConstructorStyles.constructor_wrapper} pl-4`}>
            <div className="pl-8 pr-4">
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={20}
                    thumbnail={bun2}
                />
            </div>
            {/* @todo Выводятся данные для примера - временно */}
            <div className={burgerConstructorStyles.cards_inner_wrapper}>
                <div className={`${burgerConstructorStyles.cards_wrapper} custom-scroll pr-1`}>
                    {groupedData.filter(group => group.type !== 'bun').map(group => (
                        <ul key={group.type} className={burgerConstructorStyles.cards_list}>
                            {group.items.map(item => (
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
                    ))}
                </div>
            </div>

            <div className="pl-8 pr-4">
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={20}
                    thumbnail={bun2}
                />
            </div>
            <div className={`${burgerConstructorStyles.btn_wrapper} mt-10`}>
                <span className={`${burgerConstructorStyles.price_wrapper} mr-10`}>
                    <span className="text text_type_digits-medium mr-2">610</span>
                    <span className={burgerConstructorStyles.icon}>
                        <CurrencyIcon type="primary" />
                    </span>

                </span>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

export default BurgerConstructor;