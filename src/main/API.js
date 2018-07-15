import axios from 'axios';
import fs from 'fs';
import isOnline from 'is-online';
import path from 'path';
import settings from 'electron-settings';
import { dataPath } from 'main/Path';

const timeout = 1000 * 10;
const base = 'https://api.github.com/repos/DavinAhn/learning-japanese';

const getFetchLimit = () => {
  return settings.get('app.fetchLimit') || 0;
};

const updateFetchLimit = () => {
  const time = new Date().getTime();
  settings.set('app.fetchLimit', time + 1000 * 60 * 10);
};

const fetchData = (dataSHA, updated, error) => {
  isOnline({ timeout: 1000 }).then(online => {
    const time = new Date().getTime();
    if (online && getFetchLimit() < time) {
      axios.get(`${base}/contents/data?ref=master`, { timeout })
        .then((response) => {
          const fileInfo = response.data.find(item => item.name === path.basename(dataPath));
          if (!fileInfo) {
            error('Invaild fileinfo.');
            return;
          }
    
          const sha = fileInfo.sha;
          if (dataSHA && dataSHA === sha) {
            updateFetchLimit();
            updated(false, sha);
            return;
          }
    
          const downloadURL = fileInfo.download_url;
          if (!downloadURL) {
            error('Invaild download url.');
            return;
          }
    
          axios.get(downloadURL, { timeout, responseType: 'stream' })
            .then((response) => {
              const stream = response.data.pipe(fs.createWriteStream(dataPath));
              stream.on('finish', () => {
                updateFetchLimit();
                updated(true, sha);
              });
              stream.on('error', (e) => {
                error(e);
              });
            })
            .catch((e) => {
              error(e);
            });
        })
        .catch((e) => {
          error(e);
        });
    } else {
      updated(false, dataSHA);
    }
  });
};

export default { fetchData }
