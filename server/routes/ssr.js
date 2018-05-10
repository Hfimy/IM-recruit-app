import path from 'path';
import assetManifest from '../../build/asset-manifest.json';

import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { configureStore } from '../../src/store';
import AppCommon from '../../src/AppCommon';

const store = configureStore();
let context = {};

const appHtml = ReactDOMServer.renderToString(
  <Provider store={store}>
    <StaticRouter location={req.url} context={context}>
      <AppCommon />
    </StaticRouter>
  </Provider>
);

export default function handleServerRender(req, res) {
  // 注意此处的PUBLIC_URL变量，为前端打包时的publicPath，此处即homepage的值
  res.render('index', {
    title: 'Bosszhipin',
    PUBLIC_URL: '/public/',
    appHtml,
    assetManifest
  });
}
