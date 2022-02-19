import reducer from './constructor'
import * as actions from '../actions/constructor'

describe('constructor reducer', () => {
  it('constructor initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        basket: [],
      }
    )
  })

  it('ADD_BASKET_INGREDIENT', () => {
    expect(
      reducer({
        basket: [],
      }, {
        type: actions.ADD_BASKET_INGREDIENT,
        item: {
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
        }
      })
    ).toEqual(
      {
        basket: [{
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
      }
    )
  })

  it('RESET_BASKET', () => {
    expect(
      reducer({
        basket: [],
      }, {
        type: actions.RESET_BASKET,
      })
    ).toEqual(
      {
        basket: [],
      }
    )
  })
})
