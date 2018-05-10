const express = require('express');
const path = require('path');
const middlewares = require('./middlewares');
const routes = require('./routes');

// import React from 'react';
// import { renderToString, renderToStaticMarkup } from 'react-dom/server';
// function App() {
//   return <div>server react componet</div>;
// }
// console.log(renderToString(<App />));
// console.log(renderToStaticMarkup(<App />));

const app = express();

// 设置ejs为模板引擎
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

middlewares(app);
routes(app);

module.exports = app;
