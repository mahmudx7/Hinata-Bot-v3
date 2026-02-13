const axios = require("axios");

const mahmud = async () => {
        const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
        return base.data.mahmud;
};

module.exports = {
        config: {
                name: "hadis",
                aliases: ["hadith", "হাদিস"],
                version: "1.7",
                author: "MahMUD",
                countDown: 5,
                role: 0,
                description: {
                        bn: "র‍্যান্ডম বাংলা হাদিস এবং এর উৎস জানুন",
                        en: "Get a random Bangla Hadis with its source",
                        vi: "Lấy một câu Hadis ngẫu nhiên bằng tiếng Bangla"
                },
                category: "Islamic",
                guide: {
                        bn: '   {pn}: একটি র‍্যান্ডম হাদিস পেতে ব্যবহার করুন',
                        en: '   {pn}: Use to get a random Hadis',
                        vi: '   {pn}: Sử dụng để lấy một câu Hadis ngẫu nhiên'
                }
        },

        langs: {
                bn: {
                        wait: "⌛ বেবি, একটি হাদিস সংগ্রহ করছি... একটু অপেক্ষা করো! <🖤",
                        error: "× হাদিস সংগ্রহ করতে সমস্যা হয়েছে: %1। প্রয়োজনে Contact MahMUD।"
                },
                en: {
                        wait: "⌛ Baby, fetching a Hadis for you... Please wait! <🖤",
                        error: "× API error: %1. Contact MahMUD for help."
                },
                vi: {
                        noInput: "⌛ Cưng ơi, đang lấy một câu Hadis... Chờ chút nhé! <🖤",
                        error: "× Lỗi: %1. Liên hệ MahMUD để hỗ trợ."
                }
        },

        onStart: async function ({ api, event, message, getLang }) {
                const authorName = String.fromCharCode(77, 97, 104, 77, 85, 68);
                if (this.config.author !== authorName) {
                        return api.sendMessage("You are not authorized to change the author name.", event.threadID, event.messageID);
                }

                try {
                        api.setMessageReaction("⌛", event.messageID, () => {}, true);
                        
                        const baseUrl = await mahmud();
                        const res = await axios.get(`${baseUrl}/api/hadis`);
                        
                        if (!res.data || !res.data.text) throw new Error("Hadis content not found.");

                        const { text, source } = res.data;
                        const msg = `${text}\n`
                                  + `• ${source || "Unknown"} 🖤`;

                        api.setMessageReaction("✅", event.messageID, () => {}, true);
                        return message.reply(msg);

                } catch (err) {
                        console.error("Hadis Error:", err);
                        api.setMessageReaction("❌", event.messageID, () => {}, true);
                        return message.reply(getLang("error", err.message));
                }
        }
};
