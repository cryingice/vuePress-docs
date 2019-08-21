# Js的特殊点


## 重要的又容易被忽略的 JS API

### reducer(js api)

- 数组方法

- 接受两个参数

	- 第一个参数是个函数,函数入参,第一个为初始值,第二个当前数组元素

	- 第二个入参为初始值

### 对象属性描述器

- 定义
	```js
	- let obj = {}
	  
	- Object.defineProperty(obj,'attr',{});
	- Object.getOwnPropertyDescriptor(obj,'attr');  
	
	// 输出: {configurable: false,enumerable: false,value: undefined,writable: false}
	  obj.another = 1
	  - Object.getOwnPropertyDescriptor(obj,'another');
	// 输出: {configurable: true,enumerable: true,value: 4,writable: true}
	// 原因:浏览器默认在特定操作(给对象的新属性赋值)过程中默认给新属性添加了一个属性描述符,前提条件:赋值前属性还未进行手动设置描述器
 		//注意:
	- { //1.value 和 writable两个属性与get/set 存取操作符相斥,不能同时存在  
	  	//2.函数内涉及的属性不能用设置描述器时的属性(attr),否则会产生无限自调用,死循环,如下:  
	  	get(){  
	  		return this[otherAttr]  
	  	},  
	  	set(val){  
	  		this[otherAttr] = val  
	  	}  
	  }
	```
- 获取

	- Object.getOwnPropertyDescriptor(obj,'attr')

### for...in / Object.keys()

- for...in

	- 可遍历原型链上的属性

- Object.keys

	- 仅仅可遍历自身上的可遍历属性

### Object.seal/Object.freeze

- freeze

	- 冻结对象,对象不能增删改已有属性,也不能新添属性,不能更改对象的属性描述器

- sea1l

	- 封闭对象,阻止添加新属性并将当前已有属性设为不可配置,当前属性的值若可写则可写
- 区别

	- freeze会将属性描述符writable设为false,seal会保持writable的属性值,换句话说用在调用Object.seal()之前
	若writable为true,则调用后该属性值可赋值,否则赋值不成功

### Object.getOwnPropertyDescriptors(obj)

- 得到对象所有属性的属性器

## 引用型数据连等赋值(面试题)
### 代码
```js
  var a = {n: 1};  
  var b = a;  
  a.x = a = {n: 2};
```
### 解析步骤:

- 1. a.x中的.优先级比较高,先找到{n:1}中的x值,没有就赋值为undefined标记一下

- 2.等待第一个等号后面返回值

- 3.a 储存的指针改变,变为新的{n:2},返回第二个等号后面的{n:2}的对应地址

- 4.将地址赋值给a.x替换掉undefined

## 数据转换

### NaN、undefined、null 的转换

- NaN

	- 转为字符串

		- 'NaN'

	- 转为布尔值

		- false

- undefined

	- 转为字符串

		- "undefined"

	- 转为布尔值

		- false

	- 转为数字

		- NaN

- null

	- 转为字符串

		- 'null'

	- 转为布尔值

		- false

	- 转为数字

		- 0

### 被转换成NaN、undefined、null

- NaN

	- undefined、对象、数组(除了此情况: 仅有一个元素且该元素可转为数字而且转为的值为数字(非NaN))、函数、字符串(包含非数字的字符串)都会转成NaN

- undefined

	- 貌似没有

- null

	- 貌似也没有

### 对象转原始类型

- 1.如果用``String()``直接转为字符串类型,则直接调用toString()

- 2.如果仅仅隐式转换为基本类型,则先调用valueOf(),如果还没转换为基本数据类型则继续调用toString()

###四则运算

- *** 加法 + ***

	- 1.如果一方为字符串,都转为字符串

	- 2.如果一方不为字符串或者数字且令一方不为字符串,则分两种情况来看

		- 基本数据类型

			- 直接转为数字,字符串,优先顺序同顺序

		- 引用数据类型

			- 同 '对象转原始类型' 方法,非优先转换成数子

- 其他运算符

	- 只要一方是数字,另一方若为非数字则转为数字

### ==和===

- ==

	- 1.如果前后类型相同,比较大小

	- 2.如果一方是null,另一方为undefined,直接返回true

	- 3.如果不同,则会类型转换

		- a.如果一方为数字,一方为字符串,则统一转换为数字

		- b.其中一方为boolean,则转为数字比较

		- c.其中一方为引用型数据类型,另一方为数字,字符串或者symbol,则转换引用类型数据,方法同 '对象转原始类型'

			- tips: 1.只有数组且只有一个数字元换为number非NaN,如:+[2] --> 2  
			  2.数组转为字符串得到以逗号分隔由各个元素拼接而成的字符串  
			  3.对象转为字符串得到"[object Object]"

## 字面量字符串/字符串构造函数

### **字面量字符串**

- 是一个基本数据类型

- 当调用字符串的方法时,会隐式产生一个相应的构造实例,调用String上的方法,返回得到的值赋给原有的基本数据类型. 然后构造实例自己销毁

### 构造生成的字符串

- 是一个类,不过value为基本数据类型的字符串

```js
  **这是加粗的文字**
  *这是倾斜的文字*`
  ***这是斜体加粗的文字***
  ~~这是加删除线的文字~~
```
- 效果如下:
- **这是加粗的文字**
  *这是倾斜的文字*`
  ***这是斜体加粗的文字***
  ~~这是加删除线的文字~~

```js
>这是引用的内容
>>这是引用的内容
>>>>>>>>>>这是引用的内容
```
>这是引用的内容
>>这是引用的内容
>>>>>>>>>>这是引用的内容