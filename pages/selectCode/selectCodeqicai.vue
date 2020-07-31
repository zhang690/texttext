<template>
	<view class="selectCodeqicai">
		<view class="kaijiang_time">第2020044期2020-04-25 21:15(周六)截至投注21:25开奖</view>
		<!-- 下拉双色球开始 -->
		<view class="xiala_wrap">
			<view class="xiala_item" v-for="(item,index) in historyNum" :key="index">
				<text class="xiala_title">第2020044期</text>
				<view class="xiala_item_content">
					<text v-for="n in num" :key="n">07</text>
				</view>
				<view class="xiala_btn" v-if="index === 0">
					<image :src="jiantou?'/static/xia.png':'/static/shang.png'" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<!-- 下拉双色球结束 -->
		<!-- 红色球开始 -->
		<view class="select_red">
			<view class="select_red_title">
				至少选择7个
			</view>
			<view class="red_ball_wrap">
				<view class="red_ball" :class="red.isActive?'red_ball_bg':''" v-for="(red,index) of redNum" :key="index" @click="handleRedBall(index)">{{red.num}}</view>
			</view>
		</view>
		<!-- 红色球结束 -->
		<!-- 选号按钮开始 -->
		<view class="xuanhao_wrap">
			<view class="xuanhao_btn" @click="handleSurecode">加入笔记本</view>
			<view class="xuanhao_btn xuanhao_bg" @click="handleBuy">确认选号</view>
		</view>
		<!-- 选号按钮结束 -->
		<!-- 底部开始 -->
		<view class="footer_wrap">
			<view class="footer_select" ref="box">
				<view class="select_num">
					<view class="num_color" v-for="(item,index) in allNum" :key="index">{{item}}</view>
					<view class="delete_btn" @click="handleDel" v-if="allNum.length>0">
						<text class="iconfont icon-shanchu"></text>
					</view>
				</view>
			</view>
			<view class="caipiao_select">
				<view class="select_btn" @click="handlRadom">机选一注</view>
				<view class="select_btn" @click="handleClear">清空列表</view>
			</view>
		</view>
		<!-- 底部结束 -->
		<!-- 提示用户有多少注彩票开始 -->
		<view class="tost_wrap" v-if="isSelect">
			<view class="tost_item">
				<view class="tost_text">
					将为您生成{{zhushu}}注彩票，总计价格为{{total}}元！请问是否确认购买？
				</view>
				<view class="tost_btn_wrap">
					<view class="tost_btn" @click="handlecancel">取消</view>
					<view class="tost_btn tost_bg" @click="handleSure">确认</view>
				</view>
			</view>
		</view>
		<!-- 提示用户有多少注彩票结束 -->
	</view>
