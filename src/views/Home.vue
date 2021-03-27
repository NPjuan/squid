<template>
  <div class="home-main">
    <alarmClock :count="180" left="10vw" top="0"  @timeout="handleTimeout"></alarmClock>
    <main>
      <img src="../assets/resource/title.png" alt="title" class="img-title">
      <img src="../assets/resource/recovery.png" alt="recovery" class="img-recovery">
      <button class="center-operation" @click="recovery">我要回收</button>
    </main>
    <aside>
      <img v-for="(group, index) in menu" :src="group.src" alt="images" @click="jump(index)">
    </aside>
  </div>
</template>

<script>
// @ is an alias to /src

import alarmClock from "../components/alarmClock"
export default {
  name: 'Home',
  components: {
    alarmClock
  },
  data() {
    return {
      menu: [
        {
          src: require('../assets/resource/brushFaceLogin.png'),
          route: '/brushFace'
        },
        {
          src: require('../assets/resource/Instructions.png'),
          route: '/instruction'
        },
        {
          src: require('../assets/resource/yct.png'),
          route: '/yct'
        },
      ]
    }
  },
  methods: {
    recovery() {
      this.$router.push('/recovery')
    },
    jump(index) {
      this.$router.push(this.menu[index].route)
    },
    handleTimeout() {
      this.$router.push('/advisement')
    }
  }
}
</script>

<style scoped lang="scss">
  .home-main {
    position: relative;
    width: 70vw;
    height: 28vw;
    display: flex;
    justify-content: center;
    main{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 30vw;
      background-image: url("../assets/resource/center.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .img-title{
        padding-top: 1vw;
        width: 18vw;
      }
      .img-recovery{
        margin-top: -4vw;
        width: 6.5vw
      }
      button{
        margin-top: -5vw;
        width: 18vw;
        height: 3.5vw;
        border: 2px solid rgb(0,245, 255);
        border-radius: 4px;
        font-size: 1vw;
        font-weight: bold;
        letter-spacing: 8px;
        color: rgb(0,245, 255);
        background-color: rgba(0, 53, 76, .76);
      }
    }
    aside{
      position: absolute;
      right: 0;
      top: 0;
      width: 10vw;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: flex-end;
      height: 100%;
      img{
        width: 8vw;
        margin: 1.5vw 0 ;
      }
    }
  }
</style>
