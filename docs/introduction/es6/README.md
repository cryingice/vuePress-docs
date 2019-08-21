# ES6


## aync函数

### 概念:

- aync函数是Gennerator函数的语法糖,能自动执行,返回一个promise对象,可看做是多个异步操作包装成的promise对象,await相当于then方法

### await处理机制

- 如果是普通函数且返回的是基本数据类型或者引用型数据类型,则直接返回该值

- 如果是promise函数则,分两种情况

	- promise函数后面还有then、catch函数

		- 根据then、catch函数内部的情况进行promise封装返回新的promise函数

			- return 一个值: 返回一个状态为resolve状态的promise对象,且对象内部resolve(值)

				- 相当于返回一个Promise: Promise.resolve(值)

			- return 一个promise

				- 等待promise执行完毕返回状态,reject或抛出错误的话await前面的变量值就为undefined,后面不再执行

	- 函数后面没有then、catch等

		- 等待promise执行完毕返回状态,rejec或抛出错误t的话await前面的变量值就为undefined,后面不再执行

### await不能放在普通函数中

### 错误处理机制

- async函数内部抛出错误的话,相当于返回的promise对象变为rejected状态

	- then方法第二个函数和catch方法都能捕获

- 在promise函数内,丢出错误同reject一样,可以被then第二个函数和catch函数捕获

## 箭头函数

### 特殊例子

- 对于这种深层嵌套的函数,this指向第一个包裹的普通函数

### bind

- bind多层嵌套,this同箭头函数

- 不论嵌套多少层,this由第一个bind决定

### setTimeout

- settimeout第一个入参为普通函数则函数内部this指向window,若为箭头函数则指向setimeout定义的上下文环境

## 几种模块化引入方式

### 1.commonjs

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

### 3.AMD (代表:require.js)

- 异步加载模块

- define定义一个模块

	- define(id,[depends],function(moduleName1,moduleName2){})

- require加载一个模块

	- require(module,fn)

### 4.CMD(代表 :sea.js)

- 同步加载模块,需要啥引入啥

- define定义模块

	- define(function(require,exports,module){})

- sea.use加载模块

	- sea.use([module],fn)

## es 9新增的一些方法

### 对象扩展运算符

- 

### 正则命名捕获组

### 支持正则后向查找

- 参考xmind '正则表达式'

## es5模拟es6 class

### 

## 手写promise

### promise函数简单实现

- 1.新建构造函数function Mpromise(fn){}

- 2.添加 status val reason rejectedArr resolveArr五个变量

- 3.定义resolve reject两个函数,函数作用转变status作用,挂载到 resolveArr(rejected)数组里面的函数遍历执行

- 4.运行函数fn(resolve,reject)

- 5.then方法挂载到Mpromise.prototype上

	- 1.返回一个Mpromise实例

	- 2.实例函数内部分为3种情况

		- 1)调用then方法的promise实例内部status为pending状态,则将包裹有then方法的两个参数的function依次传入调用then方法实例的resolveArr rejectedArr数组里面(函数里面:then方法两个参数以promise实例的val值、resolve、reject作为入参)

		- 2)status为reslove状态,则将包裹有resolve  val 的函数执行

		- 3)2)status为rejected状态,则将包裹有reject  val 的函数执行

	- 

		- 步骤2中封装resolve val reject 的函数为同一个,作用为判断val为promise实例对象还是非实例对象

		- 1)promise实例对象,则,val.then(r=>resolve(r),j=>{reject(j)})

		- 2)非promise实例对象,resolve(val)

- 6.all方法直接挂载到Mpromise下面

	- 1.入参为数组,判断是不是数组,不是的话抛出错误

	- 2.返回一个promise实例,实例里面定义 一个计数器count,resultArr

	- 3.遍历promise数组并每个实例调用then方法,因为new promise().then()为异步编程不堵塞,所以所有promise实例内部同时计时

		- 1).,第一个入参里面count++ ,新的值放到resultArr里面,当count ==数组长度时,resolve(reusltArr)

		- 2).第二个入参里面,直接reject(入参值)

