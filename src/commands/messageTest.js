import { SlashCommandBuilder, AttachmentBuilder, Attachment } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("message")
  .setDescription("hs");

export async function execute(interaction) {
  const file = new AttachmentBuilder(
    "https://cdn.discordapp.com/attachments/1442855170978615418/1444971622544179210/infoBanner.png?ex=693d26b1&is=693bd531&hm=70c2f8626e8deca3c6620a80a9279bec9b5dec2b7f75642b12f6e88ea43c6277&"
  );
  const pic = new AttachmentBuilder("./src/utils/images/infoBanner.png");
  await interaction.reply({ files: [file, pic] });
}


