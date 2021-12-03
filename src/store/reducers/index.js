import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import pessoaReducer from "./PessoasReducer";

export default combineReducers({
  authReducer,
  pessoaReducer
})