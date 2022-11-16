# NM, Lavalink Discord Music Bot

## Installation Guide

### Requirements

-   [Node.js](https://nodejs.org/) v16.6.0 or newer
-   [Java 16](https://adoptium.net/?variant=openjdk16&jvmVariant=hotspot) or newer
-   [Lavalink.jar](https://github.com/freyacodes/Lavalink/releases/latest)

### Setup

1.  Clone the repository

```sh
git clone https://github.com/NY0510/NM.git
```

2.  Install dependencies

```sh
npm install
```

### Configuration

Create a file named `.env` in the root directory of the project with the contents below.

```env
BOT_TOKEN="Discord Bot Token"
BOT_CLIENT_ID="Discord Bot Client ID"
BOT_PREFIX="Discord Bot Prefix"
BOT_PRESENCE_STATUS="Discord Bot Presence Status (online, idle, dnd, invisible)"
BOT_PRESENCE_NAME="Discord Bot Presence Name"

JOIN_LOG_CHANNEL_ID="Server Join / Left Log Channel ID"
MUSIC_LOG_CHANNEL_ID="Music Log Channel ID"

EMOJI_X="❌"
EMOJI_CHECK="✅"
EMOJI_WARNING='⚠️'

COLOR_NORMAL="0xb2d1bd"
COLOR_NORMAL2="0x212326"
COLOR_ERROR="0xff3333"

PATH_COMMANDS="commands"
PATH_EVENTS="events"

LAVALINK_HOST="Lavalink Host"
LAVALINK_PORT="Lavalink Port"
LAVALINK_PASSWORD="Lavalink Password"
```

### Running

1.  Run Lavalink.jar

```sh
java -jar Lavalink.jar
```

2.  Run the bot

```sh
npm start
```
