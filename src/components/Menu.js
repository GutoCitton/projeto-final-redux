import React from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { handleLogout } from '../store/actions/AuthActions'
import { useNavigate } from 'react-router'
import styles from './Menu.module.css'



const Menu = ({dispatch}) => {
  const navigate = useNavigate()
  // const {handleLogout, auth} = useContext<any>(AuthContext)
  return (
    <nav className={styles.menu}>
      <ul>
        {/* <li><Link to='/login' onClick={handleLogout}>Login</Link></li> */}
        <li><Link to='/pessoa'>Pessoa</Link></li>
        {/* <li><Link to='/endereco'>Endereço</Link></li> */}
        <li><button onClick={() => handleLogout(dispatch, navigate)} className={styles.btnSair}>Sair</button></li>
      </ul>
    </nav>
  )
}


const mapStateToProps = state => ({
  auth: state.authReducer.auth
});


export default connect(mapStateToProps)(Menu);