import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './set-new-password';
import fetchMock from 'fetch-mock/es5/client';
import { API_URL } from '../../utils/consts';
import { SET_NEW_PASSWORD_FAILED } from './set-new-password';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('password reset actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('success password reset', () => {
    fetchMock.postOnce(`${API_URL}/password-reset/reset`, {
      body: {
        success: true,
      },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.SET_NEW_PASSWORD_REQUEST,
      },
      {
        type: actions.SET_NEW_PASSWORD_SUCCESS,
      },
    ];

    const store = mockStore({
      updatePasswordFailed: false,
      updatePasswordRequest: false,
      updatePassword: false,
      error: null,
    });

    return store.dispatch(actions.setNewPassword()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('failed password reset', () => {
    fetchMock.postOnce(`${API_URL}/password-reset/reset`, {
      status: 400,
      body: {
        success: false,
        message: 'message',
      },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.SET_NEW_PASSWORD_REQUEST,
      },
      {
        type: actions.SET_NEW_PASSWORD_FAILED,
        error: 'message'
      },
    ];

    const store = mockStore({
      updatePasswordFailed: false,
      updatePasswordRequest: false,
      updatePassword: false,
      error: null,
    });

    return store.dispatch(actions.setNewPassword()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
