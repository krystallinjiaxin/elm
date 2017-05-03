<template>
    <div class="ratings" id="ratings">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <v-star class="star" :size="36" :score="seller.serviceScore"></v-star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <v-star class="star" :size="36" :score="seller.foodScore"></v-star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <v-split></v-split>
        <v-ratingselect
         :select-type="selectType"
         :only-content="onlyContent"
         v-on:ratingtypeselect="ratingtypeselect"
         v-on:contenttoggle="contenttoggle"
         :ratings="ratings"></v-ratingselect>
        <div class="rating-wrapper">
          <ul>
            <li class="rating-item border-1px" v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)">
              <div class="avatar">
                <img width="28px" height="28px" :src="rating.avatar" alt="">
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <v-star class="star" :size="24" :score="rating.score"></v-star>4
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <span class="icon-thumb_up"></span>
                  <span class="item" v-for="item in rating.recommend">{{item}}</span>
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0; //数据状态
  const ALL = 2;
  import {formatDate} from "../../commom/js/date.js";
  import star from "../star/star.vue";
  import split from "../split/split.vue";
  import ratingselect from "../ratingselect/ratingselect.vue";
  import BScroll from "better-scroll";
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [], //评论数据
        selectType: ALL, //评论类型
        onlyContent: false //是否有内容
      }
    },
    created() {
      this.$http.get('api/ratings').then((response) => {
        response = response.body; //用.body转成对象  拿到的是个属性
        if(response.errno === ERR_OK){
          this.ratings = response.data;
          this.$nextTick(()=>{ //dom发生变化用
            if(!this.scroll){
              this.scroll = new BScroll(document.getElementById('ratings'),{//没有就new个
                //touchstart: true
              });
            }else {
              this.scroll.refresh(); //否则重新计算
            }
          });
        }
      });
    },
    methods: {
      needShow(type,text) {//判断是否有内容  或者 是否显示有内容
        if(this.onlyContent && !text){ //判断是否显示内容
          return false;
        }
        if(this.selectType === ALL){
          return true;
        }else {
          return type  === this.selectType;
        }
      },
      ratingtypeselect(type) {
        this.selectType = type; //数据更新的时BScroll没有重新计算位置
        this.$nextTick(()=>{
          this.scroll.refresh(); //重新计算位置
        });
      },
      contenttoggle(onlycontent) {
        this.onlyContent = !onlycontent; //数据更新的时BScroll没有重新计算位置
        this.$nextTick(()=>{
          this.scroll.refresh(); //重新计算位置
        });
      }
    },
    filters: {
      formatDate(time) {//设置时间
        let date = new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm:ss');
      }
    },
    components: {//注册组件
      "v-star" : star, //评分星星组件
      "v-split": split, //分割线组件
      "v-ratingselect": ratingselect //评论组件
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../commom/stylus/mixin.styl"
  .ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        width: 137px
        border-right: 1px solid rgba(17,27,37,0.1)
        text-align: center
        padding: 6px 0
        @media all and (max-width:320px)
          flex: 0 0 120px
          width: 120px
        .score
          line-height: 28px
          font-size: 24px
          color: rgb(255,153,0)
          margin-bottom: 6px
        .title
          line-height: 12px
          font-size: 12px
          color: rgb(7,17,27)
          margin-bottom: 8px
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147,153,159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media all and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            line-height: 18px
            display: inline-block
            vertical-align: top
            font-size: 12px
            color: rgb(7,17,27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255,153,0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7,17,27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147,153,159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          flex: 1
          position: relative
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7,17,27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147,153,159)
          .text
            line-height: 18px
            color: rgb(7,17,27)
            font-size: 12px
            margin-bottom: 8px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up,.item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
                color: rgb(0,160,220)
            .item
              padding: 0 6px
              border: 1px solid rgba(7,17,27,0.1)
              border-radius: 1px
              color: rgb(147,153,159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147,153,159)
</style>
