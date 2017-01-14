<style lang="stylus">
.v-checkbox
  position relative
  display inline-block
  width 13px
  height 13px
  border-radius 2px
  border 1px solid rgba(255, 255, 255, 0.5)
  &.checked
    background #4EAD6C
    border none
    &:after
      content ''
      position absolute
      left 4px
      top 2px
      width 3px
      height 6px
      border-right 1px solid white
      border-bottom 1px solid white
      transform rotate(45deg)
</style>
<template lang="html">
  <span class="v-checkbox" :class="{'checked':isChecked}"></span>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: true
    }
  }
}

</script>
