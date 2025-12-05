import {SlashCommandBuilder, EmbedBuilder} from 'discord.js'
import { setTempChannelPrivacy, setTempChannelSize } from '../utils/function/tempChannelFunctions.js'


export const data = new SlashCommandBuilder()
.setName("channelsize")
.setDescription("Lege deine Channel größe fest")
.addIntegerOption(option =>
    option.setName('channelgröße')
    .setDescription('Gebe hier an wie viele Personen deinem Channel beitreten sollen')
)

export async function execute(interaction) {
    await setTempChannelSize(interaction, size)
}