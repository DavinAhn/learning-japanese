import { BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import {
  windowMinWidth,
  windowMinHeight,
  windowDefaultWidth,
  windowDefaultHeight,
} from 'common/Constant';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

export default class Window {
  static getDefaultConfig() {
    return {
      x: undefined,
      y: undefined,
      width: windowDefaultWidth,
      minWidth: windowMinWidth,
      height: windowDefaultHeight,
      minHeight: windowMinHeight,
      minimizable: true,
      maximizable: false,
      fullscreenable: false,
      show: false,
      frame: false,
      backgroundColor: '#e6e8eb',
    };
  }

  static create(filePath, config) {
    const window = new BrowserWindow({
      ...this.getDefaultConfig(),
      ...(config || {}),
    });
    window.loadURL(url.format({
      pathname: filePath,
      protocol: 'file:',
      slashes: true,
    }));
    return window;
  }

  static getMainWindow() {
    return mainWindow;
  }

  static loadMainWindow() {
    const filePath = path.resolve(__dirname, 'dist', 'index.html');
    const window = this.create(filePath);
    window.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
    });
    window.once('ready-to-show', () => {
      window.show();
    });

    mainWindow = window;
    return window;
  }
}
