<template>
	<view class="mine">
		<view class="header_bg">
			<image src="/static/mine/header_bg.png" mode="widthFix"></image>
			<!-- 用户信息开始 -->
			<view class="user_wrap">
				<view class="kefu_btn">
					<image src="/static/mine/kefu.png" mode="widthFix"></image>
				</view> 
				<view class="user_info"> 
					<view class="user_avatar">
						<image :src="userinfo.headIcon"></image>
					</view>
					<view class="user_name">{{userinfo.nickName}}</view>
				</view>
				<view class="user_other">
					<navigator url="./myjifen" class="other_item">
						<view class="other_item_num">{{userinfo.Integral}}</view>
						<view class="other_item_text">积分</view>
					</navigator>
					<view class="other_item">
						<view class="other_item_num">{{userinfo.Balance}}</view>
						<view class="other_item_text">余额</view>
					</view>
					<view class="other_item">
						<view class="other_item_num">{{quan}}</view>
						<view class="other_item_text">优惠券</view>
					</view>
				</view>
			</view>
			<!-- 用户信息结束 -->
		</view>
		
		<!-- 充值按钮开始 -->
		<view class="chongzhi_wrap">
			<view class="chongzhi chongzhi_item">
				<text></text>充值
			</view>
			<view class="tixian chongzhi_item">
				<text></text>提现
			</view>
		</view>
		<!-- 充值按钮结束 -->
		<!-- 订单开始 -->
		<view class="order_wrap">
			<view class="title_wrap">
				<view class="order_title">我的短信投注</view>
				<navigator url="../order/myOrder?id=" class="title_right" >全部
					<text class="iconfont icon-iconfontjiantou5"></text>
				</navigator>
			</view>
			<view class="order_container">
				<navigator url="../order/myOrder?id=1" class="order_item" >
					<view class="order_load_icon">
						<image src="/static/mine/daichupiao.png" mode="widthFix"></image>
					</view>
					<view class="order_text">待出票</view>
				</navigator>
				<navigator url="../order/myOrder?id=2" class="order_item">
					<view class="order_load_icon">
						<image src="/static/mine/dailingqu.png" mode="widthFix"></image>
					</view>
					<view class="order_text">待领取</view>
				</navigator>
				<navigator url="../order/myOrder?id=3" class="order_item">
					<view class="order_load_icon">
						<image src="/static/mine/yiwancheng.png" mode="widthFix"></image>
					</view>
					<view class="order_text">已完成</view>
				</navigator>
			</view>
		</view>
		<!-- 订单结束 -->
		<!-- 列表开始 -->
		<view class="list_wrap">
			<uni-list>
				<view class="list_item">					
					<!-- <uni-list-item title="我的中奖" :thumb="require('../../static/mine/我的中奖.png')"></uni-list-item> -->
					<uni-list-item title="我的中奖" thumb="/static/mine/zhongjiang.png"></uni-list-item>
				</view>
				<navigator url="./jifen" open-type="navigate" class="list_item">

					<uni-list-item title="积分商城" thumb="/static/mine/jifenshangcheng.png"></uni-list-item>
				</navigator>
				<navigator url="./tuijian" class="list_item">

					<uni-list-item title="推荐有礼" thumb="/static/mine/tuijian.png"></uni-list-item>
				</navigator>
				<navigator url="../setadress/adressList" class="list_item">

					<uni-list-item title="收货地址" thumb="/static/mine/shouhuo.png"></uni-list-item>
				</navigator>
				<view class="list_item">

					<uni-list-item title="账户设置" thumb="/static/mine/setting.png"></uni-list-item>
				</view>
				<view class="list_item">
					<uni-list-item title="关于软件" thumb="/static/mine/guanyu.png"></uni-list-item>
				</view>
			</uni-list>  
		</view>
		<!-- 列表结束 -->
	</view>
</template>
<script>
	import uniList from "../../components/uni-list/uni-list.vue";
	import uniListItem from "../../components/uni-list-item/uni-list-item.vue";
import common from '../../common/common';
	var _self;
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				userinfo:{},
				quan:0
			}
		},
		onLoad(){
			_self = this;
		},
		onShow(){
			let userinfo = uni.getStorageSync('userinfo');
			_self.userinfo = userinfo
			_self.getQuan()
		},
		methods: {
			getQuan(){
     let {ID} = uni.getStorageSync('userinfo');
				common.request({
        path: "Development/getcouponnumber",
        data: ID,
        success: res => {
					console.log(res);
					_self.quan = res.data.rows
        }
      });
			}
		}
	};
</script>
<style lang="scss" scoped>
	.mine {
		background-color: #faf6f7;
	}
	.header_bg{
	height: 500rpx;
	}
	.user_wrap {
		position: relative;
		background-color: #fff;
		width: 90%;
		height: 300rpx;
		border-radius: 15rpx;
		margin: 0 auto;
		box-shadow: 0 15rpx 5rpx $color;
		top: -230rpx;
		.kefu_btn{
			position: absolute;
			width: 40rpx;
			top: -60rpx;
			right: 20rpx;
		}
		.user_info {
			display: flex;

			.user_avatar {
				position: absolute;
				top: -50rpx;
				left: 40rpx;
				z-index: 100;
				image {
					width: 130rpx;
					height: 130rpx;
					border-radius: 50%;
				}
			}

			.user_name {
				margin-left: 200rpx;
				margin-top: 15rpx;
			}
		}

		.user_other {
			display: flex;
			justify-content: space-around;
			margin-top: 80rpx;

			.other_item {
				.other_item_num {
					color: #eb5454;
					text-align: center;
				}

				.other_item_text {
					margin-top: 10rpx;
				}
			}
		}
	}

	.chongzhi_wrap {
		color: #fff;
		display: flex;
		justify-content: space-around;
		margin-top: 40rpx;

		.chongzhi_item {
			text-align: center;
			height: 80rpx;
			width: 260rpx;
			border-radius: 10rpx;
			letter-spacing: 3rpx;
			line-height: 80rpx;
			font-size: 34rpx;
		}

		.chongzhi {
			background-color: $color;
		}

		.tixian {
			background-color: #feb302;
		}
	}

	.order_wrap {
		width: 90%;
		background-color: #fff;
		border-radius: 10rpx;
		margin: 20rpx auto 0;
		padding: 10rpx 0 0 10rpx;

		.title_wrap {
			display: flex;
			justify-content: space-between;
			padding: 0 10rpx;

			.order_title {
				font-size: 34rpx;
				text-align: left;
			}

			.title_right {
				color: #999;
			}
		}

		.order_container {
			display: flex;
			justify-content: space-around;
			color: #333;

			.order_item {
				width: 33.33%;
				margin-top: 20rpx;
				text-align: center;
				.order_load_icon {
					
					display: flex;
					justify-content: center;
					image{
						width: 40rpx;
					}
				}

				.order_text {
					margin-top: 20rpx;
				}
			}
		}
	}

	.list_wrap {
		width: 90%;
		margin: 0 auto;
		margin-top: 15rpx;
		color: #cecece;
	}
</style>
