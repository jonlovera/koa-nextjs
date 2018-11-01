const assert = require("assert");
const Koa = require("koa");
const request = require("supertest");

const render = require("./server");

it("fails with wrong first argument", async () => {
  expect.assertions(3);
  try {
    await render(1);
  } catch (e) {
    expect(e).toBeInstanceOf(assert.AssertionError);
  }
  try {
    await render();
  } catch (e) {
    expect(e).toBeInstanceOf(assert.AssertionError);
  }
  try {
    await render({});
  } catch (e) {
    expect(e).toBeInstanceOf(assert.AssertionError);
  }
});

it("successfully starts a Koa app", async () => {
  const app = new Koa();
  await render(app);

  app.use(async ctx => {
    if (ctx.path === "/home") {
      const html = await ctx.render({
        page: "Page",
      });
      expect(ctx.body).toEqual(html);
      expect(ctx.body).toContain("<!DOCTYPE html>");
    } else if (ctx.path === "/account") {
      const html = await ctx.render({
        page: "Page",
        props: {
          name: "John Appleseed",
        },
      });
      expect(ctx.body).toEqual(html);
      expect(ctx.body).toContain("<!DOCTYPE html>");
      expect(ctx.body).toContain(`<p>Name: <span>John Appleseed</span></p>`);
    }
  });

  const listener = app.listen();

  let res = await request(listener)
    .get("/home")
    .expect("Content-Type", /html/)
    .expect(200);
  expect(res.text).toContain("<!DOCTYPE html>");

  res = await request(listener)
    .get("/account")
    .expect("Content-Type", /html/)
    .expect(200);
  expect(res.text).toContain("<!DOCTYPE html>");
  expect(res.text).toContain(`<p>Name: <span>John Appleseed</span></p>`);

  listener.close();
});

it("successfully starts a Koa app even if it's not async starting", async () => {
  expect.assertions(3);

  const app = new Koa();
  render(app); // unhandled promise

  app.use(async ctx => {
    const html = await ctx.render({
      page: "Page",
    });
    expect(html).toBeNull();
    expect(ctx.body).toEqual(
      "Preparing to render Page... refresh this page in a few seconds.",
    );
  });

  const listener = app.listen();

  const { text } = await request(listener)
    .get("/")
    .expect("Content-Type", /plain/)
    .expect(200);
  expect(text).toEqual(
    "Preparing to render Page... refresh this page in a few seconds.",
  );

  listener.close();
});
