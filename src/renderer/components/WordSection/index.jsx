import * as React from 'react';
import PropTypes from 'prop-types';
import { WordItem } from 'renderer/components/WordItem';
import * as styles from './styles.css';

export class WordSection extends React.PureComponent {
  static propTypes = {
    section: PropTypes.object.isRequired,
    options: PropTypes.object,
  }

  static defaultProps = {
    options: {},
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      shown: false,
    };
  }

  render() {
    const { section, options } = this.props;
    return (
      <ul className={styles.section}>
        <div className={styles.sectionTitle} onClick={() => {
          this.setState({ shown: !this.state.shown })
        }}>
          {section.key} ({section.wordCount})
        </div>
        <hr />
        {this.state.shown ? section.words.map((word) => (
          <WordItem key={`WordItem_${word.hash}`} word={word} options={options} />
        )) : ''}
      </ul>
    );
  }
}
