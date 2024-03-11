const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// `GatewayIntentBits.GuildMessages`를 인텐트에 추가합니다.
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // 메시지 내용에 접근하기 위해 필요
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// 메시지 생성 이벤트 리스너를 추가합니다.
client.on(Events.MessageCreate, (message) => {
  // 봇이 보낸 메시지는 무시합니다.
  if (message.author.bot) return;

  // 콘솔에 메시지 내용을 출력합니다.
  console.log(`메시지 받음: ${message.content}`);
});

client.login(token);
