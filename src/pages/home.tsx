import React from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import MainTitle from '../components/main-title/main-title';
import BurgerConstructorWrapper
  from '../components/burger-constructor-wrapper/burger-constructor-wrapper';
import { RESET_INGREDIENTS_FAILED } from '../services/actions/ingredients';
import Modal from '../components/modal/modal';
import ErrorModal from '../components/error-modal/error-modal';

export default function HomePage() {
  const dispatch = useDispatch();

  const { ingredientsFailed } = useSelector((store) => ({
    ingredientsFailed: store.ingredientsData.ingredientsFailed,
  }));

  return (
    <div>
      <MainTitle
        title="Соберите бургер"
      />
      <BurgerConstructorWrapper />
      {ingredientsFailed
        && (
          <Modal onClose={() => dispatch({ type: RESET_INGREDIENTS_FAILED })}>
            <ErrorModal />
          </Modal>
        )}
    </div>
  );
}
