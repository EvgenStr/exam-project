import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetPasswordConfirmAction } from '../../actions/actionCreator';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import styles from './ConfirmResetPassword.module.sass';

function ConfirmResetPassword () {
  const { token } = useParams();
  const { data, isFetching, error } = useSelector(state => state.resetPassword);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetPasswordConfirmAction({ token }));
  }, []);

  return (
    <div className={styles.container}>
      {isFetching && <Spinner />}
      {error && <Error data={error.data} status={error.status} />}
      {data && <span>{data}</span>}
    </div>
  );
}
export default ConfirmResetPassword;
