import {
  set_user_ad_status,
  get_user_ad_status,
  get_expired_ads,
  delete_ad_information,
} from "../../api/adsApi";
import settings from "../utils/settings.json" assert { type: "json" };

export const update_ad_status = async (user, status) => {
  const user_id = user.id;
  if (status === "https://discord.gg/tMSDAyHfjJ") {
    await set_user_ad_status(user_id, true);
  } else {
    await set_user_ad_status(user_id, false);
  }
};

export const check_and_update_expired_ads = async (client) => {
  const expired_ads = await get_expired_ads();
  expired_ads.forEach(async (item) => {
    const channel = await client.channels.fetch(settings.adChannelId);
    const message = await channel.messages.fetch(item.message_id);
    if (message) {
      await delete_ad_information(item.user_id);
      await message.delete();
    } else {
      await delete_ad_information(item.user_id);
    }
  });
};
