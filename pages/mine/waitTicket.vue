<template>
	<view class="waitTicket">
		<!-- 头部地址开始 -->
		<view class="header_adress">
			<view class="adress_left">
				<view class="left_title">{{detail.OutletsName}}</view>
				<view class="left_text">{{detail.Address}}</view>
			</view>
			<view class="adress_right">
				<view class="right_distance">130m</view>
				<view class="right_go">去这里</view>
			</view>
		</view>
		<!-- 头部地址结束 -->
		<!-- 待出票开始 -->
		<view class="wait_container">
			<view class="wait_title">
				<view class="wait_title_left">
					<text>{{detail.Self_Delivery}}</text>福彩到家{{detail.OutletsName}}投注站
				</view>
				<view class="wait_title_right">{{detail.name}}</view>
			</view>
			<view class="wait_list">
				<!-- 彩票内容开始 -->
				<view class="wait_item">
					<view class="wait_item_icon">
						<image :src="detail.icon" mode="widthFix"></image>
					</view>
					<view class="wait_item_wrap">
						<view class="wait_item_info" v-for="(item,index) in list" :key="index">
							<view class="qiu_text">
                <text v-for="red in item.RedBall" :key="red">{{red}}</text>
							<text class="blue" v-for="blue in item.BlueBall" :key="blue">{{blue}}</text>
              </view>
							<view class="wait_item_qishu">
								<view class="qishu_text">
									<text>期数*{{item.Multiple}}</text>
									<text>倍数*{{item.Multiple}}</text>
								</view>
								<view class="qishu_info">第一期</view>
							</view>
						</view>

					</view>
				</view>
				<!-- 彩票内容结束 -->
				<view class="total_wrap">
					<view class="total_title">共{{detail.Number}}件商品</view>
					<view class="total_item">合计：￥{{detail.Price}}</view>
				</view>
			</view>
		</view>
		<!-- 待出票结束 -->
		<!-- 催促出票开始 -->
		<view class="cuicu_btn">
			<view class="cuicu" @click="handleCuicu">催促出票</view>
		</view>
		<!-- 催促出票结束 -->
		<!-- 出票凭证开始 -->
		<view class="chupiao">
			<view class="chupiao_title">出票凭证</view>
			<view class="laod_chupiao">等待出票...</view>
		</view>
		<!-- 出票凭证结束 -->
	</view>
</template>
<script>
	var _self;
	export default {
		data() {
			return {
				num: 7,
				detail: {},
				list: []
			}
		},
		onLoad() {
			_self = this;
			_self.detail = uni.getStorageSync('detail');
			_self.list = uni.getStorageSync('list');

    },
    methods: {
      handleCuicu(){
        uni.showToast({
          title: '催促出票成功，请耐心等待',
          icon: 'none',
          duration: 1500,
          mask: true,
        });
      }
    },
	}
</script>
<style lang="scss" scoped>
	.waitTicket {
		background-color: #f7f5f6;

		.header_adress {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 40rpx;
			align-items: center;
			background-color: #fff;

			.adress_left {
				.left_title {
					font-size: 30rpx;
					font-weight: 600;
				}

				.left_text {
					color: #666;
					margin-top: 10rpx;
				}
			}

			.adress_right {
				font-size: 24rpx;

				.right_distance {
					color: #666;
				}

				.right_go {
					color: $color;
					margin-top: 10rpx;
				}
			}
		}

		.wait_container {
			background-color: #fff;
			margin-top: 15rpx;

			.wait_title {
				display: flex;
				justify-content: space-between;
				padding: 20rpx;
				border-bottom: 1rpx solid #eee;

				.wait_title_left {
					display: flex;
					font-weight: 600;
					align-items: center;

					text {
						display: block;
						background-color: $color;
						color: #fff;
						width: 65rpx;
						height: 32rpx;
						text-align: center;
						line-height: 32rpx;
						font-size: 24rpx;
						border-radius: 5rpx;
						margin-right: 10rpx;
					}
				}

				.wait_title_right {
					color: #999;
				}
			}

			.wait_list {
				.wait_item {
					display: flex;
					border-bottom: 1rpx solid #eee;
					padding: 20rpx;

					.wait_item_icon {
						// flex: 1;
						width: 60rpx;
            margin-top: 15rpx;
					}

					.wait_item_wrap {
						flex: 3;

						.wait_item_info {

							color: $color;
							font-weight: 600;
							margin-left: 10rpx;
							line-height: 50rpx;
              display: flex;
							margin-top: 15rpx;
              .qiu_text{
                width: 400rpx;
									display: flex;
									flex-wrap: wrap;
                .blue {
								color: blue;
							}
              }
							.wait_item_qishu {
								flex: 2;
								font-size: 24rpx;
								text-align: center;

								.qishu_text {
									color: #666;

									text {
										margin-left: 20rpx;
									}
								}

								.qishu_info {
									width: 90rpx;
									height: 32rpx;
									color: #333;
									background-color: #f7f5f6;
									margin-left: 130rpx;
									margin-top: 20rpx;

								}
							}

							text {
								margin-left: 15rpx;
							}
						}
					}


				}

				.total_wrap {
					display: flex;
					justify-content: space-between;
					font-size: 30rpx;
					font-weight: 600;
					padding: 20rpx 30rpx;

					.total_title {}

					.total_item {}
				}
			}
		}

		.cuicu_btn {
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100rpx;
			background-color: #fff;

			.cuicu {
				border: 1rpx solid $color;
				color: $color;
				height: 60rpx;
				width: 200rpx;
				text-align: center;
				line-height: 60rpx;
				border-radius: 30rpx;
				font-weight: 600;
			}
		}

		.chupiao {
			margin-top: 15rpx;
			background-color: #fff;
			font-weight: 600;

			.chupiao_title {
				border: 1rpx solid #eee;
				padding: 20rpx 30rpx;
			}

			.laod_chupiao {
				text-align: center;
				margin-top: 20rpx;
				color: #999;
			}
		}
	}
</style>
