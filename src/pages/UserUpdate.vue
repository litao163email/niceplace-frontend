<template>
  <div id="userInfo" v-if="user" style="position: absolute; left: 0px; top: 40px; right: 0px;">
  <van-cell title="用户名" size="large" is-link to="/user/edit" :value="user.username" @click="doEdit('username','用户名',user.username)" />
  <van-cell title="账号" size="large"  :value="user.userAccount" />
  <van-cell title="头像" size="large" is-link to="/user/edit" label="更新照片url" arrow-direction="down" >
    <img style="height: 48px" :src="user.avatarUrl">
  </van-cell>
  <van-cell size="large" title="性别" label="0男1女" is-link to="/user/edit" arrow-direction="down" :value="user.gender === 0 ? '男':'女'" @click="doEdit('gender','性别',user.gender)" />
<!--  <van-cell size="large" title="电话" is-link to="/user/edit" arrow-direction="down" :value="user.phone"  @click="doEdit('phone','电话',user.phone)" />-->
<!--  <van-cell size="large" title="邮箱" is-link to="/user/edit" arrow-direction="down" :value="user.email"  @click="doEdit('email','邮箱',user.email)" />-->
   <van-cell size="large" title="标签" label="填与搜索栏一致的标签将提高匹配度" is-link to="/user/edit" arrow-direction="down" :value="user.tags"  @click="doEdit('tags','标签',user.tags)" />
<!--  <van-cell size="large" title="幸运编号"  :value="user.niceCode"  />-->


  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showConfirmDialog, showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.js";
const user=ref();
const router = useRouter();
//模拟数据
// const user={
//     id: 1,
//     username: "桃李",
//     userAccount: "taoli",
//     avatarUrl: "",
//     gender: "男",
//     phone: "123456789",
//     email: "123456@qq.com",
//     planetCode: "123456",
//     createTime: new Date(),
// }

/**
 * 修改信息
 */
const doEdit=(key:String,name:String,value:String)=>{
  router.push({path:'/user/edit',query:{ key,name,value}});
}

//获取当前用户信息(后端会根据cookie获取)
onMounted(async ()=>{
  user.value = await getCurrentUser();
})

</script>

<style scoped>

</style>