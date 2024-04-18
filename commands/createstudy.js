const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, 'data.json');

module.exports = async (message) => {
  if (!message.content.startsWith('!createstudy')) return;

  const regex = /"([^"]+)"/g;
  let args = [];
  let match;
  while ((match = regex.exec(message.content))) {
    args.push(match[1]);
  }

  if (args.length < 4) {
    return message.reply(
      'Usage: !createstudy "<GroupName>" "<StartDate>" "<EndDate>" "<RuleDescription>"'
    );
  }

  const [groupName, startDate, endDate, ruleDescription] = args;
  const guildId = message.guild.id;
  const userId = message.author.id;
  const createdAt = new Date().toISOString();

  const newStudyGroup = {
    groupName,
    startDate,
    endDate,
    ruleDescription,
    createdAt,
    adminUserId: userId,
  };

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the data file:', err);
      return message.reply('Failed to read data.');
    }

    const dataJson = JSON.parse(data || '{}');
    const guildData = dataJson.guilds.find((g) => g.guildId === guildId) || {
      guildId,
      users: [],
      studyGroups: [],
    };

    if (guildData.studyGroups.some((group) => group.groupName === groupName)) {
      return message.reply('A study group with this name already exists.');
    }

    guildData.studyGroups.push(newStudyGroup);

    if (!dataJson.guilds.includes(guildData)) {
      dataJson.guilds.push(guildData);
    }

    fs.writeFile(
      dataFilePath,
      JSON.stringify(dataJson, null, 2),
      'utf8',
      (err) => {
        if (err) {
          console.error('Error writing to the data file:', err);
          return message.reply('Failed to save data.');
        }
        message.reply(`Study group '${groupName}' created successfully!`);
      }
    );
  });
};
