import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import wrapperStyles from './burger-constructor-wrapper.module.css';
import PropTypes from 'prop-types';

BurgerConstructorWrapper.propTypes = {
    data: PropTypes.array
};

function BurgerConstructorWrapper({data}) {
    let groupedData = [
        {
            type: 'bun',
            label: 'Булки',
            items: []
        },
        {
            type: 'sauce',
            label: 'Соусы',
            items: []
        },
        {
            type: 'main',
            label: 'Начинки',
            items: []
        }
    ];

    data.forEach(item => groupedData.find(group => group.type === item.type)?.items.push(item));

    return (
        <div>
            <div className="container">
                <div className={wrapperStyles.burger_content_wrapper}>
                    <BurgerIngredients groupedData = {groupedData}/>
                    <BurgerConstructor groupedData = {groupedData}/>
                </div>
            </div>
        </div>
    );
}

export default BurgerConstructorWrapper;