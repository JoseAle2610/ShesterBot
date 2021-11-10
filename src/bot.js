// MODULES AND DATA
// import {Telegraf, Markup } from 'telegraf';
const { Telegraf, Markup } = require('telegraf');
// import { Scenes } from 'telegraf';
const { Scenes } = require('telegraf');
// import { session } from 'telegraf';
const { session } = require('telegraf');

const util = require('util');

const exec = util.promisify(require('child_process').exec);

const servers = require('./servers.json');

let users = [
];

// MENU
const keyboard = Markup.inlineKeyboard([
  Markup.button.callback('Ping', 'ping'),
  Markup.button.callback('Shutdown', 'shutdown'),
  Markup.button.callback('Container', 'container'),
  Markup.button.callback('Scene', 'scene'),
  Markup.button.callback('Login', 'login'),
]);

// BOT INSTANCE
const bot = new Telegraf('1256011563:AAEJUmoZd9bvW4DpwPfQZLYgXALS8b7HB2g');

// COMMADS, ACTIONS AND MESSAGE LISTENERS
bot.start((ctx) => {
  ctx.reply('Welcome', keyboard)
  ctx.getChat().then(e => console.log(e.id))
});
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))

const serverStatus = async (server) => {
  let status = `Servidor: ${server.ip}\n`;
  let char   = '├'; // 
  for (let vm  of server.vms) {
    if (server.vms[server.vms.length - 1] === vm ){
      char = '└';
    }
    try {
      const output = await exec(`ping -c 1 ${vm}`);
      status += `${char}── Vm: ${vm} Responde\n`;
    } catch(err) {
      status += `${char}── Vm: ${vm} No Responde\n`;
    }
  }
  return status;
}

bot.action('ping', ctx => {
	ctx.reply('hola haciendo pign');
	for (let server of servers) {
		serverStatus(server).then(status => {
			console.log(status);
			ctx.reply(status);
		});
	}
});


bot.use(session());

// RUN BOT
bot.launch().then(ctx => {
  console.log('Loaded')
  bot.telegram.reply('115684702', 'Loaded')
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
