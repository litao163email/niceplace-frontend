<template>

  <!-- 卡片样式 -->
  <div id="userInfo" style="position: absolute; left: 0px; top: 50px; right: 0px;padding-bottom: 80px">
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
    <van-empty v-if="userList.length<=0" description="搜索结果为空" />
  </div>

</template>

<script setup>

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import { showSuccessToast, showFailToast } from 'vant';


//获取路由中的参数
const route = useRoute();
const router = useRouter();
//用户选择的标签，用来筛选合适的用户
const {tags} = route.query;


//用于userList的测试-数据
// const mockUser = {
//   id: 1,
//   username: "桃李",
//   userAccount: "taoli",
//   avatarUrl: "",
//   gender: "男",
//   phone: "123456789",
//   profile: "我是大一学生，自学java，精通springCloud",
//   email: "123456@qq.com",
//   tags: ['java', '大四', 'springCloud'],
//   planetCode: "123456",
// }

//用户列表
const userList = ref([]);

//onMounted是vue3钩子方法，在dom元素加载后先执行的函数！
onMounted(async () => {
  const userListData=await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    }
  })
      .then(function (response) {
        console.log("/user/search/tags success", response);
        showSuccessToast('成功');
        //********从响应返回值到const userListData
        return response.data;
      })
      .catch(function (error) {
        console.log("/user/search/tags error", error);
        showFailToast('失败');
      })

  if(userListData){
    userList.value=userListData;
    //在后面进行处理(不能按视频的来，userListData无法使用foreach。foreach只能使用在数组对象)
    userList.value.forEach(res=>{
      if (res.tags) {
        res.tags = JSON.parse(res.tags);
      }
    });
  }
})

</script>


<style scoped>

</style>