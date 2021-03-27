<template>
  <main>
    <alarm-clock :count="timeoutCount" @timeout="handleTimeout" left="63vw"></alarm-clock>
    <p class="title">请放入羊城通卡</p>
    <p class="hint"> {{ hint }} </p>
  </main>
</template>

<script>
  import alarmClock from "../alarmClock"
  export default {
    name: "yctWaiting",
    components: {
      alarmClock
    },
    data() {
      return {
        timeoutCount: 60,
        hint: '检测中，请勿拿走卡片',
        isInventory: false
      }
    },
    methods: {
      handleTimeout() {
        this.$router.push('/')
      },
      inventory() {
        if (this.isInventory) {
          return
        }
        this.$axios.get('/user/inventory')
          .then(({ data: { code, data, msg} }) => {
            this.hint = msg
            console.log('msg', msg)
            console.log('code', code)
            if (code === '500000') {
              this.isInventory = true
              this.timeoutCount = 3
              this.hint = msg + `余额为：${parseInt(data, 16)}`
            }
          })
          .catch(err => {
            console.log('err', err)
          })
          .finally(this.inventory)
      },
    },
    mounted() {
      this.inventory()
    },
    beforeDestroy() {
      this.isInventory = true
    }
  }
</script>

<style scoped lang="scss">
  .title{
    padding-top: 3.2vw;
    font-size: 2vw;
    letter-spacing: .2vw;
  }
  .hint{
    padding-top: 2.5vw;
    font-size: 1.35vw;
    letter-spacing: .2vw;
  }
</style>
