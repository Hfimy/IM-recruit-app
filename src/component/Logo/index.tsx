import * as React from 'react';
import './style.less';

const logo = require('./logo.jpg');

const Logo = () => (
  <div className="logo-container">
    <img src={logo} alt="logo" />
    <h2>互联网招聘神器</h2>
  </div>
);

export default Logo;
