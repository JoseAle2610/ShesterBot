const {TOKEN, DEV_ID} = require('./config');
const { Telegraf, session, Scenes } = require('telegraf');
const { Stage } = Scenes;
const crontab = require('node-cron')

const bot = new Telegraf(TOKEN);

const scenes = require('./scenes');
const stage = new Stage(Object.values(scenes));

// registration middlewares
bot.use(session()).use(stage.middleware());

bot.start((ctx) => {
  return ctx.scene.enter("main");
});

bot.on("text", (ctx) => {
  return ctx.scene.enter("main");
});

bot.launch().then(() => {
  console.log('Bot Started');
//  bot.telegram.sendMessage(DEV_ID, 'Bot Started');
});

crontab.schedule('30 8 * * *', async () => {
  const { stdout } = await exec('bash ./seeHosts.sh');
  bot.telegram.sendMessage(DEV_ID, stdout);
});

// bot.command('Backups', async (ctx) => {
//   ctx.reply('Backups...');
//   console.log('baskups...')
//   const { stdout } = await exec('bash ./seeHosts.sh');
//   ctx.reply(stdout);
// });