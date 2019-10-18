import {ADD_AUTH, REMOVE_AUTH} from '../actions'


const authReducer = (state = {isAuth: !!localStorage.getItem("cardCreatorToken")}, action) => {
  
  switch (action.type) {
    case ADD_AUTH:
      return {...state, isAuth: true}
      case REMOVE_AUTH:
          localStorage.removeItem('cardCreatorToken')
          return {...state, isAuth: false}
      default:
        return {...state}
  }

}

export default authReducer