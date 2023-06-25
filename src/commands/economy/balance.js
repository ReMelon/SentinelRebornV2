const { SlashCommandBuilder, messageLink } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder, Embed } = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const Economy = require('discord-economy-super')
const eco = require('../../Database/ecoDB.js')

module.exports = {
	data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check a user's balance")
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("Person whose balance you want to check")
    ),
		async execute(interaction, client) {
        const { guild, member } = interaction;
        const user = interaction.options.getUser("user") || interaction.member.user

        const balance = eco.balance.fetch(user.id, guild.id)
        const bank = eco.bank.fetch(user.id, guild.id)


        const embed = new EmbedBuilder()
        .setTitle(`Balance`)
        .setColor(`c3b4f7`)
        .setDescription(`Balance Details of \`${user.tag}\``)
        .addFields(
            {
                name: `Wallet`,
                value: `\`${balance}🪙\``,
                inline: true
            },
            {
                name: `Bank`,
                value: `\`${bank}🪙\``,
                inline: true
            },
        )
        .setTimestamp()
        .setFooter({ text: `/${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL()})

        await interaction.reply({ embeds: [embed]});

 
    }}