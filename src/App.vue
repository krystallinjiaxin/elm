<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import header from "./components/header/header.vue";
import {urlParse} from "./commom/js/util.js";
const ERR_OK = 0; //数据状态

export default {
  data() {//拿到的数据
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    }
  },
  created() {//钩子函数
    this.$http.get('/api/seller?id=' + this.seller.id).then((response)=>{
      response = response.body; //用.body转成对象  拿到的是个属性
      if(response.errno === ERR_OK){
        //this.seller = response.data;
        this.seller = Object.assign({},this.seller,response.data);//es6给对象扩展属性的方法
      }
    });
  },
  components: {//注册header组件
    "v-header": header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.tab
  display: flex
  width: 100%
  height: 40px
  line-height: 40px
  border-bottom: 1px solid rgba(7, 17, 27, 0.1)
  //border-1px(#07111b)
  .tab-item
    flex: 1
    text-align: center
    & > a
      display: block
      font-size: 14px
      color: rgb(77, 85, 93)
      &.active
        color: rgb(240, 20, 20)
</style>
