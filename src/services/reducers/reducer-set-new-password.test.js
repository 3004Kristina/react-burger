import reducer from './set-new-password'
import * as actions from '../actions/set-new-password'

describe('set new password reducer', () => {
  it('set new password state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        updatePasswordFailed: false,
        updatePasswordRequest: false,
        updatePassword: false,
        error: null,
      }
    )
  })

  it('SET_NEW_PASSWORD_REQUEST', () => {
    expect(
      reducer({
        updatePasswordFailed: false,
        updatePasswordRequest: false,
        updatePassword: false,
        error: null,
      }, {
        type: actions.SET_NEW_PASSWORD_REQUEST,
      })
    ).toEqual(
      {
        updatePasswordFailed: false,
        updatePasswordRequest: true,
        updatePassword: false,
        error: null,
      }
    )
  })

  it('SET_NEW_PASSWORD_SUCCESS', () => {
    expect(
      reducer({
        updatePasswordFailed: false,
        updatePasswordRequest: false,
        updatePassword: false,
        error: null,
      }, {
        type: actions.SET_NEW_PASSWORD_SUCCESS,
      })
    ).toEqual(
      {
        updatePasswordFailed: false,
        updatePasswordRequest: false,
        updatePassword: true,
        error: null,
      }
    )
  })

  it('SET_NEW_PASSWORD_FAILED', () => {
    expect(
      reducer({
        updatePasswordFailed: false,
        updatePasswordRequest: false,
        updatePassword: false,
        error: null,
      }, {
        type: actions.SET_NEW_PASSWORD_FAILED,
        error: 'message',
      })
    ).toEqual(
      {
        updatePasswordFailed: true,
        updatePasswordRequest: false,
        updatePassword: false,
        error: 'message',
      }
    )
  })
})
