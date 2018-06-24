import * as React from 'react';
import { BaseComponent } from 'renderer/components/Base';
import PropTypes from 'prop-types';
import * as styles from './styles.css';

const IconType = {
  CLOSE: 'close',
  MINIMIZE: 'minimize',
  BACK: 'back',
}

class IconButton extends BaseComponent {
  static propTypes = {
    label: PropTypes.string,
    isDisabled: PropTypes.bool,
    color: PropTypes.oneOf([
      IconType.CLOSE, 
      IconType.MINIMIZE,
      IconType.BACK,
    ]),
  }

  static defaultProps = {
    label: '',
    isDisabled: false,
    icon: IconType.CLOSE,
  };

  getClassName() {
    const { icon } = this.props;
    return super.getClassName(
      styles.button,
      styles[icon],
    );
  }

  render() {
    const { isDisabled, label, children } = this.props;
    return (
      <button
        type="button"
        key={this.props.key}
        className={this.getClassName()}
        onClick={this.handleClick}
        disabled={isDisabled}
      >
        {children ? children : label}
      </button>
    );
  }
}

export {
  IconButton,
  IconType,
}
