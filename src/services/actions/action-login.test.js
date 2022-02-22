import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './login';
import * as getUserActions from './get-user-info';
import fetchMock from 'fetch-mock/es5/client';
import { API_URL } from '../../utils/consts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('login actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('success login', () => {
    fetchMock.postOnce(`${API_URL}/auth/login`, {
      body: {
        success: true,
        user: {
          email: 'test@test.ru',
          user: 'test user',
        },
      },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.LOGIN_USER_REQUEST,
      },
      {
        type: actions.LOGIN_USER_SUCCESS,
      },
      {
        type: getUserActions.GET_USER_SUCCESS,
        user: {
          email: 'test@test.ru',
          user: 'test user',
        },
      },
    ];

    const store = mockStore({
      loginUserFailed: false,
      loginUserRequest: false,
      auth: false,
      error: null,
    });

    return store.dispatch(actions.loginUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('failed login', () => {
    fetchMock.postOnce(`${API_URL}/auth/login`, {
      status: 403,
      body: {
        success: false,
        message: 'message',
      },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.LOGIN_USER_REQUEST,
      },
      {
        type: actions.LOGIN_USER_FAILED,
        error: 'message',
      },
    ];

    const store = mockStore({
      loginUserFailed: false,
      loginUserRequest: false,
      auth: false,
      error: null,
    });

    return store.dispatch(actions.loginUser()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
