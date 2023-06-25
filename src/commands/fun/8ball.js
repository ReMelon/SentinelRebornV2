const { SlashCommandBuilder, messageLink } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder, Embed } = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const backtickmulti = "```"
const backticksingle = "`"
const questionaesnoone = "```ansi\n[2;37m[2;36m"
const questionaesnotwo = "[0m[2;37m[0m\n```"
const answeraesnoone = "```ansi\n[2;37m[0m[2;37m"
const answeraesnotwo = "[0m\n```"

module.exports = {
    data: new SlashCommandBuilder()
        .setName("8ball")
        .setDescription("Ask the bot a question, the 8ball gods will reply")
        .addStringOption((option) => option.setName("question").setDescription("What do you want to ask to the 8ball gods?").setRequired(true)),
    async execute(interaction, client) {

        interaction.deferReply()
        let responses = [
            "I cant hear you",
            "Could you repeat?",
            "Could you repeat? The 8ball gods were a bit busy",
            "Question fuzzy, try again",
            "Question fuzzy, try again",
            "Question fuzzy, try again",
            "What is wrong with you",
            "What is wrong with you, go get some help",
            "Indecisive",
            "Indecisive",
            "Indecisive",
            "No, definitely not",
            "No, definitely not",
            "Definitely not",
            "Definitely not",
            "Obviously not",
            "Obviously not",
            "Get real",
            "Get real",
            "No and cry harder",
            "kry about it (kryotic refrence)",
            "Maybe",
            "Maybe",
            "Maybe",
            "Perhaps",
            "Yes, indeed that is true",
            "Yes, indeed that is true",
            "Yes, indeed that is true",
            "Yes",
            "Yes",
            "Yes",
            "Yes",
            "Yes",
            "Yes",
            "Yes",
            "Yes",
            "Yes",
            "Yes",
            "Of course",
            "Of course",
            "Of course",
        ]

        const responseauto = responses[Math.floor(Math.random() * responses.length)];
        const question = interaction.options.getString('question');
        const owner = interaction.client.users.cache.get('578339835153088522'); // Replace with the bot owner's user ID.

        // Send the question to the bot owner.
        await owner.send(`<@578339835153088522> /${interaction.commandName}\n${interaction.user.tag}: ${question}`);

        // Wait for the bot owner's response.
        const filter = m => m.author.id === owner.id;
        const collector = owner.dmChannel.createMessageCollector({ filter, time: 8000 });
        let response;
        collector.on('collect', m => {
            response = m.content;
            collector.stop();
        });
        collector.on('end', () => {
            if (!response) {
                owner.send('You did not respond in time. Automatic response will be sent.');
                const embedauto = new EmbedBuilder()
                    .setColor(`c3b4f7`)
                    .setTitle(`The Magic 8 Ball`)
                    .setDescription(`\u200B \n<@${interaction.user.id}> asked : \n${questionaesnoone}${question}${questionaesnotwo} \n\nThen... the 8ball gods replied...\n${answeraesnoone}` + responseauto + answeraesnotwo)
                    .setTimestamp()
                    .setFooter({ text: `/${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL() });

                interaction.editReply(`\u200B`)
                interaction.editReply({ embeds: [embedauto] })
            }
            // Send the response to the user who asked the question.
            if (response) {
                const embeduser = new EmbedBuilder()
                    .setColor(`c3b4f7`)
                    .setTitle(`The Magic 8 Ball`)
                    .setDescription(`\u200B \n<@${interaction.user.id}> asked : \n${questionaesnoone}${question}${questionaesnotwo} \n\nThen... the 8ball gods replied...\n${answeraesnoone}` + response + answeraesnotwo)
                    .setTimestamp()
                    .setFooter({ text: `/${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL() });

                interaction.editReply(`\u200B`)
                interaction.editReply({ embeds: [embeduser] })
            }

        });
    }
}