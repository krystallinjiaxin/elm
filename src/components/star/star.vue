<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" ></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const STS_ON = 'on';
  const STS_HALF = 'half';
  const STS_OFF = 'off';

  export default {
    props: {
      size: {//星星类型
        type: Number
      },
      score: {//分数
        type: Number
      }
    },
    computed: {
      starType(){//根据传进来的类型切换class 48 36 24
        return 'star-' + this.size;
      },
      itemClasses(){//求出星星
        let result = [];
        let score = Math.floor(this.score * 2 ) / 2; //得到评分 4 或者 4.5 之类的
        let hasDecimal = score % 1 !== 0; //判断有没有小数
        let integer = Math.floor(score); //拿到全星
        for(var i=0;i<integer;i++){ //得到全星的数量
          result.push(STS_ON);
        }
        if(hasDecimal){//得到半星
          result.push(STS_HALF);
        }
        while (result.length < LENGTH) {//得到没有星星的
          result.push(STS_OFF);
        }
        return result;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import "../../commom/stylus/mixin.styl";
  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>
