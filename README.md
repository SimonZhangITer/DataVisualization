# 数据可视化

> 将数据通过图表的形式展现出来将大大的提升可读性和阅读效率

> 本例包含柱状图、折线图、散点图、热力图、复杂柱状图、预览面板等

后续会有新的版本，欢迎大家关注 

# 技术栈

- vue2.x
- vuex _存储公共变量，如色值等_
- vue-router _路由_
- element-ui _饿了么基于vue2开发组件库，本例使用了其中的datePicker_
- echarts _一款丰富的图表库_
- webpack、ES6、Babel、Stylus...

# 演示

<div align=center style="margin-top:30px">此项目为PC端数据可视化，请在电脑端查看</div>
<div align=center><a href="https://simonzhangiter.github.io/DataVisualization" target=_blank>在线演示戳我</a></div>

# 项目截图

<div align=center><img src="https://github.com/SimonZhangITer/DataVisualization/blob/master/static/img/demo.jpg?raw=true"></div>

# 开发

## 组件化

本项目完全采用组件化的思想进行开发。使用vue-router作为路由，每个页面都是一个组件，每个组件里又包含多个组件。可以看到，多种图表的标题和日期筛选等都是类似的格式，所以这两个都分别做成了组件。

除此之外，在筛选产品的时候用到的checkbox也被我写成了组件，有需要的朋友也可以剥离出去单独使用（不过写的比较粗糙~）

每个图表都是一个单独的组件，也可以单独的剥离出去使用。

## 柱状图

本项目包含多种图表，这里挑“柱状图”说一说，其他的图标实现方式类似。

```html
<template>
<div class="multipleColumn">
  <v-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-header>
  <v-filter :myChart="myChart" v-if="myChart._dom"></v-filter>
  <div class="main"></div>
</div>
</template>
```
页面HTML可以看到，一个完整的图标是由三个部分组成：



### v-header
头组件，存放标题以及不同类型的筛选等

- name _图表的标题_
- legendArr _图表所包含的多种类型_
- myChart _当前图表对象_

### v-filter

筛选组件，日期的筛选以及不同产品的筛选

- myChart _当前图表对象_

v-if="myChart._dom"表示在当前图表dom元素渲染完成之后再渲染filter组件

### main

_图表的主体文件_

需要注意的是：<font color=red>main必须要指定宽高，否则echarts无法渲染dom</font>

### 初始化

初始化需要在vue的mounted()方法里执行，因为这里能保证当前的页面元素都已经被加载完成。

```javascript
mounted() {
  // 基于准备好的dom，初始化echarts实例
  this.myChart = echarts.init(document.querySelector('.multipleColumn .main'))
  this.myChart.setOption(this.options) //this.options为echarts的配置，详情可去我的gitHub查看
}
```

如果要在created()方法里执行，则需要另外加上

```javascript
this.$nextTick(() => {
  this._init()
})
```

## DashBoard

dashboard是一个所有图表的预览，并且有一个点击切换的动画效果，这里大概讲解一个实现方式。

### html

```html
<template lang="html">
  <div class="dashboard">
    <div class="flex-container column">
        <div class="item one" @click="clickChart('1')" style="transform: translate(-22.4%,-33.5%) scale(0.33)">
          <multipleColumn></multipleColumn>
        </div>
        <div class="item two" @click="clickChart('2')" style="transform: translate(-22.4%,0.5%) scale(0.33)">
          <column></column>
        </div>
        <div class="item three" @click="clickChart('3')" style="transform: translate(-22.4%,34.5%) scale(0.33)">
          <v-line></v-line>
        </div>
        <div class="item four active" @click="clickChart('4')" style="transform: translate(43.7%, 0) scale(1)">
          <point></point>
        </div>
    </div>
  </div>
</template>
```
可以看到，这里是设置了四张图表的Wrapper，每个Wrapper里面装一个图表组件。通过动态的改变style样式来切换。

整体的思想为：

- 使用百分比布局，这样才能在不能大小的屏幕做到自适应
- 确定图表显示比例，长宽比
- 只做一个transform变换，这样才能提高性能

### 性能

关于性能方面，这里多说一句：

相信大家都看过在线演示的demo了，不同图表间的切换不仅有位置的变换，还有大小的变换。那么大小的变换大家都知道是用transform的scale变换，但是位置的变换呢，使用left、top？

很显然这样是不对的，但是这样确实也能实现效果，但是会非常的消耗性能。一个CSS属性的变化就相当于一个线程，那么如果使用了left、top以及transform的话就是三个线程同时开启，那你的电脑温度将会很快飙升的

正确的解决方案还是继续使用transform，使用它的<font color=red> translate </font>，如：

```css
transform: translate(-22.4%,0) scale(0.33)
```

# 结语

这个项目还是挺实用的一个项目，较好的运用了vue的组件化思想。

大家感兴趣的可以去看看代码，希望对大家有帮助。


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
## 交流

欢迎热爱学习、忠于分享的胖友一起来交流

- QQ：745913574

- QQ群：149683643

- WeChat: C.a.l.m

## Donation

If you find this project useful, you can buy me a cup of coffee

<img width="650" src="https://static.oschina.net/uploads/space/2017/0223/201225_oQrz_2493500.jpeg" alt="">
