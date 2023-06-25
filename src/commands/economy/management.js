const { SlashCommandBuilder, messageLink } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder, Embed } = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const Economy = require('discord-economy-super')
const eco = require('../../Database/ecoDB.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("manage-eco")
        .setDescription("manage economy (remelon only)")

        .addSubcommand((subcommand) => subcommand
        .setName("add-money")
        .setDescription("Adds to a user's money")
        .addUserOption(
            option => option
            .setName("user")
            .setDescription("Target").setRequired(true)
        )
        .addNumberOption(option =>
            option.setName('amount')
            .setDescription('Amount').setRequired(true)),
    )

        .addSubcommand((subcommand) => subcommand
        .setName("remove-money")
        .setDescription("Removes from a user's money")
        .addUserOption(
            option => option
            .setName("user")
            .setDescription("Target").setRequired(true)
        )
        .addNumberOption(option =>
            option.setName('amount')
            .setDescription('Amount').setRequired(true)),
    )

        .addSubcommand((subcommand) => subcommand
        .setName("set-money")
        .setDescription("Sets a user's money")
        .addUserOption(
            option => option
            .setName("user")
            .setDescription("Target").setRequired(true)
        )
        .addNumberOption(option =>
            option.setName('amount')
            .setDescription('Amount').setRequired(true)),
    ),
    async execute(interaction, client) {
        const { guild, member } = interaction;
        const sub = interaction.options.getSubcommand()

        if (interaction.user.id != "578339835153088522") {
            return interaction.reply({ content: `${backtickmulti}yaml\n❌ | You cannot use this command! \n Only ReMelon#7560 can do this!${backtickmulti}`, ephemeral: true });
        }

        switch (sub) {
            case ('add-money'):
                {

                    let Target = interaction.options.getUser("user")
                    let amount = interaction.options.getNumber("amount")
                    eco.balance.add(amount, Target.id, guild.id)

                    const embed = new EmbedBuilder()
                        .setTitle(`Add Money`)
                        .setColor(`c3b4f7`)
                        .setDescription(`Successfully added ${amount} to ${Target}'s balance!`)
                        .setTimestamp()
                        .setFooter({ text: `/${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL() })

                    await interaction.reply({ embeds: [embed], ephemeral: true });
                }
                break;
            case ('remove-money'):
                {
                    let Target = interaction.options.getUser("user")
                    let amount = interaction.options.getNumber("amount")
                    eco.balance.subtract(amount, Target.id, guild.id)

                    const embed = new EmbedBuilder()
                        .setTitle(`Remove Money`)
                        .setColor(`c3b4f7`)
                        .setDescription(`Successfully removed ${amount} from ${Target}'s balance!`)
                        .setTimestamp()
                        .setFooter({ text: `/${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL() })

                    await interaction.reply({ embeds: [embed], ephemeral: true });

                }
                break;
            case ('set-money'):
                {
                    let Target = interaction.options.getUser("user")
                    let amount = interaction.options.getNumber("amount")
                    eco.balance.set(amount, Target.id, guild.id)

                    const embed = new EmbedBuilder()
                        .setTitle(`Set Money`)
                        .setColor(`c3b4f7`)
                        .setDescription(`Successfully set ${amount} as ${Target}'s balance!`)
                        .setTimestamp()
                        .setFooter({ text: `/${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL() })

                    await interaction.reply({ embeds: [embed], ephemeral: true });
                }
                break;
        }





  
    }
}