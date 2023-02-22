

//使用缓存来存储当前用户的信息，类型是UserType
let currentUser;

//设置：user入参类型UserType
const setCurrentUserState = (user) => {
    currentUser = user;
}

//获取：入参类型UserType，其实不存在入参，这里仅表示可以这样表示入参类型
const getCurrentUserState = () => {
    return currentUser;
}

//导出
export {
    setCurrentUserState,
    getCurrentUserState,
}
