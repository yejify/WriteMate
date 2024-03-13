const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '..', 'data.json');

module.exports = async (message) => {
  const userId = message.author.id;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('파일을 읽는 도중 오류가 발생했습니다.', err);
      return;
    }

    const usersData = data ? JSON.parse(data) : [];
    const userData = usersData.find((entry) => entry.userId === userId);

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
