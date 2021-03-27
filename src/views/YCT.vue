<template>
  <div class="container">
    <div class="yct-main" :style="menuStyle">
      <component is="yctWaiting"></component>
    </div>
  </div>
</template>

<script>
  import yctWaiting from "../components/yct/yctWaiting"
  export default {
    name: "YCT",
    components: {
      yctWaiting
    },
    data() {
      return {}
    },
    computed: {
      menuStyle() {
        return {
          width: '30vw',
          height: '16vw',
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    .yct-main{
      display: flex;
      flex-flow: column;
      align-items: center;
      text-align: center;
      background-image: url("../assets/resource/exchange.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      transition: all .25s ease-in-out;
    }
  }
</style>
