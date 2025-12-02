import {addUserTempSetting, getUserTempSettings, setCooldowns, getCooldowns, delCooldowns} from '../../api/tempchannelApi.js';
import {EmbedBuilder} from 'discord.js';

export const setTempChannelName = async (interaction, userId, channelId, name) => {
    try {
        const tag = "tempName"
        const cooldown = await getCooldowns(userId, tag)
        console.log(cooldown)
        console.log(cooldown)
        if (cooldown != undefined) {
            const cooldownTime = Date.now() - cooldown.cooldowntime;
            const cooldownEmbed = new EmbedBuilder()
                .setTitle("AQUARIUM | Tempvoice")
                .setDescription("Du kannst den Namen deines Sprachkanals nur alle 10 Minuten ändern.")
                .addFields(
                    {name: "Verbleibene Zeit:", value: cooldownTime / 60000}
                )
            if (cooldownTime >= 600000) {
                await delCooldowns(userId, tag)
            } else {
            await interaction.reply({embeds: [cooldownEmbed], ephemeral: true});
            return;
        }
        } else {
        const channel = await interaction.guild.channels.fetch(channelId);
        const settings = await getUserTempSettings(userId)
        const emoji = settings.emoji ? `${settings.emoji} ` : '🔊';
        await addUserTempSetting(userId, name, null, null);
        await channel.edit({name: `${emoji} ║ ${name}`});
        await setCooldowns(userId, Date.now(), tag)
    } 
    
    } catch (err) {
        console.error("Error setting tempchannel name:", err);
    }
}