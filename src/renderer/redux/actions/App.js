import { createAction } from 'redux-actions';

export const Tpye = {
  UPDATE_LIST: 'UPDATE_LIST',
}

export const updateList = createAction(Tpye.UPDATE_LIST, list => list);
