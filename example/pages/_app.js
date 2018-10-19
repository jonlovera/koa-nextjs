import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #ffffff;
    margin: 0;
    padding: 0;
  }
`;

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <meta charSet="utf-8" />
          <title>koa-nextjs</title>
        </Head>
        <ThemeProvider theme={{}}>
          <React.Fragment>
            <GlobalStyle />
            <Component {...pageProps} />
          </React.Fragment>
        </ThemeProvider>
      </Container>
    );
  }
}
