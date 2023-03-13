<template>
  <div id="userInfo" v-if="user" style="position: absolute; left: 0px; top: 40px; right: 0px;">
    <van-cell title="当前用户" :value="user.username" />
    <van-cell title="用户信息" is-link @click="doEditTags" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
    <van-cell title="管理我的视频" is-link @click="goMyVideo" />
    <van-cell title="上传视频" is-link @click="videoUpLoad" />
    <van-cell title="审核视频(管理员)" is-link @click="reviewVideo" />
    <van-cell title="退出登录" is-link @click="quitLogin" />
  </div>

</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showConfirmDialog, showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.js";
const router = useRouter();

/**
 * 退出登录
 * /user/logout
 */
const quitLogin=()=>{
  showConfirmDialog({
    title: '退出提醒',
    message:
        '您确定要退出登录?',
  })
      .then(() => {
        const res =  myAxios.post("/user/logout");
        router.push("/");
      })
      .catch(() => {
        // on cancel
      });
}

/**
 * 修改tags将会重新登录以清除缓存中的标签
 */
const doEditTags=(key:String,name:String,value:String)=>{
  showConfirmDialog({
    title: '提醒',
    message:
        '为了您的推荐体验,若修改标签将会重新登录~点击右上角搜索供你参考的标签,匹配度更准确!',
  })
      .then(() => {
        router.push("/user/UserUpdate");
      })
      .catch(() => {
        // on cancel
      });
}

/**
 * 当前登录人信息
 */
const user=ref();

/**
 * 审核视频提示(管理员)
 */
const reviewVideo=()=>{
  showConfirmDialog({
    title: '审核规则',
    message:
        '请管理员严审视频,在互联网发布涉及"黄赌毒/暴力/低俗"等违法视频将负法律责任!',
  })
      .then(() => {
        router.push("/videoReview");
      })
      .catch(() => {
        // on cancel
      });

}


/**
 * 上传视频
 */
// const videoUpLoad=()=>{
//   router.push("/videoUpLoad");
// }

const videoUpLoad=()=>{
  showConfirmDialog({
    title: '提示',
    message:
        '为保证互联网传播安全,本项目已禁止上传,仅作演示学习，有问题请邮件联系:litao163email@163.com',
  })
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        router.push("/");
      });
}



/**
 * 管理我的视频
 */
const goMyVideo=()=>{
  router.push("/userVideoManage");
}



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