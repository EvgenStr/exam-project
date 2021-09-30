import React from 'react';
import { Formik, Field } from 'formik';
import { isAfter, formatDistance } from 'date-fns';
import DateField from './DateField';

const initialValues = {
  name: '',
  date: '',
};

function CreateEventForm () {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log(values);
          if (isAfter(values.date, new Date())) {
            // console.log('TRUE', formatDistance(values.date, new Date()));
            console.log('TRUE', localStorage.getItem('events'));
          }

          // actions.resetForm()
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Field type='text' name='name' placeholder='Event Name' />
            {props.errors.name && <div id='feedback'>{props.errors.name}</div>}
            <DateField name='date' />
            <button type='submit'>Create Event</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default CreateEventForm;
