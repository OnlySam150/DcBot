# Utility 🤖

![Language](https://img.shields.io/badge/Language-NodeJS-green)
![Status](https://img.shields.io/badge/Status-In_Development-orange)
![License](https://img.shields.io/badge/License-Proprietary-red)

⚠️ **Hinweis:** 
> Dieses Projekt ist Teil meines Portfolios. Der Quellcode dient nur zur Ansicht ("Source Available") und darf nicht kopiert oder für eigene Projekte verwendet werden.

🚧 **Status: Work in Progress**
> Dieses Projekt befindet sich in der aktiven Entwicklungs-Phase.
> * Einige Module sind noch nicht vollständig implementiert.
> * Statische Assets fehlen im Repository teilweise aus Lizenz- oder Speichergründen, weshalb der Bot lokal ohne diese Dateien Fehler werfen könnte.

---

## 📖 Über das Projekt
Utility ist ein Discord-Bot, der entwickelt wurde, um für ein eigenes Discord-Projekt einige Aufgabenbereiche zu bündeln. Ziel dieses Projekts war es, meine Fähigkeiten in Node.js, PostgreSQL und Themen wie asynchroner Programmierung sowie Datenbankzugriffen zu vertiefen.

### ✨ Hauptfunktionen
* **Feature 1:** Ein Moderations Aufgaben damit die Server Moderation einfacher und transparenter ist
* **Feature 2:** Ein Level System damit Benutzer für Aktivität belohnt werden
* **Feature 3:** Ein TempChannel System womit Benutzer eigene Voice Kanäle erstellen können
* **Feature 4:** Ein Werbungs System bei dem die Benutzer durch erfüllte Bedingungen für ihr Projekt Werbung machen können
* **Feature 5:** Ein Counting Minispiel bei dem die Benutzer abwechselnd zählen müssen

---

## 🛠️ Technologien
Hier sind die Technologien und Libraries, die ich verwendet habe:

* **Sprache:** Node.js
* **Framework:** discord.js
* **Datenbank:** PostgreSQL
* **Tools:** Git, ESLint, Prettier, Dotenv

---

## 💻 Architektur & Code-Struktur

Der Bot ist modular aufgebaut, um Wartbarkeit und Skalierbarkeit zu gewährleisten:

```text
├── src
│   └── api
│       ├── commands
│       │   ├── addSystem
│       │   ├── levelSystem
│       │   ├── moderation
│       │   └── tempSystem
│       ├── events
│       │   └── function
│       └── utils
│           ├── function
│           └── images
├── index.js
└── .env.dist
```

---

## 👏 Credits & Quellen
* **Base Structure:** Die Initialisierung (`index.js`) ist von Freunden sowie mir entwickelt worden und basiert auf den code vom Discord.js Guide (Quelle: https://discordjs.guide/legacy/app-creation/main-file)
