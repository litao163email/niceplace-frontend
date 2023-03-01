<template>

  <!-- 卡片样式 -->
  <div id="userInfo" style="position: absolute; left: 0px; top: 50px; right: 0px;padding-bottom: 80px">

<!--    &lt;!&ndash; 上一个按钮next-video-button &ndash;&gt;-->
<!--    <van-button class="last-video-button" color="linear-gradient(to right, #ff6034, #ee0a24)" icon="arrow-up" type="primary" @click="getNextUser(-1)"/>-->
<!--    &lt;!&ndash; 下一个按钮next-video-button &ndash;&gt;-->
<!--    <van-button class="next-video-button" color="linear-gradient(to right, #ff6034, #ee0a24)" icon="arrow-down" type="primary" @click="getNextUser(1)"/>-->

    <van-notice-bar
        left-icon="volume-o" @click="goEdit"
        text="右上角搜索栏查看'标签',在个人信息编辑页输入标签,可获取'精准'的老司机推送!  (点击去编辑)"
    />

    <van-cell  center title="匹配与您相似的老司机">
      <template #right-icon>
        <van-switch  v-model="isMatchMode"  />
      </template>
    </van-cell>

    <!-- 骨架屏：包裹住要遮掩的内容   -->
    <van-skeleton title avatar :row="3" :loading="isSkeleton">
    <van-card
        v-for="user in userList"
        :title="user.username"
        :thumb="user.avatarUrl"
        :tag="user.gender"
    >
      <template #tags>
        <!-- 标签-->
        <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 10px">{{ tag }}</van-tag>
      </template>

      <template #footer>
        <van-button size="mini" @click="goVideo(user.id)">精彩视频</van-button>
      </template>
    </van-card>
    </van-skeleton>

    <van-empty v-if="userList.length<=0" description="推荐结果为空" />
  </div>

</template>

<script setup>

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.js";
import { showSuccessToast, showFailToast } from 'vant';
import {getCurrentUser} from "../services/user.js";
const router = useRouter();

const isMatchMode=ref(true);
const isSkeleton=ref(true);

/**
 * 滚动条跳转去编辑页
 */
const goEdit=()=>{
  router.push("/user/UserUpdate")
}

/**
 * 下一页
 */
const getNextUser =  (num) => {
  loadData(num);
}


/**
 * 去视频页面
 */
const goVideo=(id)=>{
  //离开页面前把心动模式的值存入localStorage
  //保存缓存
  console.log("保存页面缓存")
  // localStorage.setItem("isMatchMode",isMatchMode.value)
  //主页面传入用户id
  router.push({path:"/videoResult",query:{
      id:id,
    }});
}

//用户列表
const userList = ref([]);

//onMounted是vue3钩子方法，在dom元素加载后先执行的函数！
/**
 * 加载元素
 */
const loadData =(async (pageAdd=0) => {

  let thisPageNum=1+pageAdd
  if(thisPageNum<1){
    thisPageNum=1;
  }

  let userListData=[];
  if (isMatchMode.value){
    isSkeleton.value=true;
    console.log("此时为心动模式")
    //心动个数默认为10个
    const num =10;
     userListData=await myAxios.get('/user/match', {
      params: {
        num,
      }
    })
        .then(function (response) {
          console.log("/user/match", response);
          showSuccessToast('成功');
          //********从响应返回值到const userListData
          return response.data;
        })
        .catch(function (error) {
          console.log("/user/match", error);
          showFailToast('失败');
        })
  }else {
    isSkeleton.value=true;
    console.log("此时为普通模式")
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: thisPageNum,
      }
    })
        .then(function (response) {
          console.log("/user/recommend", response);
          showSuccessToast('成功');
          //********从响应返回值到const userListData
          return response.data.records;
        })
        .catch(function (error) {
          console.log("/user/recommend", error);
          showFailToast('失败');
        })
  }
  if(userListData){
    userList.value=userListData;
    //在后面进行处理(不能按视频的来，userListData无法使用foreach。foreach只能使用在数组对象)
    userList.value.forEach(res=>{
      if (res.tags) {
        res.tags = JSON.parse(res.tags);
      }
    });
  }
  isSkeleton.value=false;
})

/**
 * 监听变化则执行
 * watchEffect
 */
watchEffect(() => {
  //返回时恢复原来的模式
  // const item =  localStorage.getItem("isMatchMode");
  // if (item){
  //   console.log("获取页面缓存"+item)
  //   isMatchMode.value=item;
  //   //删除缓存
  //   console.log("删除页面缓存")
  //   localStorage.removeItem("isMatchMode")
  // }
  loadData();

})


</script>


<style scoped>

</style>