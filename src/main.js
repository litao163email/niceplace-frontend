/**
 * 引入组件和文件夹，如'./style.css'、'../global.css'
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Button ,NavBar,Icon,Tabbar,TabbarItem,
    Form, Field, CellGroup,Toast,Empty,
    DatePicker,Skeleton,SkeletonTitle,SkeletonImage,SkeletonAvatar,SkeletonParagraph } from 'vant';
import routes from "./config/route.js";
import * as VueRouter from 'vue-router';
import '../global.css'

const app = createApp(App);
app.use(Button)
app.use(NavBar);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Toast);
app.use(Empty);
app.use(DatePicker);
app.use(Skeleton);
app.use(SkeletonTitle);
app.use(SkeletonImage);
app.use(SkeletonAvatar);
app.use(SkeletonParagraph);

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
app.use(router)
app.mount('#app')



