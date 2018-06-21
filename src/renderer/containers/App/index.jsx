import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
// import { bindActionCreators } from 'redux';
import { TopBar } from 'renderer/containers/TopBar';
import * as styles from './styles.css';

export class App extends React.Component {
  render() {
    return (
      <div>
        <TopBar title="LJ" />
        <div className={styles.body}>
          Let's enjoy Japanese study.
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state });

// TODO refac using bindActionCreators
// const mapDispatchToProps = (dispatch) => ({});
export const ConnectedApp = withRouter(connect(
  mapStateToProps,
  // mapDispatchToProps,
  null,
  null,
  { pure: false },
)(App));
