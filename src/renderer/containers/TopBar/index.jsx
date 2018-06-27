import * as React from 'react';
import { IconButton, IconType } from 'renderer/components/IconButton';
import PropTypes from 'prop-types';
import * as styles from './styles.css';

// https://github.com/electron/electron/issues/7300
const { remote } = window.require('electron');

export class TopBar extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    onBack: PropTypes.func,
  }

  static defaultProps = {
    title: '',
  }

  render() {
    const { onBack } = this.props;
    return (
      <div className={styles.fixedTop}>
        <div className={styles.bar}>
          <div className={styles.title}>{this.props.title}</div>
          <div className={styles.buttons}>
            {onBack ? 
              <IconButton icon={IconType.BACK} onClick={() => {
                onBack();
              }} /> : ''
            }
            <IconButton icon={IconType.MINIMIZE} onClick={() => {
              remote.getCurrentWindow().minimize();
            }} />
            <IconButton icon={IconType.close} onClick={() => {
              remote.getCurrentWindow().close();
            }} />
          </div>
        </div>
        <div className={styles.line}></div>
      </div>
    );
  }
}

