// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Telegram from 'lib/telegram'

export default function handler(req, res) {
  console.log('hola desde api route')
  const started = Telegram.startBot();
  res.status(200).json({ name: 'John Doe' })
}
