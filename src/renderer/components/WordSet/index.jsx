import * as React from 'react';
import PropTypes from 'prop-types';
import { WordSection } from 'renderer/components/WordSection';
import * as styles from './styles.css';

export class WordSet extends React.PureComponent {
  static propTypes = {
    set: PropTypes.object.isRequired,
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
    const { set, options } = this.props;
    return (
      <ul className={styles.set}>
        <div className={styles.setTitle} onClick={() => {
          this.setState({ shown: !this.state.shown })
        }}>
          {set.id} ({set.wordCount})
        </div>
        <hr />
        {this.state.shown ? set.sections.map((section) => (
          <WordSection key={`WordSection_${section.hash}`} section={section} options={options} />
        )) : ''}
      </ul>
    );
  }
}
