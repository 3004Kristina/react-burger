import reducer from './create-user'
import * as actions from '../actions/create-user'

describe('create user reducer', () => {
  it('create user initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        createUserFailed: false,
        createUserRequest: false,
        error: null,
      }
    )
  })

  it('CREATE_USER_REQUEST', () => {
    expect(
      reducer({
        createUserFailed: false,
        createUserRequest: false,
        error: null,
      }, {
        type: actions.CREATE_USER_REQUEST,
      })
    ).toEqual(
      {
        createUserFailed: false,
        createUserRequest: true,
        error: null,
      }
    )
  })

  it('CREATE_USER_SUCCESS', () => {
    expect(
      reducer({
        createUserFailed: false,
        createUserRequest: false,
        error: null,
      }, {
        type: actions.CREATE_USER_SUCCESS,
      })
    ).toEqual(
      {
        createUserFailed: false,
        createUserRequest: false,
        error: null,
      }
    )
  })

  it('CREATE_USER_FAILED', () => {
    expect(
      reducer({
        createUserFailed: false,
        createUserRequest: false,
        error: null,
      }, {
        type: actions.CREATE_USER_FAILED,
        error: 'message',
      })
    ).toEqual(
      {
        createUserFailed: true,
        createUserRequest: false,
        error: 'message',
      }
    )
  })
})
