const { SlashCommandBuilder, messageLink } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder, Embed, IntegrationApplication } = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const Economy = require('discord-economy-super')
const eco = require('../../Database/ecoDB.js')

module.exports = {
	data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("See your or other's inventory")
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("Person whose inventoru you want to check")
    ),
		async execute(interaction, client) {
        const { guild } = interaction;
        const shop = eco.shop.get(interaction.guild.id) || []
        const member = interaction.options.getUser("user") || interaction.member.user

        const inventory = eco.inventory.get(member.id, guild.id)

        if (!inventory.length) {
            return interaction.reply(`${interaction.user.tag}, you don't have any items in your inventory.`)
        }

        const cleanInventory = [...new Set(inventory.map(item => item.name))]
        .map(itemName => shop.find(shopItem => shopItem.name == itemName))
        .map(item => {
            const quantity = inventory.filter(invItem => invItem.name == item.name).length

            return {
                quantity,
                totalPrice: item.price * quantity,
                item
            }
        })

        interaction.reply(
            `${interaction.user.tag}, here's your inventory [**${inventory.length} items**]:\n\n` +
            cleanInventory
                .map(
                    (data, index) =>
                        `${index + 1} - **x${data.quantity} ` +
                        `${data.item.name}** (ID: **${data.item.id}**) ` +
                        `for **${data.totalPrice}** coins`
                )
                .join('\n')
        )


 
    }}