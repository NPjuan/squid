<template>
  <div id="app" v-cloak>
    <div id="holder">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  height: 0;
  padding-bottom: 56.25%;
  color: rgb(0,245, 255);
  background-image: url("./assets/resource/bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  #holder{
    position: absolute;
    height: 100%;
    width: 100%;
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
