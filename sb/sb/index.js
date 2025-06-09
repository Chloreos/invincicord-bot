const { Client, MessageEmbed, TextChannel, GuildChannel, Channel, Message } = require('discord.js-selfbot-v13')

const client = new Client({
    checkUpdate: false
});

client.on('ready', async () => {
    console.log(`${client.user.username} is ready!`);
});

const token = "" //put account token here
reportChannelId = "837928153774424084"
coinLogChannelId = "1259285090505068636"
coinChannelId = "840431174845071401"
modRoleId = "839237255158956042"
pylonBotId = "270148059269300224"
coinStatus = false
reactionEmojis = ["✅","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"]

client.on("messageReactionAdd", async (reaction) => {
  try {
  if (reaction.message.channelId == reportChannelId && reaction.message.reactions.cache.size == 1) {
  reactorId = JSON.parse(JSON.stringify(reaction.users["_cache"]))[0].id
  if (reactionEmojis.includes(reaction.emoji.name) && reaction.message.author.id == `${pylonBotId}` && reaction.count == '1' && reaction.message.guild.members.cache.get(reactorId)["_roles"].includes(modRoleId)) {
    if (coinStatus == true) {
      client.channels.cache.get(reportChannelId).send('`Not done distributing coins.`')
    } else {
    args = reaction.message.content
    args = args.replaceAll(/<|>|@|!/g, '')
    args = args.split(", ")
    if (reactionEmojis.indexOf(reaction.emoji.name) == 0 || reactionEmojis.indexOf(reaction.emoji.name) > args.length) {
      n = args.length
    } else {
      n = reactionEmojis.indexOf(reaction.emoji.name)
    }
    coinStatus = true
    j = 0
    coinMsgSent = await client.channels.cache.get(reportChannelId).send('`Begun distributing coins`')
    for (let i = 0; i < n; i++) {
      setTimeout(()=>{
        client.channels.cache.get(coinChannelId).send(`$add-money <@${args[i]}> 100`)
        j++
        if (j == n) {
          coinStatus = false
          coinMsgSent.edit('`Done distributing coins`')
        }
      }, 10000*i)
    }
    client.channels.cache.get(coinLogChannelId).send(`$add-money bank ${reactorId} 50`)
  }
  }
}
} catch (err) {
  client.channels.cache.get(reportChannelId).send('`There was an error`')
  console.error(err)
}
})

client.login(`${token}`)
