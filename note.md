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

根据 react-redux 的[issue](https://github.com/reactjs/react-redux/issues/356)，猜测可能是执行了多次 createStore
