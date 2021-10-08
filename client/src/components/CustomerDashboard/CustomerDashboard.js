import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  getContestsForCustomer,
  clearContestList,
  setNewCustomerFilter,
} from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../Contest/ContestBox/ContestBox';
import styles from './CustomerDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';

class CustomerDashboard extends React.Component {
  loadMore = startFrom => {
    this.props.getContests({
      limit: 8,
      offset: startFrom,
      contestStatus: this.props.contestsList.customerFilter,
    });
  };

  componentDidMount () {
    this.getContests();
  }

  getContests = () => {
    this.props.getContests({
      userId: this.props.userId,
      limit: 8,
      contestStatus: this.props.contestsList.customerFilter,
    });
  };

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (
      this.props.contestsList.customerFilter !==
      prevProps.contestsList.customerFilter
    ) {
      this.getContests();
    }
  }

  goToExtended = contest_id => {
    this.props.history.push(`/contest/${contest_id}`);
  };

  setContestList = () => {
    const array = [];
    const { contests } = this.props.contestsList;
    for (let i = 0; i < contests.length; i++) {
      array.push(
        <ContestBox
          data={contests[i]}
          key={contests[i].id}
          goToExtended={this.goToExtended}
        />,
      );
    }
    return array;
  };

  componentWillUnmount () {
    this.props.clearContestsList();
  }

  tryToGetContest = () => {
    this.props.clearContestsList();
    this.getContests();
  };

  render () {
    const {
      contestsList: { customerFilter, error, haveMore },
    } = this.props;
    return (
      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <div
            onClick={() =>
              this.props.newFilter(CONSTANTS.CONTEST_STATUS_ACTIVE)
            }
            className={classNames({
              [styles.activeFilter]:
                CONSTANTS.CONTEST_STATUS_ACTIVE === customerFilter,
              [styles.filter]:
                CONSTANTS.CONTEST_STATUS_ACTIVE !== customerFilter,
            })}
          >
            Active Contests
          </div>
          <div
            onClick={() =>
              this.props.newFilter(CONSTANTS.CONTEST_STATUS_FINISHED)
            }
            className={classNames({
              [styles.activeFilter]:
                CONSTANTS.CONTEST_STATUS_FINISHED === customerFilter,
              [styles.filter]:
                CONSTANTS.CONTEST_STATUS_FINISHED !== customerFilter,
            })}
          >
            Completed contests
          </div>
          <div
            onClick={() =>
              this.props.newFilter(CONSTANTS.CONTEST_STATUS_PENDING)
            }
            className={classNames({
              [styles.activeFilter]:
                CONSTANTS.CONTEST_STATUS_PENDING === customerFilter,
              [styles.filter]:
                CONSTANTS.CONTEST_STATUS_PENDING !== customerFilter,
            })}
          >
            Inactive contests
          </div>
        </div>
        <div className={styles.contestsContainer}>
          {error ? (
            <TryAgain getData={this.tryToGetContest()} />
          ) : (
            <ContestsContainer
              isFetching={this.props.isFetching}
              loadMore={this.loadMore}
              history={this.props.history}
              haveMore={haveMore}
            >
              {this.setContestList()}
            </ContestsContainer>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { contestsList: state.contestsList, userId: state.auth.data.id };
};

const mapDispatchToProps = dispatch => ({
  getContests: data => dispatch(getContestsForCustomer(data)),
  clearContestsList: () => dispatch(clearContestList()),
  newFilter: filter => dispatch(setNewCustomerFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
