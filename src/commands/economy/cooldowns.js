const { SlashCommandBuilder, messageLink } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder, Embed } = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const Economy = require('discord-economy-super')
const eco = require('../../Database/ecoDB.js')
const {CommandCooldown, msToMinutes} = require('discord-command-cooldown');
const ms = require('ms');

const WorkCooldown = new CommandCooldown('work', ms('2m'));
const AttackCooldown = new CommandCooldown('attack', ms('5m'));
const DailyCooldown = new CommandCooldown('daily', ms('1d'));
const WeeklyCooldown = new CommandCooldown('weekly', ms('1w'));

module.exports = {
	data: new SlashCommandBuilder()
    .setName("cooldowns")
    .setDescription("List the cooldowns you are under"),
		async execute(interaction, client) {
            const userCooldownedWE = await WeeklyCooldown.getUser(interaction.user.id);
            const userCooldownedWO = await WorkCooldown.getUser(interaction.user.id)
            const userCooldownedAT = await AttackCooldown.getUser(interaction.user.id);
            const userCooldownedDA = await DailyCooldown.getUser(interaction.user.id)

            

            const channel = interaction.channel


            const embed = new EmbedBuilder()
            .setTitle(`Cooldowns for ${interaction.user.tag}`)
            .setColor("c3b4f7")

            interaction.reply({ embeds: [embed]})

            if(userCooldownedWE){
              const timeLeft = msToMinutes(userCooldownedWE.msLeft, false); // False for excluding '0' characters for each number < 10
              const embed = new EmbedBuilder()
              .setTitle("/weekly Command Cooldown")
              .setDescription(`${ timeLeft.days + ' days, ' + timeLeft.hours + ' hours, ' + timeLeft.minutes + ' minutes, ' + timeLeft.seconds + ' seconds'}`)
              .setColor("c3b4f7")
              channel.send({embeds: [embed]})
            }
            if(userCooldownedDA){
              const timeLeft = msToMinutes(userCooldownedDA.msLeft, false); // False for excluding '0' characters for each number < 10
              const embed = new EmbedBuilder()
              .setTitle("/daily Command Cooldown")
              .setDescription(`${ timeLeft.days + ' days, ' + timeLeft.hours + ' hours, ' + timeLeft.minutes + ' minutes, ' + timeLeft.seconds + ' seconds'}`)
              .setColor("c3b4f7")
              channel.send({embeds: [embed]})
            }
            if(userCooldownedWO){
              const timeLeft = msToMinutes(userCooldownedWO.msLeft, false); // False for excluding '0' characters for each number < 10
              const embed = new EmbedBuilder()
              .setTitle("/work Command Cooldown")
              .setDescription(`${ timeLeft.days + ' days, ' + timeLeft.hours + ' hours, ' + timeLeft.minutes + ' minutes, ' + timeLeft.seconds + ' seconds'}`)
              .setColor("c3b4f7")
              channel.send({embeds: [embed]})            }
            if(userCooldownedAT){
              const timeLeft = msToMinutes(userCooldownedAT.msLeft, false); // False for excluding '0' characters for each number < 10
              const embed = new EmbedBuilder()
              .setTitle("/attack Command Cooldown")
              .setDescription(`${ timeLeft.days + ' days, ' + timeLeft.hours + ' hours, ' + timeLeft.minutes + ' minutes, ' + timeLeft.seconds + ' seconds'}`)
              .setColor("c3b4f7")
              channel.send({embeds: [embed]})            }

        }}