<template>

  <!-- 引入div块 -->
  <form action="/">
    <div id="search" style="position: absolute; left: 0px; top: 40px; right: 0px;">
      <van-search
          v-model="searchText"
          show-action
          placeholder="请输入要搜索的标签"
          @search="onSearch"
          @cancel="onCancel"
      />
    </div>
  </form>

  <!-- 标签 -->
  <div id="tagInSearch" style="position: absolute; left: 0px; top: 100px; right: 0px;">
    <!--  已选标签-->
    <van-divider content-position="left">已选标签</van-divider>
    <!--    若没有选择标签的提示-->
    <div v-if="activeIds.length ===0">
      <h5>请选择标签</h5>
    </div>
    <!-- 具体已选标签 -->
    <van-tag v-for="tag in activeIds" :show="true" closeable size="medium" type="primary" @close="doClose(tag)">
      <!--   使用局部变量tag   -->
      {{ tag }}
    </van-tag>

    <!--  可选标签-->
    <van-divider content-position="left">可选标签</van-divider>
    <!--   多选 -->
    <van-tree-select
        v-model:active-id="activeIds"
        v-model:main-active-index="activeIndex"
        :items="tagList"
    />
  </div>

  <!--  搜索-->
  <div style="position: absolute; left: 60px; top: 550px; right: 60px; ">
    <van-button block type="primary" @click="doSearchResult()">搜索</van-button>
  </div>

</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from "vue-router";

/**
 * 标签应尽量地少,暂时写死
 */
const OriginTagList = [
  {
    text: '美女',
    children: [
      {text: '美女', id: '美女'},
      {text: '性感', id: '性感'},
      {text: '清纯', id: '清纯'},
      {text: '可爱', id:'可爱'},
    ],
  },
  {
    text: '风景',
    children: [
      {text: '风景', id: '风景'},
      {text: '海洋', id: '海洋'},
      {text: '山峰', id: '山峰'},
      {text: '深林', id: '深林'},
    ],
  },
  {
    text: '美食',
    children: [
      {text: '美食', id: '美食'},
      {text: '中餐', id: '中餐'},
      {text: '西餐', id: '西餐'},
      {text: '学做菜', id: '学做菜'},
    ],
  },
  {
    text: '电影',
    children: [
      {text: '电影', id: '电影'},
      {text: '喜剧', id: '喜剧'},
      {text: '动作', id: '动作'},
      {text: '悬疑', id: '悬疑'},
    ],
  },
  {
    text: '搞笑',
    children: [
      {text: '搞笑', id: '搞笑'},
      {text: '段子', id: '段子'},
      {text: '沙雕', id: '沙雕'},
      {text: '配音', id: '配音'},
    ],
  },
  {
    text: '生活',
    children: [
      {text: '生活', id: '生活'},
      {text: '爱情', id: '爱情'},
      {text: '金钱', id: '金钱'},
      {text: '进步', id: '进步'},
    ],
  }
];

/*默认情况下等于原始数组,用ref表示响应式封装*/
let tagList= ref(OriginTagList);

/*searchText:输入的文本，ref*/
const searchText = ref('');
const onSearch = (val) => {
  /*搜索条件，对树形选择器中的选择进行过滤*/
  tagList.value=OriginTagList.map(parentTag => {
    //代替原OriginTagList的parentTag，每次返回的都是新的数组，这样原数组就会被覆盖
    const temParentTag ={...parentTag};
    /*每次都要新数组，否则tagList*/
    temParentTag.children = temParentTag.children.filter(res => res.text.includes(searchText.value));
    return temParentTag;
  });
}


const onCancel = () => {
  /*重置搜索栏*/
  searchText.value = '';
  tagList.value=OriginTagList;
};

/*可关闭标签*/
// const show = ref(true);
// const close = () => {
//   show.value = false;
// };
const doClose = (tag) => {
  /*让数组的值等于数组过滤后的值*/
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}

/*多选标签*/
const activeIds = ref([]);
const activeIndex = ref(0);

const router = useRouter();

/**
 * 搜索
 */
const doSearchResult=()=>{
  //执行搜索后就跳转去结果页，将query赋在url上
  router.push({
    path:"/search/result",
    query:{
      tags:activeIds.value
    }
  })
}

</script>

<style scoped>

</style>