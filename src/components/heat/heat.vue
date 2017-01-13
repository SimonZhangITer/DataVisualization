<!-- 散点图 -->

<template lang="html">
<div class="heat">
  <div class="legend-wrapper">
    <legendBar :legendArr="legendArr" :myChart="myChart"></legendBar>
  </div>
  <div class="main"></div>
</div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
import china from 'echarts/map/js/china'
import legendBar from 'components/legend/legend'

export default {
  created() {
    this._getCityData()
  },
  data() {
    return {
      legendArr: [],
      color: this.$store.state.color,
      myChart: {},
      geoCoordMap: {}
    }
  },
  methods: {
    _init(options) {
      this.myChart = echarts.init(document.querySelector('.main'))
      this.myChart.setOption(options)
      this.legendArr = options.series
      this.legendArr.forEach((data) => {
        data.seleted = true;
      })
    },
    _getCityData() {
      axios.get('static/data/cityData.json').then((res) => {
        this.geoCoordMap = res.data
      })
    },
    convertData(data) {
      let res = [];
      for (let i = 0; i < data.length; i++) {
        let geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push(geoCoord.concat(data[i].value));
        }
      }
      return res;
    }
  },
  components: {
    legendBar
  },
  mounted() {
    axios.get('static/data/heat/testData.json').then((res) => {
      let options = {
        title: {
          text: '全国主要城市空气质量',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        backgroundColor: '#404a59',
        visualMap: {
          min: 0,
          max: 500,
          splitNumber: 5,
          inRange: {
            color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
          },
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: '#111'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        series: [{
          name: 'AQI',
          type: 'heatmap',
          coordinateSystem: 'geo',
          data: this.convertData(res.data)
        }]
      }
      this._init(options)
    });
  }
}

</script>

<style lang="stylus">
.heat
  height 800px
  .main
    height 400px
</style>
