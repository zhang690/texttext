<template>
	<view class="selectCode">
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
				<text>红球</text>至少选择6个
			</view>
			<view class="red_ball_wrap">
				<view class="red_ball" :class="red.isActive?'red_ball_bg':''" v-for="(red,index) of redNum" :key="index" @click="handleRedBall('红色',index)">{{red.num}}</view>
			</view>
		</view>
		<!-- 红色球结束 -->
		<!-- 蓝色球开始 -->
		<view class="select_red select_blue">
			<view class="select_red_title">
				<text class="select_blue_title">蓝球</text>至少选择1个
			</view>
			<view class="red_ball_wrap">
				<view class="red_ball" :class="blue.isActive?'select_blue_bg':''" v-for="(blue,index) of blueBall" :key="index"
				 @click="handleRedBall('蓝色',index)">{{blue.num}}</view>
			</view>
		</view>
		<!-- 蓝色球结束 -->
		<!-- 选号按钮开始 -->
		<view class="xuanhao_wrap">
			<view class="xuanhao_btn" @click="handleSurecode">加入笔记本</view>
			<view class="xuanhao_btn xuanhao_bg" @click="handleBuy">确认选号</view>
		</view>
		<!-- 选号按钮结束 -->
		<!-- 底部开始 -->
		<view class="footer_wrap">
			<scroll-view scroll-y class="footer_select" ref="box" @scrolltolower="handlescroll">
				<!-- <view class="select_num">
					<text :class="item.name == 'red'?'red_ball_bg':'last_color'" v-for="(item,index) of allNum" :key="index">{{item.num}}</text>
					<view class="delete_btn" @click="handleDel" v-if="allNum.length">
						<text class="iconfont icon-shanchu"></text>
					</view>
				</view> -->
				<view v-for="(item,index) of totalNum" :key="index">
					<view class="select_num">
						<text :class="v.name == 'red'?'red_ball_bg':'last_color'" v-for="(v,i) of item" :key="i">{{v.num}}</text>
						<view class="delete_btn" @click="handleDel(index)" v-if="totalNum.length">
							<text class="iconfont icon-shanchu"></text>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="caipiao_select">
				<view class="select_btn" @click="handleRadom">机选一注</view>
				<view class="select_btn" @click="handleClear">清空列表</view>
			</view>
			<!-- <view class="caipiao_buy">
				共
				<text>{{allNum.length}}</text>注，我要买
				<view class="buy_wrap">
					<button>-</button>
					<text>1</text>
					<button>+</button>
				</view>倍,共12元
			</view> -->
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
				// 蓝色球的数量
				blueBall: [],
				// 保存篮球被点击后的数组
				selectBlue: [],
				// 保存红球被点击后的数组
				selectRed: [],
				// 进行排列后的红球数组
				endRed: [],
				// 红球和蓝球的所有组合
				allNum: [],
				num: 7,
				jiantou: false,
				historyNum: 3,
				// 把注数进行分页显示
				skip: 0, //从哪一条开始
				count: 10, //一次显示10条
				showNum: [],
				total: 0,
				zhushu: 0,
				totalNum:[]
			};
		},
		onLoad() {
			forNum(this.redNum, 34);
			forNum(this.blueBall, 17);
		},
		onShow() {

		},
		methods: {
			// 点击时随机生成一注彩票
			handleRadom() {
				this.clearActive();
				let red;
				// let redArr = [];
				let blue;
				// let blueArr = []
				for (let index = 0; index < 100; index++) {
					red = this.redNum[Math.floor(Math.random() * this.redNum.length)]
					if (this.selectRed.length < 6 && red.isActive == false) {
						red.isActive = true;
						red.name = 'red';
						this.selectRed.push(red)
					}
					if (this.selectBlue.length < 1) {
						blue = this.blueBall[Math.floor(Math.random() * this.blueBall.length)]
						blue.isActive = true;
						blue.name = 'blue';
						this.selectBlue.push(blue)
					}
				}
			},
			// 点击删除选好数据
			handleDel(e) {
				this.totalNum.splice(e,1);
				this.clearActive();
			},
			// 确认选号后跳转页面
			handleBuy() {
				if (this.selectRed.length > 5 && this.selectBlue.length > 0) {
					let num = [];
					this.selectRed.forEach(elem => {
						num.push(elem.num)
					})
					num.push('i');
					this.selectBlue.forEach(element => {
						num.push(element.num)
					})
					let price = this.comPrice();
					this.clearActive();
					wx.navigateTo({
						url: '../selectOrder/selectOrder?num=' + num + '&type=双色球&price=' + price,
					});
				}
			},
			// 清除号码选项时调用的方法
			clearActive() {
				this.allNum = [];
				this.selectRed = [];
				this.selectBlue = [];
				this.redNum.forEach(element => {
					element.isActive = false;
				});
				this.blueBall.forEach(elem => {
					elem.isActive = false;
				})
			},
			// 清除号码框
			handleClear() {
				this.totalNum = []
				this.clearActive();
			},
			//选号注数的滚动条事件
			handlescroll(e) {
				/*
        if(this.allNum.length === 0){
          return;
        }
        console.log(e);
        if(this.allNum.length > 10){
          this.showNum = [...this.showNum,...this.allNum.splice(this.skip,this.count)];
        }else{
          this.showNum = [...this.showNum,...this.allNum.splice(this.skip)];
				}
				*/
			},
			// 点击时选中蓝球或者红球
			handleRedBall(type, i) {
				if (type == "红色") {

					// 如果红球被选中的个数为9个了，那么后面将不可以选中。只能先取消
					if (this.selectRed.length === 9 && this.redNum[i].isActive == false) {
						wx.showToast({
							title: '只能选择9个红球',
							icon: 'none',
							duration: 1500,
							mask: true,
						});
						return;
					}
					this.redNum[i].isActive = !this.redNum[i].isActive;
					console.log(type, this.redNum[i].isActive);
					//1. 如果点击时为true
					if (this.redNum[i].isActive) {
						//2. 把这个球添加进数组

						this.selectRed.push({
							num: this.redNum[i].num,
							name: 'red'
						})
						console.log(this.selectRed);


					} else {
						// 2. 再次点击时找个这个值在另一个数组中的下标
						var index;
						index = this.selectRed.findIndex(elem => {
							return elem.num == this.redNum[i].num;
						})
						// 如果数组内有这个球时，删除这个球
						if (index != -1) {
							this.selectRed.splice(index, 1);
						}
					}
				}
				if (type == "蓝色") {
					this.blueBall[i].isActive = !this.blueBall[i].isActive;
					// console.log(type, this.blueBall[i].isActive);
					if (this.blueBall[i].isActive) {
						// 如果蓝球被选中就添加进数组中
						this.selectBlue.push({
							num: this.blueBall[i].num,
							name: 'blue'
						});
					} else {
						// 否则查找到相应蓝球的下标
						var index1;
						index1 = this.selectBlue.findIndex(elem => {
							return elem.num == this.blueBall[i].num;
						})
						// 如果找到就从数组中删除这个蓝球
						if (index1 != -1) {
							this.selectBlue.splice(index1, 1);
						}
					}
				}
			},
			// 弹出提示框
			handleSure() {
				this.isSelect = false;
				// this.showNum = this.allNum.splice(this.skip,this.count);
				console.log(this.allNum);

			},
			// 取消提示框
			handlecancel() {
				this.isSelect = false;
				this.clearActive();
			},
			// 计算价格的方法
			comPrice() {
				let price = 0;
				switch (this.selectRed.length) {
					case 6:
						price = 2 * this.selectBlue.length
						break;
					case 7:
						price = 14 * this.selectBlue.length
						break;
					case 8:
						price = 56 * this.selectBlue.length
						break;
					case 9:
						price = 168 * this.selectBlue.length
						break;
				}
				console.log(price);
				return price;
			},
			// 确认选号
			handleSurecode() {

				//  调用下方匹配红球的方法，进行随机匹配
				// this.endRed = this.radomRed(this.selectRed);
				// this.showNum = [];

				this.allNum = [];
				
				// 如果红球和蓝球的数量都满足条件时才执行
				if (this.selectRed.length > 5 && this.selectBlue.length > 0) {
					this.isSelect = true;
					this.total = this.comPrice();
					this.zhushu = this.total / this.selectBlue.length / 2;
					this.allNum = [...this.selectRed, ...this.selectBlue];
					console.log(this.allNum);
					// 使用二维数组保存每一注彩票
					this.totalNum.push(this.allNum);
					/*
					for (let i = 0; i < this.selectBlue.length; i++) {
						this.endRed.forEach(element => {
							element = element.push(this.selectBlue[i]);
						});
						//  每循环一次时就把数组打散放入创建的数组内
						this.allNum.push(...this.endRed);
						// 然后再重置数组，使得下一次循环时数组内的值还是原来的值
						this.endRed = this.radomRed(this.selectRed);
					}
					*/
				}
				console.log("total",this.totalNum)
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
	.selectCode {
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

				text {
					padding-left: 25rpx;
					color: $color;
					margin-right: 20rpx;
				}

				.select_blue_title {
					color: blue;
				}
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

				.select_blue_bg {
					background-color: #2092fa;
					color: #fff;
				}
			}
		}

		.select_blue {
			margin-top: 30rpx;
			border-top: 2rpx solid #eee;
			padding-top: 20rpx;
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

					.delete_btn {
						margin-left: 20rpx;

						.iconfont {
							color: #666;
						}
					}

					text {
						display: block;
						margin-left: 20rpx;
						margin-top: 20rpx;
						color: $color;
					}

					.last_color {
						color: blue;
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
