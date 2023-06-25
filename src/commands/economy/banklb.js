const { SlashCommandBuilder, messageLink } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder, Embed } = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const Economy = require('discord-economy-super')
const eco = require('../../Database/ecoDB.js')

module.exports = {
	data: new SlashCommandBuilder()
    .setName("leaderboard-bank")
    .setDescription("Check the bank leaderboard"),

    async execute(interaction, client) {
        const { guild, member } = interaction;


        let lb = eco.bank.leaderboard(guild.id);
        if (!lb.length) return interaction.reply({ content: "No leaderboard found", ephemeral: true})

        let leaderboard = await lb.map((value, index) => {
            return `\`${index + 1}\` <@${value.userID}>'s Coins: **${value.money}**`
        })

        const embed = new EmbedBuilder()
        .setTitle(`bank Leaderboard`)
        .setColor(`c3b4f7`)
        .setDescription(leaderboard.join(`\n`))
        .setTimestamp()
        .setFooter({ text: `/${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL()})

        await interaction.reply({ embeds: [embed]});


 
    }}