import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("setcooldown")
  .setDescription("Setzt das Cooldown für einen Befehl.")
  .addIntegerOption((option) =>
    option
      .setName("seconds")
      .setDescription("Die Anzahl der Sekunden für das Cooldown")
      .setRequired(true),
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
  try {
    const seconds = interaction.options.getInteger("seconds");
    await interaction.channel.setRateLimitPerUser(seconds);

    await interaction.reply(
      `<@${interaction.user.id}> hat den Cooldown auf ${seconds} Sekunden gesetzt.`,
    );
  } catch (err) {
    console.error("Error during setcooldown command execution", err);
  }
}
