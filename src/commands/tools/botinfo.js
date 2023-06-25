const { SlashCommandBuilder, messageLink } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder, Embed } = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const cpuStat = require('cpu-stat');

module.exports = {
	data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Get information about the bot"),
		async execute(interaction, client) {
      const days = Math.floor(client.uptime / 86400000)
      const hours = Math.floor(client.uptime / 3600000) % 24
      const minutes = Math.floor(client.uptime / 60000) % 60
      const seconds = Math.floor(client.uptime / 1000) % 60

      cpuStat.usagePercent(function (error, percent) {
        if (error) {
          interaction.reply({ content: `${error}`, ephemeral: true})
        }

          const memoryUsage = process.memoryUsage().heapUsed
          const memoryMB = memoryUsage * 0.000001
          const memoryUsageRounded = memoryMB.toFixed(2);
          

          const node = process.version
          const cpu = percent.toFixed(2)
          const totalCores = cpuStat.totalCores();

          const embed = new EmbedBuilder()
          .setTitle("Bot Information")
          .setColor("c3b4f7")
          .addFields(
            { name: "Developer", value: "ReMelon#7560", inline: true},
            { name: "Bot Name", value: `${client.user.tag}`, inline: true},
            { name: "Bot ID", value: `${client.user.id}`, inline: true},
            { name: "Creation Date", value: `${client.user.createdAt}`},
            { name: "Help Command", value: `/help`},
            { name: "Uptime", value: `\`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes and \`${seconds}\` seconds.`},
            { name: "Discord API Ping", value: `${client.ws.ping}ms`},
            { name: "Node Version", value: `${node}`},
            { name: "CPU Cores", value: `${totalCores}`, inline: true},
            { name: "CPU Usage", value: `${cpu}%`, inline: true},
            { name: "Memory Usage", value: `${memoryUsageRounded}MB`, inline: true},
          )
          .setFooter({
            text: "Made with discord.js v14",
            iconURL: "https://i.imgur.com/AfFp7pu.png",
          })
          .setThumbnail(
            "https://cdn.discordapp.com/avatars/578339835153088522/127bd18d5808fdc8bf807b2e9a22545c.png?size=256"
          )
          .setImage(
            "https://cdn.discordapp.com/attachments/1056774984082653204/1065136383489998859/Sentinel_Reborn_Banner.png"
          );
        
          interaction.reply({ embeds: [embed] })
      })
      


 
    }}