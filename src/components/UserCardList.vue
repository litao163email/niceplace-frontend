<template>
<!--  抽取出来的公共组件-->
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
</template>

<script setup>
//抽取出来后，要注意使用到的参数，以下进行定义

//定义局部对象
import {UserType} from "../models/user.js";
interface UserCardListProps{
  userList;
}

//给常量进行泛型赋值,defineProps表示组件中使用的参数是这个
const props = defineProps<UserCardListProps>();
</script>

<style scoped>

</style>