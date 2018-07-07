import * as React from 'react';
import PropTypes from 'prop-types';
import { BaseComponent } from 'renderer/components/Base';
import * as styles from './styles.css';

export class CheckBox extends BaseComponent {
  static propTypes = {
    isChecked: PropTypes.bool,
  };

  static defaultProps = {
    isChecked: false,
    onClick: () => true,
  };

  render() {
    const { isChecked } = this.props;

    return (
      <input
        type="checkbox"
        className={styles.checkbox}
        onClick={this.handleClick}
        defaultChecked={isChecked}
      />
    );
  }
}
