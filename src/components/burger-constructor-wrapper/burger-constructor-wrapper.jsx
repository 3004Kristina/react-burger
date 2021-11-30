import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import wrapperStyles from './burger-constructor-wrapper.module.css';


function BurgerConstructorWrapper() {
    return (
        <div>
            <div className="container">
                <div className={wrapperStyles.burger_content_wrapper}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </div>
            </div>
        </div>
    );
}

export default BurgerConstructorWrapper;