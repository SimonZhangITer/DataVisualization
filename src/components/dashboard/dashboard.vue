<template lang="html">
  <div class="dashboard">
    <div class="flex-container column" id="direction">
        <div class="item one" @click="clickChart('1')" data-top="-9%">
          <multipleColumn></multipleColumn>
        </div>
        <div class="item two" @click="clickChart('2')" data-top="25%">
          <column></column>
        </div>
        <div class="item three" @click="clickChart('3')" data-top="59%">
          <v-line></v-line>
        </div>
        <div class="item four active" @click="clickChart('4')" data-top="0">
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
  width: '68%',
  height: '100%',
  marginLeft: '10px',
  transform: 'scale(1)'
}

let NORMAL_STYLE = {
  left: '-3%',
  width: '40%',
  height: '50%',
  marginLeft: '0',
  transform: 'scale(0.65)'
}

export default {
  data() {
    return {
      items: []
    }
  },
  mounted() {
    this._init()
      // if (!window.StyleHelpers) {
      //   var StyleHelpers = (function() {
      //     var applyElementStyle = function(element, styleObj) {
      //       Object.keys(styleObj).forEach(function(key) {
      //         if (element.style[key] !== +styleObj[key]) {
      //           element.style[key] = styleObj[key];
      //         }
      //       })
      //     };
      //     var applyTransformStyle = function(element, transformValue) {
      //       var styleObject = {};
      //       ['webkit', ''].forEach(function(prefix) {
      //         styleObject[prefix + 'Transform'] = transformValue;
      //       });
      //       applyElementStyle(element, styleObject);
      //     };
      //     return {
      //       applyElementStyle: applyElementStyle,
      //       applyTransformStyle: applyTransformStyle
      //     }
      //   })();
      //   window.StyleHelpers = StyleHelpers;
      // }
      // items[i].style.backgroundColor = 'rgba(32, 32, 35, 0.2)'
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
      if (clickIndex) {
        return
      }
      let activeItem = document.querySelector('.active')
      let activeIndex = activeItem.dataset.order
      let clickItem = this.items[clickIndex - 1]
      if (activeIndex === clickIndex) {
        // this._setStyle(activeItem, {
        //   width: '40%',
        //   height: '50%',
        //   left: '0',
        //   transform: 'scale(0.65)'
        // })
        // setTimeout(() => {
        //   this._setStyle(activeItem.querySelector('.main'), {
        //     top: '-24%',
        //     left: '-18%',
        //     transform: 'scale(0.46)'
        //   })
        // }, 300)
        return
      }
      NORMAL_STYLE.top = clickItem.dataset.top
      activeItem.classList.remove('active')
      clickItem.classList.add('active')
      this._setStyle(clickItem, ACTIVE_STYLE)
      this._setStyle(activeItem, NORMAL_STYLE)
        // setTimeout(() => {
        //   this._resize()
        // }, 700)
    },
    _setStyle(el, style) {
      for (let css in style) {
        if (style.hasOwnProperty(css)) {
          el.style[css] = style[css]
        }
      }
    },
    clickChart2(e) {
      var _arr = Array.prototype.slice.call(e.target.classList);
      var selected = e.target;
      var active = document.querySelector(".active");
      if (_arr.indexOf("active") < 0) {
        var selectedStyle = window.getComputedStyle(selected);
        var selectedOrder = selectedStyle.getPropertyValue("order");
        selectedStyle = {
          width: selected.offsetWidth,
          height: selected.offsetHeight,
          center_x: selected.offsetLeft - selected.parentNode.offsetLeft + selected.offsetWidth / 2,
          center_y: selected.offsetTop - selected.parentNode.offsetTop + selected.offsetHeight / 2
        };
        var activeStyle = window.getComputedStyle(active);
        var activeOrder = activeStyle.getPropertyValue("order");
        activeStyle = {
          width: active.offsetWidth,
          height: active.offsetHeight,
          center_x: active.offsetLeft - active.parentNode.offsetLeft + active.offsetWidth / 2,
          center_y: active.offsetTop - active.parentNode.offsetTop + active.offsetHeight / 2
        };

        active.style.transform = "translate(" + (selectedStyle.center_x - activeStyle.center_x) + "px," + (selectedStyle.center_y - activeStyle.center_y) + "px) scale(" + selectedStyle.width / activeStyle.width + "," + selectedStyle.height /
          activeStyle.height + ")";
        selected.style.transform = "translate(" + (activeStyle.center_x - selectedStyle.center_x) + "px," + (activeStyle.center_y - selectedStyle.center_y) + "px) scale(" + activeStyle.width / selectedStyle.width + "," + activeStyle.height /
          selectedStyle.height + ")";
        setTimeout(function() {
          active.style.transition = "none";
          selected.style.transition = "none";
          active.style.transform = "";
          selected.style.transform = "";
          active.classList.remove("active");
          selected.classList.add("active");
          active.style.order = selectedOrder;
          selected.style.order = activeOrder;
          setTimeout(function() {
            active.style.transition = "all 1s ease-in";
            selected.style.transition = "all 1s ease-in";
          }, 500);
        }, 1000);
        //     StyleHelpers.applyTransformStyle(active,"translate("+(selectedStyle.center_x-activeStyle.center_x)+"px,"+(selectedStyle.center_y-activeStyle.center_y)+"px)");
        // active.style.width=selectedStyle.width+"px";
        // active.style.height=selectedStyle.height+"px";
        //      StyleHelpers.applyTransformStyle(selected,"translate("+(activeStyle.center_x-selectedStyle.center_x)+"px,"+(activeStyle.center_y-selectedStyle.center_y)+"px)");
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

.point,.multipleColumn,.columnChart,.line
  height 100%!important
  width 100%!important
  background none!important
  .main
    width 100%!important
    height calc(100% - 30px)!important
    margin-top -15px!important

.item {
    padding: 0px;
    margin: 0px;
    width: 40%;
    height: 50%;
    /*width: 68%;
    height: 100%;*/
    position absolute
    transform scale(0.65)
    /*   -webkit-align-items: center;
      align-items: center; */
    text-align: center;
    /*   transition: 2s width; */
    /*   flex-grow: 2; */
    /*   align-items:center;
      -webkit-align-items: center; */
    transition:all 0.7s ease-in;
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
    /*       align-items:flex-start;
      -webkit-align-items: flex-start;
      align-content: flex-start;
      -webkit-align-content: flex-start;
       */
}

.active {
    height 100%
    width: 68%;
    left 30%
    flex-grow: 1;
    flex-shrink:0;
    margin-left: 10px;
    line-height: 300px;
    transform scale(1)
}

.one {
    top: -9%;
    left: -3%;
    order: 1;
}

.two {
    top: 25%!important
    left: -3%;
    top 127px
    order: 2;
}

.three {
    top: 59%!important
    left: -3%;
    top 350px
    order: 3;
}

.four {
    order: 4
}
</style>
