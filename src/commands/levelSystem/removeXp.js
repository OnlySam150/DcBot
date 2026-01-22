import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} from "discord.js";
import { getLevelData, updateLevelData } from "../../api/levelApi.js";
import {
  levelCalculateFunction,
  checkLevelUp,
  yLevelCalulate,
} from "../../utils/function/levelMath.js";

export const data = new SlashCommandBuilder()
  .setName("removexp")
  .setDescription("Entfernt einem Benutzer Erfahrungspunkte.")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("Der Benutzer, dem XP entfernt werden sollen")
      .setRequired(true),
  )
  .addIntegerOption((option) =>
    option
      .setName("xp")
      .setDescription("Die Anzahl der zu entfernenden Erfahrungspunkte")
      .setRequired(true),
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
  try {
    const user = interaction.options.getUser("user");
    const xp = interaction.options.getInteger("xp");
    const levelData = await getLevelData(user.id);
    const levelCalculate = await levelCalculateFunction(levelData.level - 1);

    const newXp = Math.floor(levelData.xp - xp >= 0 ? levelData.xp - xp : 0);

    const embed = new EmbedBuilder()
      .setTitle("LevelSystem")
      .setDescription(
        `Du hast erfolgreich ${xp} XP von <@${user.id}> entfernt!\rVorher: ${levelData.xp}\r Nachher: ${newXp}`,
      )
      .setColor("#00FF00");

    if (levelCalculate.levelFormel > newXp) {
      const level = yLevelCalulate(newXp);
      console.log(level);
      await updateLevelData(user.id, level, newXp);
    } else {
      await updateLevelData(user.id, levelData.level, newXp);
    }
    await interaction.reply({ embeds: [embed], ephemeral: true });
  } catch (err) {
    console.error("Error during removexp command execution", err);
  }
}
