import { withFormik } from 'formik';
import * as Yup from 'yup';
import BaseForm from './BaseForm';
import { toast } from 'react-toastify';


import api from '../../services/api';

const FormCliente =
  withFormik ({
  mapPropsToValues({
    email,
    name,
    password,
  }) {
    return {
      email: '',
      name: '',
      password: '',
      passwordConfirmation: '',
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Este não é um email válido.').required('Este campo é obrigatório.'),
    name: Yup.string().required('Este campo é obrigatório.'),
    password: Yup.string().required('Este campo é obrigatório').min('8', `Sua senha deve conter ao menos 8 caracteres.`),
    passwordConfirmation: Yup.string()
     .oneOf([Yup.ref('password'), null], 'A senha não corresponde à anterior.')
  }),
  async handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    try {
      const thisUser = {
        email: values.email,
        name: values.name,
        password: values.password,
      }

      const { _id } = await api.post(`/user`, thisUser);

      // props.dispatch(addProduct(values));
      // setSubmitting(false);
      
      resetForm();
      toast.success(`Cadastro realizado com sucesso! Faça seu login :)`);
    }catch(err) {
      toast.error('Esse email ja existe!');
    }
    setSubmitting(false);
  }//close handleSubmit
})(BaseForm);



export default FormCliente;
