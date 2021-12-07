import { useEffect, useState } from "react";
import  { api }  from "../api";
import { Formik, Field, Form, useFormikContext } from 'formik';
import PrintPessoa from "../components/PrintPessoa";
import styles from './Pessoa.module.css'
import { connect } from "react-redux";
import { attPessoas } from "../store/actions/PessoasActions";
import BtnScrollToTop from "../components/ScrollToTop";
import moment from "moment";


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

  const validaCPF = (cpf) => {
    let error;
    if (!cpf) {
      error = 'Campo Obrigatório'
    } else if (cpf.length >= 1 && isNaN(cpf)){
      error = 'Digite um CPF Válido'
    }
    return error;
  }

  const validaEmail = (email) => {
    let error;
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/i;
    if (!email) {
      error = 'Campo Obrigatório'
    } else if (!regexEmail.test(email)) {
      error ='Insira um email válido'
    }

    return error;
  }

  const validaNome = (nome) => {
    let error;
    const regexNome = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/;
    if (!nome) {
      error = 'Campo Obrigatório'
    } else if (!regexNome.test(nome)) {
      error = 'Por favor digite somente letras'
    }

    return error;
  }

  const validaData = (data) => {
    let error;
    if (!data) {
      error = 'Campo Obrigatório'
    } else if (moment().diff(data, 'years') < 18){
      error = 'Precisa ser maior de idade'
    }
    return error;
  }




  

  return (
    <div className={styles.pessoaPage}>
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
      >{({ errors }) => (
        <Form className={styles.boxPessoa}>
          <h1>{idEdicao ? 'Edição' : 'Cadastro'}</h1>
          <div>
            <label htmlFor="nome">Nome</label>
            <Field validate={validaNome} id="nome" name="nome" placeholder="Nome" />
            {errors.nome && <span>{errors.nome}</span>}
          </div>
          <div>
            <label htmlFor="dataNascimento">Data de Nascimento</label>
            <Field validate={validaData} id="dataNascimento" className={styles.dataNascimento} name="dataNascimento" placeholder="Data de Nascimento" type='date' />
            {errors.dataNascimento && <span>{errors.dataNascimento}</span>}
          </div>
          <div >
            <label htmlFor="cpf">CPF</label>
            <Field validate={validaCPF} id="cpf" maxLength='11' name="cpf" placeholder="CPF" />
            {errors.cpf && <span>{errors.cpf}</span>}
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <Field validate={validaEmail} id="email" type='email' name="email" placeholder="E-mail"/>
            {errors.email && <span>{errors.email}</span>}
          </div>
          <FormikContext />
          <button className={styles.btnEnviar} type="submit">Enviar</button>
        </Form >
      )}
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
