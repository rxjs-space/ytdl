const readline = require('readline');
const path = require('path');
const fs   = require('fs');
const ytdl = require('ytdl-core');

const dl = (url, fileName) => {

  // const url = 'https://www.youtube.com/watch?v=mHhZ9jk-DrU';
  const output = path.resolve(__dirname, `${fileName}.m4a`);


  const video = ytdl(url, { filter: (format) => format.container === 'm4a' });
  let starttime;
  video.pipe(fs.createWriteStream(output));
  video.once('response', () => {
    starttime = Date.now();
  });
  video.on('progress', (chunkLength, downloaded, total) => {
    const floatDownloaded = downloaded / total;
    const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${(floatDownloaded * 100).toFixed(2)}% downloaded`);
    process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
    process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
    process.stdout.write(`, estimated time left: ${(downloadedMinutes / floatDownloaded - downloadedMinutes).toFixed(2)}minutes `);
    readline.moveCursor(process.stdout, 0, -1);
  });
  video.on('end', () => {
    process.stdout.write('\n\n');
  });

};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("link? ", function(url) {
  // TODO: Log the answer in a database
  rl.question('fileName? ', (fileName) => {
    console.log("Working on it...");
    rl.close();
    dl(url, fileName);
  })
});


