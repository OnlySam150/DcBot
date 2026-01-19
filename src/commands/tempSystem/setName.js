import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";
import { setTempChannelName } from "../../utils/function/tempChannelFunctions.js";
import { getTempChannel } from "../../api/tempchannelApi.js";

export const data = new SlashCommandBuilder()
  .setName("setname")
  .setDescription(
    "Setzt und Speichert den Namen deines temporären Sprachkanals.",
  )
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("Der neue Name für deinen Sprachkanal.")
      .setRequired(true),
  );

export async function execute(interaction) {
  const name = interaction.options.getString("name");
  const userId = interaction.user.id;
  const channelId = interaction.member.voice.channelId;
  const tempChannel = await getTempChannel(channelId);
  console.log("voiceId: " + channelId);
  console.log(tempChannel);

  try {
    if (!channelId) {
      await interaction.reply({
        content: "Du bist in keinem Sprachkanal!",
        ephemeral: true,
      });
      return;
    } else if (tempChannel.userid !== userId) {
      await interaction.reply({
        content: "Du bist nicht der Besitzer dieses Sprachkanals!",
        ephemeral: true,
      });
      return;
    } else {
      const channel = await interaction.guild.channels.fetch(channelId);
      console.log("Channel fetched: " + channel.name);
      await setTempChannelName(interaction, userId, channelId, name);
      await interaction.guild.channels.cache.delete(channelId);
      await interaction.reply({
        content: `Der Name deines Sprachkanals wurde zu **${name}** geändert.`,
        ephemeral: true,
      });
      const channel2 = await interaction.guild.channels.fetch(channelId);
      console.log("channel2 fetched: " + channel2.name);
    }
  } catch (err) {
    console.error("Fehler beim Ausführen des setname Befehls:", err);
  }
}
