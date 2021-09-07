import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function OffersList () {
  const { offers, count, isFetching, errors } = useSelector(
    state => state.moderationOffers,
  );
  return <div>offers list {JSON.stringify(offers)}</div>;
}
export default OffersList;
