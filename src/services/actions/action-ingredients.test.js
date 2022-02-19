import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './ingredients';
import fetchMock from 'fetch-mock/es5/client';
import { API_URL } from '../../utils/consts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('get ingredients actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('success get ingredients', () => {
    fetchMock.getOnce(`${API_URL}/ingredients`, {
      body: {
        success: true,
        data: [{
          calories: 1,
          carbohydrates: 1,
          fat: 1,
          price: 1,
          proteins: 1,
          type: 'type',
          name: 'name',
          image: 'image',
          image_large: 'image_large',
          image_mobile: 'image_mobile',
          _id: '_id',
        }],
      },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.GET_INGREDIENTS_REQUEST,
      },
      {
        type: actions.GET_INGREDIENTS_SUCCESS,
        ingredients: [{
          calories: 1,
          carbohydrates: 1,
          fat: 1,
          price: 1,
          proteins: 1,
          type: 'type',
          name: 'name',
          image: 'image',
          image_large: 'image_large',
          image_mobile: 'image_mobile',
          _id: '_id',
        }],
      },
    ];

    const store = mockStore({
      ingredients: [],
      ingredientsFailed: false,
      ingredientsRequest: false,

      activeIngredientDetailId: null,

      error: null,
    });

    return store.dispatch(actions.getIngredientsItems()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('failed get ingredients', () => {
    fetchMock.getOnce(`${API_URL}/ingredients`, {
      status: 400,
      body: {
        success: false,
        message: 'message',
      },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.GET_INGREDIENTS_REQUEST,
      },
      {
        type: actions.GET_INGREDIENTS_FAILED,
        error: 'message',
      },
    ];

    const store = mockStore({
      ingredients: [],
      ingredientsFailed: false,
      ingredientsRequest: false,

      activeIngredientDetailId: null,

      error: null,
    });

    return store.dispatch(actions.getIngredientsItems()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
