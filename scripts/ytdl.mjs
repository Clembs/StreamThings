import ytdl from 'ytdl-core';
import fs from 'node:fs';
import ffmpeg from 'fluent-ffmpeg';
import { resolve } from 'node:path';
import ID3 from 'node-id3';
import { readFileSync } from 'node:fs';

const songs = readFileSync(resolve('./scripts/tracks.txt'), 'utf-8')
  .split('\r\n')
  .filter(Boolean)
  .reverse()
  .map((song) => song.replace(/[&|\?]list=.*/, ''));

const path = resolve('./packages/PluginRenderer/static/BGM/');

const tracks = fs.readdirSync(path);

for (const song of songs) {
  const idRemoveRegex =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

  const id = song.match(idRemoveRegex)[7];
  console.log(id);

  if (tracks.find((t) => t.startsWith(id))) continue;

  const songInfo = await ytdl.getBasicInfo(id);

  const fileName = `${path}/[${id}] ${songInfo.videoDetails.title.replace(
    /[/\\?%*:|"<>]/g,
    '-'
  )}.mp3`;

  if (fs.existsSync(fileName)) continue;

  console.log(fileName);

  let stream = ytdl(song, {
    quality: 'highestaudio',
  });

  ffmpeg(stream)
    .audioBitrate(256)
    .save(fileName)
    .on('progress', (p) => {
      console.log(`${p.targetSize}kb downloaded`);
    })
    .on('end', () => {
      ID3.write(
        {
          title: songInfo.videoDetails.title,
          artist: songInfo.videoDetails.author.name,
        },
        fileName
      );
      console.log(`\nDone`);
    });
}
