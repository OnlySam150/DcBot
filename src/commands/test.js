import { SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

export const data = new SlashCommandBuilder()
  .setName("test")
  .setDescription("raw api request")
  .setDefaultMemberPermissions(8);

export async function execute(interaction) {
  const token = process.env.token;
  console.log(token);
  fetch(
    "https://discord.com/api/v10/channels/1442853398755020814/messages?limit=3",
    {
      method: "GET",
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((r) => r.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}
