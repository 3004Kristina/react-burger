import reducer from './password-reset'
import * as actions from '../actions/password-reset'

describe('password reset reducer', () => {
  it('password reset state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        resetPasswordFailed: false,
        resetPasswordRequest: false,
        resetPassword: false,
        error: null,
      }
    )
  })

  it('PASSWORD_RESET_REQUEST', () => {
    expect(
      reducer({
        resetPasswordFailed: false,
        resetPasswordRequest: false,
        resetPassword: false,
        error: null,
      }, {
        type: actions.PASSWORD_RESET_REQUEST,
      })
    ).toEqual(
      {
        resetPasswordFailed: false,
        resetPasswordRequest: true,
        resetPassword: false,
        error: null,
      }
    )
  })

  it('PASSWORD_RESET_SUCCESS', () => {
    expect(
      reducer({
        resetPasswordFailed: false,
        resetPasswordRequest: false,
        resetPassword: false,
        error: null,
      }, {
        type: actions.PASSWORD_RESET_SUCCESS,
      })
    ).toEqual(
      {
        resetPasswordFailed: false,
        resetPasswordRequest: false,
        resetPassword: true,
        error: null,
      }
    )
  })

  it('PASSWORD_RESET_FAILED', () => {
    expect(
      reducer({
        resetPasswordFailed: false,
        resetPasswordRequest: false,
        resetPassword: false,
        error: null,
      }, {
        type: actions.PASSWORD_RESET_FAILED,
        error: 'message',
      })
    ).toEqual(
      {
        resetPasswordFailed: true,
        resetPasswordRequest: false,
        resetPassword: false,
        error: 'message',
      }
    )
  })
})
