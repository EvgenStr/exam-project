import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import CONSTANTS from '../../../constants';
import { setOffer, clearAddOfferError } from '../../../actions/actionCreator';
import styles from './OfferForm.module.sass';
import ImageUpload from '../Inputs/ImageUpload/ImageUpload';
import FormInput from '../../FormInput/FormInput';
import Schemas from '../../../validators/validationSchemas';
import Error from '../../Error/Error';

const OfferForm = props => {
  const renderOfferInput = formikProps => {
    if (props.contestType === CONSTANTS.LOGO_CONTEST) {
      return (
        <ImageUpload
          name='offerData'
          onChange={(option, action) => {
            formikProps.setFieldValue('offerData', option);
          }}
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
        />
      );
    }
    return (
      <FormInput
        name='offerData'
        classes={{
          container: styles.inputContainer,
          input: styles.input,
          warning: styles.fieldWarning,
          notValid: styles.notValid,
        }}
        type='text'
        label='your suggestion'
      />
    );
  };

  const setOffer = (values, { resetForm }) => {
    props.clearOfferError();
    const data = new FormData();
    const { contestId, contestType, customerId } = props;
    data.append('contestId', contestId);
    data.append('contestType', contestType);
    data.append('offerData', values.offerData);
    data.append('customerId', customerId);
    props.setNewOffer(data);
    resetForm();
  };

  const { addOfferError, clearOfferError } = props;
  const validationSchema =
    props.contestType === CONSTANTS.LOGO_CONTEST
      ? Schemas.LogoOfferSchema
      : Schemas.TextOfferSchema;
  return (
    <div className={styles.offerContainer}>
      {addOfferError && (
        <Error
          data={addOfferError.data}
          status={addOfferError.status}
          clearError={clearOfferError}
        />
      )}
      <Formik
        onSubmit={setOffer}
        initialValues={{
          offerData: '',
        }}
        validationSchema={validationSchema}
      >
        {formikProps => {
          return (
            <Form className={styles.form}>
              {renderOfferInput(formikProps)}
              {formikProps.isValid && formikProps.dirty && (
                <button type='submit' className={styles.btnOffer}>
                  Send Offer
                </button>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = state => {
  const { addOfferError } = state.contestByIdStore;
  return { addOfferError };
};
const mapDispatchToProps = dispatch => ({
  setNewOffer: data => dispatch(setOffer(data)),
  clearOfferError: () => dispatch(clearAddOfferError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OfferForm);
