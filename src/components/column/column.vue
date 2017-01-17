<!-- 柱状图 -->
<style lang="stylus">
.columnChart
  height 100%
  width 100%
  background url('../../assets/Bitmap.png') no-repeat
  background-size 100% 100%
  color white
  .main
    width 100%
    height 100%
</style>

<template>
<div class="columnChart">
  <v-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-header>
  <v-filter :myChart="myChart" v-if="myChart._dom"></v-filter>
  <div class="main"></div>
</div>

</template>

<script>
import echarts from 'echarts'
import header from 'components/header/header'
import filter from 'components/filter/filter'

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
        data.selected = true;
      })
      window.addEventListener('resize', function() {
        this.myChart.resize()
      }.bind(this))
    }
  },
  components: {
    'v-header': header,
    'v-filter': filter
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.querySelector('.columnChart .main'));
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
