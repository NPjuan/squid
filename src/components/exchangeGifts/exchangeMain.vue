<template>
  <div class="gifts-container">
    <gift-item v-for="(item, index) in gifts"
               :picturePath="item.picturePath"
               :name="item.name"
               :score="item.score"
               @click.native="handleGiftClick(item, index)"
               :accept="!giftStatus[index]"
               :count="giftStatus[index]"
    ></gift-item>
    <div class="QR-code">
      <p>当前积分：{{ $store.state.user.score || 0 }}</p>
      <img src="../../assets/resource/littleProgram.jpg" alt="wx-qrCode">
      <p>微信扫码兑换更多礼品</p>
    </div>
  </div>
</template>

<script>
  import giftItem from "./giftItem"
  import alarmClock from "../alarmClock"
  export default {
    name: "exchangeMain",
    components: {
      giftItem,
      alarmClock
    },
    props: {

    },
    data() {
      return {
        giftStatus: [],
        gifts: []
      }
    },
    created() {
      this.$axios.get('/gift/giftStatus')
        .then(({data: {data, code}}) => {
          if (code == '500000'){
            this.giftStatus = data
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.$axios.post('http://www.gdutcatming.top:80/BottleProject/gift/getGiftList.do')
        .then(({data: {data, code}}) => {
          if (code == 0) {
            this.gifts = data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      handleGiftClick(item, index) {
        if (!this.giftStatus[index]) return
        console.log('status', !!this.giftStatus[index])
        this.$emit('changeComponent', 'exchangeConfirm', {
          item,
          index
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .gifts-container{
    width: 50vw;
    height: 43vw;
    display: flex;
    flex-wrap: wrap;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    justify-content: center;
    align-content: center;
    .gift-item__container{
      display: flex;
      flex-flow: column;
      text-align: center;
      height: 11vw;
      margin: 1vw 2vw;
      p{
        font-size: 10px;
        padding-top: 4px;
      }
      .img-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 8vw;
        width: 8vw;
        border: 4px solid rgba(0, 119, 137, 0.431);
        border-radius: 50%;
        .img-border{
          height: 6vw;
          width: 6vw;
          border: 4px solid rgb(0, 245, 255);
          background-color: rgba(0, 245, 255, 0.161);
          border-radius: 50%;
        }
      }
    }
    .QR-code{
      position: fixed;
      right: 6vw;
      bottom: 6vw;
      width: 12vw;
      height: 15vw;
      text-align: center;
      p{
        padding: 5px 0;
      }
      img{
        max-width: 100%;
      }
    }
  }
</style>
