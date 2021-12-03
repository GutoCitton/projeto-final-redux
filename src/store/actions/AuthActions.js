
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



