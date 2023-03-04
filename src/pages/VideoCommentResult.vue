<template>
  <div class="user_comment_list">
    <!-- 一定要分层注释，让写代码的人更清晰结构，方便改动 -->
    <!-- 上一个按钮next-video-button -->
    <van-button class="last-video-button" color="linear-gradient(to right, #ff6034, #ee0a24)" icon="arrow-up"
                type="primary" @click="getNextUser(-1)"/>
    <!-- 下一个按钮next-video-button -->
    <van-button class="next-video-button" color="linear-gradient(to right, #ff6034, #ee0a24)" icon="arrow-down"
                type="primary" @click="getNextUser(1)"/>


    <!-- 卡片样式 -->
    <!-- 骨架屏：包裹住要遮掩的内容   -->
    <van-skeleton title avatar :row="3" :loading="isSkeleton">

      <div id="comment">
        <!--   卡片列表   -->
        <van-cell-group inset>
          <van-card
              v-for="user in userList"
              center
              :title="user.commentDescription"
              :thumb="user.commentUserUrl"
              @click="getVideoId(user.videoId)"
          >
            <!--查看按钮-->
            <template #footer>
              <van-button size="mini" @click="goToUserPage(user.commentUserId)">查看 ta 的主页</van-button>
            </template>

          </van-card>
        </van-cell-group>
      </div>
    </van-skeleton>
  </div>

    <!-- 评论   -->
  <div class="user_comment">
    <!--  提交修改表单-->
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model=comment
            name="comment"
            label="评论"
            placeholder="评论"
            :rules="[{ required: true, message: '请填写评论' }]"
        />
      </van-cell-group>
      <div>
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>


    <!-- 退出按钮 -->
    <van-button class="add-button" icon="arrow-left" type="primary" @click="quit"/>

    <!--  无结果时的显示  -->
    <van-empty v-if="userList.length<=0" description="还没发布任何评论"/>
  </div>

</template>

<script setup>

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showSuccessToast, showFailToast} from 'vant';

const router = useRouter();
const route = useRoute();

const isMatchMode = ref(true);
const isSkeleton = ref(true);


/**
 * 点击评论头像去到主页
 */
const goToUserPage = (commentUserId) => {
  //离开页面前把心动模式的值存入localStorage
  //保存缓存
  console.log("跳转去用户主页，此时commentUserId为:" + commentUserId)
  //主页面传入用户id
  router.push({
    path: "/videoResult", query: {
      id: commentUserId,
    }
  });
}


/**
 * 评论
 */
//评论
const comment = ref();
const onSubmit = async () => {

  const videoId = route.query.videoId;
  const videoUrl = route.query.videoUrl;
  console.log("videoId!" + videoId);
  console.log("videoUrl!" + videoUrl);
  console.log("评论了!");
  const response = await myAxios.post('/videoComment/addComment', {
    commentDescription: comment.value,
    videoId: videoId,
    videoUrl: videoUrl,
  })
  //评论完回到原来的位置

  doVideo(videoUrl, videoId);
};

/**
 * 用户头像
 */
const image = ref();
onMounted(async () => {
  //跳来后先刷新页面
  loadData();
})


/**
 * 下一页
 */
const getNextUser = (num) => {
  loadData(num);
}


/**
 * 返回上一层
 */
const quit = () => {
  router.go(-1);
  // router.back();
}

/**
 * 评论完再跳回跳回视频页
 */
const doVideo = (url, id) => {

  const VideoUrlList = route.query.urlList;
  console.log("点击评论区的urlList:" + VideoUrlList)
  //如果从评论跳转回来的，则赋值，免得为空
  console.log("评论区调回视频页面的VideoUrlList:" + VideoUrlList)

  //跳转
  router.push({
    path: "/video",
    query: {
      url: url,
      urlList: VideoUrlList,
      videoId: id
    }
  })
}

//用户列表
const userList = ref([]);


//onMounted是vue3钩子方法，在dom元素加载后先执行的函数！
/**
 * 加载元素
 */
let thisPageNum =1;
const loadData = (async (pageAdd = 0) => {

  thisPageNum = thisPageNum + pageAdd
  if (thisPageNum < 1) {
    thisPageNum = 1;
  }

  let userListData = [];
  isSkeleton.value = true;
  console.log("此时为评论模式")
  userListData = await myAxios.get('/videoComment/getVideoCommentList', {
    params: {
      pageSize: 15,
      pageNum: thisPageNum,
      videoId: route.query.videoId,
      videoUrl: route.query.videoUrl,
    }
  })
      .then(function (response) {
        console.log("/videoComment/getVideoCommentList", response);
        showSuccessToast('成功');
        //********从响应返回值到const userListData
        return response.data.list;
      })
      .catch(function (error) {
        console.log("/videoComment/getVideoCommentList", error);
        showFailToast('失败');
      })

  if (userListData) {
    userList.value = userListData;
    //在后面进行处理(不能按视频的来，userListData无法使用foreach。foreach只能使用在数组对象)
    userList.value.forEach(res => {
      //todo
      // newVideoUrl.value=res.videoUrl;
    });
  }
  isSkeleton.value = false;
})

/**
 * 监听变化则执行
 * watchEffect
 */
watchEffect(() => {
  loadData();
})


</script>


<style scoped>

</style>