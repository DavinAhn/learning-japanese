import { app } from 'electron';
import path from 'path';

const userDataPath = app.getPath('userData');
const dataPath = path.join(userDataPath, 'data.json');

export { userDataPath, dataPath }
