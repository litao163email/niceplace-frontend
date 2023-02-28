<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userName"
          name="userName"
          label="用户名"
          placeholder="起个特别的名字吧"
          :rules="[{ required: true, message: '用户名不能为空' }]"
      />
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="账号"
          :rules="[{ required: true, message: '账号不能为空' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请填写至少8位密码"
          :rules="[{ required: true, message: '请填写至少8位密码' }]"
      />
      <van-field
          v-model="checkPassword"
          type="password"
          name="checkPassword"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请确认密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import {ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {useRoute, useRouter} from "vue-router";
import { showSuccessToast, showFailToast } from 'vant';

//路由
const router = useRouter();
const route = useRoute();

const userName = ref('');
const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');

const onSubmit = async (values) => {
  const axiosResponse = await myAxios.post("/user/register",{
    //userAccount从上面接收后，作为传去后端的参数。key是参数名，value是值
    userName:userName.value,
    userAccount:userAccount.value,
    userPassword:userPassword.value,
    checkPassword:checkPassword.value,
  });
  console.log(axiosResponse);
  if (axiosResponse.code !==200){
    showSuccessToast(axiosResponse.description);
  }

  router.back();
};

</script>

<style scoped>

</style>