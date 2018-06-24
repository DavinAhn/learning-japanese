const aesjs = require('aes-js');
const fs = require('fs');
const readline = require('readline');

const type = process.argv[2];
const cryptor = (type, key, src, dist) => {
  fs.readFile(src, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const secretKeyBytes = aesjs.utils.utf8.toBytes(key);
    const aes = new aesjs.ModeOfOperation.cbc(secretKeyBytes);
    let bytes;
    let message = '...?!';
    if (type === '--d') {
      bytes = aesjs.padding.pkcs7.pad(aes.decrypt(data));
      message = 'decrtyped.';
    } else if (type === '--e') {
      bytes = aes.encrypt(aesjs.padding.pkcs7.pad(data));
      message = 'encrtyped.';
    }
    fs.writeFile(dist, bytes, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(message);
      }
    });
  });
}

const rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('key> ');
rl.prompt();
rl.on('line', (line) => {
  rl.close();
  const path1 = './data/index.json';
  const path2 = './data/index.dat';
  if (type === '--d') {
    cryptor(type, line, path2, path1);
  } else if (type === '--e') {
    cryptor(type, line, path1, path2);
  }
})
