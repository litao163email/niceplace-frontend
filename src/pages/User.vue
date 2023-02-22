<template>
  <div id="userInfo" v-if="user" style="position: absolute; left: 0px; top: 40px; right: 0px;">
    <van-cell title="当前用户" :value="user.username" />
    <van-cell title="用户信息" is-link to="/user/UserUpdate" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.js";

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

const user=ref();

const router = useRouter();
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