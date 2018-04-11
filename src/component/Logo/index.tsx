import * as React from 'react';
import './style.less';

const logo = require('./logo.jpg');

// export default () => (
//   <div className="logo-container">
//     <img src={logo} alt="logo" />
//     <h2>互联网招聘神器</h2>
//   </div>
// );

// export const Logo: React.SFC = () => (
//   <div className="logo-container">
//     <img src={logo} alt="logo" />
//     <h2>互联网招聘神器</h2>
//   </div>
// );

export default function Logo() {
  return (
    <div className="logo-container">
      <img src={logo} alt="logo" />
      <h2>互联网招聘神器</h2>
    </div>
  );
}
