import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import wrapperStyles from './burger-constructor-wrapper.module.css';
import PropTypes from 'prop-types';

BurgerConstructorWrapper.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
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
};

function BurgerConstructorWrapper({data}) {
    console.log(data);
    const ingredientsCategories = [
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

    data.forEach(item => ingredientsCategories.find(group => group.type === item.type)?.items.push(item));

    return (
        <div>
            <div className="container">
                <div className={wrapperStyles.burger_content_wrapper}>
                    <BurgerIngredients ingredientsCategories={ingredientsCategories}/>
                    <BurgerConstructor ingredientsCategories={ingredientsCategories}/>
                </div>
            </div>
        </div>
    );
}

export default BurgerConstructorWrapper;