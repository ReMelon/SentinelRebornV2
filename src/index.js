const { ActivityType, Collection, EmbedBuilder, Utils } = require("discord.js");
const chalk = require("chalk");
const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const { Player } = require("discord-player");
const moment = require("moment");
const { connect, mongoose } = require("mongoose");
const backtickmulti = "```";
const cpuStat = require('cpu-stat');
const yaml = require('js-yaml');


dotenv.config()
const TOKEN = process.env.TOKEN
const databaseToken = process.env.databaseToken

const client = new Discord.Client({
    partials: [
        ["CHANNEL"]
    ],
    intents: [
        ["Guilds"],
        ["GuildVoiceStates"],
        ["GuildMessages"],
        ["DirectMessages"],
        ["MessageContent"],
        ["GuildInvites"],
        ["GuildMembers"],
        ["AutoModerationConfiguration"],
        ["AutoModerationExecution"],
        ["DirectMessages"],
        ["DirectMessageReactions"],
        ["DirectMessageTyping"],
        ["GuildBans"],
        ["GuildEmojisAndStickers"],
        ["GuildIntegrations"],
        ["GuildMessageReactions"],
        ["GuildMessageTyping"],
        ["GuildPresences"],
        ["GuildScheduledEvents"],
        ["GuildWebhooks"],
    ]
})

client.commands = new Collection();
client.commandArray = [];
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(`.js`));
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(TOKEN);
mongoose.set("strictQuery", false);
(async() => {
    await connect(databaseToken).catch(console.error);
})();







try {
    const config = yaml.load(fs.readFileSync('js-config.yml', 'utf8'));



    /*  
        _____ __  __   _      _____  _____ _______ 
      / ____|  \/  | | |    |_   _|/ ____|__   __|
     | |  __| \  / | | |      | | | (___    | |   
     | | |_ | |\/| | | |      | |  \___ \   | |   
     | |__| | |  | | | |____ _| |_ ____) |  | |   
      \_____|_|  |_| |______|_____|_____/   |_|   
    */

    if (config.gmList) {
        client.on('ready', async() => {
            const guilds = client.guilds.cache;



            for (const [guildId, guild] of guilds) {
                console.log(`Guild name: ${guild.name}, Guild ID: ${guild.id}`);

                const members = await guild.members.fetch();

                members.forEach(member => {
                    const isBot = member.user.bot;
                    const owner = guild.ownerId;
                    const isOwner = member.user.id === owner;
                    console.log(`- User ${member.user.username}${isBot ? ' (BOT)' : ''} ${isOwner ? ' (OWNER)' : ''}`);
                });
            }
        });
    }




    /*
              _    _ _______ ____        _____ _______    _______ _    _  _____ 
        /\  | |  | |__   __/ __ \      / ____|__   __|/\|__   __| |  | |/ ____|
       /  \ | |  | |  | | | |  | |    | (___    | |  /  \  | |  | |  | | (___  
      / /\ \| |  | |  | | | |  | |     \___ \   | | / /\ \ | |  | |  | |\___ \ 
     / ____ \ |__| |  | | | |__| |     ____) |  | |/ ____ \| |  | |__| |____) |
    /_/    \_\____/   |_|  \____/     |_____/   |_/_/    \_\_|   \____/|_____/ 
                                                                               
    */


    if (config.autostatus) {

        //STATUS
        client.on('ready', () => {
            client.user.setStatus("idle");


            let defaultnonsense = [
                'discord.js v14', '/help || discord.js v14', 'music with /play song', `ReMelon's songs`, `use /8ball to make choices`,
                `music in ${client.guilds.cache.size} servers!`, `music with /play song`, `Hello world!`, 'minecraft', `Hey did you notice the status changes?`,
                `Yeah it seems to change every 5 seconds`, `Made by ReMelon#7560`, `/help || Discord Music bot`, `/help || Music Bot`, `/help || Hello world!`,
                `mind games`, `in the big leagues`, `cards || Cards: 4C, 2H, Q, A`, `with your feelings`, `with your feelings`, `the piano`, `hide and seek, i see you`,
                `with fire`, `with fire at your house`, `games with my dad (bill gates)`, `my dad works at mojang he will ban you`, `prodigy (math game)`, `2B2T w/ fitmc`,
                `arson, arson, light up carson`, `baseball w/ my homies`
            ];

            let rollingstatustest = [
                "Sentinel 1", "Sentinel 2", "Sentinel 3", "Sentinel 4", "Sentinel 5", "Sentinel 6", "Sentinel 7", "Sentinel 8", "Sentinel 9", "Sentinel 10",
            ]

            let packagetouse = defaultnonsense


            let counter = 0;

            setInterval(function() {
                let status = packagetouse[counter % packagetouse.length];
                client.user.setActivity(status, ActivityType.Playing)

                if (packagetouse = defaultnonsense) {
                    let packagename = "Default Nonsense"
                    console.log(chalk.cyan(`[RPC CHANGED] ${status} from ${packagename}`));
                } else if (packagetouse = rollingstatustest) {
                    let packagename = "Rolling Status Test"
                    console.log(chalk.cyan(`[RPC CHANGED] ${status} from ${packagename}`));
                }


                counter++;

            }, 15000);

        })

    }













    /* 
      _____  ______          _______     __     _____  __  __ 
      |  __ \|  ____|   /\   |  __ \ \   / /    |  __ \|  \/  |
      | |__) | |__     /  \  | |  | \ \_/ /     | |  | | \  / |
      |  _  /|  __|   / /\ \ | |  | |\   /      | |  | | |\/| |
      | | \ \| |____ / ____ \| |__| | | |       | |__| | |  | |
      |_|  \_\______/_/    \_\_____/  |_|       |_____/|_|  |_|
    */



    if (config.readydm) {

        client.on("ready", async message => {
            const days = Math.floor(client.uptime / 86400000)
            const hours = Math.floor(client.uptime / 3600000) % 24
            const minutes = Math.floor(client.uptime / 60000) % 60
            const seconds = Math.floor(client.uptime / 1000) % 60

            cpuStat.usagePercent(function(error, percent) {

                const memoryUsage = process.memoryUsage().heapUsed
                const memoryMB = memoryUsage * 0.000001
                const memoryUsageRounded = memoryMB.toFixed(2);
                // do you want to make a test command or smth
                const node = process.version
                const cpu = percent.toFixed(2)
                const totalCores = cpuStat.totalCores();

                const embed = new EmbedBuilder()
                    .setTitle("Client is ready!")
                    .setColor("c3b4f7")
                    .addFields({ name: "Bot Name", value: `${client.user.tag}`, inline: true }, { name: "Bot ID", value: `${client.user.id}`, inline: true }, { name: "Creation Date", value: `${client.user.createdAt}` }, { name: "Help Command", value: `/help` }, { name: "Uptime", value: `\`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes and \`${seconds}\` seconds.` }, { name: "Discord API Ping", value: `${client.ws.ping}ms` }, { name: "Node Version", value: `${node}` }, { name: "CPU Cores", value: `${totalCores}`, inline: true }, { name: "CPU Usage", value: `${cpu}%`, inline: true }, { name: "Memory Usage", value: `${memoryUsageRounded}MB`, inline: true }, )
                    .setThumbnail(
                        "https://cdn.discordapp.com/avatars/578339835153088522/127bd18d5808fdc8bf807b2e9a22545c.png?size=256"
                    )
                    .setImage(
                        "https://cdn.discordapp.com/attachments/1056774984082653204/1065136383489998859/Sentinel_Reborn_Banner.png"
                    );

                const user = client.users.cache.get('578339835153088522');

                user.send({ embeds: [embed] })
            })
        })




        /*    
          ______ ____  _____   _____ ______     __  __ _    _ _______ ______ 
          |  ____/ __ \|  __ \ / ____|  ____|   |  \/  | |  | |__   __|  ____|
          | |__ | |  | | |__) | |    | |__      | \  / | |  | |  | |  | |__   
          |  __|| |  | |  _  /| |    |  __|     | |\/| | |  | |  | |  |  __|  
          | |   | |__| | | \ \| |____| |____    | |  | | |__| |  | |  | |____ 
          |_|    \____/|_|  \_\\_____|______|   |_|  |_|\____/   |_|  |______|
                                                                              
        */


        if (config.forceMute.enabled) {

            client.on("messageCreate", async message => {
                if (message.author.id === config.forceMute.userid) {
                    message.delete();
                }

                return;
            })

        }


    }
} catch (e) {
    console.log(e);
}







