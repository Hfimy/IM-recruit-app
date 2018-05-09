const express = require('express');
const middlewares = require('./middlewares');
const routes = require('./routes');

import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
function App() {
  return <div>server react componet</div>;
}
console.log(renderToString(<App />));
console.log(renderToStaticMarkup(<App />));

const app = express();

middlewares(app);
routes(app);

module.exports = app;
