import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './password-reset';
import fetchMock from 'fetch-mock/es5/client';
import { API_URL } from '../../utils/consts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('password reset actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('success password reset', () => {
    fetchMock.postOnce(`${API_URL}/password-reset`, {
      body: {
        success: true,
      },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.PASSWORD_RESET_REQUEST,
      },
      {
        type: actions.PASSWORD_RESET_SUCCESS,
      },
    ];

    const store = mockStore({
      resetPasswordFailed: false,
      resetPasswordRequest: false,
      resetPassword: false,
      error: null,
    });

    return store.dispatch(actions.passwordResetEmailCheck()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('failed password reset', () => {
    fetchMock.postOnce(`${API_URL}/password-reset`, {
      status: 403,
      body: {
        success: false,
        message: 'message',
      },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.PASSWORD_RESET_REQUEST,
      },
      {
        type: actions.PASSWORD_RESET_FAILED,
        error: 'message',
      },
    ];

    const store = mockStore({
      resetPasswordFailed: false,
      resetPasswordRequest: false,
      resetPassword: false,
      error: null,
    });

    return store.dispatch(actions.passwordResetEmailCheck()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
