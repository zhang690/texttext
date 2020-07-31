<template>
  <view class="swiper_compontent">
		<swiper :autoplay="true" :interval="3000" circular :duration="1000" class="swiper">
			<swiper-item v-for="item in banner" :key="item.ID">
				<view class="swiper-item">
					<image :src="item.Images" mode="widthFix"></image> 
				</view>
			</swiper-item>
		</swiper>
  </view>
</template>
<script>
export default {
  data(){
		return{
			
		}
	},
	props:{
		banner:Array
	}
}
</script>
<style lang="scss" scoped>
	.swiper_compontent{
		width: 90%;
		margin: 20rpx auto 0;
		border-radius: 50rpx;
	}
</style>