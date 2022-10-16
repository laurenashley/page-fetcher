// fetcher.js

const fs = require('fs/promises');

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = process.argv.slice(2);
const content = args[0];
const localFilePth = args[1];

let bytes = 0;

const userAnswer = () => {
  let answer;

  return answer;
};

const writeNewFile = (body) => {
  fs.writeFile(localFilePth, body, err => {
    if (err) {
      console.error(err);
    }
  });
  console.log(`Downloaded and saved ${bytes} bytes to ${localFilePth}`);
};

// make http request
const request = require('request');
request(content, (error, response, body) => {
  bytes = body.length;

  try {
    if (fs.existsSync(localFilePth)) {
      console.log('file exists');
      if (userAnswer) {
        writeNewFile(body);
      }
    } else {
      writeNewFile(body);
    }
  } catch (err) {
    console.error(err);
  }
});