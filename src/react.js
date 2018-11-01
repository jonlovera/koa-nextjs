Object.defineProperty(exports, "__esModule", {
  value: true,
});

/**
 * This is custom made to abstract the required SSR extensions of the page component
 */
function withSSR() {
  return function adapter(PageComponent) {
    // eslint-disable-next-line no-param-reassign
    PageComponent.getInitialProps = function getInitialProps(args) {
      return args.query;
    };
    return PageComponent;
  };
}

exports.withSSR = withSSR;
