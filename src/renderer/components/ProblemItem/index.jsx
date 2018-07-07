import * as React from 'react';
import ReactFuri from 'react-furi';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as wanakana from 'wanakana';
import { InputBox, InputBoxState } from 'renderer/components/InputBox';
import * as styles from './styles.css';

export class ProblemItem extends React.PureComponent {
  static propTypes = {
    num: PropTypes.number.isRequired,
    problem: PropTypes.object.isRequired,
    onChangeValue: PropTypes.func.isRequired,
    score: PropTypes.object,
    options: PropTypes.object,
  }

  static defaultProps = {
    options: {},
  };

  get readingInputKey() { return `InputBox_${this.props.problem.hash}_reading`; }

  constructor(props, context) {
    super(props, context);
    this.answer = {};
  }

  componentDidMount() {
    const textInput = document.getElementById(this.readingInputKey);
    wanakana.bind(textInput);
  }

  componentWillUnmount() {
    const textInput = document.getElementById(this.readingInputKey);
    wanakana.unbind(textInput);
  }

  onChangeValue(key, value) {
    const { num, onChangeValue } = this.props;
    this.answer[key] = value;
    onChangeValue(num, this.answer);
  }

  makeInputProps(type, problem) {
    const { score } = this.props;
    const isReadOnly = score !== undefined; 
    let props = {
      type: 'text',
      placeholder: type === 'reading' ? '음' : '뜻',
      onChangeValue: (e, value) => {
        if (!isReadOnly) {
          this.onChangeValue(type, value);
        }
      }
    };
    if (type === 'reading') {
      props = { ...props, id: this.readingInputKey };
    }
    if (score) {
      props = {
        ...props,
        state: score[type] ? InputBoxState.right : InputBoxState.wrong,
        value: `${this.answer[type] || ''} -> ${problem[`${type}s`].join(', ')}`,
      }
    }
    return props;
  }

  render() {
    const Wrapper = styled(ReactFuri.Wrapper)`
      width: 100%;
      display: block;
      font-family: Chig;
      text-align: center;
      vertical-align: middle;
      `;
    const Pair = styled(ReactFuri.Pair)`
      font-family: Chig;
      `;
    const Text = styled(ReactFuri.Text)`
      font-family: Chig;
      font-size: 20px; 
      `;
    const Furi = styled(ReactFuri.Furi)`
      font-family: Chig;
      font-size: 50px;
      `;

    const { num, problem, options } = this.props;
    const showFuri = options.showFuri;
    let props = { word: problem.text };
    if (showFuri) {
      if (problem.furi) {
        props.furi = problem.furi;
      } else {
        props.reading = problem.readings[0];
      }
    }

    return (
      <li className={styles.item}>
        <div className={styles.number}>{num})</div>
        <ReactFuri
          {...props}
          render={({ pairs }) => (
            <Wrapper lang="ja">
              {pairs.map(([furigana, text], index) => (
                <Pair key={index}>
                  {showFuri ? <Text>{furigana}</Text> : ''}
                  <Furi>{text}</Furi>
                </Pair>
              ))}
            </Wrapper>
          )}>
        </ReactFuri>
        <div className={styles.input}>
          <InputBox {...this.makeInputProps('reading', problem)} />
          &nbsp;&nbsp;&nbsp;
          <InputBox {...this.makeInputProps('meaning', problem)} />
        </div>
      </li>
    )
  }
}
