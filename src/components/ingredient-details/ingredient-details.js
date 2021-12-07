import React from 'react';
import ingredientStyles from './ingredient-details.module.css';
import {useSelector} from 'react-redux';


export default function IngredientDetails () {
    const {item} = useSelector(store => ({
        item: store.ingredientsData.ingredients.find(item => item._id === store.ingredientsDetail.activeIngredientDetailId)
    }))

    return (
        <>
            <img className={ingredientStyles.image_large} src={item.image_large} alt=""/>
            <span className="text text_type_main-medium mb-8">{item.name}</span>
            <div className={ingredientStyles.info_wrapper}>
                <div className={ingredientStyles.info_item}>
                    <span className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</span>
                    <span className="text text_type_digits-default text_color_inactive">{item.calories}</span>
                </div>
                <div className={ingredientStyles.info_item}>
                    <span className="text text_type_main-default text_color_inactive mb-2">Белки, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{item.proteins}</span>
                </div>
                <div className={ingredientStyles.info_item}>
                    <span className="text text_type_main-default text_color_inactive mb-2">Жиры, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{item.fat}</span>
                </div>
                <div className={ingredientStyles.info_item}>
                    <span className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</span>
                    <span className="text text_type_digits-default text_color_inactive">{item.carbohydrates}</span>
                </div>
            </div>
        </>
    );
}