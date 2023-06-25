const { SlashCommandBuilder, messageLink } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder, Embed } = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const Economy = require('discord-economy-super')
const eco = require('../../Database/ecoDB.js')
const {CommandCooldown, msToMinutes} = require('discord-command-cooldown');
const ms = require('ms');

const AttackCooldown = new CommandCooldown('attack', ms('5m'));

module.exports = {
	data: new SlashCommandBuilder()
    .setName("rob")
    .setDescription("Attack a user")
    .addUserOption(
        option => option
        .setName("user")
        .setDescription("Person to attack").setRequired(true)
    ),
		async execute(interaction, client) {
            const userCooldowned = await AttackCooldown.getUser(interaction.user.id); // Check if user need to be cooldowned
            if(userCooldowned){
                const timeLeft = msToMinutes(userCooldowned.msLeft, false); // False for excluding '0' characters for each number < 10
                interaction.reply(`You need to wait ${ timeLeft.hours + ' hours, ' + timeLeft.minutes + ' minutes, ' + timeLeft.seconds + ' seconds'} before running command again!`);
            }else{
              await AttackCooldown.addUser(interaction.user.id);


        const { guild, member } = interaction;
        const user = interaction.options.getUser("user")

        if (user.id === interaction.user.id) {
            return interaction.reply({ content: "You can't rob yourself!", ephemeral: true });
        }

        

        const inventory = eco.inventory.get(member.id, guild.id)
        const shop = eco.shop.get(interaction.guild.id) || []

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

        const finalcheck = cleanInventory
            .map(
                (data, index) =>
                    `${data.item.name}`
                    
            ).join('\n')

        if (!finalcheck.includes("Knife")) {
            return interaction.reply("You do not have a knife! Buy it from the shop!")
        }

        if (finalcheck.includes("Shotgun")) {            
        

            const abalance = eco.balance.fetch(member.id, guild.id)

            const vbalancebank = eco.bank.fetch(user.id, guild.id)
            const vbalance = eco.balance.fetch(user.id, guild.id)
    
            const payout = vbalance / 100 * 7
            const payoutbank = vbalancebank / 100 * 5
            
            eco.balance.add(payout, member.id, guild.id)
            eco.balance.add(payoutbank, member.id, guild.id)

            eco.balance.subtract(payout, user.id, guild.id)
            eco.bank.subtract(payoutbank, user.id, guild.id)
    
            const channel = interaction.channel
            const embed = new EmbedBuilder()
            .setTitle("Rob")
            .setDescription(`${interaction.user.tag} robbed ${user.tag} with a SHOTGUN for \`${payout}🪙\` from the wallet AND \`${payoutbank}\` from the bank!`)
            .setColor(`c3b4f7`)

            await interaction.reply({ embeds: [embed]});

  
            channel.send(`[NOTIFICATION] <@${user.id}> you were robbed by <@${interaction.user.id}>!`)

            return;
    
            }

        if (finalcheck.includes("Knife")) {            
        

        const abalance = eco.balance.fetch(member.id, guild.id)
        const vbalance = eco.balance.fetch(user.id, guild.id)

        const payout = vbalance / 100 * 7
        
        eco.balance.add(payout, member.id, guild.id)
        eco.balance.subtract(payout, user.id, guild.id)

        const channel = interaction.channel
        const embed = new EmbedBuilder()
        .setTitle("Rob")
        .setDescription(`${interaction.user.tag} robbed ${user.tag} with a KNIFE for \`${payout}🪙\` from the wallet!`)
        .setColor(`c3b4f7`)

        await interaction.reply({ embeds: [embed]});


        }


        
        const channel = interaction.channel
        channel.send(`[NOTIFICATION] <@${user.id}> you were robbed by <@${interaction.user.id}>!`)


 
        }
    }}