import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { getLevelData } from "../../api/levelApi.js";

export const data = new SlashCommandBuilder()
  .setName("rank")
  .setDescription("Zeigt dein aktuelles Level und die XP an")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("Der Benutzer, dessen Rang du sehen möchtest")
      .setRequired(false),
  );

export async function execute(interaction) {
  try {
    const targetUser = interaction.options.getUser("user");
    const user = targetUser
      ? await interaction.guild.members.fetch(targetUser.id)
      : interaction;
    const levelData = targetUser
      ? await getLevelData(targetUser.id)
      : await getLevelData(interaction.user.id);

    let embed;
    if (levelData === null || levelData === undefined) {
      embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`${user.user.username}'s Rang`)
        .setDescription(`Level: **1**\nXP: **0**`)
        .setThumbnail(user.user.displayAvatarURL());
    } else {
      const userLevel = levelData.level ? levelData.level : 1;
      const userXp = levelData.xp ? levelData.xp : 0;
      embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`${user.user.username}'s Rang`)
        .setDescription(`Level: **${userLevel}**\nXP: **${userXp}**`)
        .setThumbnail(user.user.displayAvatarURL());
    }

    await interaction.reply({ embeds: [embed] });
  } catch (err) {
    console.error("Error executing rank command", err);
  }
}
