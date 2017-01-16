<style lang="stylus" rel="stylesheet/stylus">
.mainApp
  position absolute
  height 100%
  width 100%
</style>

<template>
<div class="mainApp">
  <!-- <div class="tab">
    <div class="tab-item">
      <router-link to="/dashboard">Go to dashboard</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/column">Go to column</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/funnel">Go to funnel</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/heat">Go to heat</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/point">Go to point</router-link>
    </div>
  </div> -->
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
