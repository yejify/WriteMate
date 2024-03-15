const fs = require('fs');
const path = require('path');
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
  const currentTime = new Date().toISOString();

  fs.readFile(dataFilePath, 'utf8', async (err, data) => {
    if (err) {
      console.error('파일을 읽는 도중 오류가 발생했습니다.', err);
      return;
    }

    let guildsData = data ? JSON.parse(data) : { guilds: [] };
    let guildData = guildsData.guilds.find(
      (guild) => guild.guildId === guildId
    );

    if (!guildData) {
      guildData = {
        guildId: guildId,
        users: [],
      };
      guildsData.guilds.push(guildData);
    }

    let userData = guildData.users.find((user) => user.userId === userId);

    if (userData) {
      message.reply('이미 블로그 링크가 등록되어 있습니다.');
      return;
    } else {
      guildData.users.push({
        userId: userId,
        channelId: channelId,
        blogLink: blogLink,
        registeredAt: currentTime,
        lastChecked: currentTime,
      });
    }

    fs.writeFile(
      dataFilePath,
      JSON.stringify(guildsData, null, 2),
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
