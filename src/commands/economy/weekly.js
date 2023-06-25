const { SlashCommandBuilder, messageLink } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder, Embed } = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const Economy = require('discord-economy-super')
const eco = require('../../Database/ecoDB.js')
const {CommandCooldown, msToMinutes} = require('discord-command-cooldown');
const ms = require('ms');


const Weeklycooldown = new CommandCooldown('weekly', ms('7d'));

module.exports = {
	data: new SlashCommandBuilder()
    .setName("weekly")
    .setDescription("Claim your weekly coins"),
		async execute(interaction, client) {
      const userCooldowned = await Weeklycooldown.getUser(interaction.user.id); // Check if user need to be cooldowned
      if(userCooldowned){
          const timeLeft = msToMinutes(userCooldowned.msLeft, false); // False for excluding '0' characters for each number < 10
          interaction.reply(`You need to wait ${ timeLeft.days + ' days, ' + timeLeft.hours + ' hours, ' + timeLeft.minutes + ' minutes, ' + timeLeft.seconds + ' seconds'} before running command again!`);
      }else{
        await Weeklycooldown.addUser(interaction.user.id);
      

        const { guild, member } = interaction;
        const items = [1500, 1000, 500, 700, 800, 900, 1000, 1300, 1200, 1000, 900, 800, 1500, 3000, 2000]
        var amount = items[Math.floor(Math.random()*items.length)];

        eco.balance.add(amount, member.id, guild.id)

        

        const embedt = new EmbedBuilder()
        .setTitle(`Weekly rewards`)
        .setDescription(`You have recieved \`${amount}🪙\` in your balance!`)
        .setColor(`c3b4f7`)
        .setTimestamp()
        .setFooter({ text: `/${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL()})

        await interaction.reply({ embeds: [embedt]});
       
    
    



 
  
    }}}