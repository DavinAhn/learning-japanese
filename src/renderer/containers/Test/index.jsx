import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { seedrandom } from 'seedrandom';
import {
  BaseContainer,
  mapStateToProps,
  mapDispatchToProps,
} from 'renderer/containers/Base';
import { windowMinHeight, barHeight } from 'common/Constant';
import { Button } from 'renderer/components/Button';
import { ProblemItem } from 'renderer/components/ProblemItem';
import { TopBar } from 'renderer/containers/TopBar';
import * as styles from './styles.css';

export class Test extends BaseContainer {
  constructor(props, context) {
    super(props, context);

    let result = this.makeProblems();
    let answers = [];
    for (let i = 0; i < result.length; i += 1) {
      answers.push({});
    }
    this.answers = answers;

    this.state = {
      ...this.defaultState,
      seed: result.seed,
      problems: result.problems,
      score: 0,
      scorecard: [],
      isSubmit: false
    };
  }

  makeProblems() {
    const skipSetIds = this.getSettings().setsToExcloudeInTest;
    const words = this.getWordAccessor().getWords(skipSetIds);
    const maxCount = Math.min(this.getSettings().numberOfTestProblems, words.length);
    const problems = [];
    const check = {};
    const seed = parseInt(Date.now() / (1000 * 60), 10);
    Math.seedrandom(seed);
    while (words.length) {
      const idx = parseInt(Math.random() * 100000000, 10) % words.length;
      if (idx >= 0 && !check[idx]) {
        problems.push(words[idx]);
        check[idx] = true;
      }
      if (problems.length >= maxCount) {
        break;
      }
    }
    return { seed, problems, length: problems.length };
  }

  marking() {
    let scorecard = [];
    const { problems } = this.state;
    const normalize = (string) => {
      return string.replace(/\s/g, '');
    };

    this.answers.forEach((answer, idx) => {
      const problem = problems[idx];
      const score = { reading: false, meaning: false };
      if (answer.reading) {
        score.reading = problem.readings.find((reading) => {
          return normalize(answer.reading) === normalize(reading);
        }) !== undefined;
      }
      if (answer.meaning) {
        const result = answer.meaning
          .split(',')
          .map((answer) => {
            return problem.meanings.find((meaning) => {
              return normalize(answer) === normalize(meaning);
            }) !== undefined;
          });
        if (this.getSettings().allowWrongMeaning) {
          score.meaning = result.indexOf(true) > -1;
        } else {
          score.meaning = result.indexOf(false) === -1;
        }
      }
      scorecard.push(score);
    });

    const shouldPerfectAnswer = this.getSettings().shouldPerfectAnswer;
    this.setState({
      isSubmit: true,
      scorecard,
      score: (scorecard
        .map((score) => {
          if (shouldPerfectAnswer) {
            return score.reading && score.meaning;
          }
          return ((score.reading << 0) + (score.meaning << 0));
        })
        .reduce((s1, s2) => s1 + s2, 0) / (problems.length * (shouldPerfectAnswer ? 1 : 2))) * 100
    });
  }

  makeProblemItemProps(problem, idx) {
    const props = {
      key: `ProblemItem_${problem.hash}`,
      num: idx + 1,
      problem,
      onChangeValue: (num, answer) => {
        this.answers[num - 1] = answer;
      },
      options: {
        showFuri: this.getSettings().shownFuriganaWhenTesting,
      }
    };
    const score = this.state.scorecard[idx];
    if (score) {
      return { ...props, score };
    }
    return props;
  }

  render() {
    const { history } = this.props;
    const { height, isSubmit, score, seed, problems } = this.state;
    return (
      <div>
        <TopBar title={`Test - (${seed})`} onBack={() => {
          history.goBack();
        }} />
        <div className={styles.body}>
          <Scrollbars
            autoHeight
            autoHeightMin={windowMinHeight - barHeight}
            autoHeightMax={height - barHeight}
            renderThumbHorizontal={props => <div {...props} className={styles.scrollThumb} />}
            renderThumbVertical={props => <div {...props} className={styles.scrollThumb} />}
          >
            <ul className={styles.list}>
              {problems.map((problem, idx) => (
                <ProblemItem {...this.makeProblemItemProps(problem, idx)} />
              ))}
            </ul>
            <div className={styles.footer}>
              {isSubmit ? (
                <div>
                  <div className={styles.score}>{score}점</div>
                  <Button label="확인 완료" onClick={() => {
                    history.goBack();
                  }} />
                </div>
              )
              : (
                <Button label="제출" onClick={() => {
                  this.marking();
                }} />
              )}
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export const ConnectedTest = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false },
)(Test));
