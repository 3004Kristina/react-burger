import {
  ADD_BASKET_INGREDIENT,
  DELETE_BASKET_ITEM_BY_INDEX,
  BASKET_UPDATE_BY_SORT,
  RESET_BASKET,
} from '../actions/constructor';

const constructorInitialState = {
  basket: [],
};

export default (state = constructorInitialState, action = {}) => {
  switch (action.type) {
    case ADD_BASKET_INGREDIENT: {
      let basket = [...state.basket];
      if (action.item.type === 'bun') {
        basket = basket.filter((item) => item.type !== 'bun')
      }
      basket.push(action.item);

      return { ...state, basket }
    }
    case DELETE_BASKET_ITEM_BY_INDEX: {
      const basket = [...state.basket];
      basket.splice(action.index, 1);

      return { ...state, basket }
    }
    case BASKET_UPDATE_BY_SORT: {
      const basket = [...state.basket];
      const sortableElements = basket.splice(action.dragIndex, 1);
      basket.splice(action.hoverIndex, 0, ...sortableElements);

      return { ...state, basket }
    }
    case RESET_BASKET: {
      return { ...state, basket: [...state.basket].filter((item) => item.type === 'bun') }
    }
    default: {
      return state;
    }
  }
};
