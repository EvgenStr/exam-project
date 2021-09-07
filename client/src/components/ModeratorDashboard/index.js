import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moderationActionGetOffers } from '../../actions/actionCreator';

function ModeratorDashboard () {
  const test = useSelector(state => state.moderationOffers);
  const dispatch = useDispatch();
  console.log(test, 'TEST');
  useEffect(() => {
    console.log('ACTION');
    dispatch(moderationActionGetOffers());
  }, []);
  return <div></div>;
}
export default ModeratorDashboard;
