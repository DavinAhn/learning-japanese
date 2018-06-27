import axios from 'axios';
import fs from 'fs';
import isOnline from 'is-online';
import path from 'path';
import { dataPath } from 'main/Path';

const timeout = 1000 * 10;
const base = 'https://api.github.com/repos/DavinAhn/learning-japanese';

const fetchData = (dataSHA, updated, error) => {
  isOnline({ timeout: 1000 }).then(online => {
    if (online) {
      axios.get(`${base}/contents/data?ref=master`, { timeout })
        .then((response) => {
          const fileInfo = response.data.find(item => item.name === path.basename(dataPath));
          if (!fileInfo) {
            error('Invaild fileinfo.');
            return;
          }
    
          const sha = fileInfo.sha;
          if (dataSHA && dataSHA === sha) {
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
