import React from 'react';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import {getIngredientsItems} from '../services/actions/ingredients';
import {useDispatch} from 'react-redux';
import stylesIngredients from './ingredients.module.css';


export function IngredientsPage() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getIngredientsItems());
    }, [dispatch]);
    return (
        <div className="container">
            <div className={stylesIngredients.ingredients_wrapper}>
                <div className="text text_type_main-medium pt-20">Детали ингредиента</div>
                <IngredientDetails/>
            </div>
        </div>
    );
}