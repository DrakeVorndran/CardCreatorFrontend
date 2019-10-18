export const ADD_AUTH = 'ADD_AUTH'
export const REMOVE_AUTH = 'REMOVE_AUTH'

export const addAuth = () => {
  return ({ type: ADD_AUTH })
}

export const removeAuth = () => {
  return ({ type: REMOVE_AUTH })
}