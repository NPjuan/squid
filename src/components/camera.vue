<template>
  <div class="camera">
    <video ref="video"></video>
    <canvas v-show="false" ref="canvas" width="400" height="300"></canvas>
  </div>
</template>

<script>
  export default {
    name: "camera",
    props: {
      label: {
        type: String,
        default: 'PC Camera'
      },
      interval: {
        type: Number,
        default: 2000
      },
      end: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // 视频流
        mediaStreamTrack: null,
        errorCount: 0
      }
    },
    mounted() {
      this.dispatchMediaDevices(RegExp(this.label))
    },
    methods: {
      dispatchMediaDevices(labelReg) {
        // 打开摄像头
        const video = this.$refs.video;
        // 是否支持媒体 API
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
          console.log("不支持 enumerateDevices() .")
          return
        }
        // 列出相机和麦克风。
        navigator.mediaDevices.enumerateDevices()
          .then((devices) => {
            let faceDeviceId = undefined
            devices.forEach(({label, deviceId}) => {
              if (label.match(labelReg)) {
                faceDeviceId = deviceId
              }
            });
            const constraints = faceDeviceId ? {
              video: {
                deviceId: faceDeviceId
              }
            } : { video: { facingMode: "user" } }
            return navigator.mediaDevices.getUserMedia(constraints)
          })
          .then( MediaStream => {
            this.mediaStreamTrack = typeof MediaStream.stop === 'function' ? MediaStream : MediaStream.getTracks()[0];
            video.srcObject = MediaStream;
            video.play();
            this.drawPic()
          })
          .catch(err => {
            console.log(err.name + ": " + err.message);
          });
      },
      drawPic() {
        clearInterval(this.timer)
        if (this.end) {
          return
        }
        this.timer = setInterval(this.handlePic, this.interval)
      },
      handlePic() {
        if (this.end) {
          this.stopMedia()
          return
        }
        try {
          console.log('拍照')
          const { canvas, video } = this.$refs
          canvas.getContext("2d").drawImage(video, 0, 0, 400, 300);
          // let ext = video.src.substring(video.src.lastIndexOf(".")+1).toLowerCase();
          // let image = canvas.toDataURL("image/"+ext)
          // let imgEl = new Image()
          // imgEl.src = image
          // this.downloadImage(imgEl, 'img')
          canvas.toBlob(blob => {
            const file = new File(
              [blob],
              'face.jpg', // 这里后缀名一定要 jpg 格式
              {type: 'image/jpeg'}
            )
            const formData = new FormData()
            formData.append('file', file)
            this.$emit('getPicture', formData)
          })
        } catch (e) {
          console.log('摄像头应该被销毁')
          this.stopMedia()
        }
      },
      downloadImage(el, name) {
        // 通过选择器获取img元素
        let img = el
        // 将图片的src属性作为URL地址
        let url = img.src
        let a = document.createElement('a')
        let event = new MouseEvent('click')

        a.download = name || '下载图片名称'
        a.href = url
        a.dispatchEvent(event) //根据A标签的属性来搞事情
      },
      stopMedia() {
        console.log('关闭摄像头')
        this.mediaStreamTrack && this.mediaStreamTrack.stop();
        this.timer && clearInterval(this.timer)
      }
    },
    beforeDestroy() {
      this.stopMedia()
    },
    watch: {
      end(val) {
        if (val) {
          this.stopMedia()
        } else {
          this.drawPic()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
 .camera{
   width: 100%;
   height: 100%;
   video{
     width: 100%;
     height: 100%;
   }
   canvas{}
 }
</style>
