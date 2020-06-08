<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p class="test">Test vm adapt</p>
    <p class="ignore">Test vm adapt ignore</p>
    <p class="test">you'll see the difference when your screen is wider</p>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  mounted() {
    console.log(process.env.VUE_APP_BASEURL)
    console.log(this.$service)
  },
}
</script>

<style scoped>
.test {
  font-size: 16px;
}
.ignore {
  font-size: 16px;
}
</style>
