import * as React from 'react';
import { BaseComponent } from 'renderer/components/Base';
import PropTypes from 'prop-types';
import * as styles from './styles.css';

const ButtonColor = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  WHITE: 'white',
}

class Button extends BaseComponent {
  static propTypes = {
    label: PropTypes.string,
    isDisabled: PropTypes.bool,
    color: PropTypes.oneOf([
      ButtonColor.PRIMARY, 
      ButtonColor.SECONDARY,
      ButtonColor.WHITE,
    ]),
  }

  static defaultProps = {
    label: '',
    isDisabled: false,
    color: ButtonColor.PRIMARY,
  };

  getClassName() {
    const { color } = this.props;
    return super.getClassName(
      styles.button,
      styles[color],
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
  Button,
  ButtonColor,
}
