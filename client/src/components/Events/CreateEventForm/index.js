import React from 'react';
import { Formik, Field } from 'formik';
import { isAfter } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { createEventAction } from '../../../actions/actionCreator';
import DateField from './DateField';
import Schemas from '../../../validators/validationSchemas';
import styles from './CreateEventForm.module.sass';

const initialValues = {
  name: '',
  endDate: '',
  reminderDate: '',
};

function CreateEventForm () {
  const {
    data: { id },
  } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const createEvent = ({ endDate, name, reminderDate }) => {
    dispatch(
      createEventAction({
        name,
        endDate: endDate.getTime(),
        reminderDate: reminderDate.getTime(),
        id,
        startDate: Date.now(),
      }),
    );
  };
  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={Schemas.CreateEventSchema}
        onSubmit={(values, actions) => {
          if (isAfter(values.endDate, new Date())) {
            createEvent(values);
            actions.resetForm();
          }
        }}
      >
        {props => (
          <form className={styles.form} onSubmit={props.handleSubmit}>
            <label htmlFor='name'>Name:</label>
            <Field type='text' name='name' placeholder='Event name' />
            {props.errors.name && props.touched.name && (
              <span className={styles.error}>{props.errors.name}</span>
            )}
            <label htmlFor='endDate'>Event date:</label>
            <DateField name='endDate' placeholderText='Event date' />
            {props.errors.endDate && props.touched.endDate && (
              <span className={styles.error}>{props.errors.endDate}</span>
            )}
            <label htmlFor='endDate'>Reminder date:</label>
            <DateField name='reminderDate' placeholderText='Reminder date' />
            {props.errors.reminderDate && props.touched.reminderDate && (
              <span className={styles.error}>{props.errors.reminderDate}</span>
            )}
            <button className={styles.button} type='submit'>Create Event</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default CreateEventForm;
