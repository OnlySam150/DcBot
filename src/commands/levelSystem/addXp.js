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
  .setName("addxp")
  .setDescription("Fügt einem Benutzer Erfahrungspunkte hinzu.")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("Der Benutzer, dem XP hinzugefügt werden sollen")
      .setRequired(true),
  )
  .addIntegerOption((option) =>
    option
      .setName("xp")
      .setDescription("Die Anzahl der hinzuzufügenden Erfahrungspunkte")
      .setRequired(true),
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
  try {
    const user = interaction.options.getUser("user");
    const xp = interaction.options.getInteger("xp");
    const levelData = await getLevelData(user.id);
    const levelCalculate = await levelCalculateFunction(levelData.level + 1);

    const newXp = levelData.xp + xp;
    console.log(levelCalculate.levelFormel);

    const newLevel = await checkLevelUp(newXp, levelCalculate.levelFormel);
    console.log(newLevel);

    const embed = new EmbedBuilder()
      .setTitle("LevelSystem")
      .setDescription(
        `Du hast erfolgreich ${xp} XP zu <@${user.id}> hinzugefügt!\rVorher: ${levelData.xp}\r Nachher: ${newXp}`,
      )
      .setColor("#00FF00");

    if (newLevel) {
      const level = await yLevelCalulate(newXp);
      console.log(level);
      await updateLevelData(user.id, level, newXp);
    } else {
      await updateLevelData(user.id, levelData.level, newXp);
    }
    await interaction.reply({ embeds: [embed], ephemeral: true });
  } catch (err) {
    console.error("Error during addxp command execution", err);
  }
}
