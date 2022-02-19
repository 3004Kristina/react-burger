import reducer from './ingredients'
import * as actions from '../actions/ingredients'

describe('ingredients reducer', () => {
  it('ingredients initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        ingredients: [],
        ingredientsFailed: false,
        ingredientsRequest: false,

        activeIngredientDetailId: null,

        error: null,
      }
    )
  })

  it('GET_INGREDIENTS_REQUEST', () => {
    expect(
      reducer({
        ingredients: [],
        ingredientsFailed: false,
        ingredientsRequest: false,

        activeIngredientDetailId: null,

        error: null,
      }, {
        type: actions.GET_INGREDIENTS_REQUEST,
      })
    ).toEqual(
      {
        ingredients: [],
        ingredientsFailed: false,
        ingredientsRequest: true,

        activeIngredientDetailId: null,

        error: null,
      }
    )
  })

  it('GET_INGREDIENTS_SUCCESS', () => {
    expect(
      reducer({
        ingredients: [],
        ingredientsFailed: false,
        ingredientsRequest: false,

        activeIngredientDetailId: null,

        error: null,
      }, {
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
          id: 'id',
        }]
      })
    ).toEqual(
      {
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
          id: 'id',
        }],
        ingredientsFailed: false,
        ingredientsRequest: false,

        activeIngredientDetailId: null,

        error: null,
      }
    )
  })

  it('GET_INGREDIENTS_FAILED', () => {
    expect(
      reducer({
        ingredients: [],
        ingredientsFailed: false,
        ingredientsRequest: true,

        activeIngredientDetailId: null,

        error: null,
      }, {
        type: actions.GET_INGREDIENTS_FAILED,
        error: 'message',
      })
    ).toEqual(
      {
        ingredients: [],
        ingredientsFailed: true,
        ingredientsRequest: false,

        activeIngredientDetailId: null,

        error: 'message',
      }
    )
  })
})
