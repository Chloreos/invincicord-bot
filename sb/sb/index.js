const { Client, MessageEmbed, TextChannel, GuildChannel, Channel, Message } = require('discord.js-selfbot-v13')

const client = new Client({
    checkUpdate: false
});

client.on('ready', async () => {
    console.log(`${client.user.username} is ready!`);
});

const token = "" //put account token here
reportChannelId = "837928153774424084"
coinChannelId = "840431174845071401"
modRoleId = "839237255158956042"
pylonBotId = "270148059269300224"

client.on("messageReactionAdd", async (reaction) => {
  try {
  if (reaction.message.channelId == reportChannelId) {
  reactorId = JSON.parse(JSON.stringify(reaction.users["_cache"]))[0].id
  if (reaction.emoji.name == "✅" && reaction.message.author.id == `${pylonBotId}` && reaction.message.guild.members.cache.get(reactorId)["_roles"].includes(modRoleId)) {
    args = reaction.message.content
    args = args.replaceAll(/<|>|@/g, '')
    args = args.split(", ")
    for (let i = 0; i < args.length; i++) {
      setTimeout(()=>{
        client.channels.cache.get(coinChannelId).send(`$add-money <@${args[i]}> 100`)
      }, 15000*(i))
    }
  }
  }
} catch (err) {client.channels.cache.get(coinChannelId).send('`There was an error`')}
})

client.login(`${token}`)
