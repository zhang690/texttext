<template>
	<view class="myOrder">
		<tabs :tabs="tabs" @handelChild="handelChild"></tabs>
		<view class="allOrder_container">
			<view @click="handleDetail(index,item.orde.OrderState)" class="allOrder_item" v-for="(item,index) in orderList" :key="index">
				<view class="allOrder_title">
					<view class="allOrder_title_left">
						<text>{{item.orde.Self_Delivery}}</text>福彩到家{{item.orde.OutletsName}}投注站
					</view>
					<view class="allOrder_title_right">{{item.orde.name}}</view>
				</view>
				<view class="allOrder_list">
					<!-- 彩票内容开始 -->
					<view class="allOrder_item">
						<view class="allOrder_item_icon">
							<image :src="item.orde.icon" mode="widthFix"></image>
						</view>
						<view class="allOrder_item_wrap">
							<view class="allOrder_item_info" v-for="(redItem,redindex) in item.list" :key="redindex">
								<view class="qiu_text">
									<text v-for="red in redItem.RedBall" :key="red">{{red}}</text><text class="blue" v-for="blue in redItem.BlueBall"
									 :key="blue">{{blue}}</text>
								</view>
								<view class="allOrder_item_qishu">
									<view class="qishu_text">
										<text>期数*{{redItem.Multiple}}</text>
										<text>倍数*{{redItem.Multiple}}</text>
									</view>
									<view class="qishu_info">第一期</view>
								</view>
							</view>

						</view>
					</view>
					<!-- 彩票内容结束 -->
					<view class="total_wrap">
						<view class="total_time">{{item.orde.AddTime}}</view>
						<view class="total_right">
							共{{item.orde.Number}}件商品，合计：￥{{item.orde.Price}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import tabs from '../../components/tabs/tabs';
	import common from '../../common/common';
	var _self;
	export default {
		components: {
			tabs
		},
		data() {
			return {
				tabs: [{
						id: 0,
						name: '全部',
						param: '111',
						isActive: true
					},
					{
						id: 1,
						name: '待出票',
						param: '222',
						isActive: false
					},
					{
						id: 2,
						name: '待领取',
						param: '333',
						isActive: false
					},
					{
						id: 3,
						name: '已完成',
						param: '444',
						isActive: false
					}
				],
				orderstate: "",
				orderList: []
			}
		},
		onLoad() {
			_self = this;
		},
		onShow() {
			let page = getCurrentPages();
			console.log(page);
			_self.orderstate = page[page.length - 1].options.id;
			if (_self.orderstate != "") {
				_self.tabs.forEach((element, index) => {
					index == _self.orderstate ? element.isActive = true : element.isActive = false;
				});
			} else {
				_self.tabs.forEach((element, index) => {
					index == 0 ? element.isActive = true : element.isActive = false
				});
			}
			console.log(_self.orderstate);
			_self.handleOeder(_self.orderstate);
		},
		methods: {
			// 点击跳转详情页
			handleDetail(i, state) {
				uni.setStorageSync('list', _self.orderList[i].list);
				uni.setStorageSync('detail', _self.orderList[i].orde);
				if (state == 1) {
					uni.navigateTo({
						url: '../mine/waitTicket', //待出票
					});
				} else if (state == 2) {
					uni.navigateTo({
						url: '../mine/waitRecive', //待领取
					});
				} else if (state == 3) {
					uni.navigateTo({
						url: '../mine/wancheng', //已完成
					});
				}
			},
			handelChild(e) {
				console.log(e);
				_self.tabs.forEach((element, index) => {
					e.id === index ? element.isActive = true : element.isActive = false;
				});
				if (e.id == 0) {
					_self.orderstate = ""
				} else {
					_self.orderstate = e.id;
				}
			},
			handleOeder(orderstate) {
				let {
					ID
				} = uni.getStorageSync('userinfo');
				common.request({
					path: "Order/getpage",
					data: {
						memerid: ID,
						orderstate,
						rows: 5,
						page: 1,
						sidx: "AddTime",
						sord: "desc"
					},
					success: res => {
						console.log(res);
						res.data.rows.forEach(elem => {
							elem.list.forEach(element => {
								if (element.RedBall != null) {
									element.RedBall = element.RedBall.split(",");
								}
								if (element.BlueBall != null) {
									element.BlueBall = element.BlueBall.split(",");
								}
							})
							if (elem.orde.OrderState == 1) {
								elem.orde.name = "待出票"
							} else if (elem.orde.OrderState == 2) {
								elem.orde.name = "待领取"
							} else if (elem.orde.OrderState == 3) {
								elem.orde.name = "已完成"
							}
							if (elem.orde.Self_Delivery == 1) {
								elem.orde.Self_Delivery = "自提"
							} else if (elem.orde.Self_Delivery == 2) {
								elem.orde.Self_Delivery = "外送"
							} else if (elem.orde.Self_Delivery == 3) {
								elem.orde.Self_Delivery = "托管"
							}
							if (elem.orde.LotteryType == "双色球") {
								elem.orde.icon = "/static/index/shuangseqiu.png"
							} else if (elem.orde.LotteryType == "福彩3D") {
								elem.orde.icon = "/static/index/fucai3d.png"
							} else if (elem.orde.LotteryType == "七乐彩") {
								elem.orde.icon = "/static/index/qilecai.png"
							}
						})
						_self.orderList = res.data.rows;
					}
				});
			}
		},
		watch: {
			orderstate(val, oldVal) {
				_self.handleOeder(val)
				console.log(val, oldVal);
			}
		},
	}
</script>
<style lang="scss" scoped>
	.myOrder {
		background-color: #f7f5f6;

		.allOrder_container {
			.allOrder_item {
				background-color: #fff;
				margin-top: 15rpx;

				.allOrder_title {
					display: flex;
					justify-content: space-between;
					padding: 20rpx;
					border-bottom: 1rpx solid #eee;

					.allOrder_title_left {
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

					.allOrder_title_right {
						color: #999;
					}
				}

				.allOrder_list {
					.allOrder_item {
						display: flex;
						border-bottom: 1rpx solid #eee;
						padding: 20rpx;

						.allOrder_item_icon {
							// flex: 1;
							width: 60rpx;
							margin-top: 20rpx;

							image {
								width: 60rpx;
								height: 60rpx;
							}
						}

						.allOrder_item_wrap {
							flex: 3;

							.allOrder_item_info {

								color: $color;
								font-weight: 600;
								margin-left: 10rpx;
								display: flex;
								justify-content: space-between;
								margin-top: 20rpx;

								.qiu_text {
									width: 400rpx;
									display: flex;
									flex-wrap: wrap;
								}

								.allOrder_item_qishu {
									flex: 1;
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

								.blue {
									color: blue;
								}
							}
						}



					}

					.total_wrap {
						display: flex;
						justify-content: space-between;

						padding: 20rpx 30rpx;

						.total_time {
							color: #999;
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}
</style>
