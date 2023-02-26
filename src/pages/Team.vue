<template>

  <!-- 卡片样式 -->
  <div id="userInfo" style="position: absolute; left: 0px; top: 50px; right: 0px;padding-bottom: 80px">

    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public" />
      <van-tab title="加密" name="private"/>
    </van-tabs>
    <!--  添加队伍  -->
    <van-button class="add-button" icon="plus" type="primary" @click="doAddTeam"/>
    <van-card
        v-for="team in userList"
        :title="team.name"
        :thumb="team.avatarUrl"
        :desc="team.description"
        :tag="team.status"
        @click-thumb="goVideo(team.id)"
    >
      <template #tags>
        <!-- 标签-->
        <van-tag plain type="primary" v-for="tag in team.tags" style="margin-right: 10px">{{ tag }}</van-tag>
      </template>

      <!--    插槽-->
      <template #bottom >
        <div >
        <div>
          {{`队伍人数:${team.hasJoinNum}/${team.maxNum} `}}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间: ' + team.expireTime }}
        </div>
        <div>
          {{ '创建时间: ' + team.createTime }}
        </div>
        </div>
      </template>

      <template #footer>
        <van-button v-if="team.userId != curPerson.id && !team.hasJoin" size="mini" @click="doJoin(team.id,team.status)">加入队伍</van-button>
        <van-button  v-if="team.userId === curPerson.id " size="mini" @click="doUpdateTeam(team.id)">更新队伍</van-button>
        <van-button  v-if="team.userId === curPerson.id " type="danger" size="mini" @click="doFilrTeam(team.id)">解散队伍</van-button>
        <van-button  v-if="team.userId != curPerson.id && team.hasJoin" size="mini" @click="doOutTeam(team.id)">退出队伍</van-button>
      </template>
    </van-card>

    <!--  弹出框  -->
    <van-dialog v-model:show="passWordDia" title="密码" show-cancel-button @confirm="doPassWord">
      <van-field v-model="passWord" placeholder="请输入密码" />
    </van-dialog>

    <van-empty v-if="userList.length<=0" description="搜索结果为空" />
  </div>

</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showDialog, showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.js";
const router = useRouter();

// /** （作废的测试用例）
//  * 点击图片播放视频
//  */
// const doVideo=(url)=>{
//   //跳转
//   router.push({
//     path:"/video",
//     query:{
//       url:url
//     }
//   })
// }

/**
 * 去视频页面
 */
const goVideo=(teamId)=>{
  router.push({path:"/videoResult",query:{
    teamId
    }});
}


/**
 * 加入团队-密码弹出框
 */

const passWordDia = ref(false);
const passWord=ref("");
//暂时保存团队的id
const teamId=ref();
const doJoin=(id,status)=>{
  //如果是公开则直接加入
  if (status===0){
    doJoinTeam(id);
  }else if(status === 2){
    //如果是私密则弹框
    passWordDia.value=true;
    teamId.value=id;
  }else {
    console.log("错误的团队状态：非0非1")
  }
}
const doPassWord=()=>{
  //先关闭窗口
  passWordDia.value=false;
  //输入密码则发起请求
  doJoinTeam(teamId.value);

}

/**
 * 公开、私密
 * 区分查询
 * @type {Router}
 */
//默认初始是在公开的位置，即0
const active=ref(0);
const onTabChange=(name)=>{
  if(name==="public"){
    listTeam(searchText.value,0)
  }else {
    listTeam(searchText.value,2)
  }
}


//mission1:点击事件,跳转去队伍team添加页面------------------------------------------------------------------
const doAddTeam=()=>{
  //跳转
  router.push({
    path:"/team/add"
  })
}

//mission2:展示队伍team的列表------------------------------------------------------------------

//用于teamList的测试-数据
// const team = {
//   id: 21,
//   name: "桃桃小队",
//   description: "我们都喜欢蔡徐坤",
//   avatarUrl: "",
//   expireTime: new Date(),
//   maxNum: 10,
//   password: "",
//   // todo 定义枚举值类型，更规范
//   status: 0,
//   createTime: new Date(),
//   updateTime: new Date(),
//   createUser:"创建人",
// }


//用户列表-模拟数据
// const userList = ref([{...team}]);

const curPerson=ref();

/**
 * 搜索队伍
 * @param val
 * @param status
 * @returns {Promise<void>}
 */

//onMounted是vue3钩子方法，在dom元素加载后先执行的函数！
const userList = ref([]);

/**
 * 查询列表
 * @param val 查询条件
 * @param status 私有、公开
 */
//val = ''、 status = 0 是默认值
const listTeam = async (val = '', status = 0) => {
  console.log('当前登录:'+curPerson.value);
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status,
    },
  });
  if (res?.code === 0) {
    userList.value = res.data;
  } else {
    showFailToast('加载失败，请刷新重试');
  }
}

/**
 * 页面加载时只触发一次
 * 进行查询
 *
 */
onMounted( async() => {
  curPerson.value = await getCurrentUser();
  await listTeam();
})

const searchText = ref('');
const onSearch = (val) => {
  listTeam(val);
};

/**
 * 加入队伍
 */
const doJoinTeam= async (id)=>{
  const res= await myAxios.post("/team/join",{
   teamId: id,
   password:passWord.value
 });
  console.log("返回值res:"+res.toString());
 if (res.code === 0){
   showSuccessToast(res.description);
 }else{
   await showDialog({
     title: '提示',
     message:
         `${res.description}`,
   })
   //清空密码
   passWord.value="";
 }
}

/**
 * 更新队伍
 * doUpdateTeam
 */
//mission1:点击事件,跳转去队伍team添加页面------------------------------------------------------------------
const doUpdateTeam=(id)=>{
  //跳转
  router.push({
    path:"/team/update",
    query:{
      id:id
    }
  })
}

/**
 * 解散队伍
 * doUpdateTeam
 */

const doFilrTeam=(id)=>{
  myAxios.post("/team/delete",{
    teamId: id
  });
  if (res?.code === 0){
    showSuccessToast('成功');
  }else{
    showFailToast('失败');
  }
}

/**
 * 退出队伍
 * doUpdateTeam
 */

const doOutTeam=(id)=>{
  myAxios.post("/team/quit",{
    teamId: id
  });
  if (res?.code === 0){
    showSuccessToast('成功');
  }else{
    showFailToast('失败');
  }
}
</script>

<style scoped>

</style>