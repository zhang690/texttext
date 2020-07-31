<template>
	<view class="index">
		<!-- 轮播开始 -->
		<!-- <swiper-item :banner="banner"></swiper-item> -->
		<swiper>
		  <!-- <block v-for='(item,index) in banner'> -->
		    <swiper-item>
		      <image src="../../static/index/banner.png"/>
		    </swiper-item>
		  <!-- </block> -->
		</swiper>
		<!-- 轮播结束 -->
		<!-- 内容开始 -->
		<view class="index_content">
			<!-- 卡片开始 -->
			<view class="card_wrap">
				<view class="card_item">
					<view class="card_icon">
						<image mode="widthFix" src="/static/index/shuangse.png"></image>
					</view>
					<view class="card_title">双色彩</view>
					<view class="card_text">2元可中1000万</view>
				</view>
				<view class="card_item">
					<view class="card_icon">
						<image mode="widthFix" src="/static/index/qile.png"></image>
					</view>
					<view class="card_title">七彩乐</view>
					<view class="card_text">单注奖金最高500万</view>
				</view>
				<view class="card_item">
					<view class="card_icon">
						<image mode="widthFix" src="/static/index/fucai.png"></image>
					</view>
					<view class="card_title">福彩3D</view>
					<view class="card_text">固定奖，天天开</view>
				</view>
			</view>
			<!-- 卡片结束 -->
			<!-- 彩卷开始 -->
			<view class="caijuan_wrap">
				<navigator url="./guaguale" class="caijuan_item">
					<!-- <image></image> -->
					<view class="caijuan_text">刮刮乐</view>
				</navigator>
				<view class="caijuan_item">
					<!-- <image></image> -->
					<navigator url="../luckyWheel/luckyWheel" class="caijuan_text">幸运抽奖</navigator>
				</view>
				<navigator url="./caijuan" class="caijuan_item">
					<!-- <image></image> -->
					<view class="caijuan_text">我的彩券</view>
				</navigator>
			</view>
			<!-- 彩卷结束 -->
			<view class="fenge_bg">
				<image src="/static/index/GO.png" mode="widthFix"></image>
			</view>
			<!-- 开奖开始 -->
			<view class="kaijiang_wrap">
				<view class="kaijiang_header">
					<view class="kaijiang_title"><text>开奖情况</text></view>
					<view class="kaijiang_btn black">更多<text> > </text></view>
				</view>
				<view class="kaijiang_item" v-for="(item,index) in shuangse" :key="index">
					<view class="kaijiang_item_icon">
						<image src="/static/index/shuangseqiu.png" mode="widthFix"></image>
						<view class="icon_text">双色球</view>
					</view>
					<view class="kaijiang_item_content">
						<view class="content_text">第{{item.PeriodsNumber}}期<text class="blcak">{{item.PrizeTime}}</text></view>
						<view class="content_qiu">
							<view class="qiu_num"><text v-for="red in item.RedBall" :key="red">{{red}}</text><text class="blue_num">{{item.BlueBall}}</text>
							</view>
							<view class="qiu_btn">></view>
						</view>
					</view>
				</view>
				<view class="kaijiang_item" v-for="(item,index) in qicai" :key="index">
					<view class="kaijiang_item_icon">
						<image src="/static/index/qilecai.png" mode="widthFix"></image>
						<view class="icon_text">七乐彩</view>
					</view>
					<view class="kaijiang_item_content">
						<view class="content_text">第{{item.PeriodsNumber}}期<text class="blcak">{{item.PrizeTime}}</text></view>
						<view class="content_qiu">
							<view class="qiu_num"><text v-for="red in item.RedBall" :key="red">{{red}}</text>
							</view>
							<view class="qiu_btn">></view>
						</view>
					</view>
				</view>
				<view class="kaijiang_item" v-for="item in fucai" :key="item.ID">
					<view class="kaijiang_item_icon">
						<image src="/static/index/fucai3d.png" mode="widthFix"></image>
						<view class="icon_text">福彩3D</view>
					</view>
					<view class="kaijiang_item_content">
						<view class="content_text">第{{item.PeriodsNumber}}期<text class="blcak">{{item.PrizeTime}}</text></view>
						<view class="content_qiu">
							<view class="qiu_num"><text v-for="(red,index) in item.RedBall" :key="index">{{red}}</text>
							</view>
							<view class="qiu_btn">></view>
						</view>
					</view>
				</view>
			</view>
			<!-- 开奖结束 -->
		</view>
		<!-- 内容结束 -->
	</view>
</template>

