import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'
// import imagem from '../images/Imagem-artigo-1-pe7vdq0qw1ikh8k2476ep58nhrghqqqpci77qtmvv0.png'

function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.h1Container}>
        <h1>Home</h1>
      </div>
      <h4>Faça o login para continuar</h4>
      <div className={styles.linkContainer}>
        <Link to='/login'><button>Login</button></Link>
      </div>
      <div>
        {/* <img src={imagem} width='500pxpx'/> */}
      </div>
    </div>
  )
}

export default Home
