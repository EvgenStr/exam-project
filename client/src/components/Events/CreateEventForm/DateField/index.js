import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useField, useFormikContext } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';

function DateField ({ ...props }) {
  const [startDate, setStartDate] = useState( Date.now());
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  const changeHandler = date => {
    // const timestamp = new Date(date).getTime()
    // console.log(timestamp, 'timestamp', Date.now())
    setStartDate(date);
    setFieldValue(field.name, date);
  };
  return (
    <div>
      <DatePicker
        {...props}
        selected={startDate}
        onChange={changeHandler}
        timeInputLabel='Time:'
        dateFormat='MM/dd/yyyy H:mm'
        showTimeInput
        minDate={Date.now()}
      />
    </div>
  );
}

export default DateField;
