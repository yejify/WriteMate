const RSSParser = require('rss-parser');
const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '..', 'data.json');

const parser = new RSSParser({
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    Accept: 'application/rss+xml',
  },
});

async function checkNewPosts(client) {
  let blogsData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

  for (const userData of blogsData) {
    try {
      const feed = await parser.parseURL(
        userData.blogLink.replace('[', '').replace(']', '')
      );
      const latestPost = feed.items[0];
      if (!latestPost) {
        console.log(`No new posts found for ${userData.blogLink}`);
        continue;
      }

      const latestPostDate = new Date(latestPost.pubDate);
      const lastCheckedDate = new Date(userData.lastChecked);

      if (latestPostDate > lastCheckedDate) {
        // 디스코드 채널에 "새 글이 등록되었습니다"라는 메시지만 전달
        const channel = await client.channels.fetch(userData.channelId);
        channel.send(`새 글이 등록되었습니다.`);

        // 마지막으로 확인한 시간을 현재 시간으로 업데이트
        userData.lastChecked = new Date().toISOString();
      }
    } catch (error) {
      console.error(`Error processing blog ${userData.blogLink}:`, error);
    }
  }

  // 변경된 데이터 저장
  fs.writeFileSync(dataFilePath, JSON.stringify(blogsData, null, 2), 'utf8');
}

module.exports = checkNewPosts;
