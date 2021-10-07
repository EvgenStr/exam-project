import React from 'react';
import Button from './Button';
import data from './data.json';
import styles from './ButtonGroup.module.sass';

function ButtonGroup (props) {
  const handler = value => {
    props.setFieldValue('company_url_needed', value);
  };
  const buttons = data.map((e, i) => (
    <Button
      key={i}
      data={e}
      active={props.values.company_url_needed}
      handler={handler}
    />
  ));
  return (
    <div className={styles.container}>
      <input type='hidden' value='yes' name='company_url_needed' />
      <div className={styles.headContainer}>
        <h4 className={styles.mainText}>Do you want a matching domain (.com URL) with your name?</h4>
        <span className={styles.secondaryText}>
          If you want a matching domain, our platform will only accept those
          name suggestions where the domain is available. (Recommended)
        </span>
      </div>
      <div className={styles.buttons}>{buttons}</div>
    </div>
  );
}

export default ButtonGroup;
