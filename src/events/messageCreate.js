import {Events} from 'discord.js'
import data from '../utils/settings.json' with {type: 'json'};

export default {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.channel.id === data.commandChannel) {
            setTimeout(() => {
                message.delete();
            }, 300000)
        }
    }
}