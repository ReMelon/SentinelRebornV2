const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const isImageURL = require("image-url-validator").default;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Send a embed with your options")
    .addStringOption((option) =>
      option.setName("thumbnail").setDescription("The thumbnail of the embed")
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("What you want the bot to say")
    )
    .addStringOption((option) =>
      option.setName("title").setDescription("The title of the embed")
    )
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("The color of the embed (HEX CODE)")
        .setMaxLength(6)
    )
    .addStringOption((option) =>
      option.setName("image").setDescription("The image of the embed")
    )
    .addStringOption((option) =>
      option.setName("footer").setDescription("The footer of the embed")
    )
    .addStringOption((option) =>
      option
        .setName("footericon")
        .setDescription("The footer icon of the embed")
    ),

  async execute(interaction, client) {
    const thumbnail =
      interaction.options.getString("thumbnail") ||
      "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png";
    const description = interaction.options.getString("description") || " ";
    const title = interaction.options.getString("title") || " ";
    const color = interaction.options.getString("color") || "c3b4f7";
    const image =
      interaction.options.getString("image") ||
      "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png";
    const footer =
      interaction.options.getString("footer") ||
      `/${interaction.commandName} || ${interaction.user.tag}`;
    const footericon =
      interaction.options.getString("footericon") ||
      `${client.user.displayAvatarURL()}`;

    if (description && title == " ") {
      return interaction.reply({
        content: `You need to input either the description or the title or both!`,
        ephemeral: true,
      });
    }

    let hexcode = "#" + color;

    const hexCodeRegex = /^#?([a-f\d]{6}|[a-f\d]{3})$/i;
    const isValidHex = hexCodeRegex.test(hexcode);

    if (!isValidHex) {
      return interaction.reply({
        content: `Not a valid hex code!`,
        ephemeral: true,
      });
    }

    isImageURL(image).then(async (is_image) => {
      if (is_image == true) {
        isImageURL(footericon).then(async (is_image) => {
          if (is_image == true) {
            isImageURL(thumbnail).then(async (is_image) => {
              if (is_image == true) {
                const customembed = new EmbedBuilder()
                  .setThumbnail(`${thumbnail}`)
                  .setTitle(`${title}`)
                  .setDescription(`${description}`)
                  .setColor(`${hexcode}`)
                  .setTimestamp()
                  .setFooter({
                    text: `${
                      footer ||
                      `/${interaction.commandName} || ${interaction.user.tag}`
                    }`,
                    iconURL: `${footericon}`,
                  });

                const channel = interaction.channel;
                await channel.send({ embeds: [customembed] });
                interaction.reply({ content: "Done!", ephemeral: true });
              } else {
                return interaction.reply({
                  content: `Not a valid thumbnail URL!`,
                  ephemeral: true,
                });
              }
            });
          } else {
            return interaction.reply({
              content: `Not a valid Footer Icon URL!`,
              ephemeral: true,
            });
          }
        });
      } else {
        return interaction.reply({
          content: `Not a valid image URL!`,
          ephemeral: true,
        });
      }
    });
  },
};
