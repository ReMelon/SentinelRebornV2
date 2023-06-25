const { SlashCommandBuilder, messageLink } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder, Embed } = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const Economy = require('discord-economy-super')
const eco = require('../../Database/ecoDB.js')
const talkedRecently = new Set();

module.exports = {
	data: new SlashCommandBuilder()
    .setName("beg")
    .setDescription("Beg for coins"),
		async execute(interaction, client) {
            if (talkedRecently.has(interaction.user.id)) {
                interaction.reply("Wait 10 seconds before getting typing this again!");
        } else {            
    




        const { guild, member } = interaction;
        let Target = member


        const items = [15, 10, 15, 20, 20, 10, 10, 100, 100, 100, 100, 0, 0, 0, 0]
        var amount = items[Math.floor(Math.random()*items.length)];

        eco.balance.add(amount, Target.id, guild.id)

        const embed = new EmbedBuilder()
        .setTitle(`Beg`)
        .setColor(`c3b4f7`)
        .setDescription(`You begged and got \`${amount}🪙\``)
        .setTimestamp()
        .setFooter({ text: `/${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL()})

        await interaction.reply({ embeds: [embed]});

 
  
                // Adds the user to the set so that they can't talk for a minute
                talkedRecently.add(interaction.user.id);
                setTimeout(() => {
                  // Removes the user from the set after a minute
                  talkedRecently.delete(interaction.user.id);
                }, 10000);
            }
    }}