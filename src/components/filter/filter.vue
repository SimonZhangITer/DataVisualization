<template lang="html">
  <div class="filter">
    <div class="startTime">
      <span class="text">起始时间</span>2012.04.12<i class="icon"></i>
    </div>
    <div class="endTime">
      <span class="text">截止时间</span> 2022.04.12<i class="icon"></i>
    </div>
    <div class="products">
      产品<i class="arrow"></i>
    </div>
  </div>
</template>

<script>
export default {}

</script>

<style lang="stylus">
.filter
  padding 25px 0 0 20px
  font-size 12px
  .startTime
    display inline-block
  .endTime
    display inline-block
    padding-left 42px
  .text
    opacity 0.69
    padding-right 7px
  .products
    position absolute
    display inline-block
    right 36px
    .arrow
      position absolute
      width 6px
      height 6px
      margin-left 10px
      border-left 2px solid white
      border-bottom 2px solid white
      transform rotate(-45deg)
</style>
