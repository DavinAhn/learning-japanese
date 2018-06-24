import * as React from 'react';
import PropTypes from 'prop-types';
import { WordSection } from 'renderer/components/WordSection';
import * as styles from './styles.css';

const orders = [
  "a", "i", "u", "e", "o",
  "ka", "ki", "ku", "ke", "ko",
  "sa", "si", "su", "se", "so",
  "ta", "chi", "tsu", "te", "to",
  "na", "ni", "nu", "ne", "no",
  "ha", "hi", "hu", "he", "ho",
  "ma", "mi", "mu", "me", "mo",
  "ya", "yu", "yo",
  "ra", "ri", "ru", "re", "ro",
  "wa", "wo"
]

export class WordSet extends React.PureComponent {
  static propTypes = {
    set: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      shown: true,
    };
  }

  getCount() {
    const { set } = this.props;
    return orders
      .map((key) => (set[key] || []).length)
      .reduce((l1, l2) => l1 + l2, 0);
  }

  renderList() {
    if (!this.state.shown) {
      return false;
    }
    const { set } = this.props;
    let sections = [];
    orders.forEach((key, idx) => {
      const list = set[key];
      if (list) {
        sections.push((
          <WordSection key={`WordSection_${idx}`} label={key} list={list} />
        ));
      }
    });
    if (sections.length) {
      return sections;
    }
    return '';
  }

  render() {
    const { set } = this.props;
    return (
      <ul className={styles.set}>
        <div className={styles.setTitle} onClick={() => {
          this.setState({ shown: !this.state.shown })
        }}>
          {set.num} ({this.getCount()})
        </div>
        <hr />
        {this.renderList()}
      </ul>
    );
  }
}
