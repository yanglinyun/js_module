# 产生背景
1. js编写大型应用，为了进行功能封装重用和避免冲突产生和解耦!
## 对象封装仍然可获得内部属性
```
var m = {
 msg:12;
 foo(){return this.msg}
}
可以m.msg修改
```
## 匿名立即执行函数封装（IIFE模式）
```
var Module = (function (){
	var __private= 10；
	var foo = function(){
		return __private;
	}
	return {foo:foo}
})();
Module.foo();
```
## IIFE模式增强引入依赖暴露
使用window暴露
```
(function (window){
	var __private= 10；
	var foo = function(){
		return __private;
	}
	window.module = foo;
})(window);
```
2. 但是拆分文件会带来依赖模糊，难以维护，请求文件过多，故需要一套**模块化规范！**
# CommonJs
1. 每个js文件是一个模块
2. 服务器为同步加载会发生阻塞
3. 浏览器需要编译打包
## 基本语法
### 1.暴露模块
module.exports = value;
exports.xxx = value;
### 2.引入模块
require(自定义模块/本地模块)
## 实现
1. 浏览器端 browserify浏览器打包工具
2. 服务器端 nodejs
## 编写package.json
```
{
	“name“:"必须为小写不能有中文"，
	“version”:"1.0.0"
}
```
当然也可以 npm init自动生成
## 服务器演练
package.json
```
{
  "name": "commonjs",
  "version": "1.0.0",
  "dependencies": {
    "uniq": "^1.0.1"
  }
}
```
app.js
```
let m1 = require("./m1");
let m2 = require("./m2");
m2.foo();
console.log(require('uniq')(m1.arr));
```
m1.js
```
module.exports = {
    msg:"m1",
    foo(){
        console.log(this.msg);
    }
}
//层叠上面
module.exports = {
    msg:"m1层叠",
    foo(){
        console.log(this.msg);
    },
    arr:[4,4,5,32,1]
}
```
m2.js
```
exports.msg = "m2"
exports.foo=function(){
    console.log(this.msg);
}
```
## 浏览器演练
浏览器不认识require语法需要编译打包处理
### 文件目录
1. dist/build 为转换后文件 src为转换源文件
### 构件package.json
```
{
	"name":"browserify_",
	"version":"1.0.0"
}
```
### 建立dist/src目录
### 全局且局部安装browserify
```
npm i browserify -g
npm i browserify --save-dev//局部安装 为开发依赖
```
```
"devDependencies": {//开发依赖
	"browserify": "^17.0.0"
},
"dependencies": {//运行依赖
	"uniq": "^1.0.1"
}
```
### 编译打包
```
browserify src/js/app.js -o dist/js/bundle.js
```
### html文件引入打包好文件
```
<script src="./bundle.js"></script>
```
# AMD【仅用于浏览器】
## AMD起步模拟AMD依赖注入
m1.js
```
(function(w){
    w.m1 = {
        getF(){
            return "m1.js"
        }
    }
})(window)
```
m2.js
```
(function(w,m1){
    w.m2 = function (){
        console.log("m2.js",m1.getF());
    };
})(window,m1)
```
app.js
```
(function (w) {
    w.m2();
})(window)
```
index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
<script src="./js/m1.js"></script>
<script src="./js/m2.js"></script>
<script src="./js/app.js"></script>
</html>
```
结果:m2.js m1.j
## 异步模块定义
## 暴露模块方法
1. 定义无依赖暴露
```
define(fuinction(){
	return {};//暴露
})
```
2. 定义依赖暴露
```
define(['依赖',jquery]，function(依赖,$){
	return {};//暴露
})
```
## 引入模块方法
```
(function(){
	requirejs.config({//配置
		baseUrl:'';//找包的更目录否则从当前main.js位置出发
		paths:{
			模块:"位置"；//由于requirejs会加js所以不能加js
			jquery:'./libs/jquery'
		}
	})
	requirejs(['m2'],function(m2){//使用
        m2.getName();
    })
})
```
## 文件结构
```
js
--libs //第三方库
----requirejs.js
----jquery.js
--modules//自定义模块
----m1.js
----m2.js
--main.js
index.html
```
## 主页面引入
```
<script data-main="js/main.js" src="js/libs/require.js"></script>
```
由于jquery遵循AMD规范所以引入时请使用jquery全小写

# CMD【浏览器端】
## 通用模块定义
1. 异步加载
2. 模块使用时才加载
## 暴露模块方法
定义用AMD语法 暴露用CommonJs语法
```
define(function(require,module,exports){
   //同步引入
	var m1 = require("./m2");
	//异步引入
	require.async('./m1',function(m1){
	
	})
	//组合式暴露模块
	exports.xxx = xxx;
	//暴露模块
	module.exports = {}
})
```
## 引入模块方法
```
define(function(require){
	var m1 = reuqire('./m1');
	m1.fn();
})
```
## 实现库 Sea.js
## 演练
#### 文件路径
```
-js
--libs
---sea.js
--module
---m1.js
---m2.js
---m3.js
---main.js
-index.html
```
m1.js
```
define(function(require,exports,module){
    let name="m1.js";
    module.exports = {
        getName(){
            console.log(name);
        }
    }
})
```
m2.js
```
define(function(require,exports,module){
    let name="m2.js";
    module.exports = {
        getName(){
            console.log(name);
        }
    }
})
```
m3.js
```
define(function(require,exports,module){
    let name="m3.js";
    let m1 = require("./m1");
    require.async("./m2",(m2)=>{
        m2.getName();
    });
    m1.getName();
    module.exports = {
        getName(){
            console.log(name);
        }
    }
})
```
main.js
```
define(function(require,exports,module){
    let m3 = require('./m3');
    console.log(m3.getName())
})
```
index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
<script type="text/javascript" src="./js/libs/sea.js"></script>
<script>
    seajs.use('./js/module/main.js');
</script>
</html>
```
# ES6
## export方法汇总
m1.js
```
import * as m2 from './m2.js';
import m3 from './m3.js';
//分别暴露
export let name = "m1";
export function sayName(){
	console.log(name,m2.name,m3.sayName());
}
```
m2.js
```
//同一暴露
let name = "m2";
function sayName(){
	console.log(name);
}
export{name ,sayName};
```
m3.js
```
export default {
    name: "m3",
    sayName() {
        console.log(this.name);
    }
}
```
app.js
```
import * as m1 from './m1.js';
console.log(m1.sayName());
```
index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
<script src="bundle.js"></script>
</html>
```
## import方法汇总
1. import * as 别名 from ‘’
2. 解构赋值
```
import {a,b} from 'xx.js';
import {a as A} from 'xx.js';
import {default as m} from 'xx.js'//默认暴露 但是必须去别名为default
```
3.只针对于默认暴露的简便方法
```
import m from  'xx.js';
```
## 引入入口文件
```
<script type="module" src="app.js"></script>//此文件写引入模块集合即可
```
## 使用babel转换+browserify打包
1. npm init --yes 连续敲回车
2. npm config set registry https://registry.npm.taobao.org//为了下载速度 换淘宝镜像
3. npm i babel-cli  browserify -g 
4. npm install babel-preset-es2015 --save-dev//开发依赖
5. 转换 npm babel src/js -d dist/js --presets=babel-preset-es2015 
6. 打包 npm browserify dist/js/app.js -o dist/bundle.js
7. 无论是否支持es6都可使用
## npm模块化引入Jquery包
1. npm i jquery 下载
2. import 变量名 from 包名
