<template>
  <div class="exchange-confirm">
    <p class="title" :style="{
      fontSize: isLoading ? '2vw' : '1.2vw',
      textAlign: isLoading ? 'center' : 'left'
    }">{{ isSuccess ? title : '兑换失败' }}</p>
    <div class="btns-container"
         v-if="!isLoading"
         :style="{
      justifyContent: picked.can ? 'space-between' : 'center'
    }">
      <div @click="handleConfirm" v-if="this.picked.can">确认</div>
      <div @click="handleCancel">取消</div>
    </div>
  </div>
</template>

<script>
  import alarmClock from "../alarmClock"
  export default {
    name: "exchangeConfirm",
    components: {
      alarmClock
    },
    props: {
      picked: {
        type: Object,
        require
      }
    },
    data() {
      return {
        isLoading: false,
        isSuccess: true
      }
    },
    methods: {
      handleConfirm() {
        this.isLoading = true
        const year = new Date().getFullYear()
        const month = new Date().getMonth() + 1
        const day = new Date().getDate()
        const hour = new Date().getHours()
        const minutes = new Date().getMinutes()
        const seconds = new Date().getSeconds()
        const date = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
        const faceId = this.$store.state.user.id
        const { score, giftId } = this.picked.item
        const token = this.$store.state.token
        this.$axios.get(`/gift/run/${this.picked.index}`)
          .then(({data: {code, message}}) => {
            if (code == 500000) {
              console.log('机器转动成功')
              this.$store.commit('reduceScore', 500)
              return this.$axios.post('https://www.gdutcatming.top:8888/box/giftRecord/exchangeGift', {
                giftRecord: {
                  date,
                  faceId,
                  giftId,
                  id: '0',
                  modelId: 1,
                  score
                },
                token
              })
            } else {
              this.isSuccess = false
            }
          })
          .then(({data: {code, message}}) => {
            if (code == 500000) {
              console.log('积分减少成功')
            }
          })
          .catch(reason => {
            console.log('reason', reason)
          })
          .finally(() => {
            setTimeout(() => {
              this.$emit('changeComponent', 'exchangeMain', {
                confirm: true,
                pickIndex: this.picked.index
              })
            }, 1500)
          })
      },
      handleCancel() {
        this.$emit('changeComponent', 'exchangeMain', {
          confirm: false
        })
      }
    },
    computed: {
      title() {
        if (this.isLoading) {
          return '请等待'
        } else if (this.picked.can){
          return `你选择的是：${this.picked.item.name}`
        } else {
          return '积分不足'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .exchange-confirm{
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 30vw;
    height: 16vw;
    .title{
      font-size: 1.2vw;
      letter-spacing: .2vw;
      text-align: left;
      width: 100%;
      padding: 0 3.5vw;
    }
    .btns-container{
      display: flex;
      justify-content: center;
      text-align: center;
      width: 24vw;
      div{
        margin-top: 3vw;
        width: 10vw;
        height: 3.4vw;
        padding-left: .5vw;
        line-height: 3.5vw;
        letter-spacing: 1vw;
        font-size: 1.1vw;
        background-image: url("../../assets/resource/button.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
</style>
