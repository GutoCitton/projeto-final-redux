import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <h4>Faça o login para continuar</h4>
      <Link to='/login'>Login</Link>
    </div>
  )
}

export default Home
