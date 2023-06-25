const { SlashCommandBuilder, messageLink } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder, Embed } = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const Economy = require('discord-economy-super')
const eco = require('../../Database/ecoDB.js')
const {CommandCooldown, msToMinutes} = require('discord-command-cooldown');
const ms = require('ms');

const WorkCooldown = new CommandCooldown('work', ms('2m'));

module.exports = {
	data: new SlashCommandBuilder()
    .setName("work")
    .setDescription("Work to get coins"),
		async execute(interaction, client) {
            const userCooldowned = await WorkCooldown.getUser(interaction.user.id); // Check if user need to be cooldowned
            if(userCooldowned){
                const timeLeft = msToMinutes(userCooldowned.msLeft, false); // False for excluding '0' characters for each number < 10
                interaction.reply(`You need to wait ${ timeLeft.hours + ' hours, ' + timeLeft.minutes + ' minutes, ' + timeLeft.seconds + ' seconds'} before running command again!`);
            }else{
              await WorkCooldown.addUser(interaction.user.id);
        
        const { guild, user } = interaction;

        const wbalance = eco.balance.fetch(user.id, guild.id)

        const items = [140, 230, 100, 90, 300, 200, 120, 500]
        var amount = items[Math.floor(Math.random()*items.length)];

        eco.balance.add(amount, user.id, guild.id)

        

        interaction.reply({ content: `${interaction.user.tag}, you worked hard and earned \`${amount}🪙\` coins!`})
        

 
  
        }}}