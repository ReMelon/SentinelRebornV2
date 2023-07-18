const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const moment = require("moment");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skipto")
    .setDescription("Skips to a certain track #")
    .addNumberOption((option) =>
      option
        .setName("tracknumber")
        .setDescription("The track to skip to")
        .setMinValue(1)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(`c3b4f7`)
            .setTitle(`There are no songs in the queue!`)
            .setTimestamp()
            .setFooter({
              text: `/${interaction.commandName} || ${interaction.user.tag}`,
              iconURL: client.user.displayAvatarURL(),
            }),
        ],
      });

    const trackNum = interaction.options.getNumber("tracknumber");
    if (trackNum > queue.tracks.length)
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(`c3b4f7`)
            .setTitle(`Invalid track number`)
            .setTimestamp()
            .setFooter({
              text: `/${interaction.commandName} || ${interaction.user.tag}`,
              iconURL: client.user.displayAvatarURL(),
            }),
        ],
      });
    const finaltracknum = trackNum - 1;
    queue.skipTo(finaltracknum);

    const song = queue.current;

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(`c3b4f7`)
          .setTitle(`Skipped ahead to ${trackNum}`)
          .setDescription(`Goodbye!\n${song.title}`)
          .setTimestamp()
          .setFooter({
            text: `/${interaction.commandName} || ${interaction.user.tag}`,
            iconURL: client.user.displayAvatarURL(),
          }),
      ],
    });

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
      } || COMMAND : ${interaction.commandName} || FINAL_TRACKNUM : ${
        finaltracknum + "\n"
      }`,
      (err) => {
        if (err) throw err;
      }
    );
  },
};
