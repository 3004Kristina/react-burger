import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './get-user-info';
import fetchMock from 'fetch-mock/es5/client';
import { API_URL } from '../../utils/consts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('get user info actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('success auth user', () => {
    fetchMock.getOnce(`${API_URL}/auth/user`, {
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
        type: actions.GET_USER_REQUEST,
      },
      {
        type: actions.GET_USER_SUCCESS,
        user: {
          email: 'test@test.ru',
          user: 'test user',
        },
      },
    ];

    const store = mockStore({
      getUserFailed: false,
      getUserRequest: false,
      user: null,
      userIsChecked: false,

      updateUserFailed: false,
      updateUserRequest: false,
      error: null,
    });

    return store.dispatch(actions.getUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('jwt expired', () => {
    fetchMock.getOnce(`${API_URL}/auth/user`, {
      status: 403,
      body: {
        success: false,
        message: 'jwt expired',
      },
      headers: { 'content-type': 'application/json' },
    });

    fetchMock.postOnce(`${API_URL}/auth/token`, {
      status: 200,
      body: {
        success: true,
        refreshToken: 'refreshToken',
        accessToken: 'accessToken',
        user: {
          email: 'test@test.ru',
          user: 'test user',
        },
      },
      headers: { 'content-type': 'application/json' },
    });

    fetchMock.getOnce(`${API_URL}/auth/user`, {
      body: {
        success: true,
        user: {
          email: 'test@test.ru',
          user: 'test user',
        },
      },
      headers: { 'content-type': 'application/json' },
    }, {overwriteRoutes: false});

    const expectedActions = [
      {
        type: actions.GET_USER_REQUEST,
      },
      {
        type: actions.GET_USER_SUCCESS,
        user: {
          email: 'test@test.ru',
          user: 'test user',
        },
      },
    ];

    const store = mockStore({
      getUserFailed: false,
      getUserRequest: false,
      user: null,
      userIsChecked: false,

      updateUserFailed: false,
      updateUserRequest: false,
      error: null,
    });

    return store.dispatch(actions.getUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('failed auth user', () => {
    fetchMock.getOnce(`${API_URL}/auth/user`, {
      status: 403,
      body: {
        success: false,
        message: 'message',
      },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.GET_USER_REQUEST,
      },
      {
        type: actions.GET_USER_FAILED,
        error: 'message',
      },
    ];

    const store = mockStore({
      getUserFailed: false,
      getUserRequest: false,
      user: null,
      userIsChecked: false,

      updateUserFailed: false,
      updateUserRequest: false,
      error: null,
    });

    return store.dispatch(actions.getUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('success update user', () => {
    fetchMock.patchOnce(`${API_URL}/auth/user`, {
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
        type: actions.UPDATE_USER_REQUEST,
      },
      {
        type: actions.UPDATE_USER_SUCCESS,
        user: {
          email: 'test@test.ru',
          user: 'test user',
        },
      },
    ];

    const store = mockStore({
      getUserFailed: false,
      getUserRequest: false,
      user: null,
      userIsChecked: false,

      updateUserFailed: false,
      updateUserRequest: false,
      error: null,
    });

    return store.dispatch(actions.updateUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('failed update user', () => {
    fetchMock.patchOnce(`${API_URL}/auth/user`, {
      status: 403,
      body: {
        success: false,
        message: 'message',
      },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.UPDATE_USER_REQUEST,
      },
      {
        type: actions.UPDATE_USER_FAILED,
        error: 'message',
      },
    ];

    const store = mockStore({
      getUserFailed: false,
      getUserRequest: false,
      user: null,
      userIsChecked: false,

      updateUserFailed: false,
      updateUserRequest: false,
      error: null,
    });

    return store.dispatch(actions.updateUser()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
