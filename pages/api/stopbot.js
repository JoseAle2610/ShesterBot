import Telegram from 'lib/telegram'

export default function handler(req, res) {
  console.log('stopping Bot')
  const started = Telegram.stopBot();
  res.status(200).json({ name: 'John Doe' })
}
