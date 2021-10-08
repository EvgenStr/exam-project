import React from 'react';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import { sendMessageAction } from '../../../../actions/actionCreator';
import styles from './ChatInput.module.sass';
import CONSTANTS from '../../../../constants';
import FormInput from '../../../Forms/Inputs/FormInput/FormInput';
import Schemas from '../../../../validators/validationSchemas';

const ChatInput = (props) => {
  const submitHandler = (values, { resetForm }) => {
    props.sendMessage({
      messageBody: values.message,
      recipient: props.interlocutor.id,
      interlocutor: props.interlocutor,
    });
    resetForm();
  };

  return (
    <div className={styles.inputContainer}>
      <Formik
        onSubmit={submitHandler}
        initialValues={{ message: '' }}
        validateOnBlur ={false}
        validationSchema={Schemas.MessageSchema}
      >
        <Form className={styles.form}>
          <FormInput
            name="message"
            type="text"
            label="message"
            classes={{
              container: styles.container,
              input: styles.input,
              notValid: styles.notValid,
            }}
          />
          <button type="submit">
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}send.png`} alt="send Message" />
          </button>
        </Form>
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { interlocutor } = state.chatStore;
  const { data } = state.auth;
  return { interlocutor, data };
};

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (data) => dispatch(sendMessageAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
