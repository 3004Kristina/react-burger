import React from 'react';
import ingredientStyles from './ingredient-details.module.css';


export default function IngredientDetails ({data}) {
    return (
        <>
            <img className={ingredientStyles.image_large} src={data.image_large} alt=""/>
            <span className="text text_type_main-medium mb-8">{data.name}</span>
            <div className={ingredientStyles.info_wrapper}>
                <div className={ingredientStyles.info_item}>
                    <span className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</span>
                    <span className="text text_type_digits-default text_color_inactive">{data.calories}</span>
                </div>
                <div className={ingredientStyles.info_item}>
                    <span className="text text_type_main-default text_color_inactive mb-2">Белки, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{data.proteins}</span>
                </div>
                <div className={ingredientStyles.info_item}>
                    <span className="text text_type_main-default text_color_inactive mb-2">Жиры, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{data.fat}</span>
                </div>
                <div className={ingredientStyles.info_item}>
                    <span className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{data.carbohydrates}</span>
                </div>
            </div>
        </>
    );
}