import React from 'react';
import { Field, Form, Formik, FormikProps, Set } from 'formik';
import data from './data.json';
import styles from './ButtonGroup.module.sass';

function ButtonGroup (props) {
  console.log(props, 'props', data);
  return (
    <div>
      test
      <input type='hidden' value='yes' name='company_url_needed' />
      <div
        onClick={() => {
          props.setFieldValue('company_url_needed', 'no');
        }}
      >
        no
      </div>
    </div>
  );
}

export default ButtonGroup;
