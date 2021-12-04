import React from 'react';
import { api } from '../api';
import moment from 'moment';
import styles from './PrintPessoa.module.css';
import { connect } from 'react-redux';
import { scrollToTop } from './ScrollToTop';


const PrintPessoa = ({attList, setIdEdicao, pessoas}) => {

  const deletePessoa = async (idPessoa) => {
    await api.delete(`/pessoa/${idPessoa}`);
    await attList();
  }


  const editPessoa = (idPessoa) => {
    setIdEdicao(idPessoa)
    scrollToTop()
  }

  



  return (
    <div>
      {pessoas.map((pessoa) => (
        <div className={styles.containerPessoa} key={pessoa.idPessoa} style={{margin: 20}}>
          <div className={styles.boxPessoa}>
              <p>Nome:&nbsp;{pessoa.nome}</p>
              <p>CPF:&nbsp;{pessoa.cpf}</p>
              <p>Data de Nascimento:&nbsp;{moment(pessoa.dataNascimento, 'YYYY-MM-DD').format('DD/MM/YYYY') }</p>
              <p>E-mail:&nbsp;{pessoa.email}</p>
              <div>
                <button className={styles.btnApagar} onClick={() => deletePessoa(pessoa.idPessoa)}>Apagar</button>
                <button className={styles.btnApagar} onClick={() => editPessoa(pessoa.idPessoa)}>Editar</button>
              </div>
            </div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => ({
  pessoas: state.pessoaReducer.pessoas
})


export default connect(mapStateToProps)(PrintPessoa);