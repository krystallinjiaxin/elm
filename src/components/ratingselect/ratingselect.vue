<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span
      @touchstart="select(2,$event)"
      class="block positive"
      :class="{'active':selectType === 2}">{{desc.all}}<span class="cont">{{ratings.length}}</span></span>
      <span @touchstart="select(0,$event)"
      class="block positive"
      :class="{'active':selectType === 0}">{{desc.positive}}<span class="cont">{{positive.length}}</span></span>
      <span
      @touchstart="select(1,$event)"
      class="block negative"
      :class="{'active':selectType === 1}">{{desc.negative}}<span class="cont">{{negative.length}}</span></span>
    </div>
    <div class="switch" :class="{'on':onlyContent}">
      <span class="icon-check_circle" @touchstart="toggleContent"></span>
      <span class="text">只看有评论的内容</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {//评论类型
        type: Number,
        default: ALL
      },
      onlyContent: {//是否有内容
        type: Boolean,
        default: false
      },
      desc: {//评论类型切换
        type: Object,
        default() {
          return {
            all: "全部",
            positive: "满意",
            negative: "不满意"
          }
        }
      }
    },
    computed: {
      positive() {//满意有多少条数据
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negative() {//不满意有多少条数据
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select(type,event){//切换评论按钮
        //if(!event._constructed) return; //元素是没有这个的 better scroll event里有
        //this.selectType = type; //不能直接改父级传过来的简单类型
        this.$emit('ratingtypeselect',type);
      },
      toggleContent() { //切换有没有评论内容
        //if(!event._constructed) return; //元素是没有这个的 better scroll event里有
        //this.onlyContent = !this.onlyContent; //不能直接改父级传过来的简单类型
        this.$emit('contenttoggle',this.onlyContent);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../commom/stylus/mixin.styl"
.ratingselect
  .rating-type
    padding: 18px 0
    margin: 0 18px
    border-1px: (rgba(7,17,27,0.1))
    font-size: 0
    .block
      display: inline-block
      padding: 8px 12px
      margin-right: 8px
      border-radius: 1px
      line-height: 16px
      color: rgb(77,85,93)
      font-size: 12px
      &.active
        color: #fff
      .cont
        font-size: 8px
        margin-left: 2px
      &.positive
        background: rgba(0,160,220,0.2)
        &.active
          background: rgb(0,160,220)
      &.negative
        background: rgba(77,85,93,0.2)
        &.active
          background: rgb(77,85,93)
  .switch
    padding: 12px 18px
    line-height: 24px
    border-bottom: 2px solid rgba(7,17,27,0.1)
    color: rgb(147,153,159)
    font-size: 0
    &.on
      .icon-check_circle
        color: #00c850
    .icon-check_circle
      display: inline-block
      vertical-align: top
      margin-right: 4px
      font-size: 24px
    .text
      display: inline-block
      vertical-align: top
      font-size: 12px
</style>
