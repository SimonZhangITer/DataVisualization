<template lang="html">
  <div class="dashboard">
    <div class="flex-container column" id="direction">
        <div class="item one" @click="clickChart('1')">
          <multipleColumn></multipleColumn>
        </div>
        <div class="item two" @click="clickChart('2')">
          <column></column>
        </div>
        <div class="item three" @click="clickChart('3')">
          <v-line></v-line>
        </div>
        <div class="item four active" @click="clickChart('4')">
          <point></point>
        </div>
    </div>
  </div>
</template>

<script>
import column from 'components/column/column'
import line from 'components/line/line'
import multipleColumn from 'components/multipleColumn/multipleColumn'
import point from 'components/point/point'

const ACTIVE_STYLE = {
  top: '0',
  left: '30%',
  marginLeft: '10px',
  transform: 'scale(1)'
}

let NORMAL_STYLE = {
  left: '-15.2%',
  marginLeft: '0',
  transform: 'scale(0.33)'
}

export default {
  data() {
    return {
      items: [],
      topArr: ['-33.5%', '0.5%', '34.5%', '0']
    }
  },
  mounted() {
    this._init()
  },
  methods: {
    _resize() {
      this.$root.charts.forEach((myChart) => {
        myChart.resize()
      })
    },
    _init() {
      this.items = document.querySelectorAll('.item')
      this.items.forEach((item, index) => {
        item.dataset.order = index + 1;
      })
    },
    clickChart(clickIndex) {
      let activeItem = document.querySelector('.active')
      let activeIndex = activeItem.dataset.order
      let clickItem = this.items[clickIndex - 1]
      if (activeIndex === clickIndex) {
        return
      }
      activeItem.classList.remove('active')
      clickItem.classList.add('active')
      NORMAL_STYLE.top = clickItem.style.top || this.topArr[clickIndex - 1]
      this._setStyle(clickItem, ACTIVE_STYLE)
      this._setStyle(activeItem, NORMAL_STYLE)
    },
    _setStyle(el, style) {
      for (let css in style) {
        if (style.hasOwnProperty(css)) {
          el.style[css] = style[css]
        }
      }
    }
  },
  components: {
    column,
    multipleColumn,
    point,
    'v-line': line
  }
}

</script>

<style lang="stylus" scoped>
* {
    box-sizing: border-box;
}

.point,.multipleColumn,.columnChart,.line{
  height 100%!important
  width 100%!important
  background none!important
}

.item {
    padding: 0px;
    margin: 0px;
    width: 68%;
    height: 100%;
    position absolute
    transform scale(0.33)
    text-align: center;
    transition:all 0.8s;
    background rgba(32, 32, 35, 0.2)
}

.dashboard {
    position relative
    width 100%
    height 100%
    background-color: black;
    margin:0px;
    padding:0px;
    background url('../../assets/Bitmap.png') no-repeat;
    background-size 100% 100%
    padding-top 5%
}

.flex-container.column {
    position relative
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    height: 90%;
    width: 90%;
    overflow: hidden;
    display: flex;
    display: -webkit-flex;
    margin:  0 auto 100px auto;
    box-sizing: content-box;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}

.active {
    height 100%
    width: 69%;
    flex-grow: 1;
    flex-shrink:0;
    margin-left: 10px;
    line-height: 300px;
    transform translate(43.7%, 0) scale(1)
}

.one {
    top: -33.5%;
    left: -15.2%;
    /*transform translate()*/
    order: 1;
}

.two {
    top: 0.5%;
    left: -15.2%;
    order: 2;
}

.three {
    top: 34.5%;
    left: -15.2%;
    order: 3;
}

.four {
    order: 4
}
</style>
