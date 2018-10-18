import React from "react";

import { withSSR } from "../src/hola";

// class Page extends React.Component {
//   render() {
//     return (
//       <div {...this.props}>
//         <h1>Hello</h1>
//         <p>
//           Name: <span>{this.props.name}</span>
//         </p>
//       </div>
//     );
//   }
// }

const Page = ({ name, ...props }) => (
  <div {...props}>
    <h1>Hello</h1>
    <p>
      Name: <span>{name}</span>
    </p>
  </div>
);

export default withSSR()(Page);
