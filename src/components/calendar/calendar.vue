<style scoped>
.calendar {
  position: fixed;
  width: 300px;
  padding: 10px;
  background: #fff;
  position: absolute;
  border: 1px solid #DEDEDE;
  border-radius: 2px;
  opacity: .95;
  transition: all .5s ease;
  z-index: 9999;
}

.calendar-enter,
.calendar-leave {
  opacity: 0;
  transform: translate3d(0, -10px, 0);
}

.calendar:before {
  position: absolute;
  left: 30px;
  top: -10px;
  content: "";
  border: 5px solid rgba(0, 0, 0, 0);
  border-bottom-color: #DEDEDE;
}

.calendar:after {
  position: absolute;
  left: 30px;
  top: -9px;
  content: "";
  border: 5px solid rgba(0, 0, 0, 0);
  border-bottom-color: #fff;
}

.calendar-tools {
  height: 32px;
  font-size: 20px;
  line-height: 32px;
  color: #5e7a88;
}

.calendar-tools .float.left {
  float: left;
}

.calendar-tools .float.right {
  float: right;
}

.calendar-tools input {
  font-size: 20px;
  line-height: 32px;
  color: #5e7a88;
  width: 70px;
  text-align: center;
  border: none;
  background-color: transparent;
}

.calendar-tools span {
  cursor: pointer;
}

.calendar-prev {
  float: left;
}

.calendar-next {
  float: right;
}

.calendar table {
  clear: both;
  width: 100%;
  margin-bottom: 10px;
  border-collapse: collapse;
  color: #444444;
}

.calendar td {
  margin: 2px !important;
  padding: 0px 0;
  width: 14.28571429%;
  height: 34px;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  line-height: 125%;
  cursor: pointer;
}

.calendar td.week {
  pointer-events: none !important;
  cursor: default !important;
}

.calendar td.disabled {
  color: #c0c0c0;
  pointer-events: none !important;
  cursor: default !important;
}

.calendar td span {
  display: block;
  height: 30px;
  line-height: 30px;
  margin: 2px;
  border-radius: 2px;
}

.calendar td span:hover {
  background: #f3f8fa;
}

.calendar td.selected span {
  background-color: #5e7a88;
  color: #fff;
}

.calendar td.selected span:hover {
  background-color: #5e7a88;
  color: #fff;
}

.calendar thead td {
  text-transform: uppercase;
}

.calendar .timer {
  margin: 10px 0;
  text-align: center;
}

.calendar .timer input {
  border-radius: 2px;
  padding: 5px;
  font-size: 14px;
  line-height: 18px;
  color: #5e7a88;
  width: 50px;
  text-align: center;
  border: 1px solid #efefef;
}

.calendar .timer input:focus {
  border: 1px solid #5e7a88;
}

.calendar-button {
  text-align: center;
}

.calendar-button span {
  cursor: pointer;
  display: inline-block;
  min-height: 1em;
  min-width: 5em;
  vertical-align: baseline;
  background: #5e7a88;
  color: #fff;
  margin: 0 .25em 0 0;
  padding: .6em 2em;
  font-size: 1em;
  line-height: 1em;
  text-align: center;
  border-radius: .3em;
}

.calendar-button span.cancel {
  background: #efefef;
  color: #666;
}

.calendar .lunar {
  font-size: 11px;
  line-height: 150%;
  color: #aaa;
}

.calendar td.selected .lunar {
  color: #fff;
}

</style>

