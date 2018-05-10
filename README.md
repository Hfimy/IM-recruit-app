### **一款类 Boss 直聘的移动端 SPA 单页应用**

#### 技术栈 ：

* 前端：Typescript + React16 + Redux + React-Router4 + Antd-mobile
* 后端：ES6 + Express + Mongodb + Socket.io

#### 更新，尝试添加生产模式的服务端渲染

* 安装`babel-cli`，通过 babel-node 使 node 环境支持 import、jsx 等前端语法。使用 babel-node 替代 node 执行，注：babel-preset-react-app 需要指定 NODE_ENV

```
 "server": "set NODE_ENV=test&&nodemon --exec babel-node server/bin/www"
```

* 更新`.babelrc`配置文件，将`package.json`内的 babel 配置 抽离至`.babelrc` 文件

**因客户端使用 typescript 开发，暂时无法实现，下面是参考步骤**

* 客户端代码改造，将可复用的代码抽离成后端可引入的 App 入口组件

* 服务端代码改造，注意要保证服务端和浏览器端渲染的结果要一摸一样

  * 服务端重新生成 store
  * BrowserRouter 使用 StaticRouter 取代,传入 location 和 context 两个参数

* 设置 css 和图片的 hook

```
cnpm i css-modules-require-hook
cnpm i asset-require-hook
```

* 使用 renderToString 将 jsx 渲染成 html，拼接模板，引入打包后的 css 和 js 文件，此处可以使用模板引擎如 ejs，或者直接用字符串拼接也可以。

  * 思考图片、字体等静态文件最适合放置的目录位置，src 内部还是外部？放在 src 外部的 public 目录似乎是不会被打包的。将图片移至 src 内部
  * 思考拼接模板时是否要添加 manifest 和 shortcut icon 的 link 标签？需要加上。

* 使用 React16 提供的`renderToNodeStream`流模式替换`renderToString`，比之前提高约三倍性能

#### 初期开发笔记
