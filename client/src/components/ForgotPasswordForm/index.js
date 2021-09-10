import React from 'react';
import { Formik, Form, Field } from 'formik';
import FormInput from './FormInput';
import Schemas from '../../validators/validationSchemas.js';
import style from './ForgotPasswordForm.module.sass';

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

function ForgotPasswordForm () {
  const submitHandler = (values, actions) => {
    alert(JSON.stringify(values, null, 2));
    actions.resetForm();
  };
  return (
    <section className={style.container}>
      <h2 className={style.loginHeader}>LOGIN TO YOUR ACCOUNT</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={Schemas.ForgotPasswordSchema}
        validateOnBlur={true}
        onSubmit={submitHandler}
      >
        {formikProps => {
          return (
            <Form className={style.loginForm}>
              <FormInput name={'email'} formikProps={formikProps}>
                Email Address
              </FormInput>
              <FormInput name={'password'} formikProps={formikProps}>
                Password
              </FormInput>
              <FormInput name={'passwordConfirmation'} formikProps={formikProps}>
                Password confirmation
              </FormInput>
              <Field className={style.submitBtn} type='submit' value='LOGIN' />
            </Form>
          );
        }}
      </Formik>
    </section>
  );
}
export default ForgotPasswordForm;
