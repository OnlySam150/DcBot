import { SlashCommandBuilder, EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } from 'discord.js'


export const data = new SlashCommandBuilder()
    .setName("inittempsettings")
    .setDescription("Sendet Settings Embed")
    .setDefaultMemberPermissions(8)

export async function execute(interaction) {
    try {
        const embed = new EmbedBuilder()
            .setTitle("TEMPCHANNEL SETTINGS")
            .setDescription("Hier könnten die einzelnen Optionen aufgelistet sein");
        //5 buttons
        const nameButton = new ButtonBuilder()
            .setCustomId('temp_name_button')
            .setLabel('Name')
            .setStyle(ButtonStyle.Secondary);

        const sizeButton = new ButtonBuilder()
            .setCustomId('temp_size_button')
            .setLabel('Limit')
            .setStyle(ButtonStyle.Secondary);

        const PrivacyButton = new ButtonBuilder()
            .setCustomId('temp_privacy_button')
            .setLabel('Privacy')
            .setStyle(ButtonStyle.Secondary);
        
        const PublicButton = new ButtonBuilder()
            .setCustomId('temp_public_button')
            .setLabel('Public')
            .setStyle(ButtonStyle.Secondary);

        const trustButton = new ButtonBuilder()
            .setCustomId('temp_trust_button')
            .setLabel('Trust')
            .setStyle(ButtonStyle.Secondary);

        const firstRow = new ActionRowBuilder().addComponents(nameButton, sizeButton, PrivacyButton, PublicButton, trustButton)

        //5 Buttons
        const untrustButton = new ButtonBuilder()
            .setCustomId('temp_untrust_button')
            .setLabel('Untrust')
            .setStyle(ButtonStyle.Secondary);

        const inviteButton = new ButtonBuilder()
            .setCustomId('temp_invite_button')
            .setLabel('Invite')
            .setStyle(ButtonStyle.Secondary);

        const kickButton = new ButtonBuilder()
            .setCustomId('temp_kick_button')
            .setLabel('Kick')
            .setStyle(ButtonStyle.Secondary);

        const banButton = new ButtonBuilder()
            .setCustomId('temp_ban_button')
            .setLabel('Ban')
            .setStyle(ButtonStyle.Secondary);

        const unbanButton = new ButtonBuilder()
            .setCustomId('temp_unban_button')
            .setLabel('Unban')
            .setStyle(ButtonStyle.Secondary);
            
        const secRow = new ActionRowBuilder().addComponents(untrustButton, inviteButton, kickButton, banButton, unbanButton)

        //2 Buttons

        const transferButton = new ButtonBuilder()
            .setCustomId('temp_transfer_button')
            .setLabel('Transfer')
            .setStyle(ButtonStyle.Secondary);

        const claimButton = new ButtonBuilder()
            .setCustomId('temp_claim_button')
            .setLabel('Claim')
            .setStyle(ButtonStyle.Secondary);
        
        const thirdRow = new ActionRowBuilder().addComponents(transferButton, claimButton)


        await interaction.channel.send({embeds: [embed], components: [firstRow, secRow, thirdRow]})
        
    } catch(err) {
        console.error("Error at inittempsettings command", err)
    }
}