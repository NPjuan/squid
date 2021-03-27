<template>
  <div class="container">
    <alarmClock :count="180" left="3vw" top="4vw"  @timeout="$emit('handleTimeout')" :key="new Date().getTime()"></alarmClock>
    <p class="title">请放入可回收塑料瓶</p>
    <p class="points">当前积分：{{ $store.state.user.score || 0 }}</p>
    <div class="options-container">
      <div class="options" v-for="group in options">
        {{group.name}}：<span>{{group.count}}</span>
      </div>
    </div>
    <div class="complete-btn" @click="$router.push('/exchangeGifts')">完成回收</div>
  </div>
</template>

<script>
  import alarmClock from "../alarmClock"
  export default {
    name: "recoveryMain",
    components: {
      alarmClock
    },
    props: {
      options: {
        type: Array,
        require
      }
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped lang="scss">
  .container{
    .title{
      padding-top: 6vw;
      font-size: 2vw;
      letter-spacing: .5vw;
    }
    .points{
      padding-top: 1.8vw;
      font-size: 12px;
      letter-spacing: .2vw;
    }
    .options-container{
      padding-top: 4.5vw;
      display: flex;
      width: 40vw;
      justify-content: space-between;
      .options{
        width: 12vw;
        height: 4vw;
        line-height: 3vw;
        font-size: 1vw;
        background-size: contain;
        background-repeat: no-repeat;
        background-image: url("../../assets/resource/options.png");
        span{
          font-size: 1.2vw;
          padding-left: 1.25vw;
        }
      }
    }
    .complete-btn{
      margin-top: 3vw;
      width: 15vw;
      height: 4vw;
      font-size: 1.3vw;
      line-height: 4vw;
      background-image: url("../../assets/resource/button.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .complete-btn:active{
      background-image: url("../../assets/resource/button-active.png");
    }
  }
</style>
