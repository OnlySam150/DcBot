import {Events, TextDisplayBuilder, SeparatorBuilder, SeparatorSpacingSize, AttachmentBuilder, MediaGalleryBuilder, MessageFlags, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from 'discord.js'

export const infoTextBuilder = async (interaction, banner, titleText, descriptText) => {
                    const bannerAQFile = new AttachmentBuilder(`./src/utils/images/${banner}`)
                    const seperatorAQFile = new AttachmentBuilder('./src/utils/images/trennstrichAQ.png')
                    const seperatorFile = new AttachmentBuilder('./src/utils/images/trennstrich.png')
                    const mediaGalleryBanner = new MediaGalleryBuilder().addItems(
                        (mediaGalleryItem) =>
                            mediaGalleryItem
                                .setURL(`attachment://${banner}`)
                            );
                    const firstTextDisplayBuilder = new TextDisplayBuilder().setContent(
                        titleText
                    )
                    const mediaGallerySeperatorAQ = new MediaGalleryBuilder().addItems(
                        (mediaGalleryItem) =>
                            mediaGalleryItem
                                .setURL('attachment://trennstrichAQ.png')
                    )
                    const secondTextDisplayBuilder = new TextDisplayBuilder().setContent(
                        descriptText
                    )
                    const mediaGallerySeperator = new MediaGalleryBuilder().addItems(
                        (mediaGalleryItem) =>
                            mediaGalleryItem
                                .setURL('attachment://trennstrich.png')
                    )
                            await selectMenuMsg.edit({components: [row]})
                            await interaction.reply(
                                {
                                    components: [mediaGalleryBanner, firstTextDisplayBuilder, mediaGallerySeperatorAQ, secondTextDisplayBuilder, mediaGallerySeperator],
                                    files: [bannerAQFile, seperatorAQFile, seperatorFile],
                                    flags: MessageFlags.IsComponentsV2,
                                    ephemeral: true
                                }
                            )
}