<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="primary"  to="/user/register">
        去注册
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


const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async (values) => {
  const axiosResponse = await myAxios.post("/user/login",{
    //userAccount从上面接收后，作为传去后端的参数。key是参数名，value是值
    userAccount:userAccount.value,
    userPassword:userPassword.value,

  },{withCredentials:true});
  console.log("登录返回:"+axiosResponse);
  if (axiosResponse.data !== null){
    showSuccessToast("登录成功");
    console.log("跳转去原用户已在页面")
    router.go(-1);

  }else {
    console.log("用户信息为空,登录失败")
  }
};

/**
 * 注册
 */
// const doRegister = router.push("/user/register");


</script>

<style scoped>

</style>