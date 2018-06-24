import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TopBar } from 'renderer/containers/TopBar';
import { WordList } from 'renderer/components/WordList';
import { windowMaxHeight, barHeight } from 'Constant';
import * as styles from './styles.css';

export class Learn extends React.Component {
  render() {
    return (
      <div>
        <TopBar title="LJ" onBack={() => {
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
            <WordList list={this.props.state.app.list} />
          </Scrollbars>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state });

export const ConnectedLearn = withRouter(connect(
  mapStateToProps,
  null,
  null,
  { pure: false },
)(Learn));
