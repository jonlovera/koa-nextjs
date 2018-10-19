Object.defineProperty(exports, "__esModule", {
  value: true,
});

/**
 * This is custom made to abstract the required SSR extensions of the screen component
 */
function withSSR() {
  return function adapter(ScreenComponent) {
    // eslint-disable-next-line no-param-reassign
    ScreenComponent.getInitialProps = function getInitialProps(args) {
      return args.query;
    };
    return ScreenComponent;
  };
}

exports.withSSR = withSSR;
