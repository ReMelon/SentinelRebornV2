const { SlashCommandBuilder, messageLink } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder, Embed, AttachmentBuilder } = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const DIG = require("discord-image-generation");
const isImageURL = require('image-url-validator').default;


module.exports = {
	data: new SlashCommandBuilder()
    .setName("draw")
    .setDescription("Modify an avatar")
    		.addSubcommand((subcommand) => subcommand
				.setName("avatar")
				.setDescription("Draws on a avatar")

                .addUserOption(
                    option => option
                    .setName("user")
                    .setDescription("Person whose avatar you want to draw").setRequired(true)
                )       		
                .addStringOption(option =>
                    option.setName('type')
                    .setDescription('Type of modification to make to the avatar').setRequired(true).setAutocomplete(true)),
                )

            .addSubcommand((subcommand) => subcommand
                .setName("image")
                .setDescription("Draws on a image")

                .addStringOption(option =>
                    option.setName('imagelink')
                    .setDescription('Image link').setRequired(true))

                .addStringOption(option =>
                    option.setName('type')
                    .setDescription('Type of modification to make to the image').setRequired(true).setAutocomplete(true)),
            ),        
            
        async autocomplete(interaction) {
            const focusedValue = interaction.options.getFocused();
            const choices = ['Blur', 'Greyscale', 'Inverted', 'Triggered', 'Bob Ross', 'Clown', 'Deep Fry', 'Delete', 'Jail', 'Stonk', 'Wanted'];
            const filtered = choices.filter(choice => choice.startsWith(focusedValue));
            await interaction.respond(
                filtered.map(choice => ({ name: choice, value: choice })),
            );
        },

		async execute(interaction, client) {
            if (interaction.options.getSubcommand() === "avatar") {
            const user = interaction.options.getUser("user")
            const type = interaction.options.getString("type")

            let avatar = user.displayAvatarURL({
                forceStatic: true,
                extension: 'png'
            });

            if (type == "Blur") {
            // Make the image
            let img = await new DIG.Blur().getImage(avatar);
            // Add the image as an attachement
            let embed = new EmbedBuilder()
                .setTitle("Blur")
                .setColor(`c3b4f7`)
                .setImage("attachment://blur.png");
            let attach = new AttachmentBuilder(img).setName("blur.png");
            interaction.reply({
                embeds: [embed],
                files: [attach]
            });
            }

            if (type == "Greyscale") {
                // Make the image
                let img = await new DIG.Greyscale().getImage(avatar);
                // Add the image as an attachement
                let embed = new EmbedBuilder()
                    .setTitle("Greyscale")
                    .setColor(`c3b4f7`)
                    .setImage("attachment://greyscale.png");
                let attach = new AttachmentBuilder(img).setName("greyscale.png");
                interaction.reply({
                    embeds: [embed],
                    files: [attach]
                });
            }

            if (type == "Inverted") {
                // Make the image
                let img = await new DIG.Invert().getImage(avatar);
                // Add the image as an attachement
                let embed = new EmbedBuilder()
                    .setTitle("Invert")
                    .setColor(`c3b4f7`)
                    .setImage("attachment://invert.png");
                let attach = new AttachmentBuilder(img).setName("invert.png");
                interaction.reply({
                    embeds: [embed],
                    files: [attach]
                });
            }

            if (type == "Triggered") {
                // Make the image
                let img = await new DIG.Triggered().getImage(avatar);
                // Add the image as an attachement
                let embed = new EmbedBuilder()
                    .setTitle("Triggered")
                    .setColor(`c3b4f7`)
                    .setImage("attachment://triggered.gif");
                let attach = new AttachmentBuilder(img).setName("triggered.gif");
                interaction.reply({
                    embeds: [embed],
                    files: [attach]
                });
            }

            if (type == "Bob Ross") {
                // Make the image
                let img = await new DIG.Bobross().getImage(avatar);
                // Add the image as an attachement
                let embed = new EmbedBuilder()
                    .setTitle("Bob Ross")
                    .setColor(`c3b4f7`)
                    .setImage("attachment://bobross.png");
                let attach = new AttachmentBuilder(img).setName("bobross.png"); 
                interaction.reply({
                    embeds: [embed],
                    files: [attach]
                });
            }

            
            if (type == "Clown") {
                // Make the image
                let img = await new DIG.Clown().getImage(avatar);
                // Add the image as an attachement
                let embed = new EmbedBuilder()
                    .setTitle("Clown")
                    .setColor(`c3b4f7`)
                    .setImage("attachment://clown.png");
                let attach = new AttachmentBuilder(img).setName("clown.png"); 
                interaction.reply({
                    embeds: [embed],
                    files: [attach]
                });
            }

            if (type == "Deep Fry") {
                // Make the image
                let img = await new DIG.Deepfry().getImage(avatar);
                // Add the image as an attachement
                let embed = new EmbedBuilder()
                    .setTitle("Deep Fry")
                    .setColor(`c3b4f7`)
                    .setImage("attachment://deepfry.png");
                let attach = new AttachmentBuilder(img).setName("deepfry.png"); 
                interaction.reply({
                    embeds: [embed],
                    files: [attach]
                });
            }

            if (type == "Delete") {
                // Make the image
                let img = await new DIG.Delete().getImage(avatar);
                // Add the image as an attachement
                let embed = new EmbedBuilder()
                    .setTitle("Delete")
                    .setColor(`c3b4f7`)
                    .setImage("attachment://delete.png");
                let attach = new AttachmentBuilder(img).setName("delete.png"); 
                interaction.reply({
                    embeds: [embed],
                    files: [attach]
                });
            }

            if (type == "Jail") {
                // Make the image
                let img = await new DIG.Jail().getImage(avatar);
                // Add the image as an attachement
                let embed = new EmbedBuilder()
                    .setTitle("Jail")
                    .setColor(`c3b4f7`)
                    .setImage("attachment://jail.png");
                let attach = new AttachmentBuilder(img).setName("jail.png"); 
                interaction.reply({
                    embeds: [embed],
                    files: [attach]
                });
            }

            if (type == "Stonk") {
                // Make the image
                let img = await new DIG.Stonk().getImage(avatar);
                // Add the image as an attachement
                let embed = new EmbedBuilder()
                    .setTitle("Stonk")
                    .setColor(`c3b4f7`)
                    .setImage("attachment://stonk.png");
                let attach = new AttachmentBuilder(img).setName("stonk.png"); 
                interaction.reply({
                    embeds: [embed],
                    files: [attach]
                });
            }

            if (type == "Wanted") {
                // Make the image
                let img = await new DIG.Wanted().getImage(avatar, `$`);
                // Add the image as an attachement
                let embed = new EmbedBuilder()
                    .setTitle("Wanted")
                    .setColor(`c3b4f7`)
                    .setImage("attachment://wanted.png");
                let attach = new AttachmentBuilder(img).setName("wanted.png"); 
                interaction.reply({
                    embeds: [embed],
                    files: [attach]
                });
            }
            }    
            if (interaction.options.getSubcommand() === "image") {
                const src = interaction.options.getString("imagelink")

                isImageURL((src)).then(async is_image => {
                    if (is_image == true) {
                        let avatar = src;
                        const type = interaction.options.getString("type")
            
                        if (type == "Blur") {
                        // Make the image
                        let img = await new DIG.Blur().getImage(avatar);
                        // Add the image as an attachement
                        let embed = new EmbedBuilder()
                            .setTitle("Blur")
                            .setColor(`c3b4f7`)
                            .setImage("attachment://blur.png");
                        let attach = new AttachmentBuilder(img).setName("blur.png");
                        interaction.reply({
                            embeds: [embed],
                            files: [attach]
                        });
                        }
            
                        if (type == "Greyscale") {
                            // Make the image
                            let img = await new DIG.Greyscale().getImage(avatar);
                            // Add the image as an attachement
                            let embed = new EmbedBuilder()
                                .setTitle("Greyscale")
                                .setColor(`c3b4f7`)
                                .setImage("attachment://greyscale.png");
                            let attach = new AttachmentBuilder(img).setName("greyscale.png");
                            interaction.reply({
                                embeds: [embed],
                                files: [attach]
                            });
                        }
            
                        if (type == "Inverted") {
                            // Make the image
                            let img = await new DIG.Invert().getImage(avatar);
                            // Add the image as an attachement
                            let embed = new EmbedBuilder()
                                .setTitle("Invert")
                                .setColor(`c3b4f7`)
                                .setImage("attachment://invert.png");
                            let attach = new AttachmentBuilder(img).setName("invert.png");
                            interaction.reply({
                                embeds: [embed],
                                files: [attach]
                            });
                        }
            
                        if (type == "Triggered") {
                            // Make the image
                            let img = await new DIG.Triggered().getImage(avatar);
                            // Add the image as an attachement
                            let embed = new EmbedBuilder()
                                .setTitle("Triggered")
                                .setColor(`c3b4f7`)
                                .setImage("attachment://triggered.gif");
                            let attach = new AttachmentBuilder(img).setName("triggered.gif");
                            interaction.reply({
                                embeds: [embed],
                                files: [attach]
                            });
                        }
            
                        if (type == "Bob Ross") {
                            // Make the image
                            let img = await new DIG.Bobross().getImage(avatar);
                            // Add the image as an attachement
                            let embed = new EmbedBuilder()
                                .setTitle("Bob Ross")
                                .setColor(`c3b4f7`)
                                .setImage("attachment://bobross.png");
                            let attach = new AttachmentBuilder(img).setName("bobross.png"); 
                            interaction.reply({
                                embeds: [embed],
                                files: [attach]
                            });
                        }
            
                        
                        if (type == "Clown") {
                            // Make the image
                            let img = await new DIG.Clown().getImage(avatar);
                            // Add the image as an attachement
                            let embed = new EmbedBuilder()
                                .setTitle("Clown")
                                .setColor(`c3b4f7`)
                                .setImage("attachment://clown.png");
                            let attach = new AttachmentBuilder(img).setName("clown.png"); 
                            interaction.reply({
                                embeds: [embed],
                                files: [attach]
                            });
                        }
            
                        if (type == "Deep Fry") {
                            // Make the image
                            let img = await new DIG.Deepfry().getImage(avatar);
                            // Add the image as an attachement
                            let embed = new EmbedBuilder()
                                .setTitle("Deep Fry")
                                .setColor(`c3b4f7`)
                                .setImage("attachment://deepfry.png");
                            let attach = new AttachmentBuilder(img).setName("deepfry.png"); 
                            interaction.reply({
                                embeds: [embed],
                                files: [attach]
                            });
                        }
            
                        if (type == "Delete") {
                            // Make the image
                            let img = await new DIG.Delete().getImage(avatar);
                            // Add the image as an attachement
                            let embed = new EmbedBuilder()
                                .setTitle("Delete")
                                .setColor(`c3b4f7`)
                                .setImage("attachment://delete.png");
                            let attach = new AttachmentBuilder(img).setName("delete.png"); 
                            interaction.reply({
                                embeds: [embed],
                                files: [attach]
                            });
                        }
            
                        if (type == "Jail") {
                            // Make the image
                            let img = await new DIG.Jail().getImage(avatar);
                            // Add the image as an attachement
                            let embed = new EmbedBuilder()
                                .setTitle("Jail")
                                .setColor(`c3b4f7`)
                                .setImage("attachment://jail.png");
                            let attach = new AttachmentBuilder(img).setName("jail.png"); 
                            interaction.reply({
                                embeds: [embed],
                                files: [attach]
                            });
                        }
            
                        if (type == "Stonk") {
                            // Make the image
                            let img = await new DIG.Stonk().getImage(avatar);
                            // Add the image as an attachement
                            let embed = new EmbedBuilder()
                                .setTitle("Stonk")
                                .setColor(`c3b4f7`)
                                .setImage("attachment://stonk.png");
                            let attach = new AttachmentBuilder(img).setName("stonk.png"); 
                            interaction.reply({
                                embeds: [embed],
                                files: [attach]
                            });
                        }
            
                        if (type == "Wanted") {
                            // Make the image
                            let img = await new DIG.Wanted().getImage(avatar, `$`);
                            // Add the image as an attachement
                            let embed = new EmbedBuilder()
                                .setTitle("Wanted")
                                .setColor(`c3b4f7`)
                                .setImage("attachment://wanted.png");
                            let attach = new AttachmentBuilder(img).setName("wanted.png"); 
                            interaction.reply({
                                embeds: [embed],
                                files: [attach]
                            });
                        }
                        
                    } else {
                        interaction.reply({ content: `Please provide a valid image URL!`, ephemeral: true })
                    }
                });
            }


            
    

 

      
    }}