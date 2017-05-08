<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li
          v-for="(item, index) in goods" class="menu-item"
          :class="{'currents':currentIndex===index}"
          @click="selectMenu(index,$event)"
          >
            <span class="text border-1px">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul class="food-ul">
              <li @click="selectedsFood(food,$event)" v-for="food in item.foods" class="food-item">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="cont">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">¥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol @add="drop" :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
        <v-shopcart ref="shopcart" :select-food="selectFood" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-shopcart>
      </div>
      <v-food @add="drop" :food="selectedFood" ref="food"></v-food>
    </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll";//引入better scroll
  import shopcart from "../shopcart/shopcart.vue"; //引入购物车组件
  import cartcontrol from "../cartcontrol/cartcontrol.vue";//引入添加商品组件
  import food from "../food/food.vue";//引入商品详情页
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [], //商品数据
        listHeight: [], //每个li的高度
        scrollY: 0, //滑动的位置
        selectedFood: {}
      }
    },
    computed: {
      currentIndex() {//每个li高度的下标
        for(let i=0;i<this.listHeight.length;i++){
          let Height1 = this.listHeight[i];
          let Height2 = this.listHeight[i+1];
          if(!Height2 || (this.scrollY >= Height1 && this.scrollY < Height2)){
            return i;
          }
        }
        return 0;
      },
      selectFood(){//拿到foods数据
        let foods = [];
        this.goods.forEach((good)=>{
          good.foods.forEach((food)=>{
            if(food.count){
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {//钩子函数
      this.classMap = ['decrease','discount','special','invoice','guarantee'];
      this.$http.get('/api/goods').then((response)=>{//拿到数据
        response = response.body; //用.body转成对象  拿到的是个属性
        if(response.errno === ERR_OK){
          this.goods = response.data;
          this.$nextTick(()=>{ //vue的一个接口 使dom更新  dom渲染好计算dom相关
            this._initScroll();
            this._calculateHeigth();
          });
        }
      });
    },
    methods: {
      selectedsFood(food,event){//点击显示商品详情信息
        this.selectedFood = food;
        this.$nextTick(() => {
          this.$refs.food.show();
        });
      },
      drop(target) {
				//体验优化，异步执行下落动画
				this.$nextTick(() => {
					this.$refs.shopcart.drop(target);
				});
			},
      _initScroll(){//初始滚动
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
					click: true
				});
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
					probeType: 3,
					click: true
				});
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				});
      },
      _calculateHeigth() {//获取每个li的高度
        let foodList = document.getElementsByClassName('food-list-hook');//找元素每个li
        let Height = 0;
        this.listHeight.push(Height);//没有0
        for( let i = 0; i < foodList.length; i++){
          let item = foodList[i];
          Height += item.clientHeight;
          this.listHeight.push(Height);
        }
      },
      selectMenu(index,event){//点击menu  切换li位置
        if(!event._constructed) return; //元素是没有这个的 better scroll event里有
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');//找元素每个li
        let ele = foodList[index];
        this.foodsScroll.scrollToElement(ele, 200);
      }
    },
    components: {//注册购物车组件
      "v-shopcart": shopcart,
      cartcontrol,
      "v-food": food
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../commom/stylus/mixin.styl"
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 55px
        line-height: 14px
        padding: 0 12px
        text-align: center
        &.currents
          width: 53px
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          border-left: 3px solid rgb(0,160,220)
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
          border-1px(rgba(7,17,27,0.1))
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147,153,159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7,17,27)
          .desc,.extra
            line-height: 10px
            font-size: 10px
            color: rgb(147,153,159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .cont
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
            right: 0
            bottom: 12px
</style>
