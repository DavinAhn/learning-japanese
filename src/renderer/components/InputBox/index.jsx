import * as React from 'react';
import PropTypes from 'prop-types';
import { BaseComponent } from 'renderer/components/Base';
import * as styles from './styles.css';

export const InputBoxState = {
  none: 'none',
  right: 'right',
  wrong: 'wrong',
}

export class InputBox extends BaseComponent {
  constructor(props, context) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    id: PropTypes.string,
    placeHolder: PropTypes.string,
    onChangeValue: PropTypes.func,
    isReadOnly: PropTypes.bool,
    state: PropTypes.oneOf([
      InputBoxState.none,
      InputBoxState.right,
      InputBoxState.wrong,
    ]),
  }

  static defaultProps = {
    placeHolder: '',
    isReadOnly: false,
    state: InputBoxState.none,
  };

  getClassName() {
    const { state } = this.props;
    let stateStyle = '';
    if (state === InputBoxState.right) {
      stateStyle = styles['input--right'];
    } else if (state === InputBoxState.wrong) {
      stateStyle = styles['input--wrong'];
    }
    return super.getClassName(
      styles.input,
      this.props.isDisabled ? styles['input--disabled'] : '',
      stateStyle,
    );
  }

  handleChange(e) {
    const { onChange, onChangeValue } = this.props;
    if (onChange) {
      onChange(e);
    }
    if (onChangeValue) {
      onChangeValue(e, e.currentTarget.value);
    }
  }

  render() {
    const { id, placeholder, isDisabled, isReadOnly } = this.props;
    return (
      <input
        id={id}
        className={this.getClassName()}
        onChange={this.handleChange}
        onBlur={this.handleChange}
        disabled={isDisabled}
        placeholder={placeholder}
        readOnly={isReadOnly}
      />
    );
  }
}
