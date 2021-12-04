
import { connect } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Pessoa from "./pages/Pessoa";
import NotFound from './components/NotFoound'
import Endereco from "./pages/Endereco";

function Routers({auth}) {



  return (
    <BrowserRouter>
      <Header />
        {auth.auth ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pessoa" element={<Pessoa />} />
            <Route path="/endereco" element={<Endereco />} />
            <Route element={<NotFound />} path='*' />
         </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route element={<NotFound />} path='*' />
          </Routes>
        )}
      <Footer />
    </BrowserRouter>
  )
}

const mapStateToProps = state => ({
  auth: state.authReducer.auth
});


export default connect(mapStateToProps)(Routers);
