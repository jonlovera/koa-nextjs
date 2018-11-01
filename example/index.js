const path = require("path");
const Koa = require("koa");
const Router = require("koa-router");
const logger = require("koa-logger");
const statics = require("koa-static");
const setupSSR = require("koa-nextjs");

async function main() {
  const app = new Koa();

  // Setup React engine (this is async)
  await setupSSR(app);

  app.use(logger());
  app.use(statics(path.join(__dirname, "public")));

  const router = new Router();

  router.get("/", async ctx => {
    // Fetch data from database or external sources
    await ctx.render({
      page: "Home",
      props: {
        name: "John Appleseed",
        // data: ...,
      },
    });
  });

  router.get("/about", async ctx => {
    await ctx.render({
      page: "About",
      props: {},
      options: {
        staticMarkup: true, // Send as plain HTML for better performance
      },
    });
  });

  app.use(router.routes());

  app.listen(process.env.PORT || 3000);
}

main().catch(err => {
  console.error(err); // eslint-disable-line no-console
  process.exit(1);
});
