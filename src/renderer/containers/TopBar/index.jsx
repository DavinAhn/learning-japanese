import * as React from 'react';
import { IconButton, IconType } from 'renderer/components/IconButton';
import PropTypes from 'prop-types';
import * as styles from './styles.css';

// https://github.com/electron/electron/issues/7300
const { remote } = window.require('electron');

export class TopBar extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  }

  static defaultProps = {
    title: '',
  }

  render() {
    return (
      <div className={styles.bar}>
        <div className={styles.title}>{this.props.title}</div>
        <div className={styles.buttons}>
          <IconButton icon={IconType.MINIMIZE} onClick={() => {
            remote.getCurrentWindow().minimize();
          }} />
          <IconButton icon={IconType.close} onClick={() => {
            remote.getCurrentWindow().close();
          }} />
        </div>
      </div>
    );
  }
}