- 7.Mpromise.resolve(value)

	- 1.如果入参是原始数,return new Mpromise((r,j)=>r(value))

	- 2.如果入参是promise,返回入参实例对象的resolve的值,return new Mpromise((r,j)=>p1.then(re=>r(re)))

## es 8新增的一些对象操作Api

### Object.values

- Object.values为返回对象的属性值组成的数组

### Object.getOwnpropertyDescriptors()

- Object.getOwnpropertyDescriptors()得到对象属性描述对象,方便对象深层次拷贝

### Object.entries()

- Object.entries为返回对象键值对的组成的数组

## includes(es7)/ indexOf

### 区别

- 1.includes可以判断NaN,返回布尔类型

- 2.当数组里面不写明元素(比如:[1,,3]时默认第二个元素为undefined),此时只有includes能检测undefined

- 3.indexOf 返回一个数字

## 异步串行

### 两种

- for循环 + async函数

	- async函数里面执行for循环,在每次循环环境中获取promise并在前面加上await

		- 记住:let a1 = new Promise()的方式,其实已经执行promise了,只能用 fn = function(){ return new Promise()}的方式

- for of + async循环

	- 两种方式

		- 第一

			- 同for循环,遍历数组为数组即可

		- 第二
		```js
		  [Symbol.iterator]() : {return this;}     
		    next: function () {    
		        return {    
		          next: function () {    
		            //根据构造函数传入的数组顺序生成每次不同的promise    
		    		return{    
		    			value :(promise),    
		    			done:  //数组最后一个元素得到 true    
		    		}    
		          }    
		        };    
		      }

			- 自动构造一个构造函数,在构造函数内部定义Symbol.iterator 方法
		```
- forEach

	- 原生api 不支持

		- 原因: foreach入参为函数,如果要在代码使用await作为暂停符,必须给该入参函数添加异步操作符async,
		  而此时在遍历过程中,因为每次使用元素执行函数时发现函数为异步函数,所以跳过继续,感觉就像多个元素整体同步执行)

	- 重置
	  - 
	  ```js
	  async function asyncForEach(array, callback) {    
	      for (let index = 0; index < array.length; index++) {    
	        await callback(array[index], index, array)    
	      }    
	    }    
	        
	    async function test () {    
	      var nums = await getNumbers()    
	      asyncForEach(nums, async x => {    
	        var res = await multi(x)    
	        console.log(res)    
	      })    
	    }
	   ```
## promise函数概况

### promise概念

- promise是一个新的对象,其内部有三种状态,pending、fulfilled、rejected,三种状态中,后两种为pending转化而来,且相互不可互转

### 报错

- promise内部报错不会影响主进程脚本的执行

### then方法

- 作用:为promise实例添加状态改变时的回调函数

- 返回一个新的promise对象

- 可采用链式写法

- 第一个入参会fulfilled状态对应的回调函数,第二个入参为rejected状态对应的回调函数

### catch方法

- 用于处理promise函数内部运行抛出错误一节rejected

### all方法(重要)

- 概念:将多个promise实例包装成为新的promis实例

- 结果:两种

	- 所有promise实例都是fulfilled状态则返回所有的实例的对应值组成的数组

		- 返回的值得次序是数组顺序

	- 有一个实例rejected或者报错,则返回这个实例的rejected返回的值会错误值

		- 注意:但是其它的promise内部还是会在then第二参数或者catch捕获后执行异步过程

	- 同步代码执行顺序还是按照数组变量声明的次序(非注册的顺序)

### race方法(重要)

- 概念:多个promise实例同时执行,返回一个新的promise实例

- 同步代码执行顺序

	- 同步代码执行顺序还是按照数组变量声明的次序(非注册的顺序)

- 结果:返回最先fulfilled或者rejected的用返回值包装成的新promise实例

	- 注意:但是其它的promise内部还是会在then第二参数或者catch捕获后执行异步过程

### Promise.resolve方法

- 1.方法入参是一个promise对象,原封不动返回实例对象

- 2.入参是一个具有then方法的对象

	- 会将对象包装成一个promise实例,函数内部立即执行入参对象then方法- let thenObj = {
	  then(r,j){    
	    	resolve(333)    
	    	}    
	    }    
	    //原来例子: let p1 = Promise.resolve(thenObj) 转换成 p1 = new Promise((r,j)=>{ thenObj.then(r,j)   }

- 3.入参是一个原始值

	- 包装秤一个promise实例返回,内部直接resolve(原始值)

### Promise.reject方法

- 会将对象包装成一个promise实例,函数内部立即执行reject(原封不动的值,无论原始值,promise,对象)

## Reflect

### 作用

- 1. 将Object对象中明显属于语言内的方法放到Reflect上

- 2. 修改Object一些方法的结果,使其更加合理.

- 3. 让Object操作变为函数行为

- 4. Reflect 和 Proxy 组合使用

### 方法

- 1. Reflect.apply(target,thisArg,args)

	- 等同于 target.apply(thisArg,args)

- 2. Reflect.construct(target,args)

	- 等同于 new target([a,b,c])

- 3. Reflect.get(target, name, receiver)

	- 作用

		- 查找并返回target对象的name属性

	- 实例情况

		- name属性为读取函数(getter)

			- receiver != undefined  
			  	

				- 将getter函数中的this绑定为receiver

			- receiver == undefined

				- 将getter函数中的this绑定target

		- name属性不为读取函数(getter)

			- 等同于target.name

- 4. Reflect.set(target,name,value,receiver)

	- 作用

		- 设置target对象的name属性等于value

	- 实例情况

		- 大致同Reflect.get(target,name,receiver),区别在于是针对赋值函数(setter)

	- 可配合Proxy使用

		- 代码示例

			- ```js  
			  let p = {  
			    a: 'a'  
			  };  
			    
			  let handler = {  
			    set(target, key, value, receiver) {  
			      console.log('set');  
			      Reflect.set(target, key, value, receiver)  
			    },  
			    defineProperty(target, key, attribute) {  
			      console.log(target,key,attribute,'defineProperty');  
			      Reflect.defineProperty(target, key, attribute);  
			    }  
			  };  
			    
			  let obj = new Proxy(p, handler);  
			  obj.a = 'A';  
			  // set  
			  //{a: "a"} "a" {value: "A"} "defineProperty"   
			  ```

		- 分析

			- obj.a = ‘A’ -> Proxy.set(即handler.set) -> Reflect.set(target,key,value,receiver) (其中:receiver即为obj) ->Proxy.defineProperty拦截 ->调用Reflect.defineProperty

- 5. Reflect.has(obj,name)

	- 作用

		- 等同于 name in obj

	- 注意点

		- 无论是Reflect.has(obj,name) 还是 in ,都会到对象的原型链上查找是否有满足条件的name

- 6. Reflect.deleteProperty(obj,name)

	- 作用

		- 等同于 delete obj[name]

	- 返回值

		- 布尔类型

		- true

			- 删除成功/删除的属性不存在

		- false

			- 删除失败/删除的属性依然存在(比如 Object.freeze(obj)的obj上的已有属性)

- 7. Reflect.getPrototypeOf(obj)

	- 作用

		- 等同于Object.getPrototypeOf(obj)

	- 与Object.getPrototypeOf()的区别

		- Reflect的方法入参必须是对象,否则报错

		- Object的方法入参会隐式将非对象数据转为对象再进行处理

- 8. Reflect.setPrototypeOf(obj,newProto)

	- 作用

		- 等同于Object.setPrototypeOf(obj,newProto)

	- 返回值

		- 设置成功返回true,失败返回false(obj被Object.freeze()冻结或者Oject.seal()封装了)

- 9. Reflect.defineProperty(target,propertyKey,attributes)

	- 作用

		- 等同于Object.defineProperty(target,propertyKey,attributes)

- 10. Reflect.getOwnPropertyDescriptor(target,propertyKey)

	- 作用

		- 等同于 Object.getOwnPropertyDescription(target,propertyKey)

