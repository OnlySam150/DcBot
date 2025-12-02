import { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, Colors, PermissionsBitField } from "discord.js";
import jsData from '../utils/settings.json' with {type: 'json'};

export const data = new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bannt ein Mitglied vom Server.")
    .addUserOption((option) => {
        option.setName("mitglied")
            .setDescription("Das Mitglied, das gebannt werden soll.")
            .setRequired(true);
        return option;
    })
    .addStringOption((option) => {
        option.setName("grund")
            .setDescription("Der Grund für den Bann.")
            .setRequired(false);
        return option;
    }).setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers)

export async function execute(interaction) {
    const user = await interaction.options.getMember("mitglied");
    const reason = await interaction.options.getString("grund") || "Kein Grund angegeben";
    const modLog = await interaction.guild.channels.fetch(jsData.modLogChannelId);
    const member = await interaction.guild.members.fetch(user.id);

    const banLogEmbed = new EmbedBuilder()
        .setTitle("AQUARIUM Utility - Mitglied gebannt")
        .setDescription(`Das Mitglied <@${member.id}> wurde vom Server gebannt.`)
        .addFields(
            {name: "Moderator", value: `<@${interaction.user.id}>`},
            {name: "Grund", value: reason}
        )
        .setColor(Colors.Red)
        .setTimestamp()
        .setFooter({text: 'AQUARIUM Utility'});

    const userDmEmbed = new EmbedBuilder()
        .setTitle("Du wurdest vom Server gebannt")
        .setDescription(`Du wurdest vom Server **${interaction.guild.name}** gebannt. Du kannst hier einen entbannungsantrag stellen`)
        .addFields(
            {name: "Moderator", value: `<@${interaction.user.id}>`},
            {name: "Grund", value: reason}
        )
        .setColor(Colors.Red)
        .setTimestamp()
        .setFooter({text: 'AQUARIUM Utility'});

    const moderatorBanEmbed = new EmbedBuilder()
        .setTitle("Mitglied erfolgreich gebannt")
        .setDescription(`Das Mitglied <@${member.id}> wurde erfolgreich gebannt.`)
        .addFields(
            {name: "Grund", value: reason}
        )
        .setColor(Colors.Green)
        .setTimestamp()
        .setFooter({text: 'AQUARIUM Utility'})
        

    try {
        try {
        await member.send({embeds: [userDmEmbed]});
        } catch (error) {
            return
        }
        await member.ban({reason: reason});
        await interaction.reply({embeds: [moderatorBanEmbed], ephemeral: true})
        await modLog.send({embeds: [banLogEmbed]});
    } catch(err) {
        console.error("Fehler beim Bannen eines Mitglieds:", err);
    }
}