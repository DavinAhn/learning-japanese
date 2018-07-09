import settings from 'electron-settings';
import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { bindActionCreators } from 'redux';
import * as AppActions from 'renderer/redux/actions/App';
import AppSettings from 'common/AppSettings';
import {
  BaseContainer,
  mapStateToProps,
  mapDispatchToProps,
} from 'renderer/containers/Base';
import { windowMinHeight, barHeight } from 'common/Constant';
import { SettingPanel, PanelStyle } from 'renderer/components/SettingPanel';
import { TopBar } from 'renderer/containers/TopBar';
import * as styles from './styles.css';

export class Settings extends BaseContainer {
  constructor(props, context) {
    super(props, context);

    this.changeSetting = this.changeSetting.bind(this);

    let settingPropsList = Object.getOwnPropertyNames(AppSettings).map((key) => {
      const setting = AppSettings[key];
      const defualtValue = settings.get(setting.key);
      let items = setting.case || [];
      let style = PanelStyle.SINGLE;
      if (setting.key === AppSettings.setsToExcloudeInTest.key) {
        items = items.concat(this.getWordAccessor()
          .sets.map((set) => { return { label: set.id, value: set.id }; }));
        style = PanelStyle.MULTI;
      }
      return {
        label: setting.desc,
        settingKey: setting.key,
        defualtValue,
        items,
        style,
      }
    });

    this.state = {
      ...this.defaultState,
      settingPropsList,
    };
  }

  changeSetting(setting) {
    const { settingPropsList } = this.state;
    const settingProps = settingPropsList.find((settingProps) => settingProps.settingKey === setting.key);
    settingProps.defualtValue = setting.value;
    this.setState({ settingPropsList });
    this.props.changeSetting(setting);
  }

  render() {
    const { height, settingPropsList } = this.state;
    return (
      <div>
        <TopBar title="Settings" onBack={() => {
          this.props.history.goBack();
        }} />
        <div className={styles.body}>
          <Scrollbars
            autoHeight
            autoHeightMin={windowMinHeight - barHeight}
            autoHeightMax={height - barHeight}
            renderThumbHorizontal={props => <div {...props} className={styles.scrollThumb} />}
            renderThumbVertical={props => <div {...props} className={styles.scrollThumb} />}
          >
            {settingPropsList.map((settingProps) => (
              <SettingPanel key={`SettingPanel_${settingProps.settingKey}`}
                {...settingProps}
                changeSetting={this.changeSetting} />
            ))}
          </Scrollbars>
        </div>
      </div>
    );
  }
}

const expandMapDispatchToProps = (dispatch) => ({
  ...mapDispatchToProps(dispatch),
  changeSetting: (key, value) => dispatch(AppActions.changeSetting(key, value)),
});

export const ConnectedSettings = withRouter(connect(
  mapStateToProps,
  expandMapDispatchToProps,
  null,
  { pure: false },
)(Settings));
