<template>
  <!-- 一定要分层注释，让写代码的人更清晰结构，方便改动 -->
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
      :src=image
      @click="tips"
  />

  <!-- 卡片样式 -->
  <div id="userInfo" style="position: absolute; left: 0px; top: 50px; right: 0px;padding-bottom: 80px">

    <!-- 骨架屏：包裹住要遮掩的内容   -->
    <van-skeleton title avatar :row="3" :loading="isSkeleton">

      <!--   卡片列表   -->
      <van-card
          v-for="user in userList"
          :title="user.videoName"
          :desc="user.description"
          :thumb="user.pictureUrl"
      >

        <template #tags>
          <!-- 标签-->
          <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 10px">{{ tag }}</van-tag>
        </template>

        <!--   查看按钮     -->
        <template #footer>
          <van-button size="mini" @click="doVideo(user.videoUrl,user.id)">查看 ta 的视频</van-button>
        </template>

      </van-card>
    </van-skeleton>


    <!-- 退出按钮 -->
    <van-button class="add-button" icon="arrow-left" type="primary" @click="quit"/>

    <!--  无结果时的显示  -->
    <van-empty v-if="userList.length<=0" description="ta还没发布任何视频"/>
  </div>

</template>

<script setup>

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showSuccessToast, showFailToast, showToast} from 'vant';
const router = useRouter();
const route = useRoute();

const isMatchMode = ref(true);
const isSkeleton = ref(true);

/**
 * 用户头像
 */
const image=ref();
onMounted(async () => {
  //跳来后先刷新页面
  loadData();
})
//带有背景遮罩层的提示
const tips=()=>{
  showToast({
    message: '您目前正在 ta 的主页了',
    icon: 'friends',
    overlay:true,
  });
}



/**
 * 下一页
 */
const getNextUser =  (num) => {
  loadData(num);
}


/**
 * 返回上一层
 */
const quit = () => {
  router.go(-1);
  // router.back();
}

/**
 * 点击图片播放视频
 */
const doVideo=(url,id)=>{
  const urlList=userList.value;
  console.log("点击图片播放视频的urlList:"+urlList)
  //跳转
  router.push({
    path:"/video",
    query:{
      url:url,
      urlList:JSON.stringify(urlList),
      videoId:id
    }
  })
}

//用户列表
const userList = ref([]);


//onMounted是vue3钩子方法，在dom元素加载后先执行的函数！
/**
 * 加载元素
 */
const loadData = (async (pageAdd=0) => {

  let thisPageNum=1+pageAdd
  if(thisPageNum<1){
    thisPageNum=1;
  }

  let userListData = [];
  isSkeleton.value = true;
  console.log("此时为视频模式teamId："+route.query.teamId)
  console.log("此时为视频模式id"+route.query.id)
  userListData = await myAxios.get('/video/getVideoList', {
    params: {
      pageSize: 6,
      pageNum: thisPageNum,
      teamId:route.query.teamId,
      userId:route.query.id,
    }
  })
      .then(function (response) {
        console.log("/video/getVideoList", response);
        showSuccessToast('成功');
        //********从响应返回值到const userListData
        return response.data.list;
      })
      .catch(function (error) {
        console.log("/video/getVideoList", error);
        showFailToast('失败');
      })

  if (userListData) {
    userList.value = userListData;
    //在后面进行处理(不能按视频的来，userListData无法使用foreach。foreach只能使用在数组对象)
    userList.value.forEach(res => {
      //因为这属于同一个人的视频主页,任意取一个都是ta的头像
      image.value=res.user.avatarUrl;

      if (res.tags) {
        res.tags = JSON.parse(res.tags);
      }
    });
  }
  isSkeleton.value = false;
})

/**
 * 监听变化则执行
 * watchEffect
 */
watchEffect(() => {
  loadData();
})


</script>


<style scoped>

</style>