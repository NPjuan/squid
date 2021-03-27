<template>
  <div class="face-main" v-cloak>
    <camera @getPicture="handleGetFacePicture" :key="new Date().getTime()" :interval="2000" :end="isFacePictureGet"></camera>
    <alarmClock top="10vw" left="10vw" :count="60" @timeout="handleTimeout"></alarmClock>
  </div>
</template>

<script>
  import camera from "../components/camera"
  import alarmClock from "../components/alarmClock"
  export default {
    name: "BrushFace",
    components: {
      camera,
      alarmClock
    },
    data() {
      return {
        isFacePictureGet: false
      }
    },
    methods: {
      handleTimeout() {
        this.$router.push('/')
      },
      handleGetFacePicture(formData) {
        this.$axios.post('https://www.gdutcatming.top:8888/box/face/loginByFace', formData)
          .then(this.handleSuccess)
          .catch(this.handleError)
      },
      handleSuccess({ data: { data: user, code }}) {
        if (code === 500000) {
          this.isFacePictureGet = true
          this.$store.commit('setUser', user)
          console.log('识别成功，结束拍照')
          this.$router.push('/')
        }
      },
      handleError() {
        // do nothing
      }
    }
  }
</script>

<style scoped lang="scss">
 .face-main{
   padding: 20px;
   width: 30vw;
   height: 30vw;
   background-image: url("../assets/resource/center.png");
   background-size: 100% 100%;
   background-repeat: no-repeat;
 }
</style>
