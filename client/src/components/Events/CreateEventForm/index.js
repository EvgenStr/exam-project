import React from 'react';
import { Formik, Field } from 'formik';
import { isAfter, formatDistance } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { createEventAction } from '../../../actions/actionCreator';
import DateField from './DateField';
import Schemas from '../../../validators/validationSchemas';

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
    <div>
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
          <form onSubmit={props.handleSubmit}>
            <Field type='text' name='name' placeholder='Event name' />
            {props.errors.name && <div id='feedback'>{props.errors.name}</div>}
            <DateField name='endDate' placeholderText='Event date' />
            {props.errors.endDate && (
              <div id='feedback'>{props.errors.endDate}</div>
            )}
            <DateField name='reminderDate' placeholderText='Reminder date' />
            {props.errors.reminderDate && (
              <div id='feedback'>{props.errors.reminderDate}</div>
            )}
            <button type='submit'>Create Event</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default CreateEventForm;
