<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="planetCode"
          name="planetCode"
          label="幸运号码"
          placeholder="幸运号码"
          :rules="[{ required: true, message: '自定义幸运号码' }]"
      />
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="账号"
          :rules="[{ required: true, message: '账号' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
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

const planetCode = ref('');
const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');

const onSubmit = async (values) => {
  const axiosResponse = await myAxios.post("/user/register",{
    //userAccount从上面接收后，作为传去后端的参数。key是参数名，value是值
    planetCode:planetCode.value,
    userAccount:userAccount.value,
    userPassword:userPassword.value,
    checkPassword:checkPassword.value,
  });
  console.log(axiosResponse);
  if (axiosResponse){
    showSuccessToast("注册成功");
    console.log("跳转去原用户已在页面")
    router.back();

  }
};

</script>

<style scoped>

</style>