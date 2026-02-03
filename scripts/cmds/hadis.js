const axios = require("axios");

const mahmud = async () => {
  const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
  return base.data.mahmud;
};

module.exports = {
  config: {
    name: "hadis",
    aliases: ["hadith"],
    version: "1.7",
    author: "MahMUD",
    countDown: 5,
    role: 0,
    category: "Islamic",
    shortDescription: {
      en: "Random Bangla Hadis"
    },
    longDescription: {
      en: "Sends a random Bangla Hadis with source from Mahmud's global API"
    },
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message, api, event }) {
    const obfuscatedAuthor = String.fromCharCode(77, 97, 104, 77, 85, 68); 
    if (module.exports.config.author !== obfuscatedAuthor) {
      return api.sendMessage(
        "You are not authorized to change the author name.\n",
        event.threadID,
        event.messageID
      );
    }

    try {
      const base = await mahmud();
      const res = await axios.get(`${base}/api/hadis`);
      const hadis = res.data;

      message.reply(
        `${hadis.text}\n\n- ${hadis.source} 🖤`
      );
    } catch (err) {
      message.reply("🥹error, contact MahMUD");
    }
  }
};
