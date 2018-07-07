import axios from 'axios';
import fs from 'fs';
import isOnline from 'is-online';
import path from 'path';
import { dataPath } from 'main/Path';

const fetchInterval = 1000 * 60 * 10;
const timeout = 1000 * 10;
const base = 'https://api.github.com/repos/DavinAhn/learning-japanese';

let limit = 0;

const fetchData = (dataSHA, updated, error) => {
  let time = new Date().getTime();
  isOnline({ timeout: 1000 }).then(online => {
    if (!online && limit < time) {
      axios.get(`${base}/contents/data?ref=master`, { timeout })
        .then((response) => {
          const fileInfo = response.data.find(item => item.name === path.basename(dataPath));
          if (!fileInfo) {
            error('Invaild fileinfo.');
            return;
          }
    
          const sha = fileInfo.sha;
          if (dataSHA && dataSHA === sha) {
            limit = time + fetchInterval;
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
                limit = time + fetchInterval;
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
