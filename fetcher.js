// fetcher.js

const args = process.argv.slice(2);
const fs = require('fs/promises');

console.log(args);

// make http request

// take data received and write to local file
const content = 'Some content!';

fs.writeFile('/Users/joe/test.txt', content, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});
