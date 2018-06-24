import * as React from 'react';
import PropTypes from 'prop-types';
import { WordItem } from 'renderer/components/WordItem';
import * as styles from './styles.css';

export class WordSection extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      shown: false,
    };
  }

  render() {
    const { label, list } = this.props;
    return (
      <ul className={styles.section}>
        <div className={styles.sectionTitle} onClick={() => {
          this.setState({ shown: !this.state.shown })
        }}>
          {label} ({list.length})
        </div>
        <hr />
        {this.state.shown ? list.map((item, idx) => (
          <WordItem key={`WordItem_${idx}`} item={item} />
        )) : ''}
      </ul>
    );
  }
}
