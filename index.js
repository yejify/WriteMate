const { Client, Events, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { token } = require('./config.json');
const checkNewPosts = require('./services/checkNewPostsService');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const commands = {};
const commandsPath = path.join(__dirname, 'commands');
fs.readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'))
  .forEach((file) => {
    const command = require(path.join(commandsPath, file));
    commands[file.replace('.js', '')] = command;
  });

// client.once(Events.ClientReady, () => {
//   console.log(`Ready! Logged in as ${client.user.tag}`);
//   setInterval(() => checkNewPosts(client), 600000); // 10분마다 새 글 확인
// });
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  // 30초마다 새 글 확인 로직을 실행합니다.
  setInterval(() => checkNewPosts(client), 60000);
});

client.on(Events.MessageCreate, (message) => {
  if (!message.content.startsWith('!') || message.author.bot) return;
  const args = message.content.slice(1).split(/ +/);
  const commandName = args.shift().toLowerCase();
  commands[commandName]?.(message);
});

client.login(token);
