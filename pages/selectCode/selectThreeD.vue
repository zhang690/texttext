<template>
	<view class="selectThree">
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
		<view class="selectD">
			每位至少选择1个号码
		</view>
		<!-- 百位球开始 -->
		<view class="select_red">
			<view class="select_red_title">
				百位
			</view>
			<view class="red_ball_wrap">
				<view class="red_ball" :class="item.isActive?'red_ball_bg':''" v-for="(item,index) of baiNum" :key="index" @click="handleBaidBall(index)">{{item.num}}</view>
			</view>
		</view>
		<!-- 百位球结束 -->
		<!-- 十位球开始 -->
		<view class="select_red">
			<view class="select_red_title">
				十位
			</view>
			<view class="red_ball_wrap">
				<view class="red_ball" :class="item.isActive?'red_ball_bg':''" v-for="(item,index) of shiNum" :key="index" @click="handleShiBall(index)">{{item.num}}</view>
			</view>
		</view>
		<!-- 十位球结束 -->
		<!-- 十位球开始 -->
		<view class="select_red">
			<view class="select_red_title">
				个位
			</view>
			<view class="red_ball_wrap">
				<view class="red_ball" :class="item.isActive?'red_ball_bg':''" v-for="(item,index) of geNum" :key="index" @click="handleGeBall(index)">{{item.num}}</view>
			</view>
		</view>
		<!-- 十位球结束 -->
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
				<view class="select_btn" @click="handleRadom">机选一注</view>
				<view class="select_btn" @click="handleCealr">清空列表</view>
			</view>
		</view>
		<!-- 底部结束 -->
		<!-- 提示用户有多少注彩票开始 -->
		<view class="tost_wrap" v-if="isSelect">
			<view class="tost_item">
				<view class="tost_text">
					将为您生成{{total}}注彩票，总计价格为{{total * 2}}元！请问是否确认购买？
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
	export default {
		data() {
			return {
				// 总共有多少注
				total:0,
				// 提示框是否选中
				isSelect: false,
				// 百位球的数量
				baiNum: [],
				// 十位球的数量
				shiNum: [],
				// 个位球的数量
				geNum: [],
				// 保存百位数被点击后的数组
				selectBai: [],
				// 保存十位数被点击后的数组
				selectShi: [],
				// 保存个位数被点击后的数组
				selectGe: [],
				// 红球的所有组合
				allNum: [],
				jiantou: false,
				historyNum: 3,
			};
		},
		onLoad() {
			this.getNum(this.baiNum, 10);
			this.getNum(this.shiNum, 10);
			this.getNum(this.geNum, 10);
		},
		onShow() {

		},
		methods: {
			// 点击随机获取一组彩票
			handleRadom(){
				this.clearNum();
				let ge,shi,bai;
				// let arr = [];
				for (let index = 0; index < 10; index++) {
					ge = this.geNum[Math.floor(Math.random() * this.geNum.length)]
					shi = this.shiNum[Math.floor(Math.random() * this.shiNum.length)]
					bai = this.baiNum[Math.floor(Math.random() * this.baiNum.length)]
					if(this.selectGe.length < 1 && ge.isActive == false){
						ge.isActive = true;
						this.selectGe.push(ge.num)
					}
					if(this.selectShi.length < 1 && shi.isActive == false){
						shi.isActive = true;
						this.selectShi.push(shi.num)
					}
					if(this.selectBai.length < 1 && bai.isActive == false){
						bai.isActive = true;
						this.selectBai.push(bai.num)
					}
				} 
			},
			// 获取个十百的球数
			getNum(arr, num) {
				for (let index = 0; index < num; index++) {
					arr.push({
						num: index,
						isActive: false
					})
				}
			},
			// 点击清空选项框内的球
			handleCealr() {
				this.clearNum();
			},
			// 点击删除选好数据
			handleDel() {
				this.clearNum()
			},
			// 点击时选中百位球
			handleBaidBall(i) {
				this.clicknum(this.baiNum, this.selectBai, i)
			},
			// 选中十位球
			handleShiBall(i) {
				this.clicknum(this.shiNum, this.selectShi, i)
			},
			// 选中个位球
			handleGeBall(i) {
				this.clicknum(this.geNum, this.selectGe, i)
			},
			// 确认选号后跳转页面
			handleBuy() {
				console.log(this.allNum);
				if(this.allNum.length === 0){
					if(this.selectBai.length > 0 && this.selectShi.length > 0 && this.selectGe.length > 0){
						this.selectCode()
					}
				}
				if (this.allNum.length >=3 ) {
					let num = this.allNum.join(",");
					console.log(this.allNum);
						this.clearNum();
					this.allNum = []
					wx.navigateTo({
						url: '../selectOrder/selectOrder?num=' + num + '&type=福彩3D&price=' + this.total * 2,
					});
				}
			},
			// 点击每个球时调用此方法
			/**
			 * arr 球的数组
			 * select 存放被选中的球
			 * i 每个球的下标
			 */
			clicknum(arr, select, i) {
				arr[i].isActive = !arr[i].isActive;
				console.log(arr[i].isActive);
				//1. 如果点击时为true
				if (arr[i].isActive) {
					//2. 把这个球添加进数组
					select.push(arr[i].num);
				} else {
					// 2. 再次点击时找个这个值在另一个数组中的下标
					var index;
					index = select.findIndex(elem => {
						return elem == arr[i].num;
					})
					// 如果数组内有这个球时，删除这个球
					if (index != -1) {
						select.splice(index, 1);
					}
				}
			},
			// 弹出提示框
			handleSure() {
				this.isSelect = false;
				this.baiNum.forEach(elem => {
					elem.isActive = false;
				})
				this.shiNum.forEach(elem => {
					elem.isActive = false;
				})
				this.geNum.forEach(elem => {
					elem.isActive = false;
				})
			},
			// 取消提示框
			handlecancel() {
				this.isSelect = false;
				this.clearNum()
			},
			// 点击取消选号内的数组时调用
			clearNum() {
				this.allNum = [];
				this.selectBai = [];
				this.selectShi = [];
				this.selectGe = [];
				this.baiNum.forEach(elem => {
					elem.isActive = false;
				})
				this.shiNum.forEach(elem => {
					elem.isActive = false;
				})
				this.geNum.forEach(elem => {
					elem.isActive = false;
				})
			},
			// 加入笔记本
			handleSurecode() {
				
				// 如果所有球的数量都满足条件时才执行
				if (this.selectBai.length > 0 && this.selectShi.length > 0 && this.selectGe.length > 0) {
					this.isSelect = true;
					this.selectCode()
				}
			},
			// 选好彩票后调用
			selectCode(){
				this.allNum = [];
				this.selectBai = this.selectBai.join("");
					this.selectShi = this.selectShi.join("");
					this.selectGe = this.selectGe.join("");
					this.total = this.selectBai.length * this.selectShi.length * this.selectGe.length;
					this.allNum = [this.selectBai, this.selectShi, this.selectGe]
					this.selectBai = [];
					this.selectShi = [];
					this.selectGe = [];
			}
		},
	};
</script>
<style lang="scss" scoped>
	.selectThree {
		padding-bottom: 40rpx;

		.selectD {
			margin: 20rpx;
		}

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
					margin-left: 80rpx;
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
							margin-top: 20rpx;
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
