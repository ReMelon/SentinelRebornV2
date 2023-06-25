const { SlashCommandBuilder, messageLink } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder, Embed } = require("discord.js")
const fs = require("fs")
const moment = require("moment")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("manilovefrogs")
        .setDescription("ManILoveFrogs"),
    async execute(interaction, client) {

        const embed = new EmbedBuilder()
            .setColor(`c3b4f7`)
            .setDescription(`Man\nI\nLuve\nFrogs`)
            .setTimestamp()
            .setFooter({ text: `/${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL() })

        await interaction.reply({ embeds: [embed] });

  
      
    }
}