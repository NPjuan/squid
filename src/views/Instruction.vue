<template>
  <alarmClock :count="180" left="5vw" top="10vw"  @timeout="$router.push('/')" :key="new Date().getTime()"></alarmClock>
</template>

<script>
  import alarmClock from "../components/alarmClock"
  export default {
    name: "Instruction",
    components: {
      alarmClock
    }
  }
</script>

<style scoped>

</style>
