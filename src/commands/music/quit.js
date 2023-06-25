const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder } = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const backtickmulti = "```"

module.exports = {
	data: new SlashCommandBuilder().setName("quit").setDescription("Stops the bot and clears the queue"),
	async execute(interaction, client) {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.reply({
			embeds: [new EmbedBuilder()
			.setColor(`c3b4f7`)
			.setTitle(`There are no songs in the queue!`)
			.setTimestamp()
			.setFooter({ text: `/${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL()})
        ],
		})

		queue.destroy()

        await interaction.reply({
			embeds: [new EmbedBuilder()
			.setColor(`c3b4f7`)
			.setTitle(`Goodbye!`)
			.setTimestamp()
			.setFooter({ text: `/${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL()})
        ],
		})



		const handleTime = (timestamp) => moment(timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").replace("am", "AM"); 
		fs.appendFile('cmdl.txt', `[COMMAND USED] GUILD NAME : ${interaction.guild} || TIMESTAMP : ${handleTime(interaction.timestamp)} || INTERACTION_AUTHOR :  ${interaction.user.username + '#' + interaction.user.discriminator} || COMMAND : ${interaction.commandName + '\n'}`, (err) => {
			if (err) throw err;    
		  });


	
	},
}
