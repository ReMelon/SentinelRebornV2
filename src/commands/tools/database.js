const { SlashCommandBuilder, messageLink } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder, Embed } = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const Guild = require("../../schemas/guild")
const mongoose = require('mongoose')
const guild = require("../../schemas/guild")
const backtickmulti = "```"

module.exports = {
	data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Returns information about your server, mostly a test for the database"),
		async execute(interaction, client) {

        let guildProfile = await Guild.findOne({ guildId: interaction.guild.id })
        if (!guildProfile) {
         guildProfile = await new Guild({
            _id: mongoose.Types.ObjectId(),
            guildId: interaction.guild.id,
            guildName: interaction.guild.name,
            guildIcon: interaction.guild.iconURL() ? interaction.guild.iconURL() : "None."
        })

        const databaseembed = new EmbedBuilder()
        .setTitle(`Server Information`)
        .setColor(`c3b4f7`)
        .addFields(
        { name: '`Server Name:`', value: `${guildProfile.guildName}`, inline: true },
        { name: '`Server ID:`', value: `${guildProfile.guildId}`, inline: true },
        { name: '`Server Icon:`', value: `${guildProfile.guildIcon}`, inline: true }
        )
        .setTimestamp()
        .setFooter({ text: `/${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL()})


        interaction.reply({ embeds: [databaseembed] })

        await guildProfile.save()
    } else {
        let guildProfile = await Guild.findOne({ guildId: interaction.guild.id })

        const databaseembed = new EmbedBuilder()
        .setTitle(`Server Information`)
        .setColor(`c3b4f7`)
        .addFields(
        { name: '`Server Name:`', value: `${guildProfile.guildName}`, inline: true },
        { name: '`Server ID:`', value: `${guildProfile.guildId}`, inline: true },
        { name: '`Server Icon:`', value: `${guildProfile.guildIcon}`, inline: true }
        )
        .setTimestamp()
        .setFooter({ text: `/${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL()})

        interaction.reply({ embeds: [databaseembed] })
        
    }


        

 

            }}