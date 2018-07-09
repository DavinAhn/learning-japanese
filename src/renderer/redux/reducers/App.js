import settings from 'electron-settings';
import { handleActions } from 'redux-actions';
import { Type } from 'renderer/redux/actions/App';

export const appReducer = handleActions(
  {
    [Type.UPDATE_LIST]: (state, action) => {
      return {
        ...state,
        list: action.payload,
      };
    },
    [Type.CHANGE_SETTING]: (state, action) => {
      const payload = action.payload;
      const keyComponents = payload.key.split('.');
      const value = payload.value;
      settings.set(keyComponents.join('.'), value);
      return {
        ...state,
        settings: {
          ...state.settings,
          [keyComponents[keyComponents.length - 1]]: value,
        },
      };
    },
  },
  {
    list: [],
    settings: settings.get('app.settings'),
  },
);
