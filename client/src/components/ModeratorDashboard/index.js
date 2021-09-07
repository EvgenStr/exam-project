import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

function ModeratorDashboard () {

  const test = useSelector(state => state);
  const dispatch = useDispatch()
  console.log(test, 'TEST')
  return <div></div>;
}
export default ModeratorDashboard;
