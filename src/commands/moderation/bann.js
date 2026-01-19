import {SlashCommandBuilder} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('bann')
    .setDescription('Bannt wixxer')
    .addStringOption((option) => {
        option.setName("id");
        option.setDescription("Die id des wixxers");
    return option;
    })
    .setDefaultMemberPermissions(8);
export async function execute(interaction) {
    const id = await interaction.options.getString('id');
    await interaction.guild.members.ban(id)
    await interaction.reply({content: "Erfolg! Du hast den Wixxer gebannt", epehmeral: true})
}