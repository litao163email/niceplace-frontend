<template>
  <!-- 上一个按钮next-video-button -->
  <van-button class="last-video-button" color="linear-gradient(to right, #ff6034, #ee0a24)" icon="arrow-up" type="primary" @click="getNextUser(-1)"/>
  <!-- 下一个按钮next-video-button -->
  <van-button class="next-video-button" color="linear-gradient(to right, #ff6034, #ee0a24)" icon="arrow-down" type="primary" @click="getNextUser(1)"/>
  <!-- 退出按钮 -->
  <van-button class="add-button" color="linear-gradient(to right, #fffaf0, #bc8f8f)" icon="arrow-left" type="primary" @click="quit"/>
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
let currentIndex = 0
const getNextUser = (one) => {
  const list = route.query.urlList;
  const urlList = JSON.parse(list);
  console.log(urlList);

  currentIndex+=one;
  if (currentIndex>=0 && currentIndex<=urlList.length-1){
    //下一个视频
    videoingUrl.value=urlList[currentIndex].videoUrl;
    console.log("当前编号:"+currentIndex+"(起始号码为0)");
    console.log("当前视频:"+urlList[currentIndex].videoUrl);
    //下一个
  }else {
    showToast({
      message: '此为最后一个视频,将重新播放',
      position: 'top',
    });
    console.log("此为最后一个视频,将重新播放");

    if(currentIndex===-1){
      //如果等于-1，则跳去最后一个
      currentIndex=urlList.length;
    }else {
      //如果等于最后一个，则跳去第一个
      currentIndex=-1;
    }

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