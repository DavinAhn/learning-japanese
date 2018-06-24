import cx from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';

export class BaseComponent extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
  }

  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  getClassName(...args) {
    const { className } = this.props;
    return cx(...args, className);
  }

  handleClick(any) {
    const { onClick } = this.props;
    if (onClick) {
      onClick(any);
    }
  }
}
