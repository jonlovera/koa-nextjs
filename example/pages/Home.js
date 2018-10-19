import React from "react";
import styled from "styled-components";
import { withSSR } from "koa-nextjs/react";

const Logo = styled.img.attrs({
  src: "/image.png",
  alt: "logo",
})`
  width: 50px;
  height: 50px;
`;

const Home = ({ name, ...props }) => (
  <div {...props}>
    <Logo />
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
