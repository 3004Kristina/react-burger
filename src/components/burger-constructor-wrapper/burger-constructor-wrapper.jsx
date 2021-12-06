import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import wrapperStyles from './burger-constructor-wrapper.module.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function BurgerConstructorWrapper({catalog}) {
    return (
        <div>
            <div className="container">
                <div className={wrapperStyles.burger_content_wrapper}>
                    <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                    </DndProvider>
                </div>
            </div>
        </div>
    );
}

export default BurgerConstructorWrapper;