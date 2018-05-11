### 一款类 Boss 直聘的移动端 SPA 单页应用 （仅供学习参考使用）

#### 技术栈 ：

* 前端：Typescript + React + Redux + React-Router4 + Antd-mobile
  * redux-thunk
  * axios
  * rmc-pull-to-refresh , 滑动加载组件
  * styled-components , 少量尝试使用 css in js，主要还是使用 less
  * rc-queue-anim , Ant Motion 提供的进出场动画，因影响原有组件，已注释
  * ...
* 后端：Express + Mongodb + Socket.io

#### 预览

* 登录注册页

  ![auth.gif](https://github.com/Hfimy/IM-recruit-app/blob/master/public/auth.gif)

* 主页 + 聊天页

  ![dashboard.gif](https://github.com/Hfimy/IM-recruit-app/blob/master/public/dashboard.gif)

  ![chat.gif](https://github.com/Hfimy/IM-recruit-app/blob/master/public/chat.gif)

<br/>
<br/>

#### 下载运行

_请在 chrome 浏览器运行查看 , firefox 以及 ie 会出现部分样式崩塌_

下载：

```
git clone https://github.com/Hfimy/IM-recruit-app.git

cd IM-recruit-app

cnpm i // 使用yarn可能有些ts的包安装失败
```

开发环境：

* 前端
  ```
  npm start
  ```
* 后端

  首先需要安装 mongodb，shell 操作可参考[mongodb 入门及基本 shell 操作](https://www.jianshu.com/p/c6ba397fefde)

  ```
  npm run server
  ```

产品环境：

```
npm run build
npm run server  // 现在可以直接通过服务器访问，无需再运行开发版
npm run server:ssr // ssr版，目前运行出错，代码仅供参考
```

#### 生产模式实现服务端渲染的大致思路 ( 开发模式 ssr 未实现 )

* 安装`babel-cli`，通过 babel-node 使 node 环境支持 import、jsx 等前端语法。使用 babel-node 替代 node 执行，注：babel-preset-react-app 需要指定 NODE_ENV

```
 "server": "set NODE_ENV=test&&nodemon --exec babel-node server/bin/www"
```

* 更新`.babelrc`配置文件，将`package.json`内的 babel 配置 抽离至`.babelrc` 文件

* **因客户端使用 typescript 开发，编译 js 后仍有错误 ，下面是参考步骤**

  * 客户端代码改造，将可复用的代码抽离成后端可引入的 App 入口组件

  * 服务端代码改造，注意要保证服务端和浏览器端渲染的结果要一摸一样

    * 注意运行 tsc 编译 ts 代码时，需要去掉`tsconfig.json`里 compilerOption 的 outDir 和 sourceMap 字段，否则没有输出

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

### 初期开发笔记

开发原则：尽可能轻的从 javascript 逐步迁移至 typescript 编写，采用渐进增强的方式，学会思考 typescript 编写方式的不同以及带来的优势？为什么要使用 typescript 开发？为什么需要静态类型?

1、 初始化

```
creat-react-app bosszhipin --scripts-version=react-scripts-ts
```

2、 弹射 create-react-app 配置

```
npm run eject
```

3、 添加开发模式模块热替换：
react-hot-loader

4、 在 tsconfig.json 里配置模块别名

5、 添加响应式：react-responsive

6、ts 中使用 import 引入图片报错

```
import logo from './logo.jpg
```

需改为 require 引入

```
const logo = require('./logo.jpg')
```

7、ts 中引入 babel-plugin-react-html-attrs 插件无效

8、修改 tsconfig.json 里的 compilerOptions 选项，去掉一些较严格的配置，如`"noImplicitAny": true`等， 允许 any 类型通过编译，同时修改`tslint.json`文件

```
  "no-any": false,
```

9、使用 react-redux 的 connect 连接 class 形式的组件时编译报错

```
Argument of type 'typeof Login' is not assignable to parameter of type 'ComponentType<{ user: any; msg: any; } & { onloginSuccess: () => LoginSuccess; onloginFail: () =>...'.
```

解决方法：在 connect 中传入 mergeProps 函数

```
const mergeProps = (
  stateProps: object,
  dispatchProps: object,
  ownProps: object
) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Login);
```

10、尝试使用@connect 装饰器语法编译报错，查看[github issures](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/9951)，暂时使用

```
@(connect(mapStateToProps,mapDispatchToProps) as any)
```

修改`tsconfig.json`，添加装饰器支持

```
    "experimentalDecorators": true,
```

可通过编译

11、参考[react-redux-typescript-guide](https://github.com/piotrwitek/react-redux-typescript-guide)，逐步规范代码

12、引入 less、less-loader,更新 webpack 配置

13、报错

```
<Provider> does not support changing `store` on the fly.It is most likely that you see this error because you updated to Redux 2.x and React Redux 2.x which no longer hot reload reducers automatically.
```

根据 react-redux 的[github issues](https://github.com/reactjs/react-redux/issues/356)，猜测可能是因为热更新导致多次执行了 createStore，因此将热更新代码置于`Provider`组件下，可解决此问题

14、思考何时引入 redux，什么场景下需要用到 redux，如何非破坏式的从现有目录结构和代码集成 redux? 尝试先只使用 react 实现，在遇到痛点时使用 redux 重构，而不是一开始就上 redux

15、引入 antd-mobile，引入 babel-plugin-import

* 引入 antd-mobile 组件报错，因为 antd-mobile 的声明文件中 React 都是默认导入的，所以编译不过，修改`tsconfig.json`

```
    "allowSyntheticDefaultImports": true // 允许从没有设置默认导出的模块中默认导入。这并不影响代码的显示，仅为了类型检查
```

修改后报错：

```
 ../node_modules/antd-mobile/lib/modal/PropsType.d.ts
(3,38): Cannot find module 'react-native'.
```

查看[github issues](https://github.com/ant-design/ant-design-mobile/issues/636)，目前此版本依然没有好的解决办法，手动查找该文件删除 react-native 的引用或者安装 react-native

* babel-plugin-import 按需加载样式无效，目前在 git issues 没有找到准确的原因，暂通过在主文件引入所有样式开发

<!-- 16、使用prettier格式化代码后，typescript报错
```
Unnecessary semicolon // 不必要的分号
```
禁用prettier插件，同时修改tslint.json文件
```
    "semicolon": [
      false
    ],
``` -->

<!-- 17、修改 tslint.json 文件,项目中整体采用单引号

```
    "quotemark": [
      true,
      "single",
      "jsx-single"
    ],
``` -->

16、启用 prettier

17、添加开发时的代理功能，更新 package.json，添加

```
"proxy":"http://localhost:3002"
```

18、添加 axios 拦截器

19、引入 redux-thunk

20、尝试使用 styled components

21、...

<br/>

#### 中后期开发笔记

sorry，未记录，相信开发中的绝大部分问题都可以通过 google、stackoverflow、git issues 等解决。学习愉快，😂
