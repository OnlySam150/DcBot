import {
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  REST,
  Routes,
} from "discord.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname } from "node:path";
import i18next from "i18next";
import backend from "i18next-fs-backend";
import dotenv from "dotenv";
import { pool } from "./src/utils/db.ts";
dotenv.config();

const token = process.env.token;
const clientId = process.env.clientId;
const guildId = process.env.guildId;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);
console.log(path.join(__dirname, "/src/utils/language/en/translation.json"));
i18next.use(backend).init({
  lng: "en",
  fallbackLng: "en",
  backend: {
    loadPath: path.join(
      __dirname,
      "/src/utils/language/{{lng}}/translation.json"
    ),
  },
  interpolation: {
    escapeValue: false,
  },
});

if (!token || !clientId || !guildId) {
  switch (true) {
    case !token:
      console.log(
        "No token provided! Update it in the .env file. Also you need to restart the bot manually"
      );
      break;
    case !clientId:
      console.log(
        "No clientId provided! Update it in the .env file. Also you need to restart the bot manually"
      );
      break;
    case !guildId:
      console.log(
        "No guildId provided! Update it in the .env file. Also you need to restart the bot manually"
      );
      break;
  }
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.cooldowns = new Collection();

const commands = [];

client.commands = new Collection();

const commandsPath = path.join(__dirname, "src", "commands");

function getFiles(dir, files_) {
  files_ = files_ || [];
  let files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files_);
    } else {
      const relativePath = fullPath.replace(`${commandsPath}${path.sep}`, "");
      files_.push(relativePath);
    }
  }
  return files_;
}

const commandFiles = getFiles(commandsPath).filter((file) =>
  file.endsWith(".js")
);

// Commands registrieren
for (const file of commandFiles) {
  const command = await import(`./src/commands/${file}`);

  if ("data" in command && "execute" in command) {
    console.log(`Command ${command.data.name} started!`);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  } else {
    console.log(
      `Command ${command.data.name} is missing are required "data" or "execute" property`
    );
  }
}

const eventsPath = path.join(__dirname, "src/events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

// Event registration
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const eventModule = await import(pathToFileURL(filePath).href);
  const event = eventModule.default;
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    return;
  }
  try {
    // Hier kommt die Premium abfrage rein
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.deferred) {
      await interaction.followUp({
        content: "Beim ausführen des Commands ist ein fehler aufgetreten",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "Beim ausführen des Commands ist ein fehler aufgetreten",
        ephemeral: true,
      });
    }
  }
});

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    console.log(`Refreshing ${commands.length} application (/) commands.`);

    if (process.env.DEV_MODE === "true") {
      const data = await rest.put(
        Routes.applicationGuildCommands(clientId, guildId), //if you want Public Commands: Routes.applicationCommands
        { body: commands }
      );
    } else {
      const data = await rest.put(
        Routes.applicationCommands(clientId), //if you want Public Commands: Routes.applicationCommands
        { body: commands }
      );
    }
    console.log(
      `Successfully reloaded ${commands.length} application (/) commands.`
    );
    client.once(Events.ClientReady, (client) => {
      console.log(
        `Ready! Logged in as ${client.user.tag} on ${client.guilds.cache.size} servers`
      );
    });
  } catch (error) {
    console.log(error);
  }
})();

process.on("SIGINT", async () => {
  console.log("[SYSTEM] Shutdown signal received, closing DB pool...");
  await pool.end();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("[SYSTEM] SIGTERM received, closing DB pool...");
  await pool.end();
  process.exit(0);
});

client.login(token);
