// 设置css和图片的hook
import csshook from 'css-modules-require-hook/preset'; // import hook before routes
import assethook from 'asset-require-hook';
assethook({
  extensions: ['jpg', 'jpeg', 'png']
});

import MediaQuery from 'react-responsive';
import { renderToString, renderToNodeStream } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import AppCommon from '../../src/AppCommon';
import { configureStore } from '../../src/store';

import path from 'path';
import assetManifest from '../../build/asset-manifest.json';

export default function handleServerRender(req, res) {
  // 核心逻辑，因客户端是由typescript写的，所以目前无法直接执行,报错，  此处只是实现大致思路
  const store = configureStore();
  let context = {};
  // 同构应该保证服务器端和浏览器端渲染的结果要一摸一样
  // 每个用户请求都应该生成新的store,使用StaticRouter替换BrowserRouter
  const App = () => (
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <AppCommon />
      </StaticRouter>
    </Provider>
  );
  const Pc = () => <p>抱歉，本应用不支持PC端访问，请切换移动端浏览</p>;

  const RootComponent = [
    <MediaQuery key="mb" maxDeviceWidth={750} component={App} />,
    <MediaQuery key="pc" minDeviceWidth={751} component={Pc} />
  ];

  // 使用ejs模板渲染
  // const rootHtml = ReactDOMServer.renderToString(<RootComponent />);
  // // 注意此处的PUBLIC_URL变量，为前端打包时的publicPath，此处即homepage的值
  // res.render('index', {
  //   title: 'Bosszhipin',
  //   PUBLIC_URL: '/public/',
  //   rootHtml,
  //   assetManifest
  // });

  // 下面使用新的renderToNodeStream替换renderToString

  const PUBLIC_URL = '/public/';
  const title = 'Bosszhipin';

  res.write(`
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="${PUBLIC_URL}/manifest.json">
    <link rel="shortcut icon" href="${PUBLIC_URL}/favicon.ico">
    <title>
       ${title}
    </title>
    <link rel="stylesheet" href="${PUBLIC_URL}${assetManifest['main.css']}">
  </head>

  <body>
    <noscript>
        You need to enable JavaScript to run this app.
    </noscript>
    <div id="root">
  `);
  const markupStream = renderToNodeStream(<RootComponent />);
  markupStream.pipe(res, { end: false });
  markupStream.on('end', () => {
    res.write(`
    </div>
    <script type="text/javascript" src="<%= PUBLIC_URL + assetManifest['main.js'] %>"></script> 

  </body>
  </html>
    `);
    res.end();
  });
}
