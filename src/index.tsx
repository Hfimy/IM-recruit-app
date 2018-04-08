import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

const Pc = () => <p>抱歉，本应用不支持PC端访问，请切换移动端浏览</p>;

ReactDOM.render(
  [
    <MediaQuery key="mb" maxDeviceWidth={750} component={App} />,
    <MediaQuery key="pc" minDeviceWidth={751} component={Pc} />
  ],
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
