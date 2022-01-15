import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ingredientStyles from './ingredient-details.module.css';

export default function IngredientDetails() {
  // @ts-ignore
  const { ingredientId } = useParams();
  const { item } = useSelector((store) => ({
    // @ts-ignore
    item: store.ingredientsData.ingredients.find(({ _id }) => _id === ingredientId),
  }));

  if (!item) {
    return null;
  }

  return (
    <>
      <img className={ingredientStyles.image_large} src={item.image_large} alt="" />
      <span className="text text_type_main-medium mb-8">{item.name}</span>
      <div className={ingredientStyles.info_wrapper}>
        <div className={ingredientStyles.info_item}>
          <span
            className="text text_type_main-default text_color_inactive mb-2"
          >
            Калории,ккал
          </span>
          <span
            className="text text_type_digits-default text_color_inactive"
          >
            {item.calories}
          </span>
        </div>
        <div className={ingredientStyles.info_item}>
          <span
            className="text text_type_main-default text_color_inactive mb-2"
          >
            Белки, г
          </span>
          <span
            className="text text_type_digits-default text_color_inactive"
          >
            {item.proteins}
          </span>
        </div>
        <div className={ingredientStyles.info_item}>
          <span
            className="text text_type_main-default text_color_inactive mb-2"
          >
            Жиры, г
          </span>
          <span
            className="text text_type_digits-default text_color_inactive"
          >
            {item.fat}
          </span>
        </div>
        <div className={ingredientStyles.info_item}>
          <span
            className="text text_type_main-default text_color_inactive mb-2"
          >
            Углеводы, г
          </span>
          <span
            className="text text_type_digits-default text_color_inactive"
          >
            {item.carbohydrates}
          </span>
        </div>
      </div>
    </>
  );
}
