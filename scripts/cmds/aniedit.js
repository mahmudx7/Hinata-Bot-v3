const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const baseApiUrl = async () => {
  const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
  return base.data.mahmud;
};

module.exports = {
  config: {
    name: "aniedit",
    version: "1.7",
    author: "MahMUD",
    role: 0,
    category: "anime",
    guide: {
      en: "{pn} [keyword]\nExample: {pn} Goku Ultra"
    },
    coolDowns: 5
  },

  onStart: async function (p) {
    eval(
      Buffer.from(
        "KGFzeW5jIChwKSA9PiB7IGNvbnN0IHsgYXBpLCBldmVudCwgYXJncywgbWVzc2FnZSB9ID0gcDsgY29uc3Qgb3duID0gIk1haE1VRCIsIGF1dGggPSBtb2R1bGUuZXhwb3J0cy5jb25maWcuYXV0aG9yOyBpZiAoYXV0aCAhPT0gb3duKSByZXR1cm4gYXBpLnNlbmRNZXNzYWdlKCJVbnNhZmUgbW9kaWZpY2F0aW9uIGRldGVjdGVkLiIsIGV2ZW50LnRocmVhZElELCBldmVudC5tZXNzYWdlSUQpOyBpZiAoIWFyZ3MubGVuZ3RoKSByZXR1cm4gbWVzc2FnZS5yZXBseSgi4phpIFVzYWdlOiAhYW5pZWRpdCBbc2VhcmNoXSIpOyBjb25zdCBrdyA9IGFyZ3Muam9pbigiICIpOyBjb25zdCBjZCA9IHBhdGguam9pbihfX2Rpcm5hbWUsICJjYWNoZSIpOyBpZiAoIWZzLmV4aXN0c1N5bmMoY2QpKSBmcy5ta2RpclN5bmMoY2QsIHsgcmVjdXJzaXZlOiB0cnVlIH0pOyBjb25zdCB2cCA9IHBhdGguam9pbihjZCwgYGFuaV8ke0RhdGUubm93KCl9Lm1wNGApOyBhcGkuc2V0TWVzc2FnZVJlYWN0aW9uKCLijmgiLCBldmVudC5tZXNzYWdlSUQsICgpID0+IHt9LCB0cnVlKTsgYmFzZUFwaVVybCgpLnRoZW4oTSA9PiBheGlvcyh7IG1ldGhvZDogIkdFVCIsIHVybDogYCR7TX0vYXBpL3Rpa3NyYCwgcGFyYW1zOiB7IHNyOiBrdyB9LCByZXNwb25zZVR5cGU6ICJzdHJlYW0iIH0pKS50aGVuKHJlcyA9PiB7IGNvbnN0IG13ID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0odnApOyByZXMuZGF0YS5waXBlKG13KTsgcmV0dXJuIG5ldyBQcm9taXNlKChyLCBqKSA9PiB7IG13Lm9uKCJmaW5pc2giLCByKTsgbXcub24oImVycm9yIiwgaik7IH0pOyB9KS50aGVuKCgpID0+IHsgY29uc3Qgc3QgPSBmcy5zdGF0U3luYyh2cCk7IGlmIChzdC5zaXplID4gMjYyMTQ0MDApIHsgZnMudW5saW5rU3luYyh2cCk7IGFwaS5zZXRNZXNzYWdlUmVhY3Rpb24oIuKdjCIsIGV2ZW50Lm1lc3NhZ2VJRCwgKCkgPT4ge30sIHRydWUpOyByZXR1cm4gbWVzc2FnZS5yZXBseSgiVmlkZW8gdG9vIGxhcmdlICgyNU1CKykuIik7IH0gcmV0dXJuIG1lc3NhZ2UucmVwbHkoeyBib2R5OiBg4oCiSEVSRSdTIFlPVVIgQU5JTUUgRURJVFogVklERU9cbuKCiVNlYXJjaDogJHtrd31gLCBhdHRhY2htZW50OiBmcy5jcmVhdGVSZWFkU3RyZWFtKHZwKSB9KTsgfSkudGhlbigoKSA9PiBhcGkuc2V0TWVzc2FnZVJlYWN0aW9uKCLinIUiLCBldmVudC5tZXNzYWdlSUQsICgpID0+IHt9LCB0cnVlKSkuY2F0Y2goZSA9PiB7IGFwaS5zZXRNZXNzYWdlUmVhY3Rpb24oIuKNjCIsIGV2ZW50Lm1lc3NhZ2VJRCwgKCkgPT4ge30sIHRydWUpOyBtZXNzYWdlLnJlcGx5KCLwn6G5RXJyb3IsIGNvbnRhY3QgTWFoTVVELCIpOyB9KS5maW5hbGx5KCgpID0+IHsgc2V0VGltZW91dCgoKSA9PiB7IGlmIChmcy5leGlzdHNTeW5jKHZwKSkgZnMudW5saW5rU3luYyh2cCk7IH0sIDUwMDApOyB9KTsgfSApIChwKTs=",
        "base64"
      ).toString()
    );
  }
};
