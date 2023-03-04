<template>
  <div style="padding: 1px;">
  <!-- 上一个按钮next-video-button -->
  <van-button class="last-video-button" color="linear-gradient(to right, #ff6034, #ee0a24)" icon="arrow-up" type="primary" @click="getNextUser(-1)"/>
  <!-- 下一个按钮next-video-button -->
  <van-button class="next-video-button" color="linear-gradient(to right, #ff6034, #ee0a24)" icon="arrow-down" type="primary" @click="getNextUser(1)"/>
  <!-- 头像 -->
  <van-image
      class="video-user-image"
      round
      width="55px"
      height="55px"
      :src=imageUrl
      @click="goToUserPage"
  />
  <!-- 点赞前 -->
  <van-icon class="video-like-icon" v-if="!ikeModel" color="#ee0a24" size="45" type="primary" name="like-o" @click="doLike"/>

  <!-- 点赞后 -->
  <van-icon class="video-like-icon" v-if="ikeModel" color="#ee0a24" size="45" type="primary" name="like" @click="doLike" />

  <!-- 评论 -->
  <van-icon class="video-comment-icon" color="#ee0a24" size="55" name="chat" badge="热评" @click="getComment()"/>

  <!-- 退出按钮 -->
  <van-button class="add-button" color="linear-gradient(to right, #fffaf0, #bc8f8f)" icon="arrow-left" type="primary" @click="quit"/>

    <!--  视频播放  -->
  <video ref="videoPlayer" :src="videoingUrl" width="365" height="600"
         controls  preload="auto"  webkit-playsinline="true"
         autoplay poster loop></video>

  </div>
</template>

<script setup>

import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {showFailToast, showSuccessToast, showToast, Toast} from "vant";
import myAxios from "../plugins/myAxios.js";
const router = useRouter();
const route = useRoute();

/**
 * 点赞前后变化
 */
//默认为不点赞
const ikeModel=ref(false);
const doLike=()=>{
  ikeModel.value=true;
}


/**
 * 跳去评论页面
 */
//万一用户没点下一个，那么videoIngId就不存在


const videoIngId=ref();
const videoingUrl = ref();
const getComment = () => {

  const list = route.query.urlList;
  // const urlList = JSON.parse(list);

  console.log("跳转去评论的videoIngId"+videoIngId.value)
  console.log("videoingUrl"+videoingUrl.value)
  //跳转
  router.push({
    path:"/video/videoCommentResult",
    query:{
      videoId:videoIngId.value,
      videoUrl:videoingUrl.value,
      urlList:list
    }
  })
}


/**
 * 点击头像去用户主页
 */

const userId = ref();
const goToUserPage=()=>{
  console.log("点击头像去用户主页的videoId"+route.query.videoId)
  console.log("点击头像去用户主页的videoIngId"+videoIngId.value)
  //离开页面前把心动模式的值存入localStorage
  //保存缓存
  console.log("跳转去用户主页，此时id为:"+userId.value)
  //主页面传入用户id
  router.push({path:"/videoResult",query:{
      id:userId.value,
      videoUrl:videoingUrl.value
    }});
}

/**
 * 头像
 */
const imageUrl = ref();

/**
 * 下一个视频
 */
//
//视频组
let currentIndex = 0

const getNextUser = (one) => {

  const list = route.query.urlList;
  const urlList = JSON.parse(list);
  console.log("点击下一个视频的urlList:"+urlList);
  console.log("点击下一个视频的urlList:"+urlList);

  currentIndex+=one;
  if (currentIndex>=0 && currentIndex<=urlList.length-1){

    try {
      //下一个视频
      videoingUrl.value=urlList[currentIndex].videoUrl;
      console.log("下一个编号:"+currentIndex+"(起始号码为0)");
      console.log("下一个视频:"+urlList[currentIndex].videoUrl);

      //当前头像
      imageUrl.value=urlList[currentIndex].user.avatarUrl;
      console.log("下一个头像:"+urlList[currentIndex].user.avatarUrl);

      //当前用户id,用于跳转去用户视频主页
      console.log("currentIndex:"+currentIndex);

      //正在播放的视频的id

      console.log("正在播放的视频的id:"+urlList[currentIndex].id);
      videoIngId.value=urlList[currentIndex].id;

      userId.value=urlList[currentIndex].user.id;
      console.log("当前用户id:"+urlList[currentIndex].user.id);

    }catch (TypeError){
      console.log("出错了");

    }


    //下一个则刷新点赞
    ikeModel.value=false;
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
    //刷新点赞
    ikeModel.value=false;
  }

}

/**
 * video地址
 */
onMounted(async () => {
  videoingUrl.value = route.query.url;
  videoIngId.value =route.query.videoId;
})


/**
 * 退出当前页
 */
const quit = () => {
  router.go(-1);
}

</script>

<style scoped>

</style>