- 11. Reflect.isExtensible(target)

	- 作用

		- 判断target是否可扩展,等同于Object.isExtensible(target)

	- 注意

		- target不可扩展

			- target非对象

				- 报错

			- target 被冻结或者被封装了

				- 返回false

		- target可扩展

			- target为非冻结或者封装的对象

- 12. Reflect.preventExtensions(target)

	- 作用

		- 让target变得不可扩展

- 13. Reflect.ownKeys(target)

	- 作用

		- 返回对象的所有存在于自身的属性(包括symbol属性)

	- 与Object.keys(target)的区别

		- Object的方法只能返回非Symbol的key值)

## Proxy

### 概述

- 1. 对目标设置一层拦截器,当对该对象访问或者改写时都必须通过该层拦截器

- 2. 在拦截器中可以通过代理来改变数据的来源

### 代码

- var proxy = new Proxy(target,handler)

### 代码分析

- 如果handler为空对象,访问proxy等同于访问target

### 拦截操作

- get(target,propKey,receiver)

	- 拦截对象属性的读取操作

- set(target,propKey,value,receiver)

	- 拦截对象属性设置操作

- has(target,propKey)

	- 拦截propKey in proxy的in操作符 和 Reflect.has(target,propKey)

- deleteProperty(target,propKey)

	- 拦截delete、Reflect(target,propKey)操作

- Ownkeys(target)

	- 拦截for...in,Object.keys()....等操作

- getOwnPropertyDescriptor(target, propKey)

	- 拦截Object.getOwnPropertyDescriptor(proxy, propKey)

- apply(target,object,args)

	- 拦截函数调用(纯调用、call调用、apply调用)

- construct(target, args, newTarget)

	- new 操作时调用,newTarget为new Proxy(...)得到的对象

- ...

## Iterator/for ... of

### Iterator

- 作用

	- 任何数据结构只要有Iterator接口,就可以完成for...of的遍历操作

- 位置

	- es6规定,默认的Iterator接口部署在Symbol.iterator属性上

- 具备接口的结构数据

	-  Array / Map /Set/String /TypedArray /arguments /NodeList对象

- 对象

	- 对象是没有iterator遍历器的

- 调用Iterator的场合

	- 结构赋值

	- 扩展运算符

	- yield*

	- for...of

	- Array.from()

	- Map/Set

	- Promise.all(newObj)/Promise.race(newObj)

		- 解析newObj的迭代器得到数组装的多个promise数据

- Iterator接口于Generator函数

	- 最简单实现

		- ```js
		  let myIterable = {  
		    [Symbol.iterator]: function* () {  
		      yield 1;  
		      yield 2;  
		      yield 3;  
		    }  
		  }  
		  [...myIterable] // [1, 2, 3]  
		    
		  // 或者采用下面的简洁写法  
		    
		  let obj = {  
		    * [Symbol.iterator]() {  
		      yield 'hello';  
		      yield 'world';  
		    }  
		  };  
		    
		  for (let x of obj) {  
		    console.log(x);  
		  }  
		  // "hello"  
		  // "world"  
		    
		  ```

### for...of

- 只要数据结构有正确的Symbol.iterator属性值,就可以用for...of遍历

- 与for...in的区别

	- for...of得到的是键值

	- for...in用于对象中,得到的是键名

### 手动模拟一个iterator

- ```js
  class MyIterator{  
      constructor(enNum){  
          this.startNum = 0;  
          this.enNum = enNum;  
          let that =this;  
          this[Symbol.iterator]= ()=>{  
              return {  
               next:that.next.bind(that)  
              }  
          }  
      }  
        
      next(){  
          if (this.startNum <= this.enNum) {  
             return {value:(this.startNum++) *2}  
          } else {  
  		this.startNum =0;  
              return {done:true}  
          }  
      }  
  }  
  let re = new MyIterator(5);  
  console.log(re);  
  for (const iterator of re) {  
      console.log(iterator)  
  }  
  //输出 0 2 4 6 8 10  
  console.log([...re]);  
  //输出 [0 ,2 ,4, 6, 8, 10]
  ```

