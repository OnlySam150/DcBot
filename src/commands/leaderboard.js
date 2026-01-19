import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { getLevelData } from "../api/levelApi.js";

export const data = new SlashCommandBuilder()
  .setName("leaderboard")
  .setDescription("Zeigt das Level-Ranking aller Benutzer an");

export async function execute(interaction) {
  try {
    const leaderboardData = await getLevelData();
    let leaderboardEntries = leaderboardData ? leaderboardData.length : 0;
    let topArray = [];

    for (let i = 0; i <= leaderboardEntries - 1; i++) {
      let value;
      const userId = leaderboardData[i].id;
      const userXp = leaderboardData[i].xp;
      const userLevel = leaderboardData[i].level;

      value = `${i + 1}. <@${userId}> \nㅤ\`\`Level:\`\` **${userLevel}**\nㅤ\`\`XP:\`\` **${userXp}**\n\n`;
      topArray.push(value);
    }

    const embed = new EmbedBuilder()
      .setThumbnail(interaction.guild.iconURL())
      .setColor(0x0099ff)
      .setTitle(`Level Leaderboard`)
      .addFields(
        {
          name: "",
          value:
            topArray.length > 0
              ? topArray.slice(0, 5).join("")
              : "Keine Daten vorhanden",
          inline: true,
        },
        {
          name: "",
          value:
            topArray.length > 5 ? topArray.slice(5, 10).join("") : "\u200B",
          inline: true,
        },
      );

    await interaction.reply({ embeds: [embed] });
  } catch (err) {
    console.error("Error executing leaderboard command", err);
  }
}
