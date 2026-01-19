import { SlashCommandBuilder } from "discord.js";
import {
  get_user_ad_status,
  set_ad_information,
  delete_ad_information,
  get_ad_information,
} from "../../api/adsApi";
import settings from "../../utils/settings.json" with { type: "json" };

export const data = new SlashCommandBuilder()
  .setName("werbung")
  .setDescription(
    "Mit diesem Befehl kannst du Werbung posten. Beachte dabei unsere Werbung in deinem Status zu haben!",
  )
  .addStringOption((option) =>
    option
      .setName("text")
      .setDescription("Der Werbungs Text die du posten möchtest")
      .setRequired(true),
  )
  .addStringOption((option) =>
    option
      .setName("invite")
      .setDescription("Der Werbungs Invite Link")
      .setRequired(true),
  );

export async function execute(interaction) {
  try {
    const user_id = interaction.user.id;
    const ad_status = await get_user_ad_status(user_id);
    const ad_information = (await get_ad_information(user_id)) ?? {
      expires_at: new Date(3600000),
    };

    if (interaction.channel.id !== settings.adChannelId) {
      //muss noch zu command channel geändert werden; funktioniert aktuell code technisch aber noch nicht
      return;
    }

    if (ad_information.expires_at > new Date()) {
      await interaction.reply({
        content: `Du hast bereits eine aktive Werbung die bis zum ${ad_information.expires_at.toLocaleDateString(
          "de-DE",
        )} läuft. Du kannst erst wieder Werbung posten, wenn diese abgelaufen ist.`,
        ephemeral: true,
      });
    } else if (ad_status.ad_status === true) {
      const ad_message = interaction.options.getString("text");
      const ad_invite = interaction.options.getString("invite");
      const ad_message_regex = /(https?:\/\/|www\.)\S+/;
      const ad_invite_regex =
        /^(https?:\/\/)?(www\.)?(discord\.gg|discord\.com\/invite)\/[a-zA-Z0-9]+$/;

      if (ad_message_regex.test(ad_message) === true) {
        await interaction.reply({
          content:
            "Dein Werbe Text darf keine Links enthalten. Bitte entferne alle Links und versuche es erneut.",
          ephemeral: true,
        });
        return;
      } else if (ad_invite_regex.test(ad_invite) === false) {
        await interaction.reply({
          content:
            "Dein Invite Link ist kein Discord Invite Link. Bitte überprüfe den Link und versuche es erneut.",
          ephemeral: true,
        });
        return;
      }

      const sendMessage = await interaction.channel.send(
        `${ad_message}\nUnsere Einladung: ${ad_invite}`,
      );
      const expires_milisecons = Date.now() + 14 * 24 * 60 * 60 * 1000;
      const expires_at = new Date(expires_milisecons);
      const ad_to_db = await set_ad_information(
        user_id,
        sendMessage.id,
        expires_at,
      );

      if (ad_to_db === true) {
        await interaction.reply({
          content: "Deine Werbung wurde erfolgreich gepostet!",
          ephemeral: true,
        });
      } else {
        await sendMessage.delete();
        await interaction.reply({
          content:
            "Es gab einen Fehler beim Speichern deiner Werbung. Bitte versuche es später erneut. Falls das Problem weiterhin besteht, kontaktiere den Ticket Support.",
          ephemeral: true,
        });
      }
    } else if (ad_status.ad_status === false) {
      await interaction.reply({
        content:
          "Du hast unsere Werbung nicht im Status. Bitte füge folgenden Link in deinen Status ein, um Werbung posten zu können: https://discord.gg/tMSDAyHfjJ",
        ephemeral: true,
      });
    }
  } catch (error) {
    console.error("Error executing werbung command:", error);
  }
}
