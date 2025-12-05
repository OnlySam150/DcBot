import {Events, TextDisplayBuilder, SeparatorBuilder, SeparatorSpacingSize, AttachmentBuilder, MediaGalleryBuilder, MessageFlags, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ModalBuilder, LabelBuilder} from 'discord.js'
import { getInfoText } from '../api/infoFunctionApi.js';
import { infoTextBuilder } from './function/infoFunctions.js';
import { setTempChannelName, setTempChannelPrivacy, setTempChannelSize, setTempChannelPublic, setTempChannelTrust, setTempChannelUntrust } from '../utils/function/tempChannelFunctions.js';
export default {
    name: Events.InteractionCreate,

    async execute(interaction) {
        if(interaction.isStringSelectMenu()) {
            const value = interaction.values[0];
            const channel = await interaction.guild.channels.cache.get('1442855170978615418');
            const selectMenuMsg = await channel.messages.fetch('1444971649710690457')
            const SelectMenu = new StringSelectMenuBuilder()
        .setCustomId("infoSelect")
        .setPlaceholder("Wähle eine Kategorie")
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('Wer wir sind!')
                .setDescription('DAS AQUARIUM stellt sich vor!')
                .setValue('whoValue'),
            new StringSelectMenuOptionBuilder()
                .setLabel('Kanal Übersicht von DAS AQUARIUM')
                .setDescription('Eine Übersicht und Erklärung zu allen Kanälen!')
                .setValue('whereValue'),
            new StringSelectMenuOptionBuilder()
                .setLabel('Team Liste')
                .setDescription('Eine Team Liste - Damit du weißt wer dich wobei unterstützt!')
                .setValue('teamValue'),
            new StringSelectMenuOptionBuilder()
                .setLabel('DAS AQUARIUM FAQ')
                .setDescription('Ein FAQ welches die wichtigsten Fragen beantwortet!')
                .setValue('faqValue'),
            new StringSelectMenuOptionBuilder()
                .setLabel('Unsere Werbung')
                .setDescription('Unsere Werbung - Damit du deine Freunde zu uns Einladen kannst!')
                .setValue('addValue')
        );

        const row = new ActionRowBuilder().addComponents(SelectMenu)

            switch(value) {
                case 'whoValue':
                    const infoData = await getInfoText("whoInfo");
                    await infoTextBuilder(interaction, "infoBanner", infoData.titletext, infoData.descripttext, row)
                    break;
            }
        } else if (interaction.isButton()) {
            const customId = interaction.customId

            switch (customId) {
                case temp_name_button:
                    
            }
            
        } else {
            return
        }
    }
}