const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const moment = require("moment");
var cmdpause = "`/pause`";
var startaes = "` 𝚂𝚃𝙰𝚁𝚃 ||";
var endaes = "|| 𝙴𝙽𝙳`";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resumes the music"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    const handleTime = (timestamp) =>
      moment(timestamp)
        .format("DD/MM/YYYY - hh:mm:ss a")
        .replace("pm", "PM")
        .replace("am", "AM");
    fs.appendFile(
      "cmdl.txt",
      `[COMMAND USED] GUILD NAME : ${
        interaction.guild
      } || TIMESTAMP : ${handleTime(
        interaction.timestamp
      )} || INTERACTION_AUTHOR :  ${
        interaction.user.username + "#" + interaction.user.discriminator
      } || COMMAND : ${interaction.commandName + "\n"}`,
      (err) => {
        if (err) throw err;
      }
    );

    if (!queue)
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(`c3b4f7`)
            .setTitle(`There is no song playing!`)
            .setTimestamp()
            .setFooter({
              text: `/${interaction.commandName} || ${interaction.user.tag}`,
              iconURL: client.user.displayAvatarURL(),
            }),
        ],
      });

    let bar = queue.createProgressBar({
      queue: false,
      length: 19,
    });

    const song = queue.current;

    queue.setPaused(false);
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(`c3b4f7`)
          .setThumbnail(song.thumbnail)
          .setTitle(`Song resumed! Use ${cmdpause} to stop playing.`)
          .setDescription(
            `Song currently playing: [${song.title}](${song.url})\n\n${startaes}${bar}${endaes}`
          )
          .setTimestamp()
          .setFooter({
            text: `/${interaction.commandName} || ${interaction.user.tag}`,
            iconURL: client.user.displayAvatarURL(),
          }),
      ],
    });
  },
};