</template>
<script>
	import {
		forNum
	} from '../../utils/ballNum';
	export default {
		data() {
			return {
				// 提示框是否选中
				isSelect: false,
				// 红色球的数量
				redNum: [],
				// 保存红球被点击后的数组
				selectRed: [],
				// 红球和蓝球的所有组合
				allNum: [],
				jiantou: false,
				historyNum: 3,
				total:0,
				zhushu:0,
			};
		},
		onLoad() {
			forNum(this.redNum, 31);
		},
		onShow() {

		},
		methods: {
			// 点击删除选好数据
			handleDel() {
				this.clearActive();
			},
			// 清除已选中的号码时调用
			clearActive() {
				this.allNum = [];
				this.selectRed = [];
				this.redNum.forEach(elem => {
					elem.isActive = false
				})
			},
			// 点击随机选择一组彩票
			handlRadom(){
				this.clearActive();
				let red;
				// let arr = [];
				for (let index = 0; index < 100; index++) {
					red = this.redNum[Math.floor(Math.random() * this.redNum.length)]
					if(this.selectRed.length < 7 && red.isActive == false){
						red.isActive = true;
						this.selectRed.push(red.num)
					}
				} 
				this.allNum = this.selectRed;
				// this.allNum = arr;
				console.log(this.allNum);
				
			},
			// 确认选号后跳转页面
			handleBuy() {
				this.suerSelect();
				this.selectRed = [];
				if (this.allNum.length > 6) {
					let num = this.allNum.join(",");
					let price = this.comPrice();
					this.clearActive();
					wx.navigateTo({
						url: '../selectOrder/selectOrder?num=' + num + '&type=七乐彩&price=' + price,
					});
				}
			},
			// 计算价格的方法
			comPrice(){
				let price = 0;
					switch (this.allNum.length) {
						case 7:
							price = 2
							break;
						case 8:
							price = 16
							break;
						case 9:
							price = 72
							break;
						case 10:
							price = 240
							break;
					}
					return price;
			},
			// 点击时选中红球
			handleRedBall(i) {
				
				// 当红球的数量等于10，那么后续将不可以选中
				console.log(this.selectRed);
				if(this.selectRed.length === 10 && this.redNum[i].isActive == false){
					wx.showToast({
						title: '只能选择十个球',
						icon: 'none',
						duration: 1500,
						mask: true,
					});
					return;
				}
				this.redNum[i].isActive = !this.redNum[i].isActive;
				console.log(this.redNum[i].isActive);
				//1. 如果点击时为true
				if (this.redNum[i].isActive) {
					//2. 把这个球添加进数组
					this.selectRed.push(this.redNum[i].num);
				} else {
					// 2. 再次点击时找个这个值在另一个数组中的下标
					var index;
					index = this.selectRed.findIndex(elem => {
						return elem == this.redNum[i].num;
					})
					// 如果数组内有这个球时，删除这个球
					if (index != -1) {
						this.selectRed.splice(index, 1);
					}
				}

			},
			// 弹出提示框
			handleSure() {
				this.isSelect = false;
			},
			// 取消提示框
			handlecancel() {
				this.isSelect = false;
				this.clearActive();
			},
			// 确认选号
			handleSurecode() {
				console.log(this.selectRed);
				
				// 如果球的数量满足条件时才执行
				if (this.selectRed.length > 6) {
					this.allNum = [];
					this.isSelect = true;
				this.suerSelect();
				this.selectRed = []
				this.total = this.comPrice();
				this.zhushu = this.total / 2
				}
			},
			// 确认选好彩票后调用此方法
			suerSelect(){
					this.redNum.forEach(element => {
						if (element.isActive) {
							this.allNum.push(element.num)
						}
					});
					this.redNum.forEach(elem => {
					elem.isActive = false
				})
			},
			// 清除号码框
			handleClear() {
				this.clearActive();
			},
			// 把添加进数组的红球进行随机匹配
			/*
			radomRed(arr) {
        let newArr = []
				let str = '';
				let a = '';
				for (let i = 0; i < arr.length; i++) {
					str = '';
					str = str + arr[i] + ',';
					for (let n = i + 1, b = ''; n < arr.length; n++) {
						b = str + arr[n] + ',';
						for (let t = n + 1; t < arr.length; t++) {
							a = b + arr[t] + ',';
							for (let m = t + 1, c = ''; m < arr.length; m++) {
								c = a + arr[m] + ',';
								for (let q = m + 1, d = ''; q < arr.length; q++) {
									d = c + arr[q] + ',';
									for (let w = q + 1, f = ''; w < arr.length; w++) {
										f = d + arr[w];
										newArr.push(f);
									}
								}
							}
						}
					}
				}
				let mapArr = []
				mapArr = newArr.map(elem => {
					return elem.split(",");
				})
				return mapArr
      }
      */
		},
	};
