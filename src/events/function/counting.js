import { getCountData, updateCountData } from "../../api/countingApi";

export const countingFunction = async (message) => {
  if (message.author.bot) return;
  try {
    const content = message.content;
    const number_regex = /[0-9][0-9]*/;
    const number = content.match(number_regex);
    const author_id = message.author.id;
    if (!number) return false;

    const countData = await getCountData(message.channel.id);

    if (author_id === countData.last_user_id) {
      await updateCountData(message.channel.id, 0, countData.last_user_id);
      message.react("❌");
      await message.reply(
        `<@${author_id}> hat zwei mal gezählt! Die nächste Zahl ist 1`
      );
    } else if (parseInt(number[0]) !== countData.last_number + 1) {
      await updateCountData(message.channel.id, 0, countData.last_user_id);
      message.react("❌");
      await message.reply(
        `<@${author_id}> hat die falsche Zahl gepostet! Die nächste Zahl ist 1`
      );
    } else if (parseInt(number[0]) === countData.last_number + 1) {
      await updateCountData(message.channel.id, parseInt(number[0]), author_id);
      message.react("✅");
    }
  } catch (err) {
    console.error("Error in countingFunction", err);
  }
};