<template>
<div @click.stop="" class="calendar" v-show="show" :style="{'left':x+'px','top':y+'px'}" transition="calendar" transition-mode="out-in">
  <div v-if="type!=='time'">
    <div class="calendar-tools">
      <span class="calendar-prev" @click="prev">
                    <svg width="16" height="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="transform-group"><g transform="scale(0.015625, 0.015625)"><path d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872l-318.016 318.048 318.016 318.016c18.752 18.752 18.752 49.12 0 67.872C696.544 907.328 684.256 912 671.968 912z" fill="#5e7a88"></path></g></g></svg>
                </span>
      <span class="calendar-next" @click="next">
                    <svg width="16" height="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="transform-group"><g transform="scale(0.015625, 0.015625)"><path d="M761.056 532.128c0.512-0.992 1.344-1.824 1.792-2.848 8.8-18.304 5.92-40.704-9.664-55.424L399.936 139.744c-19.264-18.208-49.632-17.344-67.872 1.888-18.208 19.264-17.376 49.632 1.888 67.872l316.96 299.84-315.712 304.288c-19.072 18.4-19.648 48.768-1.248 67.872 9.408 9.792 21.984 14.688 34.56 14.688 12 0 24-4.48 33.312-13.44l350.048-337.376c0.672-0.672 0.928-1.6 1.6-2.304 0.512-0.48 1.056-0.832 1.568-1.344C757.76 538.88 759.2 535.392 761.056 532.128z" fill="#5e7a88"></path></g></g></svg>
                </span>
      <div class="text center">
        <input type="text" v-model="year" :value="year" @change="render(year,month)" min="1970" max="2100" maxlength="4"> / {{monthString}}
      </div>
    </div>
    <table cellpadding="5">
      <thead>
        <tr>
          <td v-for="week in weeks" class="week">{{week}}</td>
        </tr>
      </thead>
      <tr v-for="(day,dayIndex) in days">
        <td v-for="(child,childIndex) in day" :class="{'selected':child.selected,'disabled':child.disabled}" @click="select(dayIndex,childIndex,$event)" @touchstart="select(k1,k2,$event)">
          <span>{{child.day}}</span>
          <div class="lunar" v-if="showLunar">{{child.lunar}}</div>
        </td>
      </tr>
    </table>
  </div>
  <div class="calendar-time" v-show="type=='datetime'||type=='time'">
    <div class="timer">
      <input type="text" v-model="hour" :value="hour" min="0" max="23" maxlength="2"> 时
      <input type="text" v-model="minute" :value="minute" min="0" max="59" maxlength="2"> 分
      <input type="text" v-model="second" :value="second" min="0" max="59" maxlength="2"> 秒
    </div>
  </div>
  <div class="calendar-button" v-show="type=='datetime'||type=='time'||range">
    <span @click="ok">确定</span>
    <span @click="cancel" class="cancel">取消</span>
  </div>
</div>

</template>

<script>
import propsync from '../../assets/propsync'; //引入mixin文件

