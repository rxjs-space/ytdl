const fs = require('fs');
const ytdl = require('ytdl-core');

const url = 'https://www.youtube.com/watch?v=Me8IqpAP87o&t=365s';
ytdl(url, { filter: (format) => format.container === 'mp4' })
  .pipe(fs.createWriteStream('video.mp4'));