import reducer from './order'
import * as actions from '../actions/order'

describe('order reducer', () => {
  it('order initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        orderNumber: null,
        postOrderFailed: false,
        postOrderRequest: false,
        error: null,
      }
    )
  })

  it('POST_ORDER_REQUEST', () => {
    expect(
      reducer({
        orderNumber: null,
        postOrderFailed: false,
        postOrderRequest: false,
        error: null,
      }, {
        type: actions.POST_ORDER_REQUEST,
      })
    ).toEqual(
      {
        orderNumber: null,
        postOrderFailed: false,
        postOrderRequest: true,
        error: null,
      }
    )
  })

  it('POST_ORDER_SUCCESS', () => {
    expect(
      reducer({
        orderNumber: null,
        postOrderFailed: false,
        postOrderRequest: false,
        error: null,
      }, {
        type: actions.POST_ORDER_SUCCESS,
        orderNumber: 1
      })
    ).toEqual(
      {
        orderNumber: 1,
        postOrderFailed: false,
        postOrderRequest: false,
        error: null,
      }
    )
  })

  it('POST_ORDER_FAILED', () => {
    expect(
      reducer({
        orderNumber: null,
        postOrderFailed: false,
        postOrderRequest: false,
        error: null,
      }, {
        type: actions.POST_ORDER_FAILED,
        error: 'message',
      })
    ).toEqual(
      {
        orderNumber: null,
        postOrderFailed: true,
        postOrderRequest: false,
        error: 'message',
      }
    )
  })
})
