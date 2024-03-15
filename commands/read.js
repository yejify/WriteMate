const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '..', 'data.json');

module.exports = async (message) => {
  const userId = message.author.id;
  const guildId = message.guild.id;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('파일을 읽는 도중 오류가 발생했습니다.', err);
      return;
    }

    const guildsData = data ? JSON.parse(data) : { guilds: [] };
    const guildData = guildsData.guilds.find(
      (guild) => guild.guildId === guildId
    );

    if (!guildData) {
      message.reply('이 서버에 등록된 블로그 링크 정보가 없습니다.');
      return;
    }

    const userData = guildData.users.find((user) => user.userId === userId);

    if (!userData) {
      message.reply('등록된 블로그 링크 정보를 찾을 수 없습니다.');
    } else {
      message.reply(
        `블로그 링크: ${userData.blogLink}\n` +
          `등록일: ${userData.registeredAt}\n` +
          `서버: ${message.guild.name}\n` +
          `채널: ${message.channel.name}`
      );
    }
  });
};
