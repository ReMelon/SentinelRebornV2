const {
  PermissionFlagsBits,
  EmbedBuilder,
  SlashCommandBuilder,
} = require("discord.js");
const backtickmulti = "```";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clean")
    .setDescription("Cleans the messsages sent by the bot")
    .addNumberOption((opt) =>
      opt
        .setName("amount")
        .setDescription("Number of ")
        .setRequired(true)
        .setMaxValue(10)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction, client) {
    const numMessages = interaction.options.get("amount").value;
    const channelMessages = await interaction.channel.messages.fetch();
    const target = client.user;

    const finishedpurge = new EmbedBuilder()
      .setColor(`c3b4f7`)
      .setTitle(`Operation Completed!`)
      .setDescription(
        `${backtickmulti}yaml\nSucessfully cleared ${numMessages} messages in ${interaction.channel.name}\n${backtickmulti}`
      )
      .setTimestamp()
      .setFooter({
        text: `/${interaction.commandName} || ${interaction.user.tag}`,
        iconURL: client.user.displayAvatarURL(),
      });

    if (target) {
      let i = 0;
      let messagesToDelete = [];
      channelMessages.filter((message) => {
        if (message.author.id === target.id && numMessages > i) {
          messagesToDelete.push(message);
          i++;
        }
      });

      interaction.channel
        .bulkDelete(messagesToDelete, true)
        .then(() => {
          interaction.reply({ embeds: [finishedpurge], ephemeral: true });
        });
    }
  },
};
