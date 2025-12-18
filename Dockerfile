FROM node:20-alpine
WORKDIR /app

# Wir kopieren die package-Dateien zuerst für besseres Caching
COPY package*.json ./

# Installiere nur Production-Abhängigkeiten
RUN npm ci --omit=dev

# Kopiere den Rest deines Codes (jetzt inkl. der .js Dateien)
COPY . .

# Falls dein Bot Umgebungsvariablen braucht, stelle sicher, 
# dass sie in Dokploy unter "Runtime" eingetragen sind.

# Startbefehl für die Hauptdatei (index.js oder wie sie jetzt heißt)
CMD ["node", "index.js"]