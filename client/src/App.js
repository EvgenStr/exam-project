import React, { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Payment from './pages/Payment/Payment';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import Dashboard from './pages/Dashboard/Dashboard';
import ContestPage from './pages/ContestPage/ContestPage';
import UserProfile from './pages/UserProfile/UserProfile';
import PrivateHoc from './components/PrivateHoc/PrivateHoc';
import NotFound from './components/NotFound/NotFound';
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import OnlyNotAuthorizedUserHoc from './components/OnlyNotAuthorizedUserHoc/OnlyNotAuthorizedUserHoc';
import CONSTANTS from './constants';
import { authActionRefresh } from './actions/actionCreator';
import 'react-toastify/dist/ReactToastify.css';

function App () {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const refreshToken = window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN);
    if (refreshToken) {
      dispatch(authActionRefresh(refreshToken));
    }
  }, [dispatch]);
  return (
    <Router>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route
          exact
          path='/login'
          component={OnlyNotAuthorizedUserHoc(LoginPage)}
        />
        <Route
          exact
          path='/registration'
          component={OnlyNotAuthorizedUserHoc(RegistrationPage)}
        />
        <Route
          exact
          path='/password-reset'
          component={OnlyNotAuthorizedUserHoc(ForgotPasswordPage)}
        />
        <Route exact path='/payment' component={PrivateHoc(Payment)} />
        <Route
          exact
          path='/startContest'
          component={PrivateHoc(StartContestPage)}
        />
        <Route
          exact
          path='/startContest/nameContest'
          component={PrivateHoc(ContestCreationPage, {
            contestType: CONSTANTS.NAME_CONTEST,
            title: 'Company Name',
          })}
        />
        <Route
          exact
          path='/startContest/taglineContest'
          component={PrivateHoc(ContestCreationPage, {
            contestType: CONSTANTS.TAGLINE_CONTEST,
            title: 'TAGLINE',
          })}
        />
        <Route
          exact
          path='/startContest/logoContest'
          component={PrivateHoc(ContestCreationPage, {
            contestType: CONSTANTS.LOGO_CONTEST,
            title: 'LOGO',
          })}
        />
        <Route exact path='/dashboard' component={PrivateHoc(Dashboard)} />
        <Route exact path='/contest/:id' component={PrivateHoc(ContestPage)} />
        <Route exact path='/account' component={PrivateHoc(UserProfile)} />
        <Route component={NotFound} />
      </Switch>
      <ChatContainer />
    </Router>
  );
}

export default App;
