<template>
    <div class="cartcontrol">
      <transition name="move">
        <div class="cart-decrease" v-show="food.count>0" @touchstart="decreasecart">
          <span class="inner icon-remove_circle_outline"></span>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" v-on:touchstart="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Vue from "vue";

  export default {
    props: {//购物的数据
      food: {
        type: Object
      }
    },
    created() {

    },
    methods: {
      addCart(event){//添加物品
        //if(!event._constructed) return;
        if(!this.food.count){
          Vue.set(this.food, 'count' ,1); //设置 arr key value
        }else {
          return this.food.count++;
        }
      },
      decreasecart(){//减少物品
        if(this.food.count){
          return this.food.count--;
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      transition: all 0.4s
      &.move-enter-active,&.move-leave-active
        opacity: 1
        transform: translate3D(0,0,0)
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0,160,220)
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter,&.move-leave-active
        opacity: 0
        transform: translate3D(24px,0,0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147,153,159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0,160,220)
</style>
