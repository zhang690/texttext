<template>
  <view class="segmented">
    <view class="segmented-wrap">
      <view class="segmented-item" :class="item.isActive?'segmented-active':''" v-for="item in tabs" :key="item.id" @click="handleClick(item.id)">{{item.name}}</view>
    </view>
  </view>
</template>
<script>
export default {
  props:{
    tabs:Array
  },
  methods: {
    handleClick(id){
      this.$emit("handleParent",id);
      // console.log(id);
    }
  },
}
</script>
<style lang="scss" scoped>
  .segmented{
    width: 100%;
    .segmented-wrap{
      
      display: flex;
      justify-content: space-around;
      padding:5rpx 30rpx;
      height: 70rpx;
      background-color: $color;
      border-radius: 40rpx;
      font-weight: 600;
      font-size: 30rpx;
      .segmented-item{
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30%;
      }
      .segmented-active{
        background-color: #fff;
        color: $color;
        border-radius: 35rpx;
      }
    }
  }
</style>