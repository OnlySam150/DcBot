import { Events } from "discord.js";
import { check_and_update_expired_ads } from "./function/ads.js";
import cron from "node-cron";

export default {
  name: Events.ClientReady,

  async execute(client) {
    cron.schedule("* * * * *", () => {
      check_and_update_expired_ads(client);
    });
  },
};
