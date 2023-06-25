const { SlashCommandBuilder, messageLink } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder, Embed } = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const Economy = require('discord-economy-super')
const eco = require('../../Database/ecoDB.js')
const talkedRecently = new Set();
const {CommandCooldown, msToMinutes} = require('discord-command-cooldown');
const ms = require('ms');

const DailyCooldown = new CommandCooldown('daily', ms('1d'));


module.exports = {
	data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Claim your daily coins"),
		async execute(interaction, client) {
      const userCooldowned = await DailyCooldown.getUser(interaction.user.id); // Check if user need to be cooldowned
      if(userCooldowned){
          const timeLeft = msToMinutes(userCooldowned.msLeft, false); // False for excluding '0' characters for each number < 10
          interaction.reply(`You need to wait ${ timeLeft.hours + ' hours, ' + timeLeft.minutes + ' minutes, ' + timeLeft.seconds + ' seconds'} before running command again!`);
      }else{
        await DailyCooldown.addUser(interaction.user.id);
    const items = [150, 200, 300, 500, 400, 200, 200, 400, 200, 300]
    var amount = items[Math.floor(Math.random()*items.length)];

    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1))

    eco.balance.add(amount, interaction.user.id, interaction.guild.id)


        const embedt = new EmbedBuilder()
        .setTitle(`Daily rewards`)
        .setDescription(`You have recieved \`${amount}🪙\` in your balance!`)
        .setColor(`c3b4f7`)
        .setTimestamp()
        .setFooter({ text: `/${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL()})

        await interaction.reply({ embeds: [embedt]});
       

 
      }
    }}