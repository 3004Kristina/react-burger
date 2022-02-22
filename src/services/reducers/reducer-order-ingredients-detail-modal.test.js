import reducer from './order-ingredients-detail-modal'
import * as actions from '../actions/order-ingredients-detail-modal'

describe('order ingredients detail modal reducer', () => {
  it('order ingredients detail modal initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        activeOrderIngredientDetailId: null,
      }
    )
  })

  it('ACTIVATE_ORDER_INGREDIENTS_DETAILS', () => {
    expect(
      reducer({
        activeOrderIngredientDetailId: null,
      }, {
        type: actions.ACTIVATE_ORDER_INGREDIENTS_DETAILS,
        id: 1,
      })
    ).toEqual(
      {
        activeOrderIngredientDetailId: 1,
      }
    )
  })

  it('RESET_ORDER_INGREDIENTS_DETAILS', () => {
    expect(
      reducer({
        activeOrderIngredientDetailId: null,
      }, {
        type: actions.RESET_ORDER_INGREDIENTS_DETAILS,
      })
    ).toEqual(
      {
        activeOrderIngredientDetailId: null,
      }
    )
  })
})
