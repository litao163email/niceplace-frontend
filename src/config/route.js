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

const routes = [
    { path: '/team', title:'队伍列表',component: Team },
    { path: '/team/add',title:'添加队伍', component:TeamAdd },
    { path: '/team/update',title:'更新队伍', component:TeamUpdate },
    { path: '/video', title:'队伍列表',component: Video },
    { path: '/', title:'首页',component: Index },
    { path: '/user',title:'个人', component: User },
    { path: '/search', title:'找队伍',component: Search},
    { path: '/user/edit',title:'编辑', component: UserEdit},
    { path: '/search/result', title:'队伍',component: SearchResult},
    { path: '/user/UserUpdate', title:'更新信息',component: UserUpdate },
    { path: '/user/team/create', title:'增加队伍',component: UserTeamCreate },
    { path: '/user/team/join',title:'加入队伍', component: UserTeamJoin },
    { path: '/user/login', title:'登录',component: UserLogin },
    { path: '/user/register', title:'注册',component: UserRegister },
]

export default routes;