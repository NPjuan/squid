<template>
  <div>
    <p class="title">请等待回收</p>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-loading"></use>
    </svg>
  </div>
</template>

<script>
  export default {
    name: "recoveryWaiting",
    props: {
      bottleName: {
        type: String,
        default: 'suliaoping'
      }
    },
    mounted() {
      const year = new Date().getFullYear()
      const month = new Date().getMonth() + 1
      const day = new Date().getDate()
      const hour = new Date().getHours()
      const minutes = new Date().getMinutes()
      const seconds = new Date().getSeconds()
      const time = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
      const faceId = this.$store.state.user.id
      const token = this.$store.state.token

      this.$axios.post('https://www.gdutcatming.top:8888/box/bottleRecord/deliverBottle', {
        bottleRecord: {
          faceId,
          id: 1,
          model: 1,
          score: 500,
          status: 0,
          time,
          uuid: ""
        },
        bottleRecordDetailList: [
          {
            score: 500,
            time,
            type: this.bottleName
          }
        ],
        token
      })
        .then(({data: {data, code, message}}) => {
          console.log('code', code)
          console.log('积分增加')
          return this.$axios.get('/user/receiveBottle')
        })
        .then(({ data: {code, data, msg}}) => {
          console.log('瓶子回收完毕')
          setTimeout(() => {
            this.$store.commit('increaseScore', 500)
            this.$emit('changeComponent', 'recoveryMain', function () {
              this.isBottlePictureGet = false
            })
          }, 14000)
        })
    }
  }
</script>

<style scoped lang="scss">
  .title{
    padding-top: 3.5vw;
    padding-bottom: 2vw;
    font-size: 1.5vw;
    letter-spacing: .5vw;
    text-align: center;
    width: 100%;
  }
  .icon {
    width: 4vw; height: 4vw;
    vertical-align: -1rem;
    fill: #00f5ff;
    overflow: hidden;
    animation: rotate 3s linear infinite;
  }
  @keyframes rotate {
    0%{
      transform: rotate(0);
    }
    100%{
      transform: rotate(360deg);
    }
  }
</style>
