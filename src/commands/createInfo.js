import {SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder} from 'discord.js'

export const data = new SlashCommandBuilder()
        .setName("initinfo")
        .setDescription("Initialisiert das Informationssystem")
        .setDefaultMemberPermissions(8);

export async function execute(interaction) {
    //hier funktion hin mit selectmenu

    const row = new ActionRowBuilder().addComponents(SelectMenu)
    await interaction.channel.send({files: ['./src/utils/images/infoBanner.png']})
    await interaction.channel.send(`<:plus:1443713326365540402> **Hier findest du einige Informationen bezüglich das AQUARIUM** <:ausruf:1443712896696844379>`)
    await interaction.channel.send({files: ['./src/utils/images/trennstrichAQ.png']})
    await interaction.channel.send(
        `<:strich:1443713431214624971> \`\`Wer wir sind! DAS AQUARIUM stellt sich vor\`\`\r
<:strich:1443713431214624971> \`\`Eine Übersicht und Erklärung zu allen Kanälen!\`\`\r
<:strich:1443713431214624971> \`\`Eine Team Liste - Damit du weißt wer dich wobei unterstützt!\`\`\r
<:strich:1443713431214624971> \`\`Ein FAQ welches die wichtigsten Fragen beantwortet!\`\`\r
<:strich:1443713431214624971> \`\`Unsere Werbung - Damit du deine Freunde zu uns Einladen kannst!\`\``
    )
    await interaction.channel.send({files: ['./src/utils/images/trennstrich.png']})
    await interaction.channel.send({content: `<:plus:1443713326365540402> **Durch nutzen des Menüs kannst du an alle Infos kommen**`})
    await interaction.channel.send({components: [row]})
    await interaction.reply({content: "done", ephemeral: true})
}