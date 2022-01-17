import React from 'react';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import stylesIngredients from './ingredients.module.css';

export default function IngredientsPage() {
  return (
    <div className="container">
      <div className={stylesIngredients.ingredients_wrapper}>
        <div className="text text_type_main-medium pt-20">Детали ингредиента</div>
        <IngredientDetails />
      </div>
    </div>
  );
}
