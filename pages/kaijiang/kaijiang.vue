<template>
	<view class="kaijiang_page">
		<!-- 轮播开始 -->
		<swiper-item></swiper-item>
		<!-- 轮播结束 -->
		<!-- 彩票开始 -->
		<view class="kaijiang_wrap">
			<view class="kaijiang_item" v-for="item in shuangse" :key="item.ID">
				<view class="kaijiang_header">
					<view class="kaijiang_title">
						<text>{{item.title}}</text>
					</view> 
					<view class="content_text black">
						第{{item.PeriodsNumber}}期
						<text>{{item.PrizeTime}}</text>
					</view>
				</view>
				<view class="kaijiang_item_content">
					<view class="content_qiu">
						<view class="qiu-wrap"><text class="qiu_num" v-for="red in item.RedBall" :key="red">{{red}}</text><text class="qiu_num bull-num">{{item.BlueBall}}</text></view>
					</view>
					<navigator open-type="navigate" :url="item.url" class="kaijiang_btn black">
						更多
					</navigator>
				</view>
				<navigator :url="item.codeUrl" class="kaijiang_item_btn">
					去短信选号
				</navigator>
			</view> 
			<view class="kaijiang_item" v-for="item in qicai" :key="item.ID">
				<view class="kaijiang_header">
					<view class="kaijiang_title">
						<text>{{item.title}}</text>
					</view> 
					<view class="content_text black">
						第{{item.PeriodsNumber}}期
						<text>{{item.PrizeTime}}</text>
					</view>
				</view>
				<view class="kaijiang_item_content">
					<view class="content_qiu">
						<view class="qiu-wrap"><text class="qiu_num" v-for="redq in item.RedBall" :key="redq">{{redq}}</text></view>
					</view>
					<navigator open-type="navigate" :url="item.url" class="kaijiang_btn black">
						更多
					</navigator>
				</view>
				<navigator :url="item.codeUrl" class="kaijiang_item_btn">
					去短信选号
				</navigator>
			</view>
			<view class="kaijiang_item" v-for="item in fucai" :key="item.ID">
				<view class="kaijiang_header">
					<view class="kaijiang_title">
						<text>{{item.title}}</text>
					</view> 
					<view class="content_text black">
						第{{item.PeriodsNumber}}期
						<text>{{item.PrizeTime}}</text>
					</view>
				</view>
				<view class="kaijiang_item_content">
					<view class="content_qiu">
						<view class="qiu-wrap" ><tetx class="qiu_num" v-for="redf in item.RedBall" :key="redf">{{redf}}</tetx></view>
					</view>
					<navigator open-type="navigate" :url="item.url" class="kaijiang_btn black">
						更多
					</navigator>
				</view>
				<navigator :url="item.codeUrl" class="kaijiang_item_btn">
					去短信选号
				</navigator>
			</view>  
		</view>

		<!-- 彩票结束 -->
		<view class="kaijiang_footer">
			<image src="../../static/kaijiang/banner.png" mode="widthFix"></image>
		</view>
	</view>
</template>
<script>
import common from '../../common/common'
	import SwiperItem from "../../components/swiper/SwiperItem.vue";
	var _self;
	export default {
		components: {
			SwiperItem
		},
		data() {
			return {
				shuangse:[],
				qicai:[],
				fucai:[]
			};
		},
		onLoad(){
			_self = this;
			
		},
		onShow() {
			getApp().globalData.saveNum = [];
			_self.getQicai();
			_self.getKaijiang();
			_self.getFucai();
			wx.removeStorageSync("outlets");
		},
		methods: {
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
							elem.RedBall = elem.RedBall.split(",");
							elem.title = "七乐彩";
						elem.url = "./qilecaiDetail";
						elem.codeUrl = "../selectCode/selectCodeqicai";
						})
						_self.qicai = res.data.rows
						console.log(_self.qicai);
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
							elem.RedBall = elem.RedBall.split(",");
							elem.title = "福彩3D";
						elem.url = "./fucaiDetail";
						elem.codeUrl = "../selectCode/selectThreeD";
						})
						_self.fucai = res.data.rows
						console.log(_self.fucai);
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
								elem.RedBall = elem.RedBall.split(",");
							}
							elem.title = "双色球";
								elem.url = "./shuangseDetail";
								elem.codeUrl = "../selectCode/selectCode";
						})
						_self.shuangse = res.data.rows;
						console.log(_self.shuangse);
					}
				});
				
			},
		},
	};
</script>
<style lang="scss" scoped>
	.kaijiang_page {
		.kaijiang_wrap {
			margin-top: 30rpx;
			background-color: #e8e8e8;

			.kaijiang_item {
				margin: 20rpx 0;
				padding: 15rpx 0;
				background-color: #fff;

				.kaijiang_header {
					display: flex;
					padding-left: 15rpx;
					align-items: center;

					.kaijiang_title {
						border-left: 10rpx solid $color;
						font-size: 34rpx;
						font-weight: bolder;
						letter-spacing: 2rpx;

						text {
							margin-left: 15rpx;
						}
					}

					.content_text {
						font-size: 26rpx;
						margin-left: 15rpx;

						text {
							margin-left: 8rpx;
						}
					}
				}

				.kaijiang_item_content {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 25rpx;
					padding: 0 10rpx;

					.content_qiu {
						display: flex;
						align-items: center;
						margin-top: 20rpx;
						.qiu-wrap{
							display: flex;
							.qiu_num {
							width: 55rpx;
							height: 55rpx;
							background-color: $color;
							border-radius: 50%;
							display: flex;
							color: #fff;
							justify-content: center;
							align-items: center;
							margin-left: 10rpx;
						}
						.bull-num{
							background-color: blue;
						}
						}
						
					}

					.kaijiang_btn {
						font-size: 26rpx;
						margin-right: 20rpx;

						text {
							margin-left: 5rpx;
						}
					}
				}

				.kaijiang_item_btn {
					text-align: center;
					color: #666;
					border-top: 1rpx solid #eee;
					padding: 10rpx 0;
					height: 34rpx;
					font-size: 26rpx;
					margin-top: 15rpx;
				}
			}
		}
		.kaijiang_footer{
			width: 90%;
			margin: 0 auto;
			padding-bottom: 20rpx;
		}
	}
</style>
