import * as React from 'react';
import PropTypes from 'prop-types';
import * as styles from './styles.css';

export class WordItem extends React.PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  getMean() {
    return this.props.item.mean.join(', ');
  }

  render() {
    const { item } = this.props;
    const { word, ruby } = item;
    let chars = [];
    let global;
    for (let i = 0; i < word.length; i++) {
      chars.push({ ch: word[i] });
    }
    if (ruby) {
      ruby.forEach((char) => {
        const { rt, offset } = char;
        if (typeof offset === 'number') {
          if (chars[offset] === undefined) {
            console.log(`Invalid format. (word: ${item.word})`);
          } else {
            chars[offset].rt = rt;
          }
        } else {
          global = rt;
        }
      })
    }

    if (global) {
      return (
        <li className={styles.item}>
          <div className={styles.word}>
            <ruby>
              {word}<rp>(</rp><rt>{global}</rt><rp>)</rp>
            </ruby>
          </div>
          <div className={styles.mean}>
            {this.getMean()}
          </div>
        </li>
      )
    } else {
      let elements = [];
      let ruby = [];
      let rubyCount = 0;
      let string = '';
      chars.forEach((char, idx) => {
        if (char.rt) {
          if (string.length) {
            elements.push(React.createElement("span", {}, string));
            string = [];
          }
          ruby.push(char.ch);
          ruby.push(React.createElement("rp", {}, "("));
          ruby.push(React.createElement("rt", {}, char.rt));
          ruby.push(React.createElement("rp", {}, ")"));
          if (idx === chars.length - 1) {
            elements.push(React.createElement("ruby", {}, ruby));
            rubyCount += 1;
            ruby = [];
          }
        } else {
          if (ruby.length) {
            elements.push(React.createElement("ruby", {}, ruby));
            rubyCount += 1;
            ruby = [];
          }
          string += char.ch;
          if (idx === chars.length - 1) {
            elements.push(React.createElement("span", {}, string));
            string = [];
          }
        }
      });
      const wrapper = React.createElement("div", { className: `${styles.word} ${rubyCount === 0 ? styles.emptyRuby : ''}` }, elements);
      return React.createElement("li", { className: styles.item }, [
        wrapper,
        React.createElement("div", { className: styles.mean }, this.getMean())
      ]);
    }
  }
}
