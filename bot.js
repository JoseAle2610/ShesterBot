// MODULES AND DATA
// import {Telegraf, Markup } from 'telegraf';
const { Telegraf, Markup } = require('telegraf');
// import { Scenes } from 'telegraf';
const { Scenes } = require('telegraf');
// import { session } from 'telegraf';
const { session } = require('telegraf');

const util = require('util');

const exec = util.promisify(require('child_process').exec);

const servers = require('./servers.json')

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
bot.start((ctx) => ctx.reply('Welcome', keyboard));
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.action('ping', ctx => {
	ctx.reply('hola haciendo pign');
	for (let server of servers) {
		for (let vm of server.vms) {

			server.status = `Servidor: ${server.ip}\n`;

			exec(`ping -c 1 ${vm}`)
				.then(resp => {
					server.status += `├── ${vm} Responde\n`;
					if (server.vms[server.vms.length - 1] === vm){
						console.log(server.status);
						ctx.reply(server.status)
					}
				})
				.catch(err => {
					server.status += `├── ${vm} No Responde\n`;
					if (server.vms[server.vms.length - 1] === vm){
						console.log(server.status);
						ctx.reply(server.status);
					}
				});
		}
	}
});


bot.use(session());

// RUN BOT
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
