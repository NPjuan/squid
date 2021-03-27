<template>
  <div class="gift-item__container" :style="{
    filter: accept ? 'grayscale(95%)' : 'auto'
  }">
    <div class="img-wrapper">
      <div class="img-border">
        <img :src="picturePath" alt="gift-image">
      </div>
    </div>
    <div>
      <p> {{ count ? `所需积分：${score}` : '礼物已售罄'}}</p>
      <p>{{ name }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "giftItem",
    props: {
      accept: {
        type: Boolean,
        default: false
      },
      count: {
        type: Number,
        default: 0
      },
      picturePath: {
        type: String,
        require
      },
      name: {
        type: String,
        require
      },
      score: {
        type: Number,
        require
      }
    }
  }
</script>

<style scoped lang="scss">
  .gift-item__container{
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    height: 11vw;
    width: 8vw;
    margin: 1vw 2vw;
    p{
      font-size: 10px;
      padding-top: 4px;
      max-width: 100%;
    }
    .img-wrapper{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 6.5vw;
      width: 6.5vw;
      border: 4px solid rgba(0, 119, 137, 0.431);
      border-radius: 50%;
      .img-border{
        height: 5vw;
        width: 5vw;
        border: 4px solid rgb(0, 245, 255);
        background-color: rgba(0, 245, 255, 0.161);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          max-width: 70%;
        }
      }
    }
  }
</style>
