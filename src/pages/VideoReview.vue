<template>
  <!-- 一定要分层注释，让写代码的人更清晰结构，方便改动 -->

  <!-- 上一个按钮next-video-button -->
  <van-button class="last-video-button" color="linear-gradient(to right, #ff6034, #ee0a24)" icon="arrow-up"
              type="primary" @click="getNextUser(-1)"/>
  <!-- 下一个按钮next-video-button -->
  <van-button class="next-video-button" color="linear-gradient(to right, #ff6034, #ee0a24)" icon="arrow-down"
              type="primary" @click="getNextUser(1)"/>
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
          <van-button  type="danger" size="mini" @click="reviewVideo(5,user.id,null)">审核驳回</van-button>
          <van-button  type="success" size="mini" @click="reviewVideo(0,user.id,null)">审核通过</van-button>
          <van-button  size="mini" @click="doVideo(user.videoUrl,user.id)">查看视频</van-button>
          <van-button  type="primary" size="mini" @click="reviewVideo(0,user.id,5)">选为优质</van-button>
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
import {showSuccessToast, showFailToast} from 'vant';
const router = useRouter();
const route = useRoute();

const isMatchMode = ref(true);
const isSkeleton = ref(true);

/**
 * 下一页
 */
const getNextUser =  (num) => {
  loadData(num);
}


/**
 * 审核
 */

const reviewVideo = async (status,videoId,videoTypeCode) => {
  const res = myAxios.post("/video/updateVideoStatus", {
      id: videoId,
      status: status,
    videoTypeCode:videoTypeCode
  });
  await showSuccessToast('审批成功');
  loadData();
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

let thisPageNum =1;
const loadData = (async (pageAdd=0) => {

  thisPageNum = thisPageNum + pageAdd
  if (thisPageNum < 1) {
    thisPageNum = 1;
  }

  console.log("555："+thisPageNum)
  console.log("555："+pageAdd)

  let userListData = [];
  isSkeleton.value = true;
  console.log("此时为个人视频管理模式")
  userListData = await myAxios.get('video/reviewVideo', {
    params: {
      pageSize: 8,
      pageNum: thisPageNum
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
        showFailToast('获取审核信息失败,请检查是否具有管理员权限');
      })

  if (userListData) {
    userList.value = userListData;
    //在后面进行处理(不能按视频的来，userListData无法使用foreach。foreach只能使用在数组对象)
    userList.value.forEach(res => {
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