import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import FormInput from '../../../Forms/Inputs/FormInput/FormInput';
import styles from './CreateCatalog.module.sass';
import { createCatalog } from '../../../../actions/actionCreator';
import Schemas from '../../../../validators/validationSchemas';

const CreateCatalog = (props) => {
  const click = (values) => {
    const { createCatalog } = props;
    const { addChatId } = props;
    createCatalog({ catalogName: values.catalogName, chatId: addChatId });
  };
  return (
    <Formik
      onSubmit={click}
      initialValues={{ catalogName: '' }}
      validationSchema={Schemas.CatalogSchema}
    >
      <Form className={styles.form}>
        <FormInput
          name="catalogName"
          type="text"
          label="name of catalog"
          classes={{
            container: styles.inputContainer,
            input: styles.input,
            warning: styles.fieldWarning,
            notValid: styles.notValid,
          }}
        />
        <button type="submit">Create Catalog</button>
      </Form>
    </Formik>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createCatalog: (data) => dispatch(createCatalog(data)),
});

const mapStateToProps = (state) => state.chatStore;

export default connect(mapStateToProps, mapDispatchToProps)(CreateCatalog);
