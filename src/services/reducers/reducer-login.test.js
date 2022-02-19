import reducer from './login'
import * as actions from '../actions/login'

describe('login reducer', () => {
  it('login initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        loginUserFailed: false,
        loginUserRequest: false,
        auth: false,
        error: null,
      }
    )
  })

  it('LOGIN_USER_REQUEST', () => {
    expect(
      reducer({
        loginUserFailed: false,
        loginUserRequest: false,
        auth: false,
        error: null,
      }, {
        type: actions.LOGIN_USER_REQUEST,
      })
    ).toEqual(
      {
        loginUserFailed: false,
        loginUserRequest: true,
        auth: false,
        error: null,
      }
    )
  })

  it('LOGIN_USER_SUCCESS', () => {
    expect(
      reducer({
        loginUserFailed: false,
        loginUserRequest: false,
        auth: false,
        error: null,
      }, {
        type: actions.LOGIN_USER_SUCCESS,
      })
    ).toEqual(
      {
        loginUserFailed: false,
        loginUserRequest: false,
        auth: true,
        error: null,
      }
    )
  })

  it('LOGIN_USER_FAILED', () => {
    expect(
      reducer({
        loginUserFailed: false,
        loginUserRequest: false,
        auth: false,
        error: null,
      }, {
        type: actions.LOGIN_USER_FAILED,
        error: 'message',
      })
    ).toEqual(
      {
        loginUserFailed: true,
        loginUserRequest: false,
        auth: false,
        error: 'message',
      }
    )
  })
})
