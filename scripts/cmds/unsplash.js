const axios = require("axios");
const path = require("path");
const fs = require("fs");

const mahmud = async () => {
        const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
        return base.data.mahmud;
};

module.exports = {
        config: {
                name: "unsplash",
                aliases: ["uph"],
                version: "1.7",
                author: "MahMUD",
                countDown: 10,
                role: 0,
                description: {
                        bn: "Unsplash থেকে হাই-কোয়ালিটি ছবি সার্চ করুন",
                        en: "Search high-quality images from Unsplash",
                        vi: "Tìm kiếm hình ảnh chất lượng cao từ Unsplash"
                },
                category: "media",
                guide: {
                        bn: '   {pn} <নাম> - <পরিমাণ>: ছবি সার্চ করুন (যেমন: {pn} cat - 5)',
                        en: '   {pn} <query> - <number>: Search images (Ex: {pn} cat - 5)',
                        vi: '   {pn} <tên> - <số lượng>: Tìm kiếm ảnh (VD: {pn} cat - 5)'
                }
        },

        langs: {
                bn: {
                        noInput: "× বেবি, সঠিক নিয়ম ব্যবহার করো! 📸\nউদাহরণ: {pn} cat - 5",
                        noResult: "× কোনো ছবি খুঁজে পাওয়া যায়নি।",
                        success: "✅ এই নাও তোমার Unsplash ছবিগুলো বেবি! <😘",
                        error: "× সমস্যা হয়েছে: %1। প্রয়োজনে Contact MahMUD।"
                },
                en: {
                        noInput: "× Baby, use the correct format! 📸\nExample: {pn} cat - 5",
                        noResult: "× No images found.",
                        success: "✅ Here are your Unsplash images baby! <😘",
                        error: "× API error: %1. Contact MahMUD for help."
                },
                vi: {
                        noInput: "× Cưng ơi, hãy sử dụng đúng định dạng! 📸\nVí dụ: {pn} cat - 5",
                        noResult: "× Không tìm thấy hình ảnh nào.",
                        success: "✅ Ảnh Unsplash của cưng đây! <😘",
                        error: "× Lỗi: %1. Liên hệ MahMUD để hỗ trợ."
                }
        },

        onStart: async function ({ api, event, args, message, getLang }) {
                const authorName = String.fromCharCode(77, 97, 104, 77, 85, 68);
                if (this.config.author !== authorName) {
                        return api.sendMessage("You are not authorized to change the author name.", event.threadID, event.messageID);
                }

                const input = args.join(" ");
                if (!input.includes("-")) return message.reply(getLang("noInput"));

                const [query, number] = input.split("-").map(x => x.trim());
                const limit = Math.min(20, parseInt(number) || 6);

                const cacheDir = path.join(__dirname, "cache", `uph_${Date.now()}`);
                if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

                try {
                        api.setMessageReaction("🔍", event.messageID, () => {}, true);
                        
                        const apiBase = await mahmud();
                        const apiUrl = `${apiBase}/api/unsplash?query=${encodeURIComponent(query)}&number=${limit}`;

                        const { data } = await axios.get(apiUrl, {
                                headers: { author: this.config.author }
                        });

                        if (!data.images || data.images.length === 0) {
                                api.setMessageReaction("🥹", event.messageID, () => {}, true);
                                return message.reply(getLang("noResult"));
                        }

                        const files = await Promise.all(data.images.map(async (url, i) => {
                                const imgRes = await axios.get(url, { responseType: "arraybuffer" });
                                const filePath = path.join(cacheDir, `${i + 1}.jpg`);
                                fs.writeFileSync(filePath, Buffer.from(imgRes.data));
                                return fs.createReadStream(filePath);
                        }));

                        return message.reply({
                                body: getLang("success"),
                                attachment: files
                        }, () => {
                                api.setMessageReaction("✅", event.messageID, () => {}, true);
                                if (fs.existsSync(cacheDir)) fs.rmSync(cacheDir, { recursive: true, force: true });
                        });

                } catch (err) {
                        console.error("Unsplash Error:", err);
                        api.setMessageReaction("❌", event.messageID, () => {}, true);
                        if (fs.existsSync(cacheDir)) fs.rmSync(cacheDir, { recursive: true, force: true });
                        return message.reply(getLang("error", err.message));
                }
        }
};
