import { Telegraf } from 'telegraf'

export default class Telegram {

	static bot = new Telegraf(process.env.TOKEN)
	static started = false

	constructor () {}

	// static getInstance() {
	// 	if (this.bot == null){
	// 		const bot = new Telegraf(process.env.TOKEN)
			
	// 	}
	// 	return this.bot
	// }

	static async startBot () {
		if (this.started == false){
			this.bot.start((ctx) => {
			    ctx.reply('Bot started...')
			    console.log('Bot started...')
			})
			this.bot.command('hola', (ctx) => {
			  ctx.reply('Backups...')
			  console.log('baskups...')
			})
			await this.bot.launch()
			console.log('bot started')
			this.started = true
		} else {
			console.log('bot is already started')
		}
		return this.started
	}

	static async stopBot () {
		await this.bot.stop('Stop bot')
		this.started = false
	}
}