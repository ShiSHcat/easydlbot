const Telegraf = require('telegraf')
const conf = require("./config.js")
const bot = new Telegraf(conf.token)
const rateLimit = require('telegraf-ratelimit')

const botl = require("./bot.js")(require("node-fetch"), conf, bot)

const limitConfig = {
    window: 3000,
    limit: 1,
    onLimitExceeded: (ctx, next) => ctx.reply('You are being ratelimited.')
}

bot.use(rateLimit(limitConfig))

bot.start(async(ctx) => ctx.reply(
    "Hello! This fast bot will help you getting links out of telegram media.\n" +
    "By using this bot you agree to the https://dwgram.xyz/docs/ terms of service.\n" +
    "We will have access to data uploaded but we will never sell it.\n" +
    "This project is open source. https://github.com/ShiSHcat/EasyDLBot\n" +
    "Try it out! Send me a file (or forward one!)\n" +
    "Made with ❤️ by @shishcat8214"
))

bot.on("document", async(ctx) => await botl(ctx))
bot.on("photo", async(ctx) => await botl(ctx))
bot.on("video", async(ctx) => await botl(ctx))
bot.on("audio", async(ctx) => await botl(ctx))

bot.launch()