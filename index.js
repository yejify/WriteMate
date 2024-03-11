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
  console.log(
    `메시지 받음: ${message.content} | 보낸 유저: ${message.author.username} (${message.author.id})`
  );
});

const fs = require('fs');
const path = require('path');

// data.json 파일의 경로를 지정합니다.
const dataFilePath = path.join(__dirname, 'data.json');

client.on(Events.MessageCreate, async (message) => {
  if (message.content.startsWith('!add')) {
    const args = message.content.split(' ');
    if (args.length < 2) return message.reply('블로그 링크를 입력해주세요.');

    const blogLink = args[1];
    const userId = message.author.id;

    // data.json 파일을 읽습니다.
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('파일을 읽는 도중 오류가 발생했습니다.', err);
        return;
      }

      // JSON 형태로 파싱합니다.
      const usersData = JSON.parse(data);

      // 사용자 ID와 블로그 링크를 저장합니다.
      usersData[userId] = { blogLink };

      // 변경된 데이터를 data.json 파일에 다시 씁니다.
      fs.writeFile(
        dataFilePath,
        JSON.stringify(usersData, null, 2),
        'utf8',
        (err) => {
          if (err) {
            console.error(
              '파일에 데이터를 쓰는 도중 오류가 발생했습니다.',
              err
            );
            return;
          }

          message.reply('블로그 링크가 등록되었습니다.');
        }
      );
    });
  }
});

client.login(token);
