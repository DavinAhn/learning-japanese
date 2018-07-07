import * as React from 'react';
import PropTypes from 'prop-types';
import { WordSet } from 'renderer/components/WordSet';
import * as styles from './styles.css';

export class WordSetList extends React.PureComponent {
  static propTypes = {
    sets: PropTypes.array.isRequired,
    options: PropTypes.object,
  }

  static defaultProps = {
    options: {},
  };

  render() {
    const { sets, options } = this.props;
    return (
      <div className={styles.list}>
        {sets.map((set) => (
          <WordSet key={`WordSet_${set.hash}`} set={set} options={options} />
        ))}
      </div>
    );
  }
}
