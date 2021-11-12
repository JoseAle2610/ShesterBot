const { Markup, Scenes } = require("telegraf");
const { BaseScene } = Scenes;

module.exports = new BaseScene("backups")
  .enter((ctx) =>
    ctx.reply("Send contact\n\n/main - main scene")
  )
  .command("main", (ctx) => ctx.scene.enter("main"))
  .use((ctx) => ctx.scene.reenter());
