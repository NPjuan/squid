<template>
  <div>
    <alarmClock :count="60" left="0" top="2vw" :key="new Date().getTime()" @timeout="$emit('handleTimeout')"></alarmClock>
    <p class="title">当前回收的是：{{ `${bottleName}` }}</p>
    <div class="btns-container">
      <div @click="handleConfirm">确认</div>
      <div @click="handleCancel">取消</div>
    </div>
  </div>
</template>

<script>
  import alarmClock from "../alarmClock"
  export default {
    name: "recoveryConfirm",
    components: {
      alarmClock
    },
    props: {
      bottleName: {
        type: String,
        default: '请等待'
      }
    },
    methods: {
      handleConfirm() {
        this.$emit('changeComponent', 'recoveryWaiting', function () {
          this.$parent.isBottlePictureGet = false
        })
      },
      handleCancel() {
        this.$emit('changeComponent', 'recoveryMain', function () {
          this.isBottlePictureGet = false
        })
      }
    }
  }
</script>

<style scoped lang="scss">
 .title{
   font-size: 1.35vw;
   letter-spacing: .2vw;
   text-align: left;
   width: 100%;
   padding: 2.5vw 3vw 0 8vw;
 }
  .btns-container{
    display: flex;
    justify-content: space-between;
    text-align: center;
    width: 24vw;
    div{
      margin-top: 5vw;
      width: 10vw;
      height: 3.5vw;
      padding-left: .5vw;
      line-height: 3.5vw;
      letter-spacing: 1vw;
      font-size: 1.1vw;
      background-image: url("../../assets/resource/button.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
