<template>
  <div class="stopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
          </div>
          <div class="num" v-if="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">¥{{totalPrice}}</div>
        <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <!-- 两种方法<div class="pay" :class="{'enough':totalPrice>=minPrice,'not-enough':totalPrice<minPrice}">{{payDesc}}</div> -->
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
      <transition name="drop" v-for="ball in balls" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      selectFood: { //选择商品的数组
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 10
            }
          ]
        }
      },
      deliveryPrice: {//运费
        type: Number,
        default: 0
      },
      minPrice: {//起送价
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: []
      }
    },
    computed: {//计算属性
      totalPrice() { //计算商品总价
        let total = 0;
        this.selectFood.forEach((food)=>{
          total += food.price * food.count; //单价乘以数量
        });
        return total;
      },
      totalCount() {//计算商品数量
        let count = 0;
        this.selectFood.forEach((food)=>{
          count += food.count;
        });
        return count;
      },
      payDesc() {//计算起送状态
        if(this.totalPrice === 0) {//总价为0 默认
          return `¥${this.minPrice}元起送`;
        }else if (this.totalPrice < this.minPrice){//总价小于起送价
          let diff = this.minPrice - this.totalPrice;
          return `还差${diff}元起送`;
        }else {//大于等于起送价
          return '结算'
        }
      },
      payClass() {//计算起送状态更改class
        if(this.totalPrice < this.minPrice){
          return 'not-enough';
        }else {
          return 'enough';
        }
      }
    },
    methods: {
      drop(el) {//在这做添加物品球下落运动
        for(let i=0;i<this.balls.length;i++){//找到隐藏的小球
          let ball = this.balls[i]; //拿到每个ball
          if(!ball.show){
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);//存储已经下落小球
            return;
          }
        }
      },
      beforeEnter(el) {//进入动画之前
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];//找到显示的小球做动画
          if(ball.show){
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';//让球显示
            el.style.webkitTransform = `translate3D(0,${y}px,0)`;
            el.style.transform = `translate3D(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3D(${x}px,0,0)`;
            inner.style.transform = `translate3D(${x}px,0,0)`;
          }
        }
      },
      enter(el) {//进入动画刚开始
        /* eslint-disable no-unused-vars */
        let refresh = el.offsetHeight; //触发浏览器重绘
        this.$nextTick(()=>{
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterEnter(el) {//动画结束
        let ball = this.dropBalls.shift();
        if(ball){
          ball.show = false;
          el.style.display = 'none';
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .stopcart
    position: fixed
    bottom: 0
    left: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0,160,220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700px
            color: #fff
            background: rgb(200,20,20)
            border-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255,255,255,0.1)
          font-size: 16px
          font-weight: 700
          color: rgba(255,255,255,0.4)
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          color: rgba(255,255,255,0.4)
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          color: rgba(255,255,255,0.4)
          font-weight: 700
          background: #2b333b
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        &.drop-enter-active
          transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
          .inner
            width: 16px
            height: 16px
            border-radius: 50%
            background: rgb(0,160,220)
            transition: all 0.4s linear
</style>
