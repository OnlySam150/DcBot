import {Events, EmbedBuilder, AttachmentBuilder} from 'discord.js';
import fs from 'fs';
import data from '../utils/settings.json' with {type: 'json'};



export default {
    name: Events.MessageDelete,
    async execute(message) {
        if (message.author.bot) {
            return;
        }
        const messageContent = 1024 >= message.content.length ? `\`\`\`${message.content}\`\`\`` : "Die Nachricht war zu lang. Nachricht wurde als Datei gesendet."
        const embed = new EmbedBuilder()
            .setTitle('Nachricht gelöscht')
            .setDescription(`Eine Nachricht von <@${message.author.id}> wurde gelöscht`)
            .addFields(
                { name: 'Inhalt:', value: messageContent}
            )
            .setTimestamp()
            .setColor(0xff0000)
            .setFooter({text: 'AQUARIUM Utility'});
        
        const messageLogChannel = await message.guild.channels.fetch(data.messageLogChannelId);
        try {
        const messageLength = message.content.length

        if (messageLength <= 1024) {
        await messageLogChannel.send({embeds: [embed]});
        } else {
        const fileName = `deletedMessage_${message.id}.txt`;
        fs.writeFileSync(fileName, message.content, err => {
            if (err) {
                console.error('Fehler beim Erstellen der Datei:', err);
            }
        })
        const attachment = new AttachmentBuilder(`./${fileName}`)
        await messageLogChannel.send({embeds: [embed], files: [attachment]})
        fs.unlink(fileName, err => {
            if (err) {
                console.error('Fehler beim Löschen der Datei:', err);
            }
        });
        }
        } catch (error) {
            console.error('Fehler beim Senden der Nachricht an den Log-Kanal:', error);
        }
    }
};