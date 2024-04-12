module.exports = async (message) => {
  if (!message.content.startsWith('!help')) return;

  const commandList = `
      **Available Commands**
      1. !createstudy "<GroupName>" "<StartDate>" "<EndDate>" "<RuleDescription>" - Create a new study group with specified details.
      2. !add "<BlogLink>" - Register your blog link.
      3. !commands - Displays this message.
  
      **Usage Notes**
      - Make sure to enclose arguments with spaces in quotes (e.g., "This is a name").
    `;

  // Sending the command list to the user
  message.channel.send(commandList);
};
