# koa-nextjs

The main goal of this project is to allow developers to write user interfaces using React and serve them with server-side rendering (SSR) and then re-hydrate it in the browser.

Also enables hot-module replacement (HMR) because it uses Next.js under the scenes. It's possible to have full control over the Next.js settings.

## Installation

Install this module and its peer-dependencies with:

```sh
yarn add koa-nextjs koa koa-router next react react-dom
```

## Usage

```js
const Koa = require("koa");
const setupSSR = require("koa-nextjs");

const app = new Koa();

// This is an async task. You can:
//   1. Wrap everything in a async function like the example below.
//   2. Just execute `setupSSR(app)` as an unhandled promise.
//      It will provide a temporal `ctx.render` function.
await setupSSR(app);

app.use(async ctx => {
  await ctx.render({
    page: "main/Home", // path for a React component in `/pages/main/Home.js`
    props: {
      // only plain (serializable) JS primitives or objects.
      user: { name: "" },
    },
    options: {
      // custom Next.js options
    },
  })
})
```

## Example

See [`/example`](./example) for a complete example with [styled-components](https://github.com/styled-components/styled-components):

```js
// Server-side code
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
```

```js
// Client-side code
import React from "react";
import { withSSR } from "koa-nextjs/react";

const Home = ({ name, ...props }) => (
  <div {...props}>
    <h1>Hello</h1>
    <p>
      Name: <span>{name}</span>
    </p>
    <p>
      <a href="/about">Go to about</a>
    </p>
  </div>
);

export default withSSR()(Home);
```

## Gotchas

- Hot reloading will not work for server-side files. Use [nodemon](https://github.com/remy/nodemon) and make sure to **only watch server files**.

- Do not use `import Link from "next/link"` neither any pre-fetching option. Stick with old-school anchor navigation: `<a href="/other-route" />`

## License

MIT
