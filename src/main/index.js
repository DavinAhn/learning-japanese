import { app, Menu, ipcMain } from 'electron';
import settings from 'electron-settings';
import fs from 'fs';
import API from 'main/API';
import { dataPath } from 'main/Path';
import Event from 'Event';
import Window from 'main/Window';

const isDev = process.env.ELECTRON_ENV === 'development';
let watcher = null;

const loadDevToolsIfNeeded = () => {
  if (isDev) {
    const window = Window.getMainWindow();
    window.webContents.openDevTools();
    const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
    [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach(extension => {
      installExtension(extension)
        .then((name) => console.log(`Added Extension: ${name}`))
        .catch((err) => console.log(`An error occurred: ${err}`));
    });
    watcher = require('chokidar').watch(`${__dirname}/dist`);
    watcher.on('change', () => {
      window.reload();
    });
  }
};

const fetchData = (completion) => {
  const dataSHA = settings.get('app.dataSHA');
  API.fetchData(dataSHA, (updated, sha) => {
    if (updated) {
      settings.set('app', {
        dataSHA: sha
      });
    }
    fs.readFile(dataPath, { encoding: 'utf8' }, (error, data) => {
      if (error) {
        completion([], error);
      } else {
        try {
          completion(JSON.parse(data));
        } catch (e) {
          completion([], e);
        }
      }
    });
  }, (error) => {
    completion([], error);
  });
};

const subscribeEvents = () => {
  ipcMain.on(Event.REQUESTLIST, (event, args) => {
    fetchData((list, error) => {
      if (error) {
        console.log(error);
      } else {
        event.sender.send(Event.SENDLIST, list);
      }
    });
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  Window.loadMainWindow();
  Menu.setApplicationMenu(null);
  loadDevToolsIfNeeded();
  subscribeEvents();
});

app.on('quit', () => {
  if (watcher !== null) {
    watcher.close();
    watcher = null;
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (Window.getMainWindow() === null) {
    Window.loadMainWindow();
  }
});
