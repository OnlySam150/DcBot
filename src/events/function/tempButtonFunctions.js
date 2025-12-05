import {ModalBuilder, LabelBuilder, StringelectMenuBuilder, EmbedBuilder, UserSelectMenuBuilder} from 'discord.js'


export const nameTempChannelModal = async (interaction) {
    const nameModal = new ModalBuilder()
        .setCustomId('temp_name_modal')
        .setTitle('Channel Namen ändern')
}