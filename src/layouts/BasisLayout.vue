<template>
  <!-- 引入最上面的组件-->
  <div class="nav-var" style="position: absolute;left: 0px;top: 0px;right: 0px;">
  <van-nav-bar
      :title="title"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <!--插槽-->
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  </div>

<!--  表示有路由引入-->
  <router-view />

<!-- 引入下面标签组件-->
  <van-tabbar route @onChange="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>

</template>

<script setup>
import { showToast } from 'vant';
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import routes from "../config/route.js";

//控制页面跳转
const  router= useRouter();
//获取路由信息
const route = useRoute();


const onClickLeft = () =>{
  /*  重定向 */
  router.back();
};
const onClickRight = () => {
    /*  重定向 */
    router.push('/search')
};

const onChange = (index) => showToast(`标签 ${index}`);

/**
 * 标题自动更新
 */
const DEFAULT_TITLE='伙伴匹配';
const title=ref(DEFAULT_TITLE);

router.beforeEach((to,from)=>{
  const  toPath=to.path;
  const route=routes.find((route)=>{
    return toPath === route.path;
  })
  title.value =route.title ?? DEFAULT_TITLE;
})


</script>

<style scoped>
/**/
#nav-var{
  padding-bottom: 50px;
}
</style>