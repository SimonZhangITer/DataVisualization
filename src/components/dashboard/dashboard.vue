<template lang="html">
  <div class="dashboard">
    <div class="flex-container column" id="direction" @click="clickChart($event)">
        <div class="item one" data-color="2a80b9">
          <column></column>
        </div>
        <div class="item two" data-color="8f44ad">2</div>
        <div class="item three" data-color="16a086">3</div>
        <div class="item four active" data-color="f1c40f">4</div>
    </div>
  </div>
</template>

<script>
import column from 'components/column/column'

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
    for (var items = document.querySelectorAll(".item"), i = 0; i < items.length; i++) {
      if (items[i].hasAttribute("data-color")) {
        var color = items[i].getAttribute("data-color");
        items[i].style.backgroundColor = "#" + color
      }
    }
  },
  methods: {
    clickChart(e) {
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
    column
  }
}

</script>

<style lang="stylus">
* {
    box-sizing: border-box;
}

.item {
    padding: 0px;
    margin: 0px;
    width: 200px;
    height: 90px;
    line-height: 90px;
    /*   -webkit-align-items: center;
      align-items: center; */
    text-align: center;
    /*   transition: 2s width; */
    /*   flex-grow: 2; */
    /*   align-items:center;
      -webkit-align-items: center; */
    transition:all 1s ease-in;

}

.dashboard {
    width 100%
    height 100%
    background-color: black;
    margin:0px;
    padding:0px;
}

.flex-container.column {
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    height: 300px;
    width: 500px;
    overflow: hidden;
    display: flex;
    display: -webkit-flex;
    margin: 100px auto;
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
    width: 300px;
    flex-grow: 1;
    flex-shrink:0;
    margin-left: 10px;
    line-height: 300px;
}

.one {
    order: 1;
}

.two {
    order: 2;
}

.three {
    order: 3;
}

.four {
    order: 4
}
</style>
