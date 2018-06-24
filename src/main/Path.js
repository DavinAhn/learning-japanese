import { app } from 'electron';
import path from 'path';

const userDataPath = app.getPath('userData');
const dataPath = path.join(userDataPath, 'data.dat');

export { userDataPath, dataPath }
