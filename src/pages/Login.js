import React from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { handleLogin } from '../store/actions/AuthActions'
import { useNavigate } from 'react-router';
import styles from '../pages/Login.module.css'


function Login({ auth, dispatch }) {
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      usuario: '',
      senha: '',
    },
    onSubmit: values => {
      handleLogin(values, dispatch, navigate)
      // navigate('/pessoa')
    },
  });

  return (
    <div className={styles.pageContainer}>
      <div className={styles.divH1}>
        <h1>Faça Login</h1>
      </div>


      <form onSubmit={formik.handleSubmit}>
        <div className={styles.containerLogin}>
          <div className={styles.containerLoginBox}>
            <div className={styles.inputContainer}>
              <label htmlFor="usuario">Login</label>
              <input id="usuario" name="usuario" type="text" onChange={formik.handleChange} value={formik.values.usuario} />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="senha">Senha</label>
              <input id="senha" name="senha" type="password" onChange={formik.handleChange} value={formik.values.senha} />
            </div>
            <button className={styles.btnEntrar} type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.authReducer.auth
});

export default connect(mapStateToProps)(Login)
