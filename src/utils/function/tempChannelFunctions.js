import {PermissionsBitField} from 'discord.js';
import {addUserTempSetting, getUserTempSettings, setCooldowns, getCooldowns, delCooldowns} from '../../api/tempchannelApi.js';
import {EmbedBuilder} from 'discord.js';
import { getTempChannel } from '../../api/tempchannelApi.js';

//private functions

const importantData = async (interaction) => {
        const userId = interaction.user.id;
        const channelId = interaction.member.voice.channelId;
        const tempchannel = await getTempChannel(channelId)

        return [userId, tempchannel]
}

const tempchannelCheck = async (interaction, channelId) => {
    const [userId, tempchannel] = await importantData(interaction);
    if(!channelId) {
            interaction.reply("Für diesen Command musst du in einem TempChannel sein")
            return false;

        } else if (tempchannel.userid !== userId) {
            interaction.reply("Für diesen Befehl musst du einen eigenen TempChannel besitzen")
            return false;
} else {
    return true;
}
}


//global functions

export const setTempChannelName = async (interaction) => {
    try {
        const [userId, channelId] = await importantData(interaction)
        const tempchannelCheck = await tempchannelCheck(interaction, channelid)

        if (tempchannelCheck === false) {
            return;
        }
        const name = interaction.options.getString('name');
        const tag = "tempName"
        const cooldown = await getCooldowns(userId, tag)
        const cooldownTime = Date.now() - cooldown.cooldowntime;
        if (cooldown != undefined) {
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
        await addUserTempSetting(userId, {channelName: name, emoji: emoji});
        await channel.edit({name: `${emoji} ║ ${name}`});
        await setCooldowns(userId, Date.now(), tag)
    } 
    
    } catch (err) {
        console.error("Error setting tempchannel name:", err);
    }
}



export const setTempChannelSize = async (interaction) => { //Size noch in Befehl einbauen
    try {
    const [userId, tempchannel] = await importantData(interaction)

    const tempchannelCheck = await tempchannelcheck(interaction, channelid)

        if (tempchannelCheck === false) {
            return;
        }
        const channel = await interaction.guild.channels.fetch(tempchannel.channelid)
        console.log(channel)
        await addUserTempSetting(userId, {userLimit: size});
        await channel.edit({userLimit: size});
        await interaction.reply("Die größe deines Tempchannels wurde erfolgreich angepasst")
    } catch (err) {
        console.error('Error at SlashCommand /"/"channelsize/"/"', err)
    }
    } 



export const setTempChannelPrivacy = async (interaction) => {
    try {
        const [userId, tempchannel] = await importantData(interaction)

        const tempchannelCheck = await tempchannelcheck(interaction, channelid)

        if (tempchannelCheck === false) {
            return;
        } 
            const channel = await interaction.guild.channels.fetch(tempchannel.channelid)
            await addUserTempSetting(userId, {privacy_status: true});
            await channel.edit({
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect]
                    }
                ]
            })
            await interaction.reply("Dein Channel wurde erfolgreich auf privat gestellt!")
        
    } catch(err) {
        console.error("Error setting tempchannel to privacy", err)
    }
}



export const setTempChannelPublic = async (interaction) => {
    try {
        const [userId, tempchannel] = await importantData(interaction)

        const tempchannelCheck = await tempchannelCheck(interaction, channelid)

        if (tempchannelCheck === false) {
            return;
        } 
            const channel = await interaction.guild.channels.fetch(tempchannel.channelid)
            await addUserTempSetting(userId, {privacy_status: false});
            await channel.edit({
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect]
                    }
                ]
            })
            await interaction.reply("Dein Channel wurde erfolgreich auf öffentlich gestellt!")
        
    } catch(err) {
        console.error("Error setting tempchannel to public", err)
    }
}



export const setTempChannelTrust = async (interaction) => {
    try {
        const trustId = interaction.values[0];
        const [userId, tempchannel] = await importantData(interaction)

        const tempchannelCheck = await tempchannelCheck(interaction, channelid)

        if (tempchannelCheck === false) {
            return;
        } 
            const channel = await interaction.guild.channels.fetch(tempchannel.channelid)
            await addUserTempSetting(userId, {privacy_status: false});
            await channel.edit({
                permissionOverwrites: [
                    {
                        id: trustId,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect]
                    }
                ]
            })
            await interaction.reply("Dein Channel wurde erfolgreich auf öffentlich gestellt!")
        
    } catch(err) {
        console.error("Error setting tempchannel to public", err)
    }
}



export const setTempChannelUntrust = async (interaction) => {
    try {
        const untrustId = interaction.values[0];
        const [userId, tempchannel] = await importantData(interaction)

        const tempchannelCheck = await tempchannelCheck(interaction, channelid)

        if (tempchannelCheck === false) {
            return;
        }  
            const channel = await interaction.guild.channels.fetch(tempchannel.channelid)
            await addUserTempSetting(userId, {privacy_status: false});
            await channel.edit({
                permissionOverwrites: [
                    {
                        id: untrustId,
                        deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect]
                    }
                ]
            })
            await interaction.reply("Dein Channel wurde erfolgreich auf öffentlich gestellt!")
        
    } catch(err) {
        console.error("Error setting tempchannel to public", err)
    }
}
