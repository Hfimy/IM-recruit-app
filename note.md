### 开发笔记

开发原则：尽可能轻的从 javascript 逐步迁移至 typescript 编写，采用渐进增强的方式，学会思考 typescript 编写方式的不同以及带来的优势？为什么要使用 typescript 开发？哪里真正需要静态类型？解决的痛点是什么？

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

根据 react-redux 的[github issue](https://github.com/reactjs/react-redux/issues/356)，猜测可能是因为热更新导致多次执行了 createStore，因此将热更新代码置于`Provider`组件下，可解决此问题

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

查看[github issue](https://github.com/ant-design/ant-design-mobile/issues/636)，目前此版本依然没有好的解决办法，手动查找该文件删除 react-native 的引用或者安装 react-native

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

19、一个项目，只要在需要用到 redux 的情况下才知道如何更好的去用，但是可以预先搭好框架，不影响
