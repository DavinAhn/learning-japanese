import * as React from 'react';
import PropTypes from 'prop-types';
import { CheckBox } from 'renderer/components/CheckBox';
import { Radio } from 'renderer/components/Radio';
import * as styles from './styles.css';

const PanelStyle = {
  SINGLE: 'single',
  MULTI: 'multi',
}

class SettingPanel extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    settingKey: PropTypes.string.isRequired,
    style: PropTypes.oneOf([
      PanelStyle.SINGLE, 
      PanelStyle.MULTI,
    ]),
    defualtValue: PropTypes.any,
    items: PropTypes.array,
    changeSetting: PropTypes.func.isRequired,
  }

  static defaultProps = {
    label: '',
    style: PanelStyle.SINGLE,
    items: [],
  };

  isSelected(value) {
    const { defualtValue, style } = this.props;
    if (style === PanelStyle.SINGLE) {
      if (typeof defualtValue === 'boolean') {
        return defualtValue;
      }
      return defualtValue === value;
    } else {
      return defualtValue.indexOf(value) > -1;
    }
  }

  changeValue(key, newValue) {
    const { changeSetting, defualtValue, style } = this.props;
    if (style === PanelStyle.SINGLE) {
      if (typeof defualtValue === 'boolean') {
        newValue = !defualtValue;
      }
    } else {
      if (this.isSelected(newValue)) {
        newValue = defualtValue.filter((value) => value !== newValue);
      } else {
        newValue = defualtValue.concat(newValue);
      }
    }
    changeSetting({ key, value: newValue });
  }

  renderToItem(label, settingKey) {
    return (
      <div className={styles.body}>
        <div className={styles.item}>
          <CheckBox
            key="CheckBox"
            isChecked={this.isSelected()} 
            onClick={() => {
              this.changeValue(settingKey);
            }} />
          <span className={styles.label}>{label}</span>
        </div>
      </div>
    )
  }

  renderToItems(label, settingKey, items) {
    const { style } = this.props;
    return (
      <div className={styles.body}>
        <div className={styles.topLabel}>{label}</div>
        {
          items.map((item, index) => {
            const value = item.value || item;
            const label = item.label || item;
            if (style === PanelStyle.SINGLE) {
              return (
                <div className={styles.item} key={index}>
                  <Radio
                    key={`Radio_${index}`} 
                    isChecked={this.isSelected(value)} 
                    isReadOnly={true}
                    onClick={() => {
                      this.changeValue(settingKey, value);
                    }} />
                  <span className={styles.label}>{label}</span>
                </div>
              );
            } else {
              return (
                <div className={styles.item} key={index}>
                  <CheckBox
                    key={`CheckBox_${index}`} 
                    isChecked={this.isSelected(value)} 
                    onClick={() => {
                      this.changeValue(settingKey, value);
                    }} />
                  <span className={styles.label}>{label}</span>
                </div>
              );
            }
          })
        }
      </div>
    );
  }

  render() {
    const { label, settingKey, items } = this.props;
    return (
      <div>
        {items.length < 2 
          ? this.renderToItem(label, settingKey) 
          : this.renderToItems(label, settingKey, items)}
      </div>
    )
  }
}

export {
  SettingPanel,
  PanelStyle,
}
