# css


## 布局

### flex布局

- flex: flex-grow flex-shrink flex-basis

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

### 多行布局

- 兼容性

	- 苹果ios 10.0+ 、安卓极个别版本兼容性差

- column-count

	- 列的数目

- column-width

	- 列宽度

- column-gap	

	- 列间隙

- columns

	- column-count 、 column-width的合写

- column-rule-color

	- 中间分割线的颜色

- column-rule-style

	- 中间分割线的样式

- column-rule-width

	- 中间分割线的宽度

	- 默认3px

- column-rule

	- column-rule-width、column-rule-style和column-rule-color

- column-span

	- 基本用不到,暂时不管

- column-fill

	- 子主题 1

