import React, { useLayoutEffect, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Payment from './pages/Payment/Payment';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import Dashboard from './pages/Dashboard/Dashboard';
import ContestPage from './pages/ContestPage/ContestPage';
import UserProfile from './pages/UserProfile/UserProfile';
import PrivateHoc from './components/Hocs/PrivateHoc/PrivateHoc';
import NotFound from './components/NotFound/NotFound';
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
import ConfirmationResetPasswordPage from './pages/ConfirmationResetPasswordPage';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import OnlyNotAuthorizedUserHoc from './components/Hocs/OnlyNotAuthorizedUserHoc/OnlyNotAuthorizedUserHoc';
import EventsPage from './pages/EventsPage';
import CONSTANTS from './constants';
import {
  authActionRefresh,
  addEventBadgeAction,
} from './actions/actionCreator';
import 'react-toastify/dist/ReactToastify.css';

function App () {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events.events);
  useLayoutEffect(() => {
    const refreshToken = window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN);
    if (refreshToken) {
      dispatch(authActionRefresh(refreshToken));
    }
  }, [dispatch]);

  const checkEventReminderTime = () => {
    events.forEach(event => {
      const currentTime = Date.now();
      const reminder = event.reminderDate - currentTime;
      if (reminder > 0 && reminder < 60000) {
        dispatch(addEventBadgeAction());
        toast(`Your event ${event.name} is starting soon`);
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkEventReminderTime();
    }, 60000);
    return () => clearInterval(interval);
  });

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
        <Route
          exact
          path='/password-confirm/:token'
          component={OnlyNotAuthorizedUserHoc(ConfirmationResetPasswordPage)}
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
        <Route exact path='/events' component={PrivateHoc(EventsPage)} />
        <Route component={NotFound} />
      </Switch>
      <ChatContainer />
    </Router>
  );
}

export default App;
