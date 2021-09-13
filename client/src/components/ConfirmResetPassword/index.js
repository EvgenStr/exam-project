import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetPasswordConfirmAction } from '../../actions/actionCreator';
import Spinner from '../Spinner/Spinner';

function ConfirmResetPassword () {
  const { token } = useParams();
  const { data, isFetching, error } = useSelector(state => state.resetPassword);
  const dispatch = useDispatch();
  console.log(token, 'token');
  useEffect(() => {
    dispatch(resetPasswordConfirmAction({token}));
  }, []);

  return <div>TEST</div>;
}
export default ConfirmResetPassword;
