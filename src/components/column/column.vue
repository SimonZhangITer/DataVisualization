<!-- 柱状图 -->
<style lang="stylus">
.column
  height 800px
  background url('../../assets/Bitmap.png') no-repeat;
  background-size 100% 100%
  color white
  .main
    height 400px
</style>

<template>
<div class="column">
  <v-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-header>
  <div class="filter">
    <div class="startTime">
      <span class="text">起始时间</span>2012.04.12<i class="icon"></i>
    </div>
    <div class="endTime">
      <span class="text">截止时间</span> 2022.04.12<i class="icon"></i>
    </div>
    <div class="products">
      产品<i class="arrow"></i>
    </div>
  </div>
  <div class="main"></div>
</div>

</template>

<script>
import echarts from 'echarts'
import header from 'components/header/header'

export default {
  data() {
    return {
      legendArr: [],
      color: this.$store.state.color,
      myChart: {},
      name: '信使任务'
    }
  },
  methods: {
    _init() {
      this.legendArr = this.myChart.getOption().series
      this.legendArr.forEach((data) => {
        data.seleted = true;
      })
    }
  },
  components: {
    'v-header': header
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.querySelector('.main'));
    this.myChart.setOption({
      title: {
        show: false
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        show: false
      },
      toolbox: {
        show: false
      },
      color: this.color,
      calculable: true,
      xAxis: [{
        name: '产品',
        type: 'category',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.69)'
        },
        axisLabel: {
          textStyle: {
            color: 'white'
          }
        },
        data: ['产品1', '产品2']
      }],
      yAxis: [{
        axisLine: {
          show: false
        },
        nameLocation: 'end',
        nameGap: 20,
        nameRotate: 0,
        interval: 2,
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: ['rgba(230, 230, 230, 0.2)']
          }
        },
        axisLabel: {
          textStyle: {
            color: 'white',
            fontSize: 14
          }
        },
        name: '数量',
        type: 'value',
        nameTextStyle: {
          color: 'rgba(255, 255, 255, 0.69)'
        }
      }],
      series: [{
        name: '预算拜访',
        type: 'bar',
        data: [2.0, 4.9],
        barWidth: 16,
        barGap: 0
      }, {
        name: '预算阅读',
        type: 'bar',
        data: [2.6, 5.9],
        barWidth: 16,
        barGap: 0
      }, {
        name: '预算调研',
        type: 'bar',
        data: [2.0, 6.4],
        barWidth: 16,
        barGap: 0
      }, {
        name: '实际拜访',
        type: 'bar',
        data: [4.0, 5.9],
        barWidth: 16,
        barGap: 0
      }, {
        name: '实际阅读',
        type: 'bar',
        data: [5.6, 4.9],
        barWidth: 16,
        barGap: 0
      }, {
        name: '实际调研',
        type: 'bar',
        data: [2.0, 3.4],
        barWidth: 16,
        barGap: 0
      }]
    });
    this._init()
  }
}

</script>
