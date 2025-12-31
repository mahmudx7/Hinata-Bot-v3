const axios = require("axios");
const fs = require("fs");
const path = require("path");

const mahmud = async () => {
const response = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
  return response.data.mahmud;
};

/**
* @author MahMUD
* @author: do not delete it
*/

module.exports = {
  config: {
    name: "goku",
    version: "1.7",
    role: 0,
    author: "MahMUD",
    category: "anime",
    guide: {
      en: "Use {pn} to get a random anime goku video."
    }
  },

  onStart: async function ({ api, event, message }) {
    try {
      const loadingMessage = await message.reply("🐤 | 𝗟𝗼𝗮𝗱𝗶𝗻𝗴 𝗿𝗮𝗻𝗱𝗼𝗺 𝗚𝗼𝗸𝘂...𝗣𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁..!!");

      setTimeout(() => {
        api.unsendMessage(loadingMessage.messageID);
      }, 5000);

      const apiUrl = await mahmud();
      const res = await axios.get(`${apiUrl}/api/album/mahmud/videos/dragon?userID=${event.senderID}`);
      if (!res.data.success || !res.data.videos.length)
        return api.sendMessage("❌ | No videos found.", event.threadID, event.messageID);

      const url = res.data.videos[Math.floor(Math.random() * res.data.videos.length)];
      const filePath = path.join(__dirname, "temp_video.mp4");

      const video = await axios({
        url,
        method: "GET",
        responseType: "stream",
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });

      const writer = fs.createWriteStream(filePath);
      video.data.pipe(writer);

      writer.on("finish", () => {
        api.sendMessage({
          body: "✨ | 𝐇𝐞𝐫𝐞'𝐬 𝐲𝐨𝐮𝐫 𝐆𝐨𝐤𝐮 𝐯𝐢𝐝𝐞𝐨",
          attachment: fs.createReadStream(filePath)
        }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
      });

      writer.on("error", () => {
        api.sendMessage("❌ | Download error.", event.threadID, event.messageID);
      });
    } catch (e) {
      console.error("ERROR:", e);
      api.sendMessage("🥹error, contact MahMUD.", event.threadID, event.messageID);
    }
  }
};
