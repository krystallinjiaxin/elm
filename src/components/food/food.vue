<template>
  <transition name="fade">
    <div class="food" v-show="showFalg">
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
          <span class="rating">好评率{{food.rating}}</span>
        </div>
        <div class="price">
          <span class="now">{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
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
      },
      hide() {//关闭详情页
        this.showFalg = false;
      }
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
</style>
