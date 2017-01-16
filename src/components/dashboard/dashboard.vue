<template lang="html">
  <div class="dashboard">
    <div class="flex-container column" id="direction" @click="clickChart($event)">
        <div class="item one">
          <point></point>
        </div>
        <div class="item two">
          <column></column>
        </div>
        <div class="item three">
          <v-line></v-line>
        </div>
        <div class="item four active">
          <multipleColumn></multipleColumn>
        </div>
    </div>
  </div>
</template>

<script>
import column from 'components/column/column'
import line from 'components/line/line'
import multipleColumn from 'components/multipleColumn/multipleColumn'
import point from 'components/point/point'

export default {
  mounted() {
    if (!window.StyleHelpers) {
      var StyleHelpers = (function() {
        var applyElementStyle = function(element, styleObj) {
          Object.keys(styleObj).forEach(function(key) {
            if (element.style[key] !== +styleObj[key]) {
              element.style[key] = styleObj[key];
            }
          })
        };
        var applyTransformStyle = function(element, transformValue) {
          var styleObject = {};
          ['webkit', ''].forEach(function(prefix) {
            styleObject[prefix + 'Transform'] = transformValue;
          });
          applyElementStyle(element, styleObject);
        };
        return {
          applyElementStyle: applyElementStyle,
          applyTransformStyle: applyTransformStyle
        }
      })();
      window.StyleHelpers = StyleHelpers;
    }
    // items[i].style.backgroundColor = 'rgba(32, 32, 35, 0.2)'
  },
  methods: {
    clickChart(e) {
      var _arr = Array.prototype.slice.call(e.target.classList);
      var selected = e.target;
      var active = document.querySelector(".active");
      if (active) {
        return
      }
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

<style lang="stylus">
* {
    box-sizing: border-box;
}

.point,.multipleColumn,.columnChart,.line
  height 100%!important
  width 100%
  background none!important
  .main
    width 100%!important
    height calc(100% - 30px)!important
    margin-top -15px

.item {
    padding: 0px;
    margin: 0px;
    /*width: 31%;
    height: 32%;*/
    width: 40%;
    height: 50%;
    position absolute
    /*   -webkit-align-items: center;
      align-items: center; */
    text-align: center;
    /*   transition: 2s width; */
    /*   flex-grow: 2; */
    /*   align-items:center;
      -webkit-align-items: center; */
    transition:all 1s ease-in;
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
    flex-grow: 1;
    flex-shrink:0;
    left 30%
    margin-left: 10px;
    line-height: 300px;
}

.one {
    top: -9%;
    left: -3%;
    order: 1;
    transform scale(0.65)
}

.two {
    top: 25%!important;
    left: -3%;
    top 127px
    order: 2;
    transform scale(0.65)
}

.three {
    top: 59%!important;
    left: -3%;
    top 350px
    order: 3;
    transform scale(0.65)
}

.four {
    order: 4
}
</style>
