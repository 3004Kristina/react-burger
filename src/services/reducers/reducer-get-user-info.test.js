import reducer from './get-user-info'
import * as actions from '../actions/get-user-info';

describe('get user reducer', () => {
  it('get user initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        getUserFailed: false,
        getUserRequest: false,
        user: null,
        userIsChecked: false,

        updateUserFailed: false,
        updateUserRequest: false,
        error: null,
      }
    )
  })

  it('GET_USER_REQUEST', () => {
    expect(
      reducer({
        getUserFailed: false,
        getUserRequest: false,
        user: null,
        userIsChecked: false,
        updateUserFailed: false,
        updateUserRequest: false,
        error: null,
      }, {
        type: actions.GET_USER_REQUEST,
      })
    ).toEqual(
      {
        getUserFailed: false,
        getUserRequest: true,
        user: null,
        userIsChecked: false,
        updateUserFailed: false,
        updateUserRequest: false,
        error: null,
      }
    )
  })

  it('GET_USER_SUCCESS', () => {
    expect(
      reducer({
        getUserFailed: false,
        getUserRequest: false,
        user: null,
        userIsChecked: false,
        updateUserFailed: false,
        updateUserRequest: false,
        error: null,
      }, {
        type: actions.GET_USER_SUCCESS,
        user: {
          email: 'test@test.ru',
          user: 'test user',
        }
      })
    ).toEqual(
      {
        getUserFailed: false,
        getUserRequest: false,
        user: {
          email: 'test@test.ru',
          user: 'test user',
        },
        userIsChecked: true,

        updateUserFailed: false,
        updateUserRequest: false,
        error: null,
      }
    )
  })

  it('GET_USER_FAILED', () => {
    expect(
      reducer({
        getUserFailed: false,
        getUserRequest: false,
        user: null,
        userIsChecked: false,
        updateUserFailed: false,
        updateUserRequest: false,
        error: null,
      }, {
        type: actions.GET_USER_FAILED,
        error: 'message',
      })
    ).toEqual(
      {
        getUserFailed: true,
        getUserRequest: false,
        user: null,
        userIsChecked: true,
        updateUserFailed: false,
        updateUserRequest: false,
        error: 'message',
      }
    )
  })

  it('UPDATE_USER_REQUEST', () => {
    expect(
      reducer({
        getUserFailed: false,
        getUserRequest: false,
        user: null,
        userIsChecked: false,
        updateUserFailed: false,
        updateUserRequest: false,
        error: null,
      }, {
        type: actions.UPDATE_USER_REQUEST,
      })
    ).toEqual(
      {
        getUserFailed: false,
        getUserRequest: false,
        user: null,
        userIsChecked: false,
        updateUserFailed: false,
        updateUserRequest: true,
        error: null,
      }
    )
  })

  it('UPDATE_USER_SUCCESS', () => {
    expect(
      reducer({
        getUserFailed: false,
        getUserRequest: false,
        user: null,
        userIsChecked: false,
        updateUserFailed: false,
        updateUserRequest: false,
        error: null,
      }, {
        type: actions.UPDATE_USER_SUCCESS,
        user: {
          email: 'test@test.ru',
          user: 'test user',
        }
      })
    ).toEqual(
      {
        getUserFailed: false,
        getUserRequest: false,
        user: {
          email: 'test@test.ru',
          user: 'test user',
        },
        userIsChecked: false,
        updateUserFailed: false,
        updateUserRequest: false,
        error: null,
      }
    )
  })

  it('UPDATE_USER_FAILED', () => {
    expect(
      reducer({
        getUserFailed: false,
        getUserRequest: false,
        user: null,
        userIsChecked: false,
        updateUserFailed: false,
        updateUserRequest: false,
        error: null,
      }, {
        type: actions.UPDATE_USER_FAILED,
        error: 'message',
      })
    ).toEqual(
      {
        getUserFailed: false,
        getUserRequest: false,
        user: null,
        userIsChecked: false,
        updateUserFailed: true,
        updateUserRequest: false,
        error: 'message',
      }
    )
  })
})
