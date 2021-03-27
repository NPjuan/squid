<template>
  <div class="recovery-main" :style="menuStyle">
    <camera label="RMONCAM" style="position: absolute;left: -400px;top: -200px" @getPicture="handleBottlePicture" :interval="4000" :key="new Date().getTime()" :end="isBottlePictureGet"></camera>
    <transition name="fade">
      <component
              :is="current"
              class="recovery-component"
              :options="options"
              :bottleName="bottleName"
              @handleTimeout="handleTimeout"
              @changeComponent="handleChangeComponent">
      </component>
    </transition>
  </div>
</template>

<script>
  import recoveryMain from "../components/recovery/recoveryMain"
  import recoveryConfirm from "../components/recovery/recoveryConfirm"
  import recoveryWaiting from "../components/recovery/recoveryWaiting"
  import alarmClock from "../components/alarmClock"
  import camera from "../components/camera"
  export default {
    name: "Bottle",
    components: {
      alarmClock,
      recoveryMain,
      recoveryConfirm,
      recoveryWaiting,
      camera
    },
    data() {
      return {
        isBottlePictureGet: false,
        current: 'recoveryMain',
        bottleName: '请等待',
        componentList: [{
          name: 'recoveryMain',
          timeout: () => {
            this.$router.push('/')
          },
          isLarge: true
        },{
          name: 'recoveryConfirm',
          timeout: () => {
            this.handleChangeComponent('recoveryMain')
          },
          isLarge: false
        },{
          name: 'recoveryWaiting',
          timeout: () => {
            this.handleChangeComponent('recoveryMain')
          },
          isLarge: false
        }],
        options: [{
          name: '塑料瓶',
          count: 0
        },{
          name: '易拉罐',
          count: 0
        },{
          name: '其他',
          count: 0
        },],
      }
    },
    computed: {
      menuStyle() {
        if (this.isLarge) {
          return {
            width: '50vw',
            height: '32vw'
          }
        } else {
          return {
            width: '30vw',
            height: '16vw'
          }
        }
      },
      isLarge() {
        return this.componentList.find(item => item.name === this.current).isLarge
      }
    },
    methods: {
      handleChangeComponent(name, callback) {
        const componentItem = this.componentList.find(item => item.name === name)
        this.current = componentItem.name
        callback && callback.apply(this)
      },
      handleTimeout(name = this.current) {
        const componentItem = this.componentList.find(item => item.name === name)
        componentItem.timeout()
      },
      handleBottlePicture(formData) {
        this.$axios.post('/bottle/checkBottlePicture', formData)
          .then(this.handleSuccess)
          .catch(this.handleError)
      },
      handleSuccess({data: { data, code }}) {
        console.log('data', data)
        if (code === '500000' && !this.isBottlePictureGet) {
          this.isBottlePictureGet = true
          this.bottleName = data
          this.current = 'recoveryConfirm'
          // this.$router.push('/')
        }
      },
      handleError() {
        // nothing
        // (++this.errorCount > 10) && this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="scss">
 .recovery-main{
   position: relative;
   display: flex;
   flex-flow: column;
   align-items: center;
   text-align: center;
   width: 50vw;
   height: 32vw;
   background-image: url("../assets/resource/exchange.png");
   background-repeat: no-repeat;
   background-size: 100% 100%;
   transition: all .25s ease-in-out;
   .recovery-component{
     width: 100%;
     height: 100%;
     display: flex;
     flex-flow: column;
     align-items: center;
     text-align: center;
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
