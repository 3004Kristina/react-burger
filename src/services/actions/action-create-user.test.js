import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './create-user';
import fetchMock from 'fetch-mock/es5/client';
import { API_URL } from '../../utils/consts';
import { CREATE_USER_FAILED } from './create-user';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('create user actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('success create user', () => {
    fetchMock.postOnce(`${API_URL}/auth/register`, {
      body: {
        success: true,
        refreshToken: 'refreshToken',
        accessToken: 'accessToken',
      },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.CREATE_USER_REQUEST,
      },
      {
        type: actions.CREATE_USER_SUCCESS,
      },
    ];

    const store = mockStore({
      createUserFailed: false,
      createUserRequest: false,
      error: null,
    });

    return store.dispatch(actions.registerUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('failed create user', () => {
    fetchMock.postOnce(`${API_URL}/auth/register`, {
      status: 403,
      body: {
        success: false,
        message: 'message',
      },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.CREATE_USER_REQUEST,
      },
      {
        type: actions.CREATE_USER_FAILED,
        error: 'message',
      },
    ];

    const store = mockStore({
      createUserFailed: false,
      createUserRequest: false,
      error: null,
    });

    return store.dispatch(actions.registerUser()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
