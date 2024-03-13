const fs = require('fs');
const path = require('path');
const RSSParser = require('rss-parser');
const parser = new RSSParser();
const dataFilePath = path.join(__dirname, '..', 'data.json');

module.exports = async (message) => {
  const args = message.content.split(' ');
  if (args.length < 2) {
    return message.reply('블로그 링크를 입력해주세요.');
  }

  const blogLink = args[1];
  const userId = message.author.id;
  const guildId = message.guild.id;
  const channelId = message.channel.id;
  const currentTime = new Date().toISOString(); // 현재 시간을 ISO 문자열로 변환

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('파일을 읽는 도중 오류가 발생했습니다.', err);
      return;
    }

    const usersData = data ? JSON.parse(data) : [];
    usersData.push({
      userId: userId,
      guildId: guildId,
      channelId: channelId,
      blogLink: blogLink,
      registeredAt: currentTime,
      lastChecked: currentTime,
    });

    fs.writeFile(
      dataFilePath,
      JSON.stringify(usersData, null, 2),
      'utf8',
      (err) => {
        if (err) {
          console.error('파일에 데이터를 쓰는 도중 오류가 발생했습니다.', err);
          return;
        }

        message.reply('블로그 링크가 성공적으로 등록되었습니다.');
      }
    );
  });
};
