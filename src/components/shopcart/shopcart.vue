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
        if(count>=99){
          count = 99;
        }
        return count;
      },
      payDesc() {//计算起送状态
        if(this.totalPrice === 0) {//总价为0 默认
          return `¥${this.deliveryPrice}元起送`;
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
</style>
