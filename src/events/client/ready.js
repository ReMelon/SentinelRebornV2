const chalk = require("chalk");
const cron = require('cron');
const schedule = require('node-schedule');
const { Discord, EmbedBuilder, MessageMentions } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(chalk.magenta(`[CLIENT] Logged in as ${client.user.tag}`));

        const today = moment().format("MM-DD-YYYY");
        const dd = moment().format("DD");

        const guildId = '1015919547854897262';
        const guild = client.guilds.cache.get(guildId);

        if (!guild) {
            console.error('Unable to find guild');
            return;
        }

        guild.members.fetch()
            .then(members => {
                members.forEach(member => {
                    const originalNickname = member.nickname;
                    if (originalNickname && originalNickname.endsWith('!') && member.id !== '578339835153088522' && member.id !== '1015915461625532436') {
                        const modifiedNickname = originalNickname.slice(0, -1);
                        member.setNickname(modifiedNickname)
                            .catch(console.error);
                    }
                });
            })
            .catch(console.error);













        async function deleteMessages() {
            const channelId = '1085034092573245440';
            const numMessages = 100;
            const channel = await client.channels.fetch(channelId);
            await channel.bulkDelete(numMessages);
        }

        function FutureUnix(minutes) {
            const futureMoment = moment().add(minutes, 'minutes');
            const futureTimestamp = futureMoment.unix();
            return futureTimestamp;
        }










        /* 


                schedule.scheduleJob({ dayOfWeek: [1, 2, 3, 4, 5], hour: 14, minute: 25 }, async() => {

                    //35 Minutes in Future
                    const futureTimestamp = FutureUnix(35);

                    //Class Link Embed
                    const sciencestart = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Class Reminders`)
                        .setDescription(`${backtickmulti}yaml\nScience Class is Starting!\n${backtickmulti}`)
                        .addFields({
                            name: "`Science Class Join Link`",
                            value: `https://sms.k8school.com/meeting/auth/BATCHES/137/1352/3783/${dd}/${today}/10:55:00`,
                            inline: true,
                        })
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Class Links || ReMelon#7560`, iconURL: client.user.displayAvatarURL() })

                    //Timer Embed
                    const endcountdown = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Live Timer`)
                        .setDescription(`Science Class will end in <t:${futureTimestamp}:R>`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Class Timer || ReMelon#7560 || *Disclaimer: Class end timing may not be accurate*`, iconURL: client.user.displayAvatarURL() })


                    //Purge + Send & Ping
                    // Purge previous messages
                    await deleteMessages();

                    // Wait for 5 seconds
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    client.channels.cache.get('1085034092573245440').send({ embeds: [sciencestart] })
                    client.channels.cache.get('1085034092573245440').send(`<@&1038025622921949244>`, { allowedMentions: { parse: [MessageMentions.USERS, MessageMentions.ROLES, MessageMentions.EVERYONE, MessageMentions.HERE] } })
                    client.channels.cache.get('1085034092573245440').send({ embeds: [endcountdown] })
                });



                schedule.scheduleJob({ dayOfWeek: [1, 2, 3, 4, 5], hour: 15, minute: 00 }, async() => {

                    //35 Minutes in Future
                    const futureTimestamp = FutureUnix(10);

                    const endedembed = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Timed Notifications`)
                        .setDescription(`${backtickmulti}yaml\nScience Class has ended!\n${backtickmulti}`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Auto Response || ReMelon#7560 || *Disclaimer: Class end timing may not be accurate*`, iconURL: client.user.displayAvatarURL() })

                    //Timer Embed
                    const starttimer = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Live Timer`)
                        .setDescription(`Social Class will start in <t:${futureTimestamp}:R>`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Class Timer || ReMelon#7560 || *Disclaimer: Class end timing may not be accurate*`, iconURL: client.user.displayAvatarURL() })



                    //Purge + Send & Ping
                    // Purge previous messages
                    await deleteMessages();

                    // Wait for 5 seconds
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    client.channels.cache.get('1085034092573245440').send({ embeds: [endedembed] })
                    client.channels.cache.get('1085034092573245440').send({ embeds: [starttimer] })
                });

















                schedule.scheduleJob({ dayOfWeek: [1, 2, 3, 4, 5], hour: 15, minute: 10 }, async() => {

                    const futureTimestamp = FutureUnix(35);

                    const socialstart = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Timed Notifications`)
                        .setDescription(`${backtickmulti}yaml\nSocial Class is Starting!\n${backtickmulti}`)
                        .addFields({
                            name: "`Social Class Join Link`",
                            value: `https://sms.k8school.com/meeting/auth/BATCHES/137/1352/2185/${dd}/${today}/11:40:00`,
                            inline: true,
                        })
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Auto Response || ReMelon#7560`, iconURL: client.user.displayAvatarURL() })

                    //Timer Embed
                    const endcountdown = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Live Timer`)
                        .setDescription(`Social Class will end in <t:${futureTimestamp}:R>`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Class Timer || ReMelon#7560 || *Disclaimer: Class end timing may not be accurate*`, iconURL: client.user.displayAvatarURL() })


                    //Purge + Send & Ping
                    // Purge previous messages
                    await deleteMessages();

                    // Wait for 5 seconds
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    client.channels.cache.get('1085034092573245440').send({ embeds: [socialstart] })
                    client.channels.cache.get('1085034092573245440').send(`<@&1038025622921949244>`, { allowedMentions: { parse: [MessageMentions.USERS, MessageMentions.ROLES, MessageMentions.EVERYONE, MessageMentions.HERE] } })
                    client.channels.cache.get('1085034092573245440').send({ embeds: [endcountdown] })

                });


                schedule.scheduleJob({ dayOfWeek: [1, 2, 3, 4, 5], hour: 15, minute: 45 }, async() => {

                    const futureTimestamp = FutureUnix(10);

                    const endedembed = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Timed Notifications`)
                        .setDescription(`${backtickmulti}yaml\nSocial Class has ended!\n${backtickmulti}`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Auto Response || ReMelon#7560`, iconURL: client.user.displayAvatarURL() })

                    //Timer Embed
                    const starttimer = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Live Timer`)
                        .setDescription(`Class will start in <t:${futureTimestamp}:R>`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Class Timer || ReMelon#7560 || *Disclaimer: Class end timing may not be accurate*`, iconURL: client.user.displayAvatarURL() })




                    //Purge + Send & Ping
                    // Purge previous messages
                    await deleteMessages();

                    // Wait for 5 seconds
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    client.channels.cache.get('1085034092573245440').send({ embeds: [endedembed] })
                    client.channels.cache.get('1085034092573245440').send({ embeds: [starttimer] })

                });



















                schedule.scheduleJob({ dayOfWeek: [1, 2, 3, 4, 5], hour: 15, minute: 55 }, async() => {

                    //35 Minutes in Future
                    const futureTimestamp = FutureUnix(35);

                    const pecfstart = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Timed Notifications`)
                        .setDescription(`${backtickmulti}yaml\nClass is Starting!\n${backtickmulti}`)
                        .addFields({
                            name: "`Coding Class Join Link`",
                            value: `https://sms.k8school.com/meeting/auth/BATCHES/137/1352/3781/${dd}/${today}/12:25:00`,
                        }, {
                            name: "`PE Class Join Link`",
                            value: `https://sms.k8school.com/a58ba55c-9d60-45f8-a816-9012b219b756/meeting/auth/BATCHES/137/1352/3786/${dd}/${today}/12:25:00/k8-school`,
                        })
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Auto Response || ReMelon#7560`, iconURL: client.user.displayAvatarURL() })

                    //Timer Embed
                    const endcountdown = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Live Timer`)
                        .setDescription(`Class will end in <t:${futureTimestamp}:R>`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Class Timer || ReMelon#7560 || *Disclaimer: Class end timing may not be accurate*`, iconURL: client.user.displayAvatarURL() })


                    //Purge + Send & Ping
                    // Purge previous messages
                    await deleteMessages();

                    // Wait for 5 seconds
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    client.channels.cache.get('1085034092573245440').send({ embeds: [pecfstart] })
                    client.channels.cache.get('1085034092573245440').send(`<@&1038025622921949244>`, { allowedMentions: { parse: [MessageMentions.USERS, MessageMentions.ROLES, MessageMentions.EVERYONE, MessageMentions.HERE] } })
                    client.channels.cache.get('1085034092573245440').send({ embeds: [endcountdown] })

                });


                schedule.scheduleJob({ dayOfWeek: [1, 2, 3, 4, 5], hour: 16, minute: 30 }, async() => {

                    const futureTimestamp = FutureUnix(35);

                    const endedembed = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Timed Notifications`)
                        .setDescription(`${backtickmulti}yaml\nClass has ended!\n${backtickmulti}`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Auto Response || ReMelon#7560`, iconURL: client.user.displayAvatarURL() })

                    //Timer Embed
                    const starttimer = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Live Timer`)
                        .setDescription(`English class will start in <t:${futureTimestamp}:R>`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Class Timer || ReMelon#7560 || *Disclaimer: Class end timing may not be accurate*`, iconURL: client.user.displayAvatarURL() })



                    //Purge + Send & Ping
                    // Purge previous messages
                    await deleteMessages();

                    // Wait for 5 seconds
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    client.channels.cache.get('1085034092573245440').send({ embeds: [endedembed] })
                    client.channels.cache.get('1085034092573245440').send({ embeds: [starttimer] })


                });

























                schedule.scheduleJob({ dayOfWeek: [1, 2, 3, 4, 5], hour: 17, minute: 05 }, async() => {

                    const futureTimestamp = FutureUnix(35);

                    const englishstart = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Timed Notifications`)
                        .setDescription(`${backtickmulti}yaml\nEnglish Class is Starting!\n${backtickmulti}`)
                        .addFields({
                            name: "`English Class Join Link`",
                            value: `https://sms.k8school.com/meeting/auth/BATCHES/137/1352/3779/${dd}/${today}/13:35:00`,
                            inline: true,
                        })
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Auto Response || ReMelon#7560`, iconURL: client.user.displayAvatarURL() })


                    //Timer Embed
                    const endcountdown = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Live Timer`)
                        .setDescription(`English Class will end in <t:${futureTimestamp}:R>`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Class Timer || ReMelon#7560 || *Disclaimer: Class end timing may not be accurate*`, iconURL: client.user.displayAvatarURL() })


                    //Purge + Send & Ping
                    // Purge previous messages
                    await deleteMessages();

                    // Wait for 5 seconds
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    client.channels.cache.get('1085034092573245440').send({ embeds: [englishstart] })
                    client.channels.cache.get('1085034092573245440').send(`<@&1038025622921949244>`, { allowedMentions: { parse: [MessageMentions.USERS, MessageMentions.ROLES, MessageMentions.EVERYONE, MessageMentions.HERE] } })
                    client.channels.cache.get('1085034092573245440').send({ embeds: [endcountdown] })
                });


                schedule.scheduleJob({ dayOfWeek: [1, 2, 3, 4, 5], hour: 17, minute: 40 }, async() => {

                    const futureTimestamp = FutureUnix(10);

                    const endedembed = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Timed Notifications`)
                        .setDescription(`${backtickmulti}yaml\nEnglish class has ended!\n${backtickmulti}`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Auto Response || ReMelon#7560`, iconURL: client.user.displayAvatarURL() })


                    //Timer Embed
                    const starttimer = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Live Timer`)
                        .setDescription(`Class will start in <t:${futureTimestamp}:R>`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Class Timer || ReMelon#7560 || *Disclaimer: Class end timing may not be accurate*`, iconURL: client.user.displayAvatarURL() })



                    //Purge + Send & Ping
                    // Purge previous messages
                    await deleteMessages();

                    // Wait for 5 seconds
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    client.channels.cache.get('1085034092573245440').send({ embeds: [endedembed] })
                    client.channels.cache.get('1085034092573245440').send({ embeds: [starttimer] })

                });



























                schedule.scheduleJob({ dayOfWeek: [1, 2, 3, 4, 5], hour: 17, minute: 50 }, async() => {

                    const futureTimestamp = FutureUnix(35);

                    const hstartembed = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Timed Notifications`)
                        .setDescription(`${backtickmulti}yaml\nHindi Class is Starting!\n${backtickmulti}`)
                        .addFields({
                            name: "`Hindi Class Join Link`",
                            value: `https://sms.k8school.com/meeting/auth/BATCHES/137/1352/2183/${dd}/${today}/14:20:00`,
                            inline: true,
                        })
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Auto Response || ReMelon#7560`, iconURL: client.user.displayAvatarURL() })


                    const sstartembed = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Timed Notifications`)
                        .setDescription(`${backtickmulti}yaml\nSpanish Class is Starting!\n${backtickmulti}`)
                        .addFields({
                            name: "`Spanish Class Join Link`",
                            value: `https://sms.k8school.com/a58ba55c-9d60-45f8-a816-9012b219b756/meeting/auth/BATCHES/137/480/3743/${dd}/${today}/14:20:00/k8-school`,
                            inline: true,
                        })
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Auto Response || ReMelon#7560`, iconURL: client.user.displayAvatarURL() })



                    //Timer Embed
                    const endcountdown = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Live Timer`)
                        .setDescription(`Class will end in <t:${futureTimestamp}:R>`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Class Timer || ReMelon#7560 || *Disclaimer: Class end timing may not be accurate*`, iconURL: client.user.displayAvatarURL() })

                    //Purge + Send & Ping
                    // Purge previous messages
                    await deleteMessages();

                    // Wait for 5 seconds
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    client.channels.cache.get('1085034092573245440').send({ embeds: [hstartembed] })
                    client.channels.cache.get('1085034092573245440').send({ embeds: [sstartembed] })
                    client.channels.cache.get('1085034092573245440').send(`<@&1038025622921949244>`, { allowedMentions: { parse: [MessageMentions.USERS, MessageMentions.ROLES, MessageMentions.EVERYONE, MessageMentions.HERE] } })
                    client.channels.cache.get('1085034092573245440').send({ embeds: [endcountdown] })


                });

                schedule.scheduleJob({ dayOfWeek: [1, 2, 3, 4, 5], hour: 18, minute: 25 }, async() => {

                    const futureTimestamp = FutureUnix(10);

                    const endedembed = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Timed Notifications`)
                        .setDescription(`${backtickmulti}yaml\nHindi and Spanish class have ended!\n${backtickmulti}`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Auto Response || ReMelon#7560`, iconURL: client.user.displayAvatarURL() })

                    const starttimer = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Live Timer`)
                        .setDescription(`Maths Class will start in <t:${futureTimestamp}:R>`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Class Timer || ReMelon#7560 || *Disclaimer: Class end timing may not be accurate*`, iconURL: client.user.displayAvatarURL() })



                    //Purge + Send & Ping
                    // Purge previous messages
                    await deleteMessages();

                    // Wait for 5 seconds
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    client.channels.cache.get('1085034092573245440').send({ embeds: [endedembed] })
                    client.channels.cache.get('1085034092573245440').send({ embeds: [starttimer] })

                });


























                schedule.scheduleJob({ dayOfWeek: [1, 2, 3, 4, 5], hour: 18, minute: 35 }, async() => {

                    const futureTimestamp = FutureUnix(35);

                    const startembed = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Timed Notifications`)
                        .setDescription(`${backtickmulti}yaml\nMath Class is Starting!\n${backtickmulti}`)
                        .addFields({
                            name: "`Math Class Join Link`",
                            value: `https://sms.k8school.com/a58ba55c-9d60-45f8-a816-9012b219b756/meeting/auth/BATCHES/137/1352/3782/${dd}/${today}/15:05:00/k8-school`,
                            inline: true,
                        })
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Auto Response || ReMelon#7560`, iconURL: client.user.displayAvatarURL() })


                    const endcountdown = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Live Timer`)
                        .setDescription(`Maths Class will end in <t:${futureTimestamp}:R>`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Class Timer || ReMelon#7560 || *Disclaimer: Class end timing may not be accurate*`, iconURL: client.user.displayAvatarURL() })

                    //Purge + Send & Ping
                    // Purge previous messages
                    await deleteMessages();

                    // Wait for 5 seconds
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    client.channels.cache.get('1085034092573245440').send({ embeds: [startembed] })
                    client.channels.cache.get('1085034092573245440').send(`<@&1038025622921949244>`, { allowedMentions: { parse: [MessageMentions.USERS, MessageMentions.ROLES, MessageMentions.EVERYONE, MessageMentions.HERE] } })
                    client.channels.cache.get('1085034092573245440').send({ embeds: [endcountdown] })
                });




                schedule.scheduleJob({ dayOfWeek: [1, 2, 3, 4], hour: 19, minute: 10 }, async() => {

                    const futureTimestamp = FutureUnix(1155);

                    const sixthendembed = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Timed Notifications`)
                        .setDescription(`${backtickmulti}yaml\nMath Class has ended! See you tommorow!\n${backtickmulti}`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Auto Response || ReMelon#7560`, iconURL: client.user.displayAvatarURL() })

                    const starttimer = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Live Timer`)
                        .setDescription(`Science Class will start in <t:${futureTimestamp}:R>`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Class Timer || ReMelon#7560 || *Disclaimer: Class end timing may not be accurate*`, iconURL: client.user.displayAvatarURL() })



                    //Purge + Send & Ping
                    // Purge previous messages
                    await deleteMessages();

                    // Wait for 5 seconds
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    client.channels.cache.get('1085034092573245440').send({ embeds: [sixthendembed] })
                    client.channels.cache.get('1085034092573245440').send({ embeds: [starttimer] })



                });

                schedule.scheduleJob({ dayOfWeek: [5], hour: 19, minute: 10 }, async() => {

                    const futureTimestamp = FutureUnix(4035);

                    const sixthendembed = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Timed Notifications`)
                        .setDescription(`${backtickmulti}yaml\nMath Class has ended! See you next week!\n${backtickmulti}`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Auto Response || ReMelon#7560`, iconURL: client.user.displayAvatarURL() })


                    const starttimer = new EmbedBuilder()
                        .setColor(`c3b4f7`)
                        .setTitle(`Live Timer`)
                        .setDescription(`Science Class will start in <t:${futureTimestamp}:R>`)
                        .setTimestamp()
                        .setFooter({ text: `Sentinel Class Timer || ReMelon#7560 || *Disclaimer: Class end timing may not be accurate*`, iconURL: client.user.displayAvatarURL() })


                    //Purge + Send & Ping
                    // Purge previous messages
                    await deleteMessages();

                    // Wait for 5 seconds
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    client.channels.cache.get('1085034092573245440').send({ embeds: [sixthendembed] })
                    client.channels.cache.get('1085034092573245440').send({ embeds: [starttimer] }) 

                });*/



    },
};