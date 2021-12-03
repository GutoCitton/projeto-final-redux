
import { api } from "../../api";



export const handleLogin = async(values, dispatch, navigate) => {
  const {data} = await api.post('/auth', values);
  if (data) {
    api.defaults.headers.common['Authorization'] = data;
    localStorage.setItem('token', data);
    // window.location.href = '/pessoa'
    navigate('/pessoa')
    const logado = {
      type: 'SET_LOGIN',
      token: data,
      auth: true,
      loading: false
    }
    dispatch(logado);
  } else {
    alert('Deu erro no login');
  }
}


export const handleLogout = (dispatch, navigate) => {

  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
  navigate('/login')

  const deslogado = {
    type: 'SET_LOGOUT',
    token: null,
    auth: false,
    loading: false
  }
  dispatch(deslogado)
}



