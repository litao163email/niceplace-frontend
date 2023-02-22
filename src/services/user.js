import myAxios from "../plugins/myAxios";
import {setCurrentUserState} from "../status/user";
import {useRouter} from "vue-router";


export const getCurrentUser = async () => {

    //async异步，元素要是局部变量(放在方法内)，否则无法使用！
    const router = useRouter();

    // 不存在则从远程获取
    const res = await myAxios.get('/user/current');
    if (res.code!==40100) {
        console.log("cookie有效")
        //设置缓存信息为获取的值
        setCurrentUserState(res.data);
        return res.data;
    }
    else {
        console.log("cookie失效,重定向至登录页")
        //如果cookie失效，重定向至登录
        await router.replace("/user/login");
    }
    return null;
}


