<template>
  <div class="seller" id="sellers">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <v-star class="star" :size="36" :score="seller.score"></v-star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @touchstart="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <v-split></v-split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item, index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <v-split></v-split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" id="pic-wrapper">
          <ul class="pic-list" ref="piclist">
            <li class="pic-item" v-for="pic in seller.pics">
              <img width="120" height="90" :src="pic" alt="">
            </li>
          </ul>
        </div>
      </div>
      <v-split></v-split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul class="info-list">
          <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from "../star/star.vue";
  import split from "../split/split.vue";
  import {saveTococal,loadFromLocal} from "../../commom/js/store.js";
  import BScroll from "better-scroll";
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id,'favorite',false);
        })()
      }
    },
    computed: {
      favoriteText() {//收藏商家
        return this.favorite ? "收藏" : "已收藏";
      }
    },
    created() {//created 这个钩子在实例被创建之后被调用
      this.classMap = ['decrease','discount','special','invoice','guarantee'];
      this.$nextTick(() => {//要在created这个钩子里面调用才能监控到变化
        this._initScroll();
        this._initpicScroll();
      });
    },
    watch: {
      seller() {//监控seller数据 DOM更新结束 让better-scroll运动起来
        this._initScroll();
        this._initpicScroll();
      }
    },
    mounted() {//DOM更新完

    },
    methods: {
      toggleFavorite() {//点击收藏商家 或者 取消收藏
        this.favorite = !this.favorite;
        saveTococal(this.seller.id,'favorite',this.favorite); //根据id查看商家是否收藏
      },
      _initScroll() {
        this.$nextTick(()=>{ //dom发生变化  重新计算位置
          if(!this.scroll){
            this.scroll = new BScroll(document.getElementById('sellers'),{//没有就new个
              //touchstart: true
            });
          }else {
            this.scroll.refresh(); //否则重新计算
          }
        });
      },
      _initpicScroll() {
        if(this.seller.pics){
          let picWidth = 120;
          let picMargin = 6;
          let picList = this.$refs.piclist;
          let Width = (picWidth + picMargin) * this.seller.pics.length - picMargin;
          picList.style.width = Width + 'px';
          this.$nextTick(() => {
            this.picScroll = new BScroll(document.getElementById('pic-wrapper'), {
              scrollX: true, //表示默认横线滚动
              eventPassthrough: 'vertical'
            });
          });
        }
      }
    },
    components: {
      "v-star": star,
      "v-split": split
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import "../../commom/stylus/mixin.styl"
.seller
  position: absolute
  top: 174px
  bottom: 0
  left: 0
  width: 100%
  overflow: hidden
  .overview
    display: relative
    padding: 18px
    .title
      margin-bottom: 8px
      line-height: 14px
      color: rgb(7,17,27)
      font-size: 14px
    .desc
      padding-bttom: 18px
      border-1px(rbga(7,17,27,0.1))
      font-size: 0
      .star
        display: inline-block
        margin-right: 8px
        vertical-align: top
      .text
        line-height: 18px
        margin-right: 12px
        display: inline-block
        vertical-align: top
        font-size: 10px
        color: rgb(77,85,93)
    .remark
      display: flex
      padding-top: 18px
      .block
        flex: 1
        text-align: center
        border-right: 1px solid rgba(7,17,27,0.1)
        &:last-child
          border-right: none
        h2
          margin-bottom: 4px
          line-height: 10px
          font-size: 10px
          color: rgb(147,153,159)
        .content
          line-height: 24px
          font-size: 10px
          color: rgb(7,17,27)
          .stress
            font-size: 24px
    .favorite
      position: absolute
      width: 50px
      top: 18px
      right: 11px
      text-align: center
      .icon-favorite
        display: block
        margin-bottom: 4px
        line-height: 24px
        font-size: 24px
        color: #d4d6d9
        &.active
          color: rgb(240,20,20)
      .text
        line-height: 10px
        font-size: 10px
        color: rgb(77,85,93)
  .bulletin
    padding: 18px 18px 0 18px
    .title
      margin-bottom: 8px
      line-height: 14px
      color: rgb(7,17,27)
      font-size: 14px
    .content-wrapper
      padding: 0 12px 16px 12px
      border-1px(rgba(7,17,27,0.1))
      .content
        line-height: 24px
        font-size: 12px
        font-weight: 200
        color: rgb(240,20,20)
    .supports
      .support-item
        padding: 16px 12px
        border-1px(rgba(1,17,27,0.1))
        font-size: 0
        &:last-child
          border-none()
      .icon
        display: inline-block
        vertical-align: top
        width: 16px
        height: 16px
        margin-right: 6px
        background-size: 16px 16px
        background-repeat: no-repeat
        &.decrease
          bg-image('decrease_4')
        &.discount
          bg-image('discount_4')
        &.guarantee
          bg-image('guarantee_4')
        &.invoice
          bg-image('invoice_4')
        &.special
          bg-image('special_4')
      .text
        line-height: 16px
        font-size: 12px
        color: rgb(7,17,27)
  .pics
    padding: 18px
    .title
      margin-bottom: 12px
      line-height: 14px
      color: rgb(7,17,27)
      font-size: 14px
    .pic-wrapper
      width: 100%
      overflow: hidden
      white-space: nowrap
      .pic-list
        font-size: 0
        .pic-item
          display: inline-block
          margin-right: 6px
          width: 120px
          height: 90px
          &:last-child
            margin-right: 0
  .info
    padding: 18px 18px 0 18px
    color: rgb(7,17,27)
    .title
      padding-bottom: 12px
      line-height: 14px
      border-1px(rgba(7,17,27,0.1))
      font-size: 14px
    .info-list
      .info-item
        padding: 16px 12px
        line-height: 16px
        border-1px(rgba(7,17,27,0.1))
        font-size: 12px
        &:last-child
          border-none()
</style>
