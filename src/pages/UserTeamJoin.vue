<template>

  <!-- 卡片样式 -->
  <div id="userInfo" style="position: absolute; left: 0px; top: 50px; right: 0px;padding-bottom: 80px">

    <van-card
        v-for="team in userList"
        :title="team.name"
        :thumb="team.avatarUrl"
        :desc="team.description"
        :tag="team.status"
    >
      <template #tags>
        <!-- 标签-->
        <van-tag plain type="primary" v-for="tag in team.tags" style="margin-right: 10px">{{ tag }}</van-tag>
      </template>

      <!--    插槽-->
      <template #bottom>
        <div>
          {{'过期时间:'+ team.maxNum }}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间: ' + team.expireTime }}
        </div>
        <div>
          {{ '创建时间: ' + team.createTime }}
        </div>
      </template>

      <template #footer>
        <van-button size="mini" @click="doJoinTeam(team.id)">加入队伍</van-button>
        <van-button  v-if="team.userId === curPerson.id " size="mini" @click="doUpdateTeam(team.id)">更新队伍</van-button>
        <van-button  v-if="team.userId === curPerson.id " size="mini" @click="doFilrTeam(team.id)">解散队伍</van-button>
        <van-button  size="mini" @click="doOutTeam(team.id)">退出队伍</van-button>
      </template>
    </van-card>

    <van-empty v-if="userList.length<=0" description="搜索结果为空" />
  </div>

</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showFailToast, showSuccessToast} from "vant";
import {teamStatusEnum} from "../constants/team";
import {getCurrentUser} from "../services/user.js";

const router = useRouter();

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

//val = ''、 status = 0 是默认值
const listTeam = async (val = '', status = 0) => {
  console.log('当前登录:'+curPerson.value);
  const res = await myAxios.get("/team/list/my/join", {
    params: {
      searchText: val,
      pageNum: 1,
      status,
    },
  });
  if (res?.code === 0) {
    userList.value = res.data;
  } else {
    showFailToast(res.description);
  }
}

// 页面加载时只触发一次
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
const doJoinTeam=(id)=>{
 myAxios.post("/team/join",{
   teamId: id
 });
 if (res?.code === 0){
   showSuccessToast('成功');
 }else{
   showFailToast('失败');
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

/*#teamPage{*/

/*}*/
</style>