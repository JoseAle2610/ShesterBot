const { Telegraf } = require('telegraf')
const { exec } = require('child_process');

const bot = new Telegraf('1256011563:AAEJUmoZd9bvW4DpwPfQZLYgXALS8b7HB2g')

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.command(['shutdown'], (ctx) => {
  console.log('apagando')
	const comand = 'ssh -i /home/alex/.ssh/mox root@172.20.0.227 /root/apagado.sh';
	// const comand = 'ls -l /home/alex'
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

bot.command(['contenedores'], (ctx) => {
	const comand = 'ssh -i /home/alex/.ssh/mox root@172.20.0.227 pct list'
	exec( comand, (err, stdout) => {
		if (err) {
			console.log('algo anda mal')
		} else {
			console.log(stdout)
			ctx.reply(stdout)
		}
	})
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
