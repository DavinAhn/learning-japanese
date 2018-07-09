import { createAction } from 'redux-actions';

export const Type = {
  UPDATE_LIST: 'UPDATE_LIST',
  CHANGE_SETTING: "CHANGE_SETTING"
}

export const updateList = createAction(Type.UPDATE_LIST);
export const changeSetting = createAction(Type.CHANGE_SETTING);
