import { api } from "../../api";



export const attPessoas = async(dispatch) => {
  const {data} = await api.get('/pessoa');
  if (data) {
    const action = {
      type: 'SET_PESSOAS',
      pessoas: data
    }
    dispatch(action);
  } else {
    alert('Deu erro na listagem de pessoas');
  }
}