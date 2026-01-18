import { Events } from "discord.js";
import data from "../utils/settings.json" with { type: "json" };
import { countingFunction } from "./function/counting.js";
import { levelFunction } from "./function/level.js";

export default {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot) return;
    await levelFunction(message);
    console.log("test");
    switch (message.channel.id) {
      case data.commandChannel:
        setTimeout(() => {
          message.delete();
        }, 300000);
        break;

      case data.countingChannel:
        countingFunction(message);
        break;

      default:
        break;
    }
  },
};
