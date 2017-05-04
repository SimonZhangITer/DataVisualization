<style lang="stylus" rel="stylesheet/stylus">
.mainApp
  position absolute
  height 100%
  width 100%
</style>

<template>
<div class="mainApp">
  <router-view class="router-view"></router-view>
</div>

</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      seller: {}
    }
  },
  created() {}
}

</script>
