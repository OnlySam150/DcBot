import {EmbedBuilder} from 'discord.js';
import i18next from 'i18next';
import backend from 'i18next-fs-backend';
import fs from 'fs';
import path from 'path';
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from "node:path";
dotenv.config();

//language system
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const botName = process.env.botName;
i18next.use(backend).init({
          lng: 'en',
          fallbackLng: 'en',
          backend: {
              loadPath: path.join(__dirname, '/language/{{lng}}/translation.json'),
          },
          interpolation: {
              escapeValue: false
          }      
      })
//colors
const colors = {
    green: "#74ff00",
    red: "#ff0000"
}
//business
//create
export const businessCreateEmbedCreator = (businessName) => {
    return new EmbedBuilder()
    .setTitle(i18next.t('businessCommand.0.titleMainEmbed'))
    .setDescription(i18next.t('businessCommand.0.descMainEmbed', { businessName: businessName }))
    .setColor(colors.green)
    .setTimestamp()
    .setFooter({ text: i18next.t('embedMainText.0.footerEmbed') })
}

export const businessAssistantEmbedCreator = (businessName, randomString) => {
    return new EmbedBuilder()
    .setTitle(i18next.t('businessAssistantCommand.0.titleEmbed', { businessName: businessName }))
    .setDescription(i18next.t('businessAssistantCommand.0.descMainEmbed', { randomString: randomString }))
    .addFields(
        { name: "test", value: "test", inline: true }
    )
    .setColor(colors.green)
    .setTimestamp()
    .setFooter({ text: i18next.t('embedMainText.0.footerEmbed') })
}


//inventory
export const inventoryEmbedCreator = (businessName, items) => {
    return new EmbedBuilder()
    .setTitle(i18next.t('businessInventoryCommand.0.titleEmbed', { businessName: businessName }))
    .setDescription(i18next.t('businessInventoryCommand.0.descMainEmbed'))
}
