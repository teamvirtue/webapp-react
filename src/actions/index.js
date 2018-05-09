import * as types from '../constants/ActionTypes'

export const populateUsersList = users => ({
  type: types.USERS_LIST,
  users
});