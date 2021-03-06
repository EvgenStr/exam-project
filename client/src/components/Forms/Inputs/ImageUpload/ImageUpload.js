import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { useField } from 'formik';
import CONSTANTS from '../../../../constants'

const ImageUpload = props => {
  const fileInput = useRef(null);
  const [selectedFile] = useState(undefined);
  const [field] = useField(props.name);
  const { uploadContainer, inputContainer, imgStyle } = props.classes;
  const onChange = e => {
    const node = window.document.getElementById('imagePreview');
    const file = e.target.files[0];
    // const imageType = /image.*/;
    if (file.type.size > CONSTANTS.MAX_IMAGE_SIZE) {
      e.target.value = '';
    } else {
      props.onChange(file);
      const reader = new FileReader();
      reader.onload = () => {
        node.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.png, *.gif, *.jpeg)</span>
        <input
          ref={fileInput}
          {...field}
          id='fileInput'
          type='file'
          accept='.jpg, .png, .jpeg'
          value={selectedFile}
          onChange={onChange}
        />
        <label htmlFor='fileInput'>Chose file</label>
      </div>
      <img
        id='imagePreview'
        className={classNames({ [imgStyle]: !!field.value })}
        alt='user'
      />
    </div>
  );
};

export default ImageUpload;
