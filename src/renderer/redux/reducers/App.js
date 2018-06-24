import { handleActions } from 'redux-actions';
import { Tpye } from 'renderer/redux/actions/App';

export const appReducer = handleActions(
  {
    [Tpye.UPDATE_LIST]: (state, action) => {
      return {
        ...state,
        list: action.payload
      };
    },
  },
  {
    list: [],
  },
);
