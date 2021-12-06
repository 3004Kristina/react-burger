import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from 'react-redux';
import {useDrag} from 'react-dnd';
import {ACTIVATE_INGREDIENTS_DETAILS} from '../../services/actions';
import PropTypes from 'prop-types';


BurgerIngredientItem.propTypes = {
    item: PropTypes.object.isRequired
}

function BurgerIngredientItem({item}) {
    const dispatch = useDispatch();
    const {count} = useSelector(store => ({
        count: store.constructorData.basket.filter(({_id}) => item._id === _id).length
    }));

    const [{opacity}, refDrag] = useDrag({
        type: 'items',
        item: item,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    function handleOpenIngredientDetailsModal(item_id) {
        dispatch({
            type: ACTIVATE_INGREDIENTS_DETAILS,
            id: item_id
        });
    }

    return (
        <li ref={refDrag} onClick={() => handleOpenIngredientDetailsModal(item._id)} style={{opacity}}>
            <button type="button" className={burgerIngredientsStyles.card}>
                {count > 0 &&
                    <Counter count={count} size="default"/>
                }
                <img src={item.image} alt=""/>
                <p className={`${burgerIngredientsStyles.price} text text_type_digits-default p-2`}>
                    {item.price}
                    <CurrencyIcon type="primary"/>
                </p>
                <p style={{textAlign: 'center'}} className="text text_type_main-small pb-5">
                    {item.name}
                </p>
            </button>
        </li>
    );
}

export default BurgerIngredientItem;