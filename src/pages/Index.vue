<template>
  <!-- 卡片样式 -->
  <div id="userInfo" style="position: absolute; left: 0px; top: 50px; right: 0px;padding-bottom: 80px">

    <van-cell center title="心动模式">
      <template #right-icon>
        <van-switch v-model="isMatchMode" />
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
        <van-button size="mini">联系我</van-button>
      </template>
    </van-card>
    </van-skeleton>

    <van-empty v-if="userList.length<0" description="推荐结果为空" />
  </div>

</template>

<script setup>

import {useRoute} from "vue-router";
import {onMounted, ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.js";
import { showSuccessToast, showFailToast } from 'vant';

const isMatchMode=ref(true);
const isSkeleton=ref(true);

//用户列表
const userList = ref([]);

//onMounted是vue3钩子方法，在dom元素加载后先执行的函数！
/**
 * 加载元素
 */
const loadData =(async () => {

  let userListData=[];
  if (isMatchMode.value){
    isSkeleton.value=true;
    console.log("此时为心动模式")
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
        pageNum: 1,
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
  loadData();
})


</script>


<style scoped>

</style>