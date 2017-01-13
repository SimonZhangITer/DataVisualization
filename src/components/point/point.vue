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

window.x = echarts

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
        this.$nextTick(() => {
          this._getMyChart()
        })
      })
    },
    convertData(data) {
      let res = [];
      for (let i = 0; i < data.length; i++) {
        let geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    },
    _getMyChart() {
      axios.get('static/data/point/testData.json').then((res) => {
        let options = {
          // backgroundColor: '#404a59',
          title: {
            text: '全国主要城市空气质量',
            x: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function(params) {
              return params.name + ' : ' + params.value[2];
            }
          },
          legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            data: ['pm2.5'],
            textStyle: {
              color: '#fff'
            }
          },
          visualMap: {
            min: 0,
            max: 200,
            splitNumber: 5,
            inRange: {
              color: ['#255B78', '#2A7484', '#2F9696', '#3BBCB0', '#51D4EB']
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
            itemStyle: {
              normal: {
                color: '#3c4247',
                opacity: 0.25,
                borderColor: 'rgba(255, 255, 255, 0.35)',
                backgroundBlendMode: 'multiply'
              },
              emphasis: {
                color: '#2a333d'
              }
            }
          },
          series: [{
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: function(val) {
              return val[2] / 6;
            },
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1
              }
            },
            data: this.convertData(res.data)
          }]
        }
        this._init(options)
      });
    }
  },
  components: {
    legendBar
  }
}

</script>

<style lang="stylus">
.heat
  height 800px
  background url('../../assets/Bitmap.png') no-repeat;
  background-size 100% 100%
  .main
    height 400px
</style>
