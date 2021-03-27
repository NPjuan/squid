<template>
    <div class="gifts-main" :style="menuStyle" >
      <transition name="fade" mode="out-in">
        <component :is="current" @timeout="handleTimeout" @changeComponent="handleChangeComponent" :picked="picked"></component>
      </transition>
      <alarm-clock top="10vw" left="10vw" :count="180" @timeout="handleTimeout" :key="new Date().getTime()"></alarm-clock>
    </div>
</template>

<script>
  import alarmClock from "../components/alarmClock"
  import giftItem from "../components/exchangeGifts/giftItem"
  import exchangeConfirm from "../components/exchangeGifts/exchangeConfirm"
  import exchangeMain from "../components/exchangeGifts/exchangeMain"
  export default {
    name: "exchangeGifts",
    components: {
      giftItem,
      alarmClock,
      exchangeConfirm,
      exchangeMain
    },
    data() {
      return {
        current: 'exchangeMain',
        isLarge: true,
        picked: {},
        componentList: [{
          name: 'exchangeMain',
          timeout: () => {
            this.$router.push('/')
          },
          isLarge: true
        },{
          name: 'exchangeConfirm',
          timeout: () => {
            this.handleChangeComponent('exchangeMain')
          },
          isLarge: false
        }],
      }
    },
    computed: {
      menuStyle() {
        if (this.isLarge) {
          return {
            width: '50vw',
            height: '43vw',
          }
        } else {
          return {
            width: '30vw',
            height: '16vw',
          }
        }
      },
    },
    methods: {
      handleTimeout() {
        const componentItem = this.componentList.find(item => item.name === this.current)
        componentItem.timeout()
      },
      handleChangeComponent(name, payload) {
        const componentItem = this.componentList.find(item => item.name === name)
        this.current = componentItem.name
        this.isLarge = componentItem.isLarge
        if (name === 'exchangeMain') {
          const { confirm } = payload
          this.confirm = payload ? confirm : false
        } else {
          const { item: { score } } = payload
          console.log('picked', payload)
          this.picked = payload
          this.picked.can = score <= this.$store.state.user.score
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .gifts-main{
    width: 50vw;
    height: 43vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("../assets/resource/center.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    transition: all .25s ease-in-out;
    .common{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .fade-enter-active, .fade-leave-active {
    position: absolute;
    transition: opacity .25s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
