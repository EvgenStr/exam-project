import React, { useState, useRef } from 'react';
import { Field } from 'formik';

const FieldFileInput = ({ classes, ...rest }) => {
  const fileInput1 = useRef(null);
  const [selectedFile, setSelectedFile] = useState(undefined);
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;

  return (
    <Field name={rest.name}>
      {props => {
        const { field } = props;
        const getFileName = () => {
          if (props.field.value) {
            return props.field.value.name;
          }
          return '';
        };
        const onChange = e => {
          props.form.setFieldValue('file', e.target.files[0]);
        };

        return (
          <div className={fileUploadContainer}>
            <label htmlFor='fileInput' className={labelClass}>
              Choose file
            </label>
            <span id='fileNameContainer' className={fileNameClass}>
              {getFileName()}
            </span>
            <input
              {...field}
              ref={fileInput1}
              className={fileInput}
              id='fileInput'
              type='file'
              value={selectedFile}
              onChange={onChange}
            />
          </div>
        );
      }}
    </Field>
  );
};

export default FieldFileInput;
