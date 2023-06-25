const { SlashCommandBuilder, messageLink } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder, Embed } = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const Economy = require('discord-economy-super')
const eco = require('../../Database/ecoDB.js')

module.exports = {
	data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Buy items from the shop")
    
    .addSubcommand((subcommand) => subcommand
    .setName("list")
    .setDescription("Lists the items in the shop")
    )

    .addSubcommand((subcommand) => subcommand
    .setName("add")
    .setDescription("Adds a item to the shop")
    .addStringOption(option =>
        option.setName(`name`)
        .setDescription(`The name of the item`).setRequired(true))   		
    .addNumberOption(option =>
        option.setName('price')
        .setDescription('Price').setRequired(true)),
    )
    .addSubcommand((subcommand) => subcommand
    .setName("buy")
    .setDescription("Buys a item from the shop")
    .addNumberOption(option =>
        option.setName(`itemid`)
        .setDescription(`The ID of the item`).setRequired(true))   		
    .addNumberOption(option =>
        option.setName('quantity')
        .setDescription('The quantity').setRequired(true)),
    ),
		async execute(interaction, client) {
            const { guild, member } = interaction;
  
            const user =  eco.users.get(member.id, guild.id)
            const sub = interaction.options.getSubcommand()
            const shop = eco.shop.get(interaction.guild.id) || []

            
            if (sub === "list") {
                const guildShop = shop.filter(item => !item.custom.hidden)
            
                if (!guildShop.length) {
                    return interaction.reply(`${interaction.user.tag}, there are no items in the shop.`)
                }
            
                interaction.reply(
                    `**${interaction.guild.name}** - Guild Shop **[${guildShop.length} items]**:\n\n` +
            
                    `${guildShop
                        .map((item, index) =>
                            `${index + 1} - ${item.custom.locked ? ' 🔒 | ' : ' '}` +
                            `**${item.name}** (ID: **${item.id}**) - **${item.price}** coins`)
                        .join('\n')}`
                )
            }
            
            if (sub === "find") {
                const [itemID] = args
            
                const item = shop.find(item => item.id == parseInt(itemID) || item.name == itemID)
            
                if (!itemID) {
                    return message.channel.send(`${message.author}, please specify an item.`)
                }
            
                if (!item || item?.custom?.hidden) {
                    return message.channel.send(`${message.author}, item not found.`)
                }
            
                message.channel.send(
                    `**${item.custom.emoji} ${item.name}** - Item Info:\n\n` +
            
                    `Name: ${item.name}` +
                    `${item.custom.locked ? ` [🔒 | Locked since ${new Date(item.custom.lockedSince)
                        .toLocaleString()}]` : ''}\n` +
            
                    `ID: **${item.id}**\n` +
                    `Emoji: ${item.custom.emoji}\n\n` +
            
                    `Price: **${item.price}** coins\n` +
                    `Description: **${item.description}**\n` +
                    `Max quantity in inventory: **${item.maxAmount}**\n\n` +
            
                    `${item.role ? `Role: **<@&${item.role}>**\n` : ''}` +
                    `Hidden: **${item.custom.hidden ? 'Yes' : 'No'}**\n` +
                    `Locked: **${item.custom.locked ? 'Yes' : 'No'}**\n\n` +
            
                    `Message on use: **${item.message}**\n` +
                    `Created at: **${item.date}**`
                )
            }
            
            
            if (sub === "add") {
                const name = interaction.options.getString("name")
                const price = interaction.options.getNumber("price")
                let guild = eco.guilds.get(interaction.guild.id)

                if (interaction.user.id != "578339835153088522") {
                    return interaction.reply({ content: `${backtickmulti}yaml\n❌ | You cannot use this command! \n Only ReMelon#7560 can do this!${backtickmulti}`, ephemeral: true });   
                }

                const newItem = guild.shop.addItem({
                    name,
                    price,
                })
            
                interaction.reply(
                    `${interaction.user.username}, you added **${newItem.name}** for **${newItem.price}** coins to the shop.`
                )
                
            }

            if (sub === "buy") {
                const quantity = interaction.options.getNumber("quantity")
                const itemID = interaction.options.getNumber("itemid")

                const item = shop.find(item => item.id == parseInt(itemID) || item.name == itemID)
        

                if (!item || item?.custom?.hidden) {
                    return interaction.reply(`${interaction.user.tag}, item not found.`)
                }
        
                if (item.custom.locked) {
                    return interaction.reply(`${interaction.user.tag}, this item is locked - you cannot buy it.`)
                }
        
                if (!item.isEnoughMoneyFor(user.id, quantity)) {
                    return interaction.reply(
                        `${interaction.user.tag}, you don't have enough coins to buy ` +
                        `**x${quantity} of ${item.name}**.`
                    )
                }
        
                const buyingResult = user.items.buy(item.id, quantity)
        
                if (!buyingResult.status) {
                    return interaction.reply(`${interaction.user.tag}, failed to buy the item: ${buyingResult.message}`)
                }
        
                interaction.reply(
                    `${interaction.user.tag}, you bought **x${buyingResult.quantity} ` +
                    `${item.name}** for **${buyingResult.totalPrice}** coins.`
                )
            }
            
            
 
  
    }}