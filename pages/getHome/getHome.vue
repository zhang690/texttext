<template>
  <view class="gethome">
    <!-- 轮播开始 -->
    <swiper-item></swiper-item>
    <!-- 轮播结束 -->
    <view class="scroll_wrap">
      <scroll-view scroll-y class="scroll_one">
      	<view v-for="(item,index) in text" :key="index" class="scroll_title" @click="handleActive(index)" :class="item.isActive?'active':''"><text></text>{{item.name}}</view> 
      </scroll-view>
			<scroll-view scroll-y class="scroll_two">
				<view class="scroll_item" v-for="item in selectCode" :key="item.title">
          <image :src="item.pic" mode="widthFix"></image>
          <view class="item_text">{{item.title}}</view>
          <navigator :url="item.url" class="item_duanxin">短信选号</navigator>
        </view>
			</scroll-view>
    </view>
  </view>
</template>
<script>
import SwiperItem from "../../components/swiper/SwiperItem.vue";
export default {
  components: { SwiperItem },
  data() {
    return {
      selectCode:[
				{title:"双色球",url:"../selectCode/selectCode",pic:"/static/index/shuangseqiu.png"},
				{title:"七彩乐",url:"../selectCode/selectCodeqicai",pic:"/static/index/qilecai.png"},
        {title:"福彩3D",url:"../selectCode/selectThreeD",pic:"/static/index/fucai3d.png"}
			],
      text:[
        {
          id:0,
          name:"福利彩票",
          isActive:true
        },
      ]
    }
  },
	onShow() {
		getApp().globalData.saveNum = [];
	},
  methods: {
    handleActive(i){
      this.text.forEach(element => {
        i === element.id?element.isActive = true: element.isActive = false;
      });
    }
  },
}
</script>
<style lang="scss">
.gethome{
  background-color: #faf6f7;
}
  .scroll_wrap{
    display: flex;
    padding: 20rpx;
    .scroll_one{
      flex: 1;
      height: calc(100vh - 375rpx);
      background-color: #fff;
      border-radius: 10rpx;
      .scroll_title{
        font-size: 34rpx;
        font-weight: bolder;
        text-align: center;
        margin-top: 35rpx;
      }
      .active{
        border-left: 10rpx solid $color;
      }
    }
    .scroll_two{
      flex: 3;
      height: calc(100vh - 375rpx);
      background-color: #fff;
      margin-left: 15rpx;
      border-radius: 10rpx;
      .scroll_item{
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 20px;
        image{
          width: 100rpx;
          border-radius: 50%;
        }
        .item_text{
          
        }
        .item_duanxin{
          background-color: #e5e5e5;
          width: 120rpx;
          height: 50rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8rpx;
        }
      }
    }
  }
</style>