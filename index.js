require('dotenv').config();
const { Telegraf} = require('telegraf');
const crontab = require('node-cron');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const bot = new Telegraf(process.env.TOKEN);

crontab.schedule('20 12 * * *', async () => {
  const { stdout } = await exec('bash ./seeHosts.sh');
  bot.telegram.sendMessage(process.env.DEV_ID, stdout);
});

bot.start( async (ctx) => {
  ctx.reply('Backups...');
  console.log('baskups...')
  const { stdout } = await exec('bash ./seeHosts.sh');
  ctx.reply(stdout);
});

bot.command('Backups', async (ctx) => {
  ctx.reply('Backups...');
  console.log('baskups...')
  const { stdout } = await exec('bash ./seeHosts.sh');
  ctx.reply(stdout);
});

bot.launch().then(() => {
  console.log('loaded');
//  bot.telegram.sendMessage(process.env.DEV_ID, 'Hello');
});

console.log(process.env.TOKEN);