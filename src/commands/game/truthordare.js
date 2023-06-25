const { SlashCommandBuilder, messageLink } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder, Embed } = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const fetch = require("node-fetch")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('truthordare')
		.setDescription('Play the truth or dare game')
		.addStringOption(option =>
			option.setName('category')
				.setDescription('The question category')
				.setRequired(true)
				.addChoices(
          { name: 'Truth', value: 'question_truth' },
          { name: 'Dare', value: 'question_dare' },
				))
    .addStringOption(option =>
      option.setName('rating')
        .setDescription('The question age rating')
        .setRequired(true)
        .addChoices(
          { name: 'PG', value: 'age_pg' },
          { name: 'PG13', value: 'age_pgt' },
          { name: 'R', value: 'age_r' },
            )),    
		async execute(interaction, client) {

      const embed = new EmbedBuilder()
      .setColor(`c3b4f7`)
      .setTimestamp()
      .setFooter({ text: `/${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL()})


      const category = interaction.options.getString('category');
      const rating = interaction.options.getString('rating');

      if (category == "question_truth") {

      if (rating == "age_pg") {
      const url = await fetch(`https://api.truthordarebot.xyz/v1/truth?rating=pg`);
      const data = await url.json();

      return interaction.reply({
        embeds: [embed.setTitle(`${data.question}`).setDescription(`Question: ${data.type}\nRating: ${data.rating}\nQuestion ID: ${data.id}`)],
        })
      } else if (rating == "age_pgt") {
      const url = await fetch(`https://api.truthordarebot.xyz/v1/truth?rating=pg13`);
      const data = await url.json();
  
      return interaction.reply({
        embeds: [embed.setTitle(`${data.question}`).setDescription(`Question: ${data.type}\nRating: ${data.rating}\nQuestion ID: ${data.id}`)],
         })
      } else if (rating == "age_r") {
      const url = await fetch(`https://api.truthordarebot.xyz/v1/truth?rating=r`);
      const data = await url.json();
    
      return interaction.reply({
        embeds: [embed.setTitle(`${data.question}`).setDescription(`Question: ${data.type}\nRating: ${data.rating}\nQuestion ID: ${data.id}`)],
         })
      }
      } else if (category == "question_dare") {


        if (rating == "age_pg") {
          const url = await fetch(`https://api.truthordarebot.xyz/api/dare?rating=pg`);
          const data = await url.json();
    
          return interaction.reply({
            embeds: [embed.setTitle(`${data.question}`).setDescription(`Question: ${data.type}\nRating: ${data.rating}\nQuestion ID: ${data.id}`)],
            })
          } else if (rating == "age_pgt") {
            const url = await fetch(`https://api.truthordarebot.xyz/api/dare?rating=pg13`);
          const data = await url.json();
      
          return interaction.reply({
            embeds: [embed.setTitle(`${data.question}`).setDescription(`Question: ${data.type}\nRating: ${data.rating}\nQuestion ID: ${data.id}`)],
             })
          } else if (rating == "age_r") {
            const url = await fetch(`https://api.truthordarebot.xyz/api/dare?rating=r`);
          const data = await url.json();
        
          return interaction.reply({
            embeds: [embed.setTitle(`${data.question}`).setDescription(`Question: ${data.type}\nRating: ${data.rating}\nQuestion ID: ${data.id}`)],
             })
          }
      }



      await interaction.reply({ embeds: [embed]});



 

    
    }}