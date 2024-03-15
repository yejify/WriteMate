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

  const originalBlogLink = args[1];
  const userId = message.author.id;
  const guildId = message.guild.id;
  const channelId = message.channel.id;
  const currentTime = new Date().toISOString();

  // 티스토리와 벨로그 링크 판별 및 RSS 피드 URL 변환
  let rssFeedUrl = '';
  if (originalBlogLink.includes('tistory.com')) {
    rssFeedUrl = `${originalBlogLink}/rss`;
  } else if (originalBlogLink.includes('velog.io')) {
    const username = originalBlogLink.split('velog.io/')[1];
    rssFeedUrl = `https://v2.velog.io/rss/${username}`;
  } else {
    message.reply('지원되지 않는 블로그 플랫폼입니다.');
    return;
  }

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('파일을 읽는 도중 오류가 발생했습니다.', err);
      return;
    }

    let guildsData = data ? JSON.parse(data) : { guilds: [] };
    let guildData = guildsData.guilds.find(
      (guild) => guild.guildId === guildId
    );
    if (!guildData) {
      guildData = { guildId: guildId, users: [] };
      guildsData.guilds.push(guildData);
    }

    const userData = guildData.users.find((user) => user.userId === userId);
    if (userData) {
      message.reply('이미 블로그 링크가 등록되어 있습니다.');
      return;
    }

    guildData.users.push({
      userId: userId,
      channelId: channelId,
      blogLink: originalBlogLink,
      rssFeedUrl: rssFeedUrl,
      registeredAt: currentTime,
      lastChecked: currentTime,
    });

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
