<style lang="stylus">
.filter
  padding 25px 0 0 20px
  font-size 12px
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
    margin-top 8px
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
<template lang="html">
  <div class="filter">
    <div class="startTime">
      <span class="timeText">起始时间</span>
      <input type="text" class="startDate" placeholder="trigger calendar" :value="startDate">
      <div class="calendar"></div>
    </div>
    <div class="endTime">
      <span class="timeText">截止时间</span>
      <input type="text" class="endDate" placeholder="trigger calendar" :value="endDate">
      <div class="calendar"></div>
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
        <li v-for="(pro,index) in pro_list" @click="selectPro(pro,index)"><checkbox :isChecked="pro.selected"></checkbox><span class="name">{{pro.name}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import './assets/calendar.js'
import './assets/calendar.css'
import checkbox from 'components/checkbox/checkbox'
import Vue from 'vue'

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
      pro_list: []
    }
  },
  mounted() {
    this._init();
  },
  methods: {
    _init() {
      this._initProList()
      $('.startTime .calendar').calendar({
        trigger: '.startDate',
        zIndex: 999,
        format: 'yyyy.MM.dd',
        onSelected: function(view, date, data) {
          console.log(date)
        }
      })
      $('.endTime .calendar').calendar({
        trigger: '.endDate',
        zIndex: 999,
        format: 'yyyy.MM.dd',
        onSelected: function(view, date, data) {
          console.log(date)
        }
      })
    },
    _initProList() {
      let arr = []
      this.myChart.getOption().xAxis[0].data.forEach((pro) => {
        arr.push({
          name: pro,
          selected: true
        })
      })
      this.pro_list = arr
    },
    selectPro(pro, index) {
      pro.selected = !pro.selected;
      this.selectAll_flag = this.isSelectAll();
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
