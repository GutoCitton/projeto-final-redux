const INITIAL_STATE = {
  pessoas: []
}

const action = {
  type: 'SET_PESSOAS',
  pessoas: []
}

function pessoaReducer(state = INITIAL_STATE, action) {  

  if (action.type === 'SET_PESSOAS') {
    return {
      ...state,
      pessoas: action.pessoas
    }
  }
  
  return state
}

export default pessoaReducer;