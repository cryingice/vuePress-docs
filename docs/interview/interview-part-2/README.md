# 面试题整理二


## 引用型数据连等赋值

### var a = {n: 1};  
  var b = a;  
  a.x = a = {n: 2};

### 解析步骤:

- 1. a.x中的.优先级比较高,先找到{n:1}中的x值,没有就赋值为undefined标记一下

- 2.等待第一个等号后面返回值

- 3.a 储存的指针改变,变为新的{n:2},返回第二个等号后面的{n:2}的对应地址

- 4.将地址赋值给a.x替换掉undefined

## 几种模块化引入方式

### [1.common.js](1.common.js)

- require引入的是模块运行后返回的全局对象,然后在赋值给具体的属性名或方法名(运行式加载)

- 一旦输出值后,模块后面内部变化将不会影响这个输出值

### 2.es6 moudule

- 在编译过程中获取文件指定的输出代码,不需要运行获取(编译式加载)

- import引入必须放在文件最前面

- import引入的是一个接口

- es6源码解析后还是转换为require的形式

- import需要重命名是用as来替换

- export default A 本质是 将 A赋值给default

- 对于输出文件都是export输出,在引入文件可用import * as newName from '../a.js'

	- 返回一个对象,对象包括文件export 、export default两种定义的变量

		- export default定义的变量key值为default

		- export 定义变量key值为变量名称

### 3.Amd (require.js)

- 异步加载模块

- define定义一个模块

	- define(id,[depends],function(moduleName1,moduleName2){})

- require加载一个模块

	- require(module,fn)

### 4.Cmd(sea.js)

- 同步加载模块,需要啥引入啥

- define定义模块

	- define(function(require,exports,module){})

- sea.use加载模块

	- sea.use([module],fn)

## localStorage

### 只能存字符串

### 如果储存对象,会调用toString方法将其转换

- 所以一般对象、数组会在在存入前调用JSON.stringfy()转换为json

- 取出对象用localStorage.getItem(key)

- 取出后利用JSON.parse(jsonStr)转成对象

- JSON.stringify()在转成json字符串的时候会忽略undefined、symbol、函数

	- 例子:1)let newObj = {a:1,b:undefined,c:null,d:{c:44,g:{a:1},dd:undefined,ee:Symbol('77')},g:Symbol('sd'),fn:function(){}}

	- 2)JSON.stringify(newObj) -> "{"a":1,"c":null,"d":{"c":44,"g":{"a":1}}}"

### localStorage声明周期永久,除非用户手动删除

### 于sessionStorage的区别

- sessionStorage声明周期仅在tab窗口存在时间,localStorage则是永久

- 前者不支持tab窗口共享数据,后者支持

## token

### ajax传递token的作用

- 1)防止表单提交重复,比对服务器session中的token 和 用户请求携带的token,如果相同服务器更新token返给客户端,客户端没接收到响应数据过程中,再次提交表单,明显就不一致了,服务器忽略此次请求

- 防止跨站请求伪造

	- 跨站请求的话发送的token和服务器session存的不一样

### 请求头设置token

- xhr.setRequestHeader('token',token)

### 储存token

- 在返回数据成功后window.sessionStorage.setItem('token',data['token'])

## 事件捕获和冒泡

### w3c标准规定先捕获后冒泡

### 只能阻止继续冒泡,捕获过程不阻止

- e.stopPropagation()

### addEventListener函数第三个参数是boolean

- 默认useCapture为false,默认为接受冒泡事件,拒绝捕获事件

### 第三个参数为options时,为一个对象

- 新版本浏览器采用这个变更

- 使用前需要用能力检测一下,能使用options不

	- var canPassive = false;  
	  try{  
	  	var options = Object.defineProperty({},'passive',{  
	  		get(){  
	  		canPassive = true;  
	  		}  
	  	})  
	  	window.addEventListener(null,function(){},options)  
	  }catch(err){  
	    
	  }

- options对象

	- capture

		- true:捕获阶段传到target时触发监听函数  
		  false:冒泡阶段....

	- passive

		- 监听函数永远不会调用preventDefault(),如果调用,浏览器给出警告并忽略它

	- once	

		- 注册之后调用一次后自行移除

## flex布局

### flex: flex-grow flex-shrink flex-basis

- flex-grow:当子元素加起来的空间<父元素空间时,按比例分配多余空间,若不设置时默认为0

- flex-shrink:不设置时默认为1

- flex-shirink:当子元素加起来的空间>父元素空间时,当前元素空间contentA:   
  父元素宽度 F;  
  计算总宽T = widthA * shirinkA +widthB * shirinkB;  
  多出宽度 D = T-F;  
  B = widthA * shirinkA / T  
  contentA = widthA - B * D

	- 一句话: 去除多出空间所占的比例,比例权重为felx-shirink 乘以 元素宽度 的比重

- flex:auto ->flex: 1 1 auto;

- flex:none -> flex:0 0 auto;

- flex:2 ->flex : 2 1 0%;

	- 第一个无单位数 作为flex-grow,第二个无单位数作为flex-shirink,第二个若为百分比或者px、em怎么为flex-basis

- flex:0 auto/flex: initial -> flex: 0 1 auto;

- 计算盒子的依据宽度(高度)优先顺序: flex-basis > width > auto ,如果flex-basis 和 width 都没有,那么默认为0

## history 和 hash 路由的区别

### hash

- 利用hash操作"#'后面内容不会造成向服务器请求重新加载新页面,可通过onHashChange来监听链接改变

### history

- 利用h5新增pushState 和 replaceState两个api来实现修改url记录栈,当利用浏览器的back、forward、go时不会向后端发起请求,可通过popState来监听url的改变

- history模式下对于无静态资源的链接需要后端配合返回一个index.html页面

