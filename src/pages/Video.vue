<template>
  <!-- 下一个按钮next-video-button -->
  <van-button class="next-video-button" color="linear-gradient(to right, #ff6034, #ee0a24)" icon="arrow-down" type="primary" @click="getNextUser"/>
  <!-- 退出按钮 -->
  <van-button class="add-button" icon="arrow-left" type="primary" @click="quit"/>
  <div>
    <!--  视频播放  -->
    <video ref="videoPlayer" :src="videoingUrl" controls  preload="auto" autoplay loop></video>
  </div>
</template>

<script setup>

import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";
import {showToast, Toast} from "vant";
const router = useRouter();
const route = useRoute();

/**
 * 下一个视频
 */
//
//视频组
let currentIndex = 1
const getNextUser = () => {
  const list = route.query.urlList;
  const urlList = JSON.parse(list);
  console.log(urlList);
  if (currentIndex<urlList.length){
    //下一个视频
    console.log(currentIndex)
    videoingUrl.value=urlList[currentIndex].videoUrl;
    console.log("当前编号:"+currentIndex);
    console.log("当前编号:"+urlList[currentIndex].src);
    currentIndex++;
  }else {
    showToast({
      message: '此为最后一个视频,将重新重复',
      position: 'top',
    });
    console.log("此为最后一个视频,将重新重复");
    //恢复0
    currentIndex=0;
  }
}

/**
 * video地址
 */
const videoingUrl = ref();
videoingUrl.value = route.query.url;

/**
 * 退出当前页
 */
const quit = () => {
  router.go(-1);
}

</script>

<style scoped>

</style>