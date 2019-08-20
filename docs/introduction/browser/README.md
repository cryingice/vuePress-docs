# 浏览器部分


## 跨域解决方案

### jsonp

### document.domain + iframe跨域

- 适用于两个网页主域名相同,子域名不同的情况

- iframe标签src引入第二个页面,在连个脚本里面设置相同的document.domain,就可以相互取对方的window属性值

### location.hash  + iframe跨域

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

## js 基础知识

### 堆和栈/队列

- 基本数据类型 和 函数 保存在栈内存里,后进先出

- 引用数据类型保存在堆内存中,不能直接读取,得从栈内存中读取地址,再通过地址去进行读取

- 宏任务和微任务属于队列,当栈内任务执行完成后,会观察有没有微任务队列,如果有则放入执行栈执行,执行后若产生新的微任务则继续执行微任务,微任务执行完成后,才会执行宏任务

	- promise中如果状态变为fulfilled 或者 rejected,则会产生微任务,promise.then()也会产生微任务

	- setimeout会在微任务执行完成后加入一个宏任务

### 进程和线程

- 进程:多个线程组成

	- 多进程间互不影响

- 线程:是个更加接近执行体的概念,可与同进程的其他线程同享资源

	- 有自己独立的序列

	- 有自己的执行栈

	- 没有独立的地址空间

- 电脑系统属于多进程

### 并发和并行

- 并发:同时完成多个任务可以交替进行

	- 记忆:病发 要剃(替)头发

- 并行:同时进行多个任务,不可交替进行

## ajax请求

### 文件内容索引:url转码、post的几种提交数据的方式、toLowerCase()和 toLocalLowerCase()的区别、xhr、setimeout、异步串行

### url转码

- decodeURI

	- 解码

- encodeURI

	- 转码,输出utf-8的格式

- decodeURIComponent

	- 解码

- encodeURIComponent

	- 转码

### post的几种提交数据的方式

- application/x-www-form-urlencoded

	- 原生表单的提交方式

- mutipart/form-data

	- 暂时不知道

- application/json

	- 请求体内容为序列化的内容(JSON.stringify()转换的内容)

	- 特点: 结构复杂的数据内容展示清晰,在各种抓包工具或者浏览器自带工具下能清晰展示数据结构

- text-html

	- 传递html文件

### toLowerCase()和 toLocalLowerCase()的区别

- 有的语言会为unicode大小转换应用特殊规则,必须使用针对地区的方法来保证实现正确的转换,此时只能用toLocalLowerCase转换

### xhr

- open

	- 创建http请求

- setReqestHeader

	- 设置请求头

	- 必须在open调用后,send调用前使用

	- 可设置多次,同名的设置时会追加值

- timeout

	- 超时时间,超过这个时间会触发ontimeout函数

- credentials

	- 是否请求携带cookie

- send([body=null])

	- 发送请求

	- 当方法是get、head请求时,入参会被忽略

- abort()

	- 请求发送后终止请求

- readyState(xhr状态)

	- 0 -- UNSENT  未发送

	- 1 -- OPEND  请求创建后(open 、send之间)

	- 2 -- HEADERS_RECEIVED  接受状态(send之后)

	- 3 -- LOADING  (正在下载数据,在这个过程可以获取响应头状态及状态码)

	- 4 -- DONE 数据下载完成

	- 对应回调函数 onreadystatechange

- 回调函数

	- onreadystatechange

	- onloadstart

		- 当send后触发xhr.onloadstart

		- 上传数据时触发xhr.upload.onloadstart

			- xhr.onloadstart后触发

	- onprogress

		- 上传数据触发xhr.upload.onprogress

		- 下载数据触发xhr.onprogress

		- 50ms触发一次

	- onabort

		- 调用xhr.abort()后触发

	- onerror

		- 当网络异常时触发

			- 当上传数据时就异常,则先触发xhr.upload.onerror,再触发xhr.onerror

			- 如果上传数据已经结束,则只触发xhr.onerror

	- onload

		- 上传数据成功,触发xhr.upload.onload

		- 下载数据成功,触发xhr.onload

	- ontimeout

		- 服务端响应时间超过设置时间后触发

	- onloadend

		- 上传数据结束触发xhr.upload.onloadend

		- 下载数据接触触发xhr.onloadend

	- 执行顺序

		- //调用了open方法  
		  onreadystatechange(),readyState=1  
		  //调用了send方法  
		  onloadstart()  
		  //上传数据过程中的事件回调  
		  upload.onloadstart()//开始上传请求数据  
		  upload.onprogress()//正在上传请求数据  
		  upload.onload()//成功上传请求数据  
		  upload.onloadend()//完成上传请求数据  
		  //下载响应数据过程中的事件回调  
		  onreadystatechange(),readyState=2//已经获取到响应头部和响应状态码  
		  onreadystatechange(),readyState=3//正在下载响应数据，改变状态  
		  onprogress()//正在下载响应数据  
		  onreadystatechange(),readyState=4//响应数据下载完成，改变状态  
		  onload()//成功下载响应数据  
		  onloadend()//完成下载响应数据

- xhr响应

	- xhr.getResponseHeader(string)

		- 获取响应头指定键值的数据

	- xhr.getAllResponseHeader()

		- 获取响应头所有数据

	- xhr.status

		- 响应状态码

	- xhr.statusText

		- 响应文本

	- xhr.responseType = ...

		- 设置响应数据类型,如果服务端返回的数据类型和设置的不同,此时得到的数据就为null

- 状态码

	- 2xx

		- 200 成功

		- 201 请求成功 已创建新资源

		- 202 接受请求,服务器尚未处理

	- 3xx

		- 301 永久移动

			- 对于get head进行的请求时,爬虫爬的是新网址 和 新内容

		- 302 临时移动

			- 爬虫爬的是旧网址 和 新内容

				- url劫持

	- 4xx

		- 400

			- 请求语法错误

		- 401

			- 身份验证

		- 403

			- 服务器拒绝请求(比如权限问题)

		- 404

			- 网页未找到

		- 408

			- 请求服务器超时

	- 5xx

		- 服务器问题

### 请求分类

- 简单请求

	- 请求方法仅限于get post head

	- 请求头字段不超过以下: Content-type、Content-language、Accept-language、Accept四种

	- 用post方式时,Content-type 只能为application/x-www-form-urlencoded、multipart/form-data、text/plain三种

- 非简单请求

	- 预先发一个option请求(预请求)

		- Access-Control-Request-Method:请求所用方法

		- Access-Control-Request-Headers:所携带的自定义请求首部字段(如果content-type的值超出上述三种,则需要附加上content-type这一种

		- 服务器段返回字段

			- Access-Control-Allow-Methods :用来限制方法名

			- Access-Control-Allow-Headers:用来限制请求头首部

			- Access-Control-Allow-Credentials:是否允许携带credential

			- Access-Control-Max-age:预请求的生效时间周期

			- Access-Control-Expose-Headers:服务器段允许的首部集合

### 请求头/响应头

- 请求头

	- accept

		- 客户端希望服务端返回的数据类型

	- Content-type

		- 客户端发送的请求体数据类型

	- Accept-Encoding

		- 告诉服务端返回内容需要进行压缩的方式

		- 配合响应报文中的Content-Encoding使用

	- Accept-Language

		- 指定解析的语言类型

	- Content-Length

		- post的请求体大小

	- Cookie

		- 把服务器先前返给客户端的cookie发送给服务器

	- host

		- 请求发送到的域名以及端口号

	- origin

		- 请求从哪发起

		- 配合后端Access-Control-Allow-Origin使用,用于CORS跨域

		- 请求流程

			- 1.发请求给服务端,服务端返给响应2.浏览器检查是否有Access-Control-Allow-Origin,有的话对比当前域名是否在白名单里面,是的话继续下载东西,不是的话abort(终止请求下载)

	- referer

		- 和origin类似

		- 传入的参数包括url的参数等信息,可能造成信息泄露

		- 作用

			- 可用于访问统计

			- 用于防盗链

	- if-modified-since

		- 配合响应头Last-modified用

		- 用于协商缓存

	- if-none-match

		- 配合etag用

		- 用于协商缓存

	- user-Agent

		- 用来识别客户端类型

	- cache-Control

		- 用来控制缓存

			- public

				- 客户端和代理都可以缓存

			- private

				- 仅客户端可以缓存

			- no-cache

				- 需要于服务端用etag确认资源是否被更改,没有则命中缓存

			- no-store

				- 禁止缓存

			- max-age

				- 缓存有效期

- 响应头

	- cache-Control

		- 缓存机制,参照请求头cache-Control

		- 优先级比expires高

	- content-Encoding

		- 返回内容的压缩类型

	- content-language

		- 响应体语言

	- content-length		

		- 响应体文本大小

	- content-type

		- 返回内容的类型

	- Date

		- 服务器端日期

	- etag

		- 文件实体标签

	- expires	

		- 过期时间

		- 请求头没有 expires字段

		- 浏览器命中缓存前会辨识该字段值是否过期

	- last-modified

		- 资源最后修改日期

	- refresh	

		- 重定向新网址

	- server

		- 服务器类型

	- set-cookie	

		- 让客户端设置cookie

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

## history 和 hash 路由的区别

### hash

- 利用hash操作"#'后面内容不会造成向服务器请求重新加载新页面,可通过onHashChange来监听链接改变

### history

- 利用h5新增pushState 和 replaceState两个api来实现修改url记录栈,当利用浏览器的back、forward、go时不会向后端发起请求,可通过popState来监听url的改变

- history模式下对于无静态资源的链接需要后端配合返回一个index.html页面

## 手写代码

### ajax

- 1.新建函数

- 2.判断请求是jsonp还是非jsonp

- 3.如果为非jsonp,进一步判断是get 还是post请求

- 4.格式化入参

- 5.判断XMLHttpRequest的兼容性	

	- ie6之前

		- xhr = new ActiveXObject('Microsoft.XMLHTTp')

	- 其他浏览器

		- xhr = new XMLHTTPRequest()

- 6.书写回调过程函数

	- onload回调函数里面写详细判断

	- onerror

		- 请求过程发生意外

			- 比如:请求没发出去 、时间超时、终止请求

- 7.get 请求把形式化的数据坠到url链接后面

- 8.post请求设置Content-Type,不同的type对应不同的data形式

### jsonp请求

- 1.创建一个script标签

- 2.给标签src赋值

- 3.script坠到document.body标签后面

- 4.设置一个超时定时器

