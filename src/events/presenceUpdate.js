import { Events, ActivityType } from "discord.js";
import { update_ad_status } from "./function/ads";

export default {
  name: Events.PresenceUpdate,
  async execute(oldPresence, newPresence) {
    newPresence.activities.forEach(async (activity) => {
      if (
        oldPresence?.activities.find((a) => a.type === 4)?.state ===
        newPresence?.activities.find((a) => a.type === 4)?.state
      ) {
        return;
      } else {
        await update_ad_status(
          newPresence.user,
          newPresence?.activities.find((a) => a.type === 4)?.state
        );
        console.log("Custom activity found and ad status updated.");
      }
    });
  },
};
