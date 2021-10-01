import React from 'react';
import { Formik, Field } from 'formik';
import { isAfter, formatDistance } from 'date-fns';
import { useDispatch } from 'react-redux';
import { createEventAction } from '../../../actions/actionCreator';
import DateField from './DateField';
import Schemas from '../../../validators/validationSchemas';

const initialValues = {
  name: '',
  date: '',
};

function CreateEventForm () {
  const dispatch = useDispatch();

  const createEvent = values => {
    dispatch(createEventAction(values));
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={Schemas.CreateEventSchema}
        onSubmit={(values, actions) => {
          if (isAfter(values.date, new Date())) {
            createEvent(values);
            // actions.resetForm()
          }
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Field type='text' name='name' placeholder='Event Name' />
            {props.errors.name && <div id='feedback'>{props.errors.name}</div>}
            <DateField name='date' />
            {props.errors.date && <div id='feedback'>{props.errors.date}</div>}
            <button type='submit'>Create Event</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default CreateEventForm;
