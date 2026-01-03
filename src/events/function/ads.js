import { set_user_ad_status, get_user_ad_status } from "../../api/adsApi";

export const update_ad_status = async (user, status) => {
  const user_id = user.id;
  if (status === "https://discord.gg/tMSDAyHfjJ") {
    await set_user_ad_status(user_id, true);
  } else {
    await set_user_ad_status(user_id, false);
  }
};
