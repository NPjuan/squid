<template>
  <div id="clock" @click="reset" :style="{
    top,
    left
  }">
    <p><span>{{ time }}</span> s</p>
    <p>后自动返回</p>
    <p>或点我返回</p>
  </div>
</template>

<script>
  export default {
    name: "alarmClock",
    props: {
      count: {
        type: Number,
        default: 60
      },
      left: {
        type: String,
        require
      },
      top: {
        type: String,
        require
      },
    },
    data() {
      return {
        time: this.count, // 通过属性传值来获取 timeout,
        timer: null       // 定时器
      }
    },
    watch: {
      count(val) {
        this.time = val
      },
    },
    methods: {
      reset() {
        this.$emit('timeout')
      }
    },
    mounted() {
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--
        } else {
          // 触发父组件的回调函数
          clearInterval(this.timer)
          this.$emit('timeout')
        }
      }, 1000)
    },
    beforeDestroy() {
      // 销毁组件前清除定时器
      clearInterval(this.timer)
      console.log('定时器已销毁')
    }
  }
</script>

<style scoped lang="scss">
  #clock{
    position: absolute;
    color: rgb(0,245, 255);
    width: 10vw;
    text-align: center;
    z-index: 5;
    font-size: 12px;
    span{
      font-size: 22px;
      letter-spacing: .25vw;
    }
  }
</style>
