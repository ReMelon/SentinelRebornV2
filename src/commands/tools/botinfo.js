const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const {
  showMemoryUsage,
  usagePercent,
  totalCores,
} = require("node-system-stats");
const { converter } = require("../../exports/converter.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Get information about the bot"),
  async execute(interaction, client) {
    const cpuPercent = await usagePercent();

    const embed = new EmbedBuilder()
      .setTitle("Bot Information")
      .setColor("c3b4f7")
      .addFields(
        { name: "Developer", value: "ReMelon#7560", inline: true },
        { name: "Bot Name", value: `${client.user.tag}`, inline: true },
        { name: "Bot ID", value: `${client.user.id}`, inline: true },
        { name: "Creation Date", value: `${client.user.createdAt}` },
        { name: "Help Command", value: `/help` },
        { name: "Uptime", value: `${converter(client.uptime / 1000)}` },
        { name: "Discord API Ping", value: `${client.ws.ping}ms` },
        { name: "Node Version", value: `${process.version}` },
        { name: "CPU Cores", value: `${totalCores()}`, inline: true },
        { name: "CPU Usage", value: `${cpuPercent.percent}%`, inline: true },
        { name: "Memory Usage", value: `${showMemoryUsage()}MB`, inline: true }
      )
      .setFooter({
        text: "Made with discord.js v14",
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      })
      .setThumbnail(
        "https://cdn.discordapp.com/avatars/578339835153088522/127bd18d5808fdc8bf807b2e9a22545c.png?size=256"
      )
      .setImage(
        "https://cdn.discordapp.com/attachments/1056774984082653204/1065136383489998859/Sentinel_Reborn_Banner.png"
      );

    interaction.reply({ embeds: [embed] });
  },
};

function converter(secondsU) {
  let seconds = Math.floor(secondsU);
  let levels = [
    [Math.floor(seconds / 31536000), "years"],
    [Math.floor((seconds % 31536000) / 86400), "days"],
    [Math.floor(((seconds % 31536000) % 86400) / 3600), "hours"],
    [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), "minutes"],
    [(((seconds % 31536000) % 86400) % 3600) % 60, "seconds"],
  ];
  let returntext = "";
  for (var i = 0, max = levels.length; i < max; i++) {
    if (levels[i][0] === 0) continue;
    returntext +=
      " " +
      levels[i][0] +
      " " +
      (levels[i][0] === 1
        ? levels[i][1].substr(0, levels[i][1].length - 1)
        : levels[i][1]);
  }
  return returntext.trim();
}
