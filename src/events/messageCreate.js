import {Events} from 'discord.js'
import data from '../utils/settings.json' with {type: 'json'};
import {countingFunction} from './function/counting.js';

export default {
    name: Events.MessageCreate,
    async execute(message) {
        switch (message.channel.id) {
            case data.commandChannel:
                setTimeout(() => {
                message.delete();
            }, 300000)
                break;

            case data.countingChannel:
                countingFunction(message);
                break;

            default:
                break;
        }
    }
}