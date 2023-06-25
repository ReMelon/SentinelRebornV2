const { SlashCommandBuilder, messageLink } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder, Embed } = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const Economy = require('discord-economy-super')
const eco = require('../../Database/ecoDB.js')

module.exports = {
	data: new SlashCommandBuilder()
    .setName("withdraw")
    .setDescription("Withdraw money from the bank")
    .addNumberOption(option =>
        option.setName('amount')
        .setDescription('Amount to withdraw').setRequired(true)),
		async execute(interaction, client) {
            const { guild, member } = interaction;

            const amount = interaction.options.getNumber("amount")
            const bank = eco.bank.fetch(member.id, guild.id)

            if (amount > bank) {
                return interaction.reply({content:`You do not have this much money in the bank!`, ephemeral: true})
            }

            if (amount < 1) {
                return interaction.reply({content:`You cannot deposit such a little amount!`, ephemeral: true})
            }

            eco.bank.subtract(amount, member.id, guild.id)
            eco.balance.add(amount, member.id, guild.id)


        const embed = new EmbedBuilder()
        .setTitle(`Bank Withdrawl`)
        .setColor(`c3b4f7`)
        .setDescription(`Bank withdrawl successful!`)
        .addFields(
            {
                name: `Amount`,
                value: `\`${amount}🪙\``,
                inline: true
            }
        )
        .setTimestamp()
        .setFooter({ text: `/${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL()})

        await interaction.reply({ embeds: [embed]});

 
  
    }}