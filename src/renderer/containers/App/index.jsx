import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
// import { bindActionCreators } from 'redux';
import { TopBar } from 'renderer/containers/TopBar';
import { Button } from 'renderer/components/Button';
import * as AppActions from 'renderer/redux/actions/App';
import Event from 'Event';
import * as styles from './styles.css';

const { ipcRenderer } = window.require('electron');

export class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    ipcRenderer.on(Event.SENDLIST, (event, args) => {
      this.props.updateList(args);
    });
    ipcRenderer.send(Event.REQUESTLIST);
  }

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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state });

// TODO refac using bindActionCreators
const mapDispatchToProps = (dispatch) => ({
  updateList: (list) => dispatch(AppActions.updateList(list)),
});

export const ConnectedApp = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false },
)(App));
