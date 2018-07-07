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
      const key = payload.key;
      const value = payload.value;
      settings.set(key, value);
      return {
        ...state,
        settings: {
          ...state.settings,
          key: value,
        },
      };
    },
  },
  {
    list: [],
    settings: settings.get('app.settings'),
  },
);
