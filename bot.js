module.exports =
    (fetch, {
        id,
        joinchat
    }, bot) => async(ctx) => {
        try {
            var amsg = await ctx.reply("Processing...");
            var respid = (await ctx.forwardMessage(id))["message_id"];
            var resp = (await fetch("https://dwgram.xyz/api/getchat?__cachebypass=true&joinchat=" + joinchat).then(res => res.json())).messages;
            for (lol in resp) {
                if (resp[lol]["id"] == respid) {
                    var resps = resp[lol]["mediaURL"];
                }
            }
            await ctx.telegram.editMessageText(amsg.chat.id, amsg.message_id, "", resps);
            return;
        } catch (ffefef) {
            console.log(ffefef)
            await ctx.telegram.editMessageText(amsg.chat.id, amsg.message_id, "", "Underlying api down. This could happen because the server got ratelimited and needs to reboot with another userbot. Retry later.");
        }

    }
