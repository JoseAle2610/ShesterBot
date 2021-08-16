// MODULES AND DATA
import {Telegraf, Markup } from 'telegraf';
// const { Telegraf, Markup } = require('telegraf');
import { exec } from 'child_process';
// const { exec } = require('child_process');
import { Scenes } from 'telegraf';
// const { Scenes } = require('telegraf');
import { session } from 'telegraf';

let users = [
	{
		userName: 'admin',
		userPass: 'T3cnolog1c4_$$'
	}
];
let user = {};
// MENU
const keyboard = Markup.inlineKeyboard([
	Markup.button.callback('Delete', 'delete'),
	Markup.button.callback('Shutdown', 'shutdown'),
	Markup.button.callback('Container', 'container'),
	Markup.button.callback('Scene', 'scene'),
	Markup.button.callback('Login', 'login'),
]);
// SCENES
const baseScene = new Scenes.BaseScene('someAction');
baseScene.enter(ctx => {
	ctx.reply('You are in a Scene', Markup.inlineKeyboard([
		Markup.button.callback('Leave the scene', 'leave')
	]));
})

baseScene.action('leave', ctx => {
	ctx.reply('Leaving the scene');
	return ctx.scene.leave();
})

baseScene.leave(ctx => ctx.reply('Thanks'));

const wizardScene = new Scenes.WizardScene('LoginScene',
	ctx => {
		console.log(ctx.wizard.cursor);
		ctx.reply('What is your username?');
		return ctx.wizard.next();
	},
	ctx => {
		user.userName = ctx.message.text;
		console.log(user);
		ctx.reply('What is your password?');
		return ctx.wizard.next();
	},
	ctx => {
		user.userPass = ctx.message.text;
		console.log(user);
		const find = users.find(e => e.userName == user.userName && e.userPass == user.userPass);
		if (find){
			ctx.reply('User found');
		} else {
			ctx.reply('User not found');
		}
		ctx.scene.leave();
	}
);

// BOT INSTANCE
const bot = new Telegraf('1256011563:AAEJUmoZd9bvW4DpwPfQZLYgXALS8b7HB2g');

// COMMADS, ACTIONS AND MESSAGE LISTENERS
bot.start((ctx) => ctx.reply('Welcome', keyboard));
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.action('shutdown', (ctx) => {
	console.log('apagando')
	ctx.reply('Turning off')
	//const comand = 'ssh -i /home/alex/.ssh/mox root@172.20.0.227 /root/apagado.sh';
	const comand = 'ls -l /home/alex'
	console.log(exec)
	exec( comand , (err, stdout, stderr) => {
		if (err) {
			console.error('Error: ', err);
		} else {
  		ctx.reply(stdout)
			console.log('stdout: ', stdout);
			console.log('stderr: ', stderr);
		}
	});
})

bot.action('delete', ctx => {
	// ctx.reply(`Hello ${ctx.state.role}`)
	ctx.deleteMessage()
});

bot.action('container', (ctx) => {
	const comand = 'ssh -i /home/alex/.ssh/mox root@172.20.0.227 pct list'
	exec( comand, (err, stdout) => {
		if (err) {
			console.log('algo anda mal')
			console.log(stdout)
			ctx.reply('Algo anda mal')
		} else {
			ctx.reply(stdout)
		}
	})
})

const stage = new Scenes.Stage([baseScene, wizardScene]);

bot.use(session());
bot.use(stage.middleware());
bot.action('scene', ctx => {
	ctx.scene.enter('someAction');
})
bot.action('login', ctx => {
	ctx.scene.enter('LoginScene');
})

// RUN BOT
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