</script>
<style lang="scss" scoped>
	.selectCodeqicai {
		padding-bottom: 40rpx;

		/*弹出框提示 */
		.tost_wrap {
			background-color: rgba(22, 33, 55, .1);
			position: fixed;
			width: 100vw;
			height: 100vh;
			z-index: 1000;
			top: 0;

			.tost_item {
				width: 60%;
				height: 200rpx;
				margin: 50vh auto;
				background-color: #fff;
				transform: translateY(-50%);
				padding: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.tost_text {
					letter-spacing: 4rpx;
					font-size: 34rpx;
					color: #666;
				}

				.tost_btn_wrap {
					display: flex;
					justify-content: center;
					font-size: 36rpx;

					.tost_btn {
						width: 110rpx;
						height: 50rpx;
						border: 2rpx solid #d6d6d6;
						line-height: 50rpx;
						text-align: center;
						box-shadow: 2rpx 2rpx 2rpx #d6d6d6;
					}

					.tost_bg {
						background-color: $color;
						margin-left: 20rpx;
						color: #fff;
					}
				}
			}
		}

		.kaijiang_time {
			font-size: 24rpx;
			color: #999;
			border-bottom: 2rpx solid #eee;
			padding: 15rpx 20rpx;
		}

		.xiala_wrap {
			.xiala_item {
				display: flex;
				border-bottom: 2rpx solid #eee;
				padding: 15rpx 0;

				.xiala_title {
					color: #999;
					padding-left: 20rpx;
				}

				.xiala_item_content {
					color: $color;
					display: flex;

					text {
						display: block;
						margin-left: 20rpx;
					}
				}

				.xiala_btn {
					width: 50rpx;
					height: 35rpx;
					margin-left: 80rpx;

					image {
						width: 80%;
					}
				}
			}
		}

		.select_red {
			margin-top: 20rpx;

			.select_red_title {
				color: #999;
				margin-left: 20rpx;
			}

			.red_ball_wrap {
				display: flex;
				flex-wrap: wrap;
				text-align: center;

				.red_ball {
					width: 55rpx;
					height: 55rpx;
					border-radius: 50%;
					background-color: #e7e7e7;
					margin-left: 45rpx;
					margin-top: 20rpx;
					line-height: 55rpx;
				}

				.red_ball_bg {
					background-color: $color;
					color: #fff;
				}
			}
		}

		.xuanhao_wrap {
			display: flex;
			justify-content: space-around;
			margin-top: 40rpx;

			.xuanhao_btn {
				width: 200rpx;
				height: 60rpx;
				text-align: center;
				line-height: 60rpx;
				border-radius: 30rpx;
				background-color: #ddd;
			}

			.xuanhao_bg {
				background-color: $color;
				color: #fff;
			}
		}

		.footer_wrap {
			.footer_select {
				border: 2rpx solid #ddd;
				width: 80%;
				height: 300rpx;
				border-radius: 10rpx;
				box-shadow: 2rpx 2rpx 2rpx #ddd;
				margin: 30rpx auto 0;
				overflow: auto;

				.select_num {
					display: flex;
					flex-wrap: wrap;
					align-items: center;

					.num_color {
						margin-left: 20rpx;
						margin-top: 20rpx;
						color: $color;
					}

					.delete_btn {
						margin-left: 20rpx;

						.iconfont {
							color: #666;
						}
					}

					text {
						display: block;

					}
				}
			}

			.caipiao_select {
				margin-top: 25rpx;
				display: flex;
				justify-content: space-around;

				.select_btn {
					width: 160rpx;
					height: 40rpx;
					text-align: center;
					line-height: 40rpx;
					border-radius: 5rpx;
					font-size: 26rpx;
					border: 2rpx solid #ddd;
					box-shadow: 1rpx 1rpx #ddd;
				}
			}

			.caipiao_buy {
				display: flex;
				text-align: center;
				margin-top: 30rpx;
				justify-content: center;
				align-items: center;

				text {
					color: $color;
				}

				.buy_wrap {
					width: 200rpx;
					height: 40rpx;
					border: 2rpx solid #eee;
					display: flex;
					justify-content: space-between;

					margin-left: 10rpx;

					button {
						flex: 1;
						height: 40rpx;
						line-height: 40rpx;
						border-radius: 0rpx;
					}

					text {
						display: block;
						flex: 1;
						border-left: 2rpx solid #eee;
						border-right: 2rpx solid #eee;
						color: #000;
					}
				}
			}
		}
	}

	.uni-collapse-cell--hide {
		height: 60rpx;
	}
</style>
