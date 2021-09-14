import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  resetPasswordAction,
  clearResetPasswordErrorAction,
} from '../../actions/actionCreator';
import { Formik, Form, Field } from 'formik';
import FormInput from '../FormInput/FormInput';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import Schemas from '../../validators/validationSchemas.js';
import styles from './ForgotPasswordForm.module.sass';

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

function ForgotPasswordForm () {
  const { data, isFetching, error } = useSelector(state => state.resetPassword);
  const dispatch = useDispatch();
  const submitHandler = (values, actions) => {
    const { email, password } = values;
    dispatch(resetPasswordAction({ email, password }));
  };

  const formInputClasses = {
    container: styles.inputContainer,
    input: styles.formInput,
    warning: styles.fieldWarning,
    notValid: styles.notValid,
    valid: styles.valid,
  };
  return (
    <section className={styles.container}>
      {isFetching && <Spinner />}
      {error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={() => dispatch(clearResetPasswordErrorAction())}
        />
      )}
      {!isFetching && !data && (
        <>
          <h2 className={styles.loginHeader}>RESET YOUR PASSWORD</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={Schemas.ForgotPasswordSchema}
            validateOnBlur={true}
            onSubmit={submitHandler}
          >
            <Form className={styles.passwordForm}>
              <FormInput
                classes={formInputClasses}
                name='email'
                type='text'
                label='Email Address'
              />
              <FormInput
                classes={formInputClasses}
                name='password'
                type='password'
                label='New Password'
              />
              <FormInput
                classes={formInputClasses}
                name='passwordConfirmation'
                type='password'
                label='New Password Confirmation'
              />
              <Field
                className={styles.submitBtn}
                type='submit'
                value='SEND PASSWORD RESET EMAIL'
              />
            </Form>
          </Formik>
        </>
      )}
      {!isFetching && data && <span>{data}</span>}
    </section>
  );
}
export default ForgotPasswordForm;
