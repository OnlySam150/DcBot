import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { updateNoteId } from "../../api/userNoteApi.js";

export const data = new SlashCommandBuilder()
  .setName(`usernote`)
  .setDescription(`Bekomme die Usernotes eines Users`)
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers);
export async function execute(interaction) {
  await updateNoteId();
}
