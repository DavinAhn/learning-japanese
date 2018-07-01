import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'renderer/components/Button';
import {
  BaseContainer,
  mapStateToProps,
  mapDispatchToProps,
} from 'renderer/containers/Base';
import { TopBar } from 'renderer/containers/TopBar';
import * as styles from './styles.css';

export class App extends BaseContainer {
  render() {
    return (
      <div>
        <TopBar title="LJ" />
        <div className={styles.body}>
          <p className={styles.message}>
            Let's enjoy Japanese study.
          </p>
          <Link to={'/learn'}>
            <Button label="학습" />
          </Link>
          <br /><br /><br />
          <Link to={'/test'}>
            <Button label="테스트" />
          </Link>
        </div>
      </div>
    );
  }
}

export const ConnectedApp = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false },
)(App));