//SLASHCMDTEMP

/* 
const { SlashCommandBuilder, messageLink } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder, Embed } = require("discord.js")
const fs = require("fs")
const moment = require("moment")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("tempname")
    .setDescription("tempdesc"),
        async execute(interaction, client) {

        const embed = new EmbedBuilder()
        .setTitle(`temp`)
        .setColor(`c3b4f7`)
        .setDescription(`temp`)
        .setTimestamp()
        .setFooter({ text: `/${interaction.commandName} || ${interaction.user.tag}`, iconURL: client.user.displayAvatarURL()})

        await interaction.reply({ embeds: [embed]});


    }}
 */


client.on('messageCreate', message => {
    if (message.content.startsWith('!combine')) {
        const args = message.content.slice('!combine'.length).trim().split(/ +/);
        const amount = parseInt(args[0]);
        if (isNaN(amount)) {
            return message.reply('Please provide a valid number of messages to combine.');
        }
        if (amount < 2) {
            return message.reply('Please provide a number greater than or equal to 2.');
        }
        const maxFetch = Math.ceil(amount / 100);
        const messagesToCombine = Math.min(amount, (maxFetch - 1) * 100 + (amount % 100));
        const messageList = [];
        let i = 0;
        let lastId = null;
        let messagesProcessed = 0;
        const fetchMessages = async() => {
            const options = { limit: 100 };
            if (lastId) {
                options.before = lastId;
            }
            const messages = await message.channel.messages.fetch(options);
            if (!messages || messages.size === 0) {
                return;
            }
            lastId = messages.last().id;
            messageList.push(...Array.from(messages.values()));
            messagesProcessed += messages.size;
            if (messagesProcessed >= messagesToCombine || i >= maxFetch) {
                const combinedMessage = messageList.reverse().slice(0, messagesToCombine).map(m => m.content.replace(/\n/g, '')).join(' ');
                if (combinedMessage.length > 0) {
                    if (combinedMessage.length > 2000) {
                        const chunks = combinedMessage.match(/.{1,1999}/g);
                        for (const chunk of chunks) {
                            message.channel.send(chunk);
                        }
                    } else {
                        message.channel.send(combinedMessage);
                    }
                }
            } else {
                i++;
                await fetchMessages();
            }
        };
        fetchMessages();
    }
});