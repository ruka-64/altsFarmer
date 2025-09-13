import { client } from './index.js';
import { config } from '../config.js';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const messages = ['Hello!', 'beep boop', 'howdy?', "I'm fine", 'tik tak toe'];

export const sender = async () => {
  const channel =
    client.channels.cache.get(config.guild.channelId) ??
    (await client.channels.fetch(config.guild.channelId));
  if (!channel) {
    console.error('Cannot fetch channel.');
    process.kill(process.pid, 'SIGTERM');
  }
  if (channel.isText()) {
    const unix = Math.floor(new Date().getTime() / 1000);
    const msg = messages[Math.floor(Math.random() * messages.length)];
    const next = config.randomize
      ? 1000 * 60 * Math.floor(Math.random() * 121)
      : 1000 * 60 * 60;
    const nextUnix = unix + Math.floor(next / 1000);
    const msgLines = [
      `<t:${unix}:t>(<t:${unix}:R>) ${msg}`,
      `-# The next message will be sent in <t:${nextUnix}:R>`,
    ];
    await channel.send(msgLines.join('\n'));
    await wait(1000 * 60 * 60);
    return sender();
  } else {
    console.warn("This channel isn't text based.");
    process.kill(process.pid, 'SIGTERM');
  }
};
