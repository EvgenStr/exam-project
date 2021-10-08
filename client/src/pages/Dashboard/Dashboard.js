import React from 'react';
import { connect } from 'react-redux';
import CONSTANTS from '../../constants';
import CustomerDashboard from '../../components/Dashboards/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/Dashboards/CreatorDashboard/CreatorDashboard';
import ModeratorDashboard from '../../components/Dashboards/ModeratorDashboard';
import Header from '../../components/Header/Header';

const Dashboard = props => {
  const { role, history } = props;
  return (
    <div>
      <Header />
      {role === CONSTANTS.CUSTOMER ? (
        <CustomerDashboard history={history} match={props.match} />
      ) : role === CONSTANTS.CREATOR ? (
        <CreatorDashboard history={history} match={props.match} />
      ) : (
        <ModeratorDashboard history={history} match={props.match}/>
      )}
    </div>
  );
};

const mapStateToProps = state => state.auth.data;

export default connect(mapStateToProps)(Dashboard);
