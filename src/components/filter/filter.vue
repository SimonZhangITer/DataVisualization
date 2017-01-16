<style lang="stylus">
.filter
  position relative
  display flex
  padding 10px 0 0 28px
  font-size 12px
  line-height 11px
  color white
  z-index 9999
  .myCalendar
    left auto!important
  input
    background none
    border none
    color white
  .timeText
    opacity 0.69
    padding-right 7px
  .startTime
    display inline-block
  .endTime
    display inline-block
    padding-left 42px
  .products
    position absolute
    display inline-block
    right 15px
    .all
      display inline-block
      margin-right 18px
      .v-checkbox
        position relative
        top 2px
        left -3px
    .pro
      float right
      padding 2px 25px 2px 2px
      .arrow
        position absolute
        width 6px
        height 6px
        margin-left 10px
        border-left 2px solid white
        border-bottom 2px solid white
        transform rotate(-45deg)
  .pro_list
    position absolute
    right 22px
    width 102px
    text-align left
    background #493F3D
    font-size 14px
    margin-top 22px
    max-height 180px
    overflow hidden
    z-index 9
    li
      height 36px
      line-height 36px
      border-bottom 1px solid rgba(255, 255, 255, 0.1)
      .v-checkbox
        left 8px
      .name
        position absolute
        display inline-block
        right 8px
</style>
<template lang="html" scoped>
  <div class="filter">
    <div class="startTime">
      <span class="timeText">起始时间</span>
      <input type="text" class="startDate" :value="startDate">
      <div class="myCalendar"></div>
    </div>
    <div class="endTime">
      <span class="timeText">截止时间</span>
      <input type="text" class="endDate" :value="endDate">
      <div class="myCalendar"></div>
    </div>
    <div class="products">
      <div class="all" @click="selectAll()" v-show="pro_filter_flag">
        <checkbox :isChecked="selectAll_flag"></checkbox>
        全选
      </div>
      <div class="pro" @click="showProPane()">
        产品<i class="arrow"></i>
      </div>
    </div>
    <div class="pro_list" v-show="pro_filter_flag">
      <ul>
        <li v-for="(pro,index) in pro_list" @click="pro_toggle(pro,index)"><checkbox :isChecked="pro.selected"></checkbox><span class="name">{{pro.name}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import './assets/calendar.js'
import './assets/calendar.css'
import checkbox from 'components/checkbox/checkbox'

export default {
  props: {
    myChart: {
      tyoe: Object,
      default: {}
    }
  },
  data() {
    return {
      startDate: '2015.12.04',
      endDate: '2016.01.15',
      pro_filter_flag: false,
      selectAll_flag: true,
      pro_list: [],
      option: {},
      resetOption: {} // 存储最开始的数据,
    }
  },
  mounted() {
    this._init()
  },
  methods: {
    _init() {
      this.option = this.myChart.getOption()
      this.resetOption = this._deepCopy(this.myChart.getOption())
      this._initProList()
      $('.' + this.$parent.$el._prevClass + ' .startTime .myCalendar').calendar({
        trigger: '.' + this.$parent.$el._prevClass + ' .startDate',
        zIndex: 999,
        format: 'yyyy.MM.dd',
        onSelected: function(view, date, data) {
          console.log(date)
        }
      })
      $('.' + this.$parent.$el._prevClass + ' .endTime .myCalendar').calendar({
        trigger: '.' + this.$parent.$el._prevClass + ' .endDate',
        zIndex: 999,
        format: 'yyyy.MM.dd',
        onSelected: function(view, date, data) {
          this.selectAll()
          this.redraw()
          setTimeout(() => {
            this.selectAll()
            this.redraw()
          }, 100)
        }.bind(this)
      })
    },
    _initProList() {
      let arr = []
      let parentClass = this.$parent.$el._prevClass
      if (parentClass === 'multipleColumn' || parentClass === 'columnChart') {
        this.option.xAxis[0].data.forEach((pro, index) => {
          arr.push({
            name: pro,
            selected: true,
            data: this.option.series[index].data
          })
        })
        this.pro_list = arr
      }
    },
    _deepCopy(obj) {
      let str, newobj;
      str = newobj = obj.constructor === Array ? [] : {};
      if (typeof obj !== 'object') {
        return
      } else if (window.JSON) {
        str = JSON.stringify(obj) // 系列化对象
        newobj = JSON.parse(str) // 还原
      } else {
        for (var i in obj) {
          newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
        }
      }
      return newobj;
    },
    pro_toggle(pro, index) {
      pro.selected = !pro.selected
      this.selectAll_flag = this.isSelectAll()
      this.redraw()
    },
    redraw() {
      let option = this._deepCopy(this.resetOption)
      let count = 0
      this.pro_list.forEach((pro, index) => {
        index = index - count
        if (!pro.selected) {
          option.xAxis[0].data.splice(index, 1)
          option.series.forEach((obj) => {
            obj.data.splice(index, 1)
          })
          count++
        }
      })
      this.myChart.setOption(option)
    },
    isSelectAll() {
      let flag = true
      this.pro_list.forEach((pro) => {
        if (!pro.selected) {
          flag = false
        }
      })
      return flag
    },
    selectAll() {
      this.selectAll_flag = !this.selectAll_flag
      this.pro_list.forEach((pro) => {
        pro.selected = this.selectAll_flag
      })
      this.redraw()
    },
    showProPane() {
      this.pro_filter_flag = !this.pro_filter_flag
    }
  },
  components: {
    checkbox
  }
}

</script>
