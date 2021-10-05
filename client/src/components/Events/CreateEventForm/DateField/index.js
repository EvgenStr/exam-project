import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useField, useFormikContext } from 'formik';
import { addYears } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

function DateField ({ ...props }) {
  const [startDate, setStartDate] = useState(Date.now());
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  const changeHandler = date => {
    setStartDate(date);
    setFieldValue(field.name, date);
  };
  return (
    <DatePicker
      {...props}
      selected={startDate}
      onChange={changeHandler}
      timeInputLabel='Time:'
      dateFormat='MM/dd/yyyy H:mm'
      showTimeInput
      minDate={Date.now()}
      maxDate={addYears(Date.now(), 1)}
    />
  );
}

export default DateField;
