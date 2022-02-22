import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './order';
import fetchMock from 'fetch-mock/es5/client';
import { API_URL } from '../../utils/consts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('order actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('success order', () => {
    fetchMock.postOnce(`${API_URL}/orders`, {
      body: {
        success: true,
        name: 'name',
        order: {
          number: 1
        },
      },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.POST_ORDER_REQUEST,
      },
      {
        type: actions.POST_ORDER_SUCCESS,
        orderNumber: 1
      },
    ];

    const store = mockStore({
      orderNumber: null,
      postOrderFailed: false,
      postOrderRequest: false,
      error: null,
    });

    return store.dispatch(actions.postOrderItems()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('failed order', () => {
    fetchMock.postOnce(`${API_URL}/orders`, {
      status: 400,
      body: {
        success: false,
        message: 'message',
      },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.POST_ORDER_REQUEST,
      },
      {
        type: actions.POST_ORDER_FAILED,
        error: 'message'
      },
    ];

    const store = mockStore({
      orderNumber: null,
      postOrderFailed: false,
      postOrderRequest: false,
      error: null,
    });

    return store.dispatch(actions.postOrderItems()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
