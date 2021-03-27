<template>
  <div style="position: absolute;width: 100%;height: 100%" @click="toggle">
    <video id="advertisement" autoplay loop style="width: 100%;height: 100%">
      <source src="http://210.38.1.142:8081/IXCa767f5ad65cb5d62f88971244477ee04_10.99.100.197/picture/movie.53dd3b7.mp4" type="video/mp4">
    </video>
  </div>
</template>

<script>
  export default {
    name: "Advisement",
    data() {
      return {
        advisementSrc: 'http:47.115.60.70:8080/picture/movie.53dd3b7.mp4'
      }
    },
    created() {
      this.$store.commit('resetUser')
    },
    methods: {
      toggle() {
        this.$router.push('/')
      }
    },
  }
</script>

<style scoped>

</style>
