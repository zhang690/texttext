<template>
	<view class="tuijian">
		<view class="header-icon">
			<image class="icon-title" src="../../static/mine/tuijianyouli.png"></image>
			<image class="icon-bg" src="../../static/mine/header.png"></image>
		</view>
		<view class="tuijian-content">
			<view class="tuijian-title">您的邀请码</view>
			<view class="tuijian-num">
				<view class="num-item">1</view>
				<view class="num-item">2</view>
				<view class="num-item">5</view>
				<view class="num-item">7</view>
				<view class="num-item">9</view>
				<view class="num-item">8</view>
				<view class="num-item">5</view>
				<view class="num-item">5</view>
			</view>
			<view class="tuijian-text">邀请的好友也可在注册时直接填写邀请码</view>
			<view class="code-icon">
				<!-- <image src=""></image> -->
				<text>长按图片即可保存</text>
			</view>
			<view class="tuijian-btn">转发邀请</view>
		</view>
	</view>
</template>
<script>
	export default {

	}
</script>
<style lang="scss" scoped>
	.tuijian {
		background: linear-gradient(to bottom, #f6454c, #d54d8f, #ad41d0);
		height: 100vh;
		padding-top: 10rpx;

		.header-icon {
			width: 85%;
			margin-left: calc((100vw - 85vw) / 2);
			margin-top: 40rpx;
			position: relative;

			.icon-title {
				width: 95%;
				margin: 0 auto;
				height: 200rpx;
			}

			.icon-bg {
				position: absolute;
				bottom: -135rpx;
				height: 200rpx;
			}
		}

		.tuijian-content {
			background-color: #fff;
			width: 90%;
			height: 800rpx;
			margin: 30rpx auto;
			border-radius: 10rpx;
			text-align: center;
			padding-top: 50rpx;

			.tuijian-title {
				font-size: 32rpx;
				font-weight: 600;
			}

			.tuijian-num {
				display: flex;
				justify-content: center;
				margin-top: 30rpx;

				.num-item {
					background-color: #efefef;
					color: $color;
					width: 40rpx;
					height: 60rpx;
					margin-left: 10rpx;
					line-height: 60rpx;
				}
			}

			.tuijian-text {
				color: #999;
				font-size: 22rpx;
				margin-top: 30rpx;
			}

			.code-icon {
				margin-top: 30rpx;
				color: #999;
				font-size: 20rpx;

				image {
					background-color: #000;
					width: 300rpx;
					height: 300rpx;
					margin: 0 auto 30rpx;
				}
			}

			.tuijian-btn {
				width: 80%;
				height: 80rpx;
				margin: 0 auto;
				background: linear-gradient(to right, #ec7a4b, #ea6567, #e85183);
				color: #fff;
				line-height: 80rpx;
				margin-top: 50rpx;
				border-radius: 40rpx;
			}

		}
	}
</style>
