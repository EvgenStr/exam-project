import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  resetPasswordConfirmAction,
  clearResetPasswordErrorAction,
} from '../../actions/actionCreator';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import styles from './ConfirmationResetPassword.module.sass';

function ConfirmationResetPassword () {
  const { token } = useParams();
  const { data, isFetching, error } = useSelector(state => state.resetPassword);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetPasswordConfirmAction({ token }));
  }, [token, dispatch]);

  return (
    <div className={styles.container}>
      {isFetching && <Spinner />}
      {error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={() => dispatch(clearResetPasswordErrorAction())}
        />
      )}
      {data && <span className={styles.response}>{data}</span>}
    </div>
  );
}
export default ConfirmationResetPassword;
