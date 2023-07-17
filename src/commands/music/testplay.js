const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")
const fs = require("fs")
const moment = require("moment")
var testsong = "https://youtu.be/UDVtMYqUAyw"
var helpcmd = "`/help`"

module.exports = {
	data: new SlashCommandBuilder()
		.setName("test")
		.setDescription("Bot Developing QOL")
        .addSubcommand((subcommand) =>
			subcommand
				.setName("play")
				.setDescription("Interstellar is the best movie of all time")
		),
        async execute(interaction, client) {
		if (!interaction.member.voice.channel) return interaction.reply({
			embeds: [new EmbedBuilder()
			.setColor(`c3b4f7`)
			.setTitle(`You are not in a Voice Channel!`)
			.setTimestamp()
			.setFooter({ text: `/${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL()})
        ],
		})

		const queue = await client.player.createQueue(interaction.guild)
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)

		let embed = new EmbedBuilder()

		if (interaction.options.getSubcommand() === "play") {
                let url = (testsong)

                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_VIDEO
                })
                if (result.tracks.length === 0)
                    return interaction.reply("No results")
                
                const song = result.tracks[0]
                await queue.addTrack(song)
                embed
                    .setColor(`c3b4f7`)
                    .setDescription(`**[${song.title}](${song.url})** has been added to the Queue \n\n **This command is for testing purposes, so that I do not have to get a song's link over and over again when developing this bot. This command will only play one song, for more information, use ${helpcmd}**`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({ text: `Duration: ${song.duration} || /${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL()})
					.setTimestamp()
		}
        if (!queue.playing) await queue.play()
        await interaction.reply({
            embeds: [embed]
        })

        const handleTime = (timestamp) => moment(timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").replace("am", "AM"); 
		fs.appendFile('cmdl.txt', `[COMMAND USED] GUILD NAME : ${interaction.guild} || TIMESTAMP : ${handleTime(interaction.timestamp)} || INTERACTION_AUTHOR :  ${interaction.user.username + '#' + interaction.user.discriminator} || COMMAND : ${interaction.commandName + '\n'}`, (err) => {
			if (err) throw err;    
		  });

	},
}
