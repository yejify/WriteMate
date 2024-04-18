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

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  // 설정한 간격으로 새 글 확인 로직 실행
  setInterval(() => checkNewPosts(client), 6000000); // 매 1분마다 실행
});

client.on(Events.MessageCreate, (message) => {
  if (!message.content.startsWith('!') || message.author.bot) return;
  const args = message.content.slice(1).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (commands[commandName]) {
    commands[commandName](message);
  } else {
    message.reply(
      "Sorry, I don't recognize that command. Try !help for a list of commands."
    );
  }
});

client.login(token);
