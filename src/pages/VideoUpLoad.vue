<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="videoName"
          name="videoName"
          label="视频名称"
          placeholder="视频名称"
          :rules="[{ required: true, message: '视频名称' }]"
      />
      <van-field
          v-model="videoUrl"
          name="videoUrl"
          label="视频url"
          placeholder="视频url"
          :rules="[{ required: true, message: '视频url' }]"
      />
      <van-field
          v-model="description"
          name="description"
          label="视频描述"
          autosize
          placeholder="视频描述"
          :rules="[{ required: true, message: '视频描述' }]"
      />
      <van-field
          v-model="videoTypeCode"
          name="videoTypeCode"
          label="视频类型"
          placeholder="0女1景2食3影4笑5活"
          :rules="[{ required: true, message: '视频类型' }]"
      />
      <van-field
          v-model="videoStatus"
          name="videoStatus"
          label="视频状态"
          placeholder="012345(若填需管理员权限)"
          :rules="[{ required: true, message: '视频状态' }]"
      />
      <van-field
          v-model="tags"
          name="tags"
          label="视频标签"
          placeholder="格式: [”“,”“]"
          :rules="[{ required: true, message: '视频标签' }]"
      />
      <van-field
          v-model="userId"
          name="userId"
          label="用户id"
          placeholder="指定用户id(若填需管理员权限)"
          :rules="[{ required: true, message: '用户id' }]"
      />
      <van-field
          v-model="teamId"
          name="teamId"
          label="团队id"
          placeholder="指定团队id(若填需管理员权限)"
          :rules="[{ required: true, message: '团队id' }]"
      />

    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        上传视频
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

const videoName = ref('');
const videoUrl = ref('');
const description = ref('');
const videoTypeCode = ref('');
const tags = ref('');
const videoStatus = ref('');
const userId = ref('');
const teamId = ref('');


const onSubmit = async (values) => {
  const axiosResponse = await myAxios.post("/video/addVideo",{
    //userAccount从上面接收后，作为传去后端的参数。key是参数名，value是值
    videoName:videoName.value,
    videoUrl:videoUrl.value,
    description:description.value,
    videoTypeCode:videoTypeCode.value,
    tags:tags.value,
    status:videoStatus.value,
    userId:userId.value,
    teamId:teamId.value,
  });
  console.log(axiosResponse);
  if (axiosResponse){
    showSuccessToast("上传成功");
    console.log("跳转去原用户已在页面")
    router.back();
  }
};

</script>

<style scoped>

</style>