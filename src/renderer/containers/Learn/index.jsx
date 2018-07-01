import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  BaseContainer,
  mapStateToProps,
  mapDispatchToProps,
} from 'renderer/containers/Base';
import { windowMaxHeight, barHeight } from 'Constant';
import { TopBar } from 'renderer/containers/TopBar';
import { WordSetList } from 'renderer/components/WordSetList';
import * as styles from './styles.css';

export class Learn extends BaseContainer {
  render() {
    return (
      <div>
        <TopBar title="Learn" onBack={() => {
          this.props.history.goBack();
        }} />
        <div className={styles.body}>
          <Scrollbars
            autoHeight
            autoHeightMin={windowMaxHeight - barHeight}
            autoHeightMax={windowMaxHeight - barHeight}
            renderThumbHorizontal={props => <div {...props} className={styles.scrollThumb} />}
            renderThumbVertical={props => <div {...props} className={styles.scrollThumb} />}
          >
            <WordSetList sets={this.getWordAccessor().sets} />
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export const ConnectedLearn = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false },
)(Learn));
