import * as React from 'react';
import PropTypes from 'prop-types';
import { WordSet } from 'renderer/components/WordSet';
import * as styles from './styles.css';

export class WordList extends React.PureComponent {
  static propTypes = {
    list: PropTypes.array.isRequired,
  }

  render() {
    const { list } = this.props;
    return (
      <div className={styles.list}>
        {list.map((set, idx) => (
          <WordSet key={`WordSet_${idx}`} set={set} />
        ))}
      </div>
    );
  }
}
