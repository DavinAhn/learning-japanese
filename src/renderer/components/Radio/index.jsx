import * as React from 'react';
import PropTypes from 'prop-types';
import { BaseComponent } from 'renderer/components/Base';
import * as styles from './styles.css';

export class Radio extends BaseComponent {
  static propTypes = {
    isChecked: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    isChecked: false,
    isReadOnly: false,
    onClick: () => true,
  };

  render() {
    const { isChecked, isReadOnly } = this.props;
    return (
      <input
        type="radio"
        className={styles.radio}
        onClick={this.handleClick}
        {...(isReadOnly 
          ? { readOnly: isReadOnly, checked: isChecked } 
          : { defaultChecked: isChecked })}
      />
    );
  }
}
