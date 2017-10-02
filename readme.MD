## react-redux组件脚手架

#### 使用方法：
+ 全局安装脚手架命令
```
$npm i ant-redux -g
```
+ 创建项目: 在当前目录下新增一个react-redux项目，新增后即可查看页面效果，改改代码就能生成一个页面
```
$ant-redux init
$#输入项目目录xxx
```

+ 新增模板: 在创建的项目内可以新增组件（会刷新原来的mock数据，请注意保存）
```
$cd xxx
$ant-redux add
```

+ 运行项目
```
$cd xxx
$npm i
$npm start
# 浏览器会自动打开页面
```

+ 编写项目
  - 组件编写：组件位于composite文件夹下，结构清晰，注释完整，易于开发维护。
  - mock数据：直接编写mock文件夹下index.js文件即可，编写完直接刷新页面生效。
  - 事件编写：已封装promise与thunk中间件，事件触发器位于action文件夹下，事件句柄位于handle文件夹下，事件系统与redux一模一样。
  - 如有改善与意见建议，或者有问题，欢迎联系作者@antgod，提交issue或者微信留言均可。

#### 模式
+ 状态组件
https://codepen.io/kunukn/pen/AXgVGx
+ 高阶组件
http://www.jianshu.com/p/4780d82e874a