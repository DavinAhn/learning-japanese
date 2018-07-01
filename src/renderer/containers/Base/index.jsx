import cx from 'classnames';
import * as React from 'react';
// import { bindActionCreators } from 'redux';
import * as AppActions from 'renderer/redux/actions/App';
import Event from 'Event';
import WordAccessor from 'renderer/utils/WordAccessor';

const { ipcRenderer } = window.require('electron');

export class BaseContainer extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    ipcRenderer.on(Event.SENDLIST, (event, args) => {
      this.props.updateList(args);
    });
    ipcRenderer.send(Event.REQUESTLIST);
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners(Event.SENDLIST);
  }

  getWordAccessor() {
    return new WordAccessor(this.props.state.app.list);
  }

  getClassName(...args) {
    const { className } = this.props;
    return cx(...args, className);
  }
}

export const mapStateToProps = (state) => ({ state });

// TODO refac using bindActionCreators
export const mapDispatchToProps = (dispatch) => ({
  updateList: (list) => dispatch(AppActions.updateList(list)),
});
