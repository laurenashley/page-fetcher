// fetcher.js

const fs = require('fs');
const request = require('request');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = process.argv.slice(2);
const content = args[0];
const localFilePth = args[1];
const question = (str) => new Promise(resolve => rl.question(str, resolve));

let bytes = 0;

const getUserInput = {
  start: async(body) => {
    return getUserInput.askUser(body);
  },
  askUser: async(body) => {
    const rewriteFile = await question('File exists locally, would you like to rewrite it? [plz type yes/no]');
    if (rewriteFile === 'yes') {
      console.log('Writing new file meow!');
      writeNewFile(body);
      return getUserInput.end();
    } else {
      console.log('Closing meow, please provide new file name to write to locally');
      return getUserInput.end();
    }
  },
  end: async() => {
    rl.close();
  }
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
request(content, (error, response, body) => {
  if (body === undefined) {
    console.log('Invalid url, please try again.');
    process.exit();
  }

  bytes = body.length;
  try {
    if (fs.existsSync(localFilePth)) {
      getUserInput.start(body);
    } else {
      writeNewFile(body);
      process.exit();
    }
  } catch (err) {
    console.error(err);
    // To Do if file path is invalid, not sure logic goes here though
    // if (err.code === 'EISDIR') {
    //   console.log('invalid file path');
    // }
  }
});
