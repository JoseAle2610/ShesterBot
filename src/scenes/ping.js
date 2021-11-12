const { Markup, Scenes } = require("telegraf");
const { BaseScene } = Scenes;

module.exports = new BaseScene("ping")
  .enter((ctx) =>
    ctx.reply("Ping")
  )
  .command("main", (ctx) => ctx.scene.enter("main"))
  .use((ctx) => ctx.scene.reenter());
