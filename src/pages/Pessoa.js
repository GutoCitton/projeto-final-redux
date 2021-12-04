import { useEffect, useState } from "react";
import  { api }  from "../api";
import { Formik, Field, Form, useFormikContext } from 'formik';
import PrintPessoa from "../components/PrintPessoa";
import styles from './Pessoa.module.css'
import { connect } from "react-redux";
import { attPessoas } from "../store/actions/PessoasActions";
import BtnScrollToTop from "../components/ScrollToTop";


const Pessoa = ({pessoas, dispatch}) => {

  const [idEdicao, setIdEdicao] = useState(null);

  const getListPessoas = () => {
    attPessoas(dispatch);
  }

  const findPessoaById = (id) => {
    return pessoas.find(pessoa => pessoa.idPessoa === id)
  }

  useEffect(() => {
    getListPessoas();
  },[]);

  const FormikContext = () => {
    const formik = useFormikContext();
    useEffect(() => {
      if (idEdicao) {
        const pessoaEdicao = findPessoaById(idEdicao);
        formik.setFieldValue('nome', pessoaEdicao?.nome || '');
        formik.setFieldValue('dataNascimento', pessoaEdicao?.dataNascimento || '');
        formik.setFieldValue('cpf', pessoaEdicao?.cpf || '');
        formik.setFieldValue('email', pessoaEdicao?.email || '');
      }
    }, [idEdicao]);
    return null;
  };

  return (
    <div>
      <div className={styles.h1PessoaContainer}>
        <h1 className={styles.h1Pessoa}>Pessoa</h1>
      </div>

      <div className={styles.boxCadastro}>
      
      <Formik 
        initialValues={{
          nome: '',
          dataNascimento: '',
          cpf: '',
          email: ''
        }}

        onSubmit={async (
          values,
          { setSubmitting, resetForm }
        ) => {
            if (idEdicao) {
              await api.put(`/pessoa/${idEdicao}`, values);
              setIdEdicao(null);
            } else {
              await api.post('/pessoa', values);
            }
            setSubmitting(false);
            getListPessoas();
            resetForm();
        }}
      >
        <Form className={styles.boxPessoa}>
          <h1>{idEdicao ? 'Edição' : 'Cadastro'}</h1>
          <div>
            <label htmlFor="nome">Nome</label>
            <Field id="nome" name="nome" placeholder="Nome" />
          </div>
          <div>
            <label htmlFor="dataNascimento">Data de Nascimento</label>
            <Field id="dataNascimento" className={styles.dataNascimento} name="dataNascimento" placeholder="Data de Nascimento" type='date' />
          </div>
          <div>
            <label htmlFor="cpf">CPF</label>
            <Field id="cpf" name="cpf" placeholder="CPF" />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <Field id="email" type='email' name="email" placeholder="E-mail"/>
          </div>
          <FormikContext />
          <button className={styles.btnEnviar} type="submit">Enviar</button>
        </Form >
      </Formik>
    </div>
      <PrintPessoa attList={getListPessoas} setIdEdicao={setIdEdicao}/>
      <BtnScrollToTop />
    </div>
  )
}

const mapStateToProps = state => ({
  pessoas: state.pessoaReducer.pessoas
})

export default connect(mapStateToProps)(Pessoa);
