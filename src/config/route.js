//定义路由常量(这里对应上面组件的常量)；并在VueRouter中增加该路由常量
import Team from "../pages/Team.vue";
import Index from "../pages/Index.vue";
import User from "../pages/User.vue";
import Search from "../pages/Search.vue";
import UserEdit from "../pages/UserEdit.vue";
import UserUpdate from "../pages/UserUpdate.vue";
import SearchResult from "../pages/SearchResult.vue";
import UserLogin from "../pages/UserLogin.vue";
import TeamAdd from "../pages/TeamAdd.vue";
import TeamUpdate from "../pages/TeamUpdate.vue";
import UserTeamCreate from "../pages/UserTeamCreate.vue";
import UserTeamJoin from "../pages/UserTeamJoin.vue";
import UserRegister from "../pages/UserRegister.vue";
import Video from "../pages/Video.vue";
import VideoResult from "../pages/VideoResult.vue";
import UserVideoManage from "../pages/UserVideoManage.vue";
import VideoUpLoad from "../pages/VideoUpLoad.vue";
import VideoReview from "../pages/VideoReview.vue";

const routes = [
    { path: '/team', title:'团队列表',component: Team },
    { path: '/team/add',title:'添加团队', component:TeamAdd },
    { path: '/team/update',title:'更新团队', component:TeamUpdate },
    { path: '/video', title:'视频',component: Video },
    { path: '/videoResult', title:'视频列表',component: VideoResult },
    { path: '/', title:'视频达人',component: Index },
    { path: '/user',title:'个人', component: User },
    { path: '/search', title:'找达人',component: Search},
    { path: '/user/edit',title:'编辑个人信息', component: UserEdit},
    { path: '/search/result', title:'团队',component: SearchResult},
    { path: '/user/UserUpdate', title:'更新信息',component: UserUpdate },
    { path: '/user/team/create', title:'增加团队',component: UserTeamCreate },
    { path: '/user/team/join',title:'加入团队', component: UserTeamJoin },
    { path: '/user/login', title:'登录',component: UserLogin },
    { path: '/user/register', title:'注册',component: UserRegister },
    { path: '/userVideoManage', title:'视频管理中心',component: UserVideoManage },
    { path: '/videoUpLoad', title:'视频上传',component: VideoUpLoad },
    { path: '/videoReview', title:'视频审核',component: VideoReview },
]

export default routes;