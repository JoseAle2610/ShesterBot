const { Scenes, Markup } = require("telegraf");
const { BaseScene } = Scenes;

const mainScene = new BaseScene("main");
const keyboard = Markup.inlineKeyboard([
  [
    Markup.button.callback('Ping', 'ping'),
    Markup.button.callback('Backups', 'backups'),
    Markup.button.callback('Shutdown', 'shutdown')
  ],
  [
    Markup.button.callback('Disk', 'disk'),
    Markup.button.callback('Vms', 'vms')
  ]
]);

mainScene.enter((ctx) =>
  ctx.reply( "Hello", keyboard )
);

mainScene
  .action("ping", (ctx) => ctx.scene.enter("ping"))
  .action("backups", (ctx) => ctx.scene.enter("backups"));

mainScene.use((ctx) => ctx.scene.reenter());

module.exports = mainScene;
