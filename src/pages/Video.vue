<template>
  <!-- 退出按钮 -->
  <van-button class="add-button" icon="arrow-left" type="primary" @click="quit"/>
  <div>
    <!--  视频播放  -->
    <video ref="videoPlayer" :src="videoUrl" controls  preload="auto" autoplay loop></video>
  </div>
</template>

<script setup>

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";

/**
 * mock video
 */
const router = useRouter();
let route = useRoute();
// const  videoUrl="http://120.24.245.241:8080/girl/1.mp4"
const videoUrl = ref();
videoUrl.value = route.query.url;

// const doVideo=( async() => {
//
// })

const quit = () => {
  router.go(-1);
}

</script>

<style scoped>

</style>