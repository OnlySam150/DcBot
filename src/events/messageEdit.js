import {Events, EmbedBuilder, AttachmentBuilder} from 'discord.js';
import fs from 'fs';
import data from '../utils/settings.json' with {type: 'json'};

export default {
    name: Events.MessageUpdate,
    async execute(oldMessage, newMessage) {
        if (oldMessage.author.bot) return;

        const oldContent = 1024 >= oldMessage.content.length ? `\`\`\`${oldMessage.content}\`\`\`` : "Die alte Nachricht war zu lang. Nachricht wurde als Datei gesendet."
        const newContent = 1024 >= newMessage.content.length ? `\`\`\`${newMessage.content}\`\`\`` : "Die neue Nachricht war zu lang. Nachricht wurde als Datei gesendet."

        const embed = new EmbedBuilder()
            .setTitle('Nachricht bearbeitet')
            .setDescription(`Eine Nachricht von <@${oldMessage.author.id}> wurde bearbeitet.`)
            .addFields(
                {name: 'Alte Nachricht', value: oldContent},
                {name: 'Neue Nachricht', value: newContent}
            )
            .setTimestamp()
            .setColor(0x00FF00)
            .setFooter({text: 'AQUARIUM Utility'})

            const messageLogChannel = await oldMessage.guild.channels.fetch(data.messageLogChannelId);

            if (oldMessage.content.length <= 1024 && newMessage.content.length <= 1024 ) {
                try {
                    await messageLogChannel.send({embeds: [embed]});
                } catch (error) {
                    console.error('Fehler beim Senden der Embed-Nachricht:', error);
                }
            } else if (oldMessage.content.length > 1024) {
                const fileNameOld = `oldMessage_${oldMessage.id}.txt`;
                fs.writeFileSync(fileNameOld, oldMessage.content, err => {
                    if (err) {
                        console.error('Fehler beim Erstellen der Datei für die alte Nachricht:', err);
                    }
                })
                try {
                    const attachmentOld = new AttachmentBuilder(`./${fileNameOld}`);
                    await messageLogChannel.send({embeds: [embed], files: [attachmentOld]});
                } catch (error) {
                    console.error('Fehler beim Senden der Datei für die alte Nachricht:', error);
                }
            } else if (newMessage.content.length > 1024) {
                const fileNameNew = `newMessage_${newMessage.id}.txt`;
                fs.writeFileSync(fileNameNew, newMessage.content, err => {
                    if (err) {
                        console.error('Fehler beim Erstellen der Datei für die neue Nachricht:', err);
                    }
                })
                try {
                    const attachmentNew = new AttachmentBuilder(`./${fileNameNew}`);
                    await messageLogChannel.send({embeds: [embed], files: [attachmentNew]})
                } catch (error) {
                    console.error('Fehler beim Senden der Datei für die neue Nachricht:', error);
                }
            } else {
                const fileNameOld = `oldMessage_${oldMessage.id}.txt`;
                fs.writeFileSync(fileNameOld, oldMessage.content, err => {
                    if (err) {
                        console.error('Fehler beim Erstellen der Datei für die alte Nachricht:', err);
                }

               
                })

                 const fileNameNew = `newMessage_${newMessage.id}.txt`;
                fs.writeFileSync(fileNameNew, newMessage.content, err => {
                    if (err) {
                        console.error('Fehler beim Erstellen der Datei für die neue Nachricht:', err);
                    }
                })

                try {
                    const attachmentOld = new AttachmentBuilder(`./${fileNameOld}`);
                    const attachmentNew = new AttachmentBuilder(`./${fileNameNew}`);

                    console.log("Datei 1 " + attachmentOld);
                    console.log("Datei 2 " + attachmentNew);
                    await messageLogChannel.send({embeds: [embed], files: [attachmentOld, attachmentNew]});
                } catch (error) {
                    console.error('Fehler beim Senden der Dateien für die alte und neue Nachricht:', error);
                }
                
        }

}
}
