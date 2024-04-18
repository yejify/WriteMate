module.exports = async (message) => {
  if (!message.content.startsWith('!help')) return;

  const commandList = `
**WriteMate Commands**
**스터디 생성하기**
  1. !createstudy "<GroupName>" "<StartDate>" "<EndDate>" "<RuleDescription>"
  2. !add "<BlogLink>"
      
**정보 확인하기**
  1. !help
  2. !read
    `;

  message.channel.send(commandList);
};
