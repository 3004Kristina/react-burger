import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { ACTIVATE_INGREDIENTS_DETAILS } from '../../services/actions/ingredients-detail-modal';
import burgerIngredientsStyles from './burger-ingredients.module.css';

function BurgerIngredientItem({ item }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { _id: itemId } = item;
  const { count } = useSelector((store) => ({
    count: store.constructorData.basket.filter(({ _id }) => itemId === _id).length,
  }));

  const [{ opacity }, refDrag] = useDrag({
    type: 'items',
    item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  function handleOpenIngredientDetailsModal() {
    dispatch({
      type: ACTIVATE_INGREDIENTS_DETAILS,
      id: itemId,
    });
  }

  return (
    <li ref={refDrag} style={{ opacity }}>
      <Link to={{
        pathname: `/ingredients/${itemId}`,
        state: { background: location },
      }}
      >
        <button type="button" className={burgerIngredientsStyles.card} onClick={() => handleOpenIngredientDetailsModal()}>
          {count > 0
            && (
              <Counter count={count} size="default" />
            )}
          <img src={item.image} alt="" />
          <p className={`${burgerIngredientsStyles.price} text text_type_digits-default p-2`}>
            {item.price}
            <CurrencyIcon type="primary" />
          </p>
          <p style={{ textAlign: 'center' }} className="text text_type_main-small pb-5">
            {item.name}
          </p>
        </button>
      </Link>
    </li>
  );
}

BurgerIngredientItem.propTypes = {
  item: PropTypes.shape({
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    price: PropTypes.number,
    proteins: PropTypes.number,
    type: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default BurgerIngredientItem;
