<template>
<!--  提交修改表单-->
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userEdit.value"
          :name="userEdit.key"
          :label="userEdit.name"
          placeholder="请输入${userEdit.name}"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.js";

//转发的路由参数
const route = useRoute();
//响应式对象对位置类型进行封装
const userEdit=ref({
  key :route.query.key,
  name : route.query.name,
  value : route.query.value
})


const router = useRouter();

//提交到后台(value是表单鄋的值)
const onSubmit = async (values) => {
  //currentUser放在里面才能生效被下面的‘id’使用
  const currentUser = await getCurrentUser();

  console.log('未登录',currentUser)
  //提交前进行登录用户认证，防止被逼下线还能提交(我觉得是不是可以提出来做一个服务呢)
  if(!currentUser){
    console.log('未登录',currentUser)
    showFailToast('未登录');
    return;
  }

  console.log('submit', values);
  const res=await myAxios.post("/user/update",{
    [userEdit.value.key]:userEdit.value.value,
    'id': currentUser.id,
  },
  );
  if (res.code === 0 && res.data > 0) {
    showSuccessToast('成功');
    router.back();
  } else {
    showFailToast('失败');
  }

};

</script>

<style scoped>


</style>