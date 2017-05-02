<template>
  <transition name="fade">
    <div class="food" v-show="showFalg" id="food">
      <div class="">
        <div class="food-content">
          <div class="image-header">
            <img class="image" :src="food.image" alt="">
            <div class="back" @touchstart="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <v-cartcontrol :food="food"></v-cartcontrol>
          </div>
          <transition name="fade">
            <div @touchstart.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
          </transition>
        </div>
        <v-split></v-split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll";
  import cartcontrol from "../cartcontrol/cartcontrol.vue";
  import split from "../split/split.vue";
  import Vue from "vue";
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFalg: false
      }
    },
    methods: {
      show() {//当goods父级组件发生点击触发子组件的方法
        this.showFalg = true; //显示详情页
        this.$nextTick(()=>{ //dom发生变化用
          if(!this.scroll){
            this.scroll = new BScroll(document.getElementById('food'),{//没有就new个

            });
          }else {
            this.scroll.refresh(); //否则重新计算
          }
        });
      },
      hide() {//关闭详情页
        this.showFalg = false;
      },
      addFirst(event) {
        this.$emit('cartadd',event.target); //开发一个事件 传当前的dom对象到父级goods组件
        Vue.set(this.food,'count',1);
      }
    },
    components: {
      "v-cartcontrol" : cartcontrol,
      "v-split": split
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    &.fade-enter-active,&.fade-laver-active
      transition: all 0.3s linear
      transform: translate3d(0,0,0)
    &.fade-enter,&.fade-laver-active
      transform: translate3d(100%,0,0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
    .content
      padding: 18px
      position: relative
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count,.rating
          font-size: 10px
          color: rgb(147,153,159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240,20,20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147,153,159)
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0,160,220)
        transition: all 0.4s
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.4s
          opacity: 1
        &.fade-enter, &.fade-leave-active
          opacity: 0
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7,17,27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77,85,93)
</style>
