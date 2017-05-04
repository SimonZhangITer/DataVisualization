<!-- 散点图 -->
<style lang="stylus" scoped>
.point
  background url('../../assets/bg.jpg') no-repeat
  background-size 100% 100%
  .main
    height calc(100% - 120px)
    width 100%
    transition all 0.5s linear
</style>

<template lang="html">
<div class="point">
  <v-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-header>
  <v-filter :myChart="myChart" v-if="myChart._dom"></v-filter>
  <div class="main"></div>
</div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
import china from 'echarts/map/js/china'
import header from 'components/header/header'
import filter from 'components/filter/filter'

const USER_NAME = 'elastic'
const PSW = 'elasticl@ethical.cn'
const AUTH_TOKEN = "Basic " + btoa(USER_NAME + ":" + PSW)


export default {
  created() {
    this._getCityData()
  },
  data() {
    return {
      legendArr: [],
      color: this.$store.state.color,
      myChart: {},
      geoCoordMap: {},
      name: '散点图'
    }
  },
  methods: {
    _init(options) {
      this.myChart = echarts.init(document.querySelector('.point .main'))
      this.myChart.setOption(options)
      this.legendArr = options.series
      this.legendArr.forEach((data) => {
        data.selected = true;
      })
      this.$root.charts.push(this.myChart)
      window.addEventListener('resize', function() {
        this.myChart.resize()
      }.bind(this))
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
      for (let i = 0; i < 4; i++) {
        let l = data.length
        let x = parseInt(Math.random() * l)
        let geoCoord = this.geoCoordMap[data[x].name]
          // let geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[x].name,
            // name: data[x].name,
            value: geoCoord.concat(Math.random() * 200)
              // value: geoCoord.concat(data[i].value)
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
            show: false
          },
          tooltip: {
            trigger: 'item',
            formatter: function(params) {
              return params.name + ' : ' + params.value[2];
            }
          },
          legend: {
            show: false
          },
          visualMap: {
            min: 0,
            max: 200,
            bottom: 50,
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
            zoom: 1,
            top: 50,
            itemStyle: {
              normal: {
                color: '#3c4247',
                opacity: 0.6,
                borderColor: 'rgba(255, 255, 255, 0.35)'
              },
              emphasis: {
                color: '#2a333d'
              }
            }
          },
          series: [{
            name: '标签1',
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
          }, {
            name: '标签2',
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
          }, {
            name: '标签3',
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
    'v-header': header,
    'v-filter': filter
  }
}

</script>