<script>
	import SwiperItem from "../../components/swiper/SwiperItem.vue";
	import common from '../../common/common';
	var _self;
	export default {
		components: {
			SwiperItem
		},
		data() {
			return {
				num: 3,
				banner: ['../../static/index/banner.png','../../static/index/banner.png','../../static/index/banner.png'],
				shuangse: [],
				qicai:[],
				fucai:[]
			};
		},
		onLoad() {
			_self = this;
			// 轮播图
			_self.getIndex();
		},
		onShow() {
			// 双色球
			_self.getKaijiang();
			// 福彩3d
			_self.getFucai();
			// 七乐彩
			_self.getQicai();
		},
		methods: {
			// 获取轮播数据
			getIndex() {
				common.request({
					path: "Development/getbanner",
					// method:'POST',
					data: {
						rows: 3,
						page: 1,
						sidx: "",
						sord: "desc",
					},
					success: res => {
						console.log(res);
						res.data.rows.forEach(element => {
							element.Images = common.PicURL + element.Images
						});
						
						// _self.banner = res.data.rows						
					}
				});
			},
			// 获取七彩乐开奖历史
			getQicai(){
				common.request({
					path: "Development/getpage",
					// method:'POST',
					data: {
						rows: 1,
						page: 1,
						sidx: "PrizeTime",
						sord: "desc",
						caizhongid:"3"
					},
					success: res => {
						res.data.rows.forEach(elem=>{
							elem.RedBall = elem.RedBall.split(",")
						})
						_self.qicai = res.data.rows
						console.log(res);
					}
				})
			},
			// 获取福彩开奖历史
			getFucai(){
				common.request({
					path: "Development/getpage",
					// method:'POST',
					data: {
						rows: 1,
						page: 1,
						sidx: "PrizeTime",
						sord: "desc",
						caizhongid:"2"
					},
					success: res => {
						res.data.rows.forEach(elem=>{
							elem.RedBall = elem.RedBall.split(",")
						})
						_self.fucai = res.data.rows
						console.log(res);
					}
				})
			},
			// 获取双色球开奖历史
			getKaijiang() {
				common.request({
					path: "Development/getpage",
					// method:'POST',
					data: {
						rows: 1,
						page: 1,
						sidx: "PrizeTime",
						sord: "desc",
						caizhongid:"1"
					},
					success: res => {
						res.data.rows.forEach(elem => {
							if (elem.RedBall) {
								elem.RedBall = elem.RedBall.split(",")
							}
						})
						_self.shuangse = res.data.rows;
					}
				});
				
			},
		}
	};
</script>

<style lang="scss" scoped>
	.index_content {
		width: 95%;
		margin: 10rpx auto 0;
	}

	.blcak {
		color: #aaa;
	}

	.card_wrap {
		display: flex;
		margin: 15rpx 0;
		text-align: center;

		.card_item {
			width: 33.33%;

			.card_icon {
				width: 120rpx;
				margin: 15rpx auto;

				image {
					border-radius: 50%;
				}
			}

			.card_title {
				font-size: 32rpx;
			}

			.card_text {
				font-size: 26rpx;
				color: #666;
			}
		}
	}

	.caijuan_wrap {
		display: flex;
		justify-content: space-between;
		margin-top: 15rpx;

		.caijuan_item {
			display: flex;
			width: 31%;
			background-color: #eeeeee;
			height: 100rpx;
			align-items: center;

			.caijuan_text {
				margin-left: 20rpx;
				display: flex;
				align-items: center;
			}
		}
	}

	.fenge_bg {
		width: 90%;
		margin: 20rpx auto;
	}

	.kaijiang_wrap {
		margin-top: 30rpx;

		.kaijiang_header {
			display: flex;
			justify-content: space-between;
			padding-left: 15rpx;

			.kaijiang_title {
				border-left: 10rpx solid $color;
				font-size: 30rpx;

				text {
					margin-left: 15rpx;
				}
			}

			.kaijiang_btn {
				font-size: 26rpx;

				text {
					margin-left: 5rpx;
				}
			}
		}

		.kaijiang_item {
			display: flex;
			align-items: center;
			margin-top: 20rpx;
			background-color: #f3f8fb;
			height: 160rpx;
			padding: 0 30rpx;
			.kaijiang_item_icon {
				flex: 1;
				image {
					width: 80rpx;
				}

				.icon_text {}
			}

			.kaijiang_item_content {
				flex: 3;
				.content_text {
					font-size: 26rpx;

					text {

						margin-left: 8rpx;
					}
				}

				.content_qiu {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;

					.qiu_num {

						display: flex;


						align-items: center;

						text {
							display: block;
							width: 55rpx;
							height: 55rpx;
							background-color: $color;
							text-align: center;
							line-height: 55rpx;
							border-radius: 50%;
							color: #fff;
							margin-left: 10rpx;
						}

						.blue_num {
							background-color: blue;
						}
					}

					.qiu_btn {
						font-size: 32rpx;
					}
				}

				.content_info {
					font-size: 24rpx;
					color: #ccc;
					margin-top: 15rpx;
				}
			}
		}
	}
</style>