export default {
  mixins: [propsync], //声明使用propsync的mixin
  props: {
    show: {
      type: Boolean,
      twoWay: true,
      default: false
    },
    type: {
      type: String,
      default: "date"
    },
    value: {
      type: String,
      twoWay: true,
      default: ""
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    begin: {
      type: String,
      twoWay: true,
      default: ""
    },
    end: {
      type: String,
      default: ""
    },
    range: {
      type: Boolean,
      default: false
    },
    // rangeBegin: {
    //   type: Array,
    //   default: Array
    // },
    // rangeEnd: {
    //   type: Array,
    //   default: Array
    // },
    sep: {
      type: String,
      twoWay: true,
      default: ""
    },
    weeks: {
      type: Array,
      default: function() {
        return ['日', '一', '二', '三', '四', '五', '六']
      }
    },
    months: {
      type: Array,
      default: function() {
        return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
      }
    }
  },
  data() {
    return {
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      days: [],
      today: [],
      currentMonth: Number,
      monthString: "",
      showLunar: true,
      rangeBegin: [],
      rangeEnd: []
    }
  },
  created() {
    console.log('ss');
    this.init()
      // 延迟绑定事件，防止关闭
    window.setTimeout(() => {
      document.addEventListener('click', (e) => {
        e.stopPropagation()
        this.cancel()
      }, false)
    }, 500)
  },
  // 测试用
  watch: {
    // year(val, old) {
    //     console.log("new %s old %s time:%s", val, old, +new Date)
    // },
    show() {
      this.init()
    },
    value() {
      this.init()
    }
  },
  methods: {
    // 日期补零
    zero(n) {
      return n < 10 ? '0' + n : n
    },
    // 初始化一些东西
    init() {
      var now = new Date();
      if (this.p_value !== "") {
        if (this.p_value.indexOf("-") !== -1) this.sep = "-"
        if (this.p_value.indexOf(".") !== -1) this.sep = "."
        if (this.p_value.indexOf("/") !== -1) this.sep = "/"
        if (this.type == "date") {
          var split = this.p_value.split(this.sep)
          this.year = parseInt(split[0])
          this.month = parseInt(split[1]) - 1
          this.day = parseInt(split[2])
        } else if (this.type == "datetime") {
          var split = this.p_value.split(" ")
          var splitDate = split[0].split(this.sep)
          this.year = parseInt(splitDate[0])
          this.month = parseInt(splitDate[1]) - 1
          this.day = parseInt(splitDate[2])
          if (split.length > 1) {
            var splitTime = split[1].split(":")
            this.hour = splitTime[0]
            this.minute = splitTime[1]
            this.second = splitTime[2]
          }
        }
        if (this.range) {
          var split = this.p_value.split(" ~ ")
          if (split.length > 1) {
            var beginSplit = split[0].split(this.sep)
            var endSplit = split[1].split(this.sep)
            this.rangeBegin = [parseInt(beginSplit[0]), parseInt(beginSplit[1] - 1), parseInt(beginSplit[2])]
            this.rangeEnd = [parseInt(endSplit[0]), parseInt(endSplit[1] - 1), parseInt(endSplit[2])]
          }
        }
      } else {
        if (this.sep == "") this.sep = "/"
        this.year = now.getFullYear()
        this.month = now.getMonth()
        this.day = now.getDate()
        this.hour = this.zero(now.getHours())
        this.minute = this.zero(now.getMinutes())
        this.second = this.zero(now.getSeconds())
        if (this.range) {
          this.rangeBegin = Array
          this.rangeEnd = Array
        }
      }
      this.monthString = this.months[this.month]
      this.render(this.year, this.month)
    },
    // 渲染日期
    render(y, m) {
      if (!this.range) {
        this.rangeBegin = []
        this.rangeEnd = []
      }
      var firstDayOfMonth = new Date(y, m, 1).getDay() //当月第一天
      var lastDateOfMonth = new Date(y, m + 1, 0).getDate() //当月最后一天
      var lastDayOfLastMonth = new Date(y, m, 0).getDate() //最后一月的最后一天
      this.year = y
      this.currentMonth = this.months[m]
      var seletSplit = this.p_value.split(" ")[0].split(this.sep)

      var i, line = 0,
        temp = []
      for (i = 1; i <= lastDateOfMonth; i++) {
        var dow = new Date(y, m, i).getDay()
          // 第一行
        if (dow == 0) {
          temp[line] = []
        } else if (i == 1) {
          temp[line] = []
          var k = lastDayOfLastMonth - firstDayOfMonth + 1
          for (var j = 0; j < firstDayOfMonth; j++) {
            temp[line].push({
              day: k,
              disabled: true
            })
            k++;
          }
        }

        // 如果是日期范围
        if (this.range) {
          var options = {
            day: i
          }
          if (this.rangeBegin.length > 0) {
            var beginTime = Number(new Date(this.rangeBegin[0], this.rangeBegin[1], this.rangeBegin[2]))
            var endTime = Number(new Date(this.rangeEnd[0], this.rangeEnd[1], this.rangeEnd[2]))
            var thisTime = Number(new Date(this.year, this.month, i))
            if (beginTime <= thisTime && endTime >= thisTime) {
              options.selected = true
            }
          }
          temp[line].push(options)
        } else {
          // 单选模式
          var chk = new Date()
          var chkY = chk.getFullYear()
          var chkM = chk.getMonth()
            // 匹配上次选中的日期
          if (
            parseInt(seletSplit[0]) == this.year &&
            parseInt(seletSplit[1]) - 1 == this.month &&
            parseInt(seletSplit[2]) == i) {
            temp[line].push({
              day: i,
              selected: true
            })
            this.today = [line, temp[line].length - 1]
          }

          // 没有默认值的时候显示选中今天日期
          else if (chkY == this.year && chkM == this.month && i == this.day && this.p_value == "") {
            temp[line].push({
              day: i,
              selected: true
            })
            this.today = [line, temp[line].length - 1]
          } else {
            // 设置可选范围
            // console.log(this.begin,this.end);
            var options = {
              day: i,
              selected: false,
            }
            if (this.begin !== "") {

              var beginSplit = this.begin.split(this.sep)
              var beginTime = Number(new Date(
                parseInt(beginSplit[0]),
                parseInt(beginSplit[1]) - 1,
                parseInt(beginSplit[2])
              ))
              if (beginTime > Number(new Date(this.year, this.month, i))) options.disabled = true
            }
            if (this.end !== "") {
              var endSplit = this.end.split(this.sep)
              var endTime = Number(new Date(
                parseInt(endSplit[0]),
                parseInt(endSplit[1]) - 1,
                parseInt(endSplit[2])
              ))
              if (endTime < Number(new Date(this.year, this.month, i))) options.disabled = true
            }
            temp[line].push(options)
          }
        }

        // 最后一行
        if (dow == 6) {
          line++
        } else if (i == lastDateOfMonth) {
          var k = 1
          for (dow; dow < 6; dow++) {
            temp[line].push({
              day: k,
              disabled: true
            })
            k++
          }
        }
      } //end for

      this.days = temp
    },
    // 上月
    prev(e) {
      e.stopPropagation()
      if (this.month == 0) {
        this.month = 11
        this.year = parseInt(this.year) - 1
      } else {
        this.month = parseInt(this.month) - 1
      }
      this.monthString = this.months[this.month]
      this.render(this.year, this.month)
    },
    //  下月
    next(e) {
      e.stopPropagation()
      if (this.month == 11) {
        this.month = 0
        this.year = parseInt(this.year) + 1
      } else {
        this.month = parseInt(this.month) + 1
      }
      this.monthString = this.months[this.month]
      this.render(this.year, this.month)
    },
    // 选中日期
    select(k1, k2, e) {
      if (e !== undefined) e.stopPropagation()
        // 日期范围
      if (this.range) {
        if (this.rangeBegin.length == 0 || this.rangeEndTemp !== 0) {
          this.rangeBegin = [this.year, this.month, this.days[k1][k2].day, this.hour, this.minute, this.second]
          this.rangeBeginTemp = this.rangeBegin
          this.rangeEnd = [this.year, this.month, this.days[k1][k2].day, this.hour, this.minute, this.second]
          this.rangeEndTemp = 0
        } else {
          this.rangeEnd = [this.year, this.month, this.days[k1][k2].day, this.hour, this.minute, this.second]
          this.rangeEndTemp = 1
            // 判断结束日期小于开始日期则自动颠倒过来
          if (+new Date(this.rangeEnd[0], this.rangeEnd[1], this.rangeEnd[2]) < +new Date(this.rangeBegin[0], this.rangeBegin[1], this.rangeBegin[2])) {
            this.rangeBegin = this.rangeEnd
            this.rangeEnd = this.rangeBeginTemp
          }
        }
        this.render(this.year, this.month)
      } else {
        // 取消上次选中
        if (this.today.length > 0) {
          this.days.forEach(v => {
              v.forEach(vv => {
                vv.selected = false
              })
            })
            // this.days[this.today[0]][this.today[1]].selected = false
        }
        // 设置当前选中天
        this.days[k1][k2].selected = true
        this.day = this.days[k1][k2].day
        this.today = [k1, k2]
        if (this.type == 'date') {
          this.p_value = this.year + this.sep + this.zero(this.month + 1) + this.sep + this.zero(this.days[k1][k2].day)
          this.p_show = false
        }
      }

    },
    // 多选的时候提交
    ok() {
      // 只有有日期的时候才执行
      if (this.type !== "time") {
        let isSelected = false
        this.days.forEach(v => {
          v.forEach(vv => {
            if (vv.selected) {
              isSelected = true
            }
          })
        })
        if (!isSelected) return false
      }

      if (this.range) {
        this.p_value = this.output(this.rangeBegin) + " ~ " + this.output(this.rangeEnd)
      } else {
        this.p_value = this.output([
          this.year,
          this.month,
          this.day,
          parseInt(this.hour),
          parseInt(this.minute),
          parseInt(this.second)
        ])
      }
      this.p_show = false
    },
    // 隐藏控件
    cancel() {
      this.p_show = false
    },
    // 格式化输出
    output(args) {
      if (this.type == 'time') {
        return this.zero(args[3]) + ":" + this.zero(args[4]) + ":" + this.zero(args[5])
      }
      if (this.type == 'datetime') {
        return args[0] + this.sep + this.zero(args[1] + 1) + this.sep + this.zero(args[2]) + " " + this.zero(args[3]) + ":" + this.zero(args[4]) + ":" + this.zero(args[5])
      }
      if (this.type == 'date') {
        return args[0] + this.sep + this.zero(args[1] + 1) + this.sep + this.zero(args[2])
      }
    }
  }
}

</script>
