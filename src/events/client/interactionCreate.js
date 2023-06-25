const chalk = require("chalk");
const { InteractionType } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: `Command you requested does not exist! The bot may have crashed.`, ephemeral: true });
            }
        } else if (
            interaction.type == InteractionType.ApplicationCommandAutocomplete
        ) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return;

            try {
                await command.autocomplete(interaction, client);
            } catch (err) {
                console.error(err);
            }
        }
    },
};