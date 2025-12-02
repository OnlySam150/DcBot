import {Events, EmbedBuilder} from 'discord.js';
import { createTempChannel, getTempChannel, deleteTempChannel, getUserTempSettings} from '../api/tempchannelApi.js';


export default {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        //User joins join4create
        if (newState.channelId === '1443767139042332764') {
            try {
                const userSettings = await getUserTempSettings(newState.member.id);
                const member = newState.member;
                const name = userSettings.channelname || `🔊 ${member.user.username}`
                console.log("Name des Channels: " + name);
                const tempchannel = await newState.guild.channels.create({
                    name: name,
                    type: 2,
                    parent: '1442853398755020813'
                })
                await createTempChannel(member.id, tempchannel.id);
                await member.voice.setChannel(tempchannel);
            } catch(err) {
                console.error('Fehler beim Erstellen des temporären Channels:', err);
            }
        } 

        try {
            const channelData = await getTempChannel(oldState.channelId);
            if (oldState.channel.members.size === 0 && channelData != null) {
                const channel = await oldState.guild.channels.fetch(oldState.channelId);
                await channel.delete();
                await deleteTempChannel(oldState.channelId);
            }
        } catch(err) {
            return;
        }
    }
}