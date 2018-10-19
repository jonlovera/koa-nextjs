import React from "react";
import { withSSR } from "koa-nextjs/react";

const About = ({ name, ...props }) => (
  <div {...props}>
    <h1>About</h1>
    <p>
      <a href="/">Go to home</a>
    </p>
  </div>
);

export default withSSR()(About);
