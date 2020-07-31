<template>
	<view class="lucky_wheel">
   
		<view class="lucky">

			<!-- 转盘标题开始 -->
			<view class="lucky-title">
				<image src="../../static/lucky/title.png" mode="widthFix"></image>
			</view>
			<!-- 转盘标题结束 -->
			<view class="wheel-main">
				<!-- 点击开始抽奖 -->
				<view class="wheel-pointer" @click="beginRotate()"></view>

				<view class="wheel-bg" :style="rotateStyle">
					<image class="bg_zhuanpan" src="../../static/lucky/zhuanpan.png" mode="widthFix"></image>
					<view class="prize-list">
						<view class="prize-item" v-for="(item,index) in prizeList" :key="index" :style="item.style">
							<view class="prize-pic">
								<image :src="item.Icon" />
							</view>
							<view class="prize-type">{{item.Name}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="main-bg"></view>
			<view class="bg-p"></view>
			<view class="content">
				<view class="count">所剩余积分： {{count}}</view>
			</view>
			
			<!-- 活动和奖品按钮开始 -->
			<view class="wheel_rule">
				<view class="rule_btn" @click="handleRule">活动规则</view>
				<view class="rule_btn wheel_prize">我的奖品</view>
			</view>
			<!-- 活动和奖品按钮结束 -->
		</view>

		<view class="toast" v-show="prize">
			<view class="toast-container">
				<image :src="toastIcon" class="toast-picture" />
				<view class="close" @click="closeToast()"></view>
				<view class="toast-title">{{toastTitle}}</view>
				<view class="toast-btn">
					<view class="toast-cancel" @click="closeToast">关闭</view>
				</view>
			</view>
		</view>
		<view class="toast-mask" v-show="prize"></view>
     <!-- 活动提示框开始 -->
    <view class="tip" v-if="isShow" @click="handleRuleFalse">
				<view class="top_wrap">
					<view class="tip-title">活动规则</view>
					<view class="tip-content">
						<view>1.每日签到后，即可获得一次幸运大转盘的机会，仅限当天有效，过期作废。</view>
						<view>2.金币抽奖，每10个金豆可以兑换一次大转盘抽奖机会</view>
						<view>3.所中金豆或积分到【我的账户】中查询。累计达到100金豆及以上，可以兑换相应奖品</view>
					</view>
				</view>
			</view>
    <!-- 活动提示框结束 -->
	</view>
</template>

<script>
// 引入存放图片模块
	import common from '../../common/common';
	// 旋转度数
	let CIRCLE_ANGLE = 360;
	let config = {
		// 总旋转时间
		duration: 4000,
		// 旋转圈数
		circle: 8,
		mode: 'ease-in-out'
	}
	export default {
		data() {
			return {
        isShow:false,//显示规则框
				count: 0, // 剩余积分
				duration: 3000, // 转盘旋转时间
				prizeList: [], // 奖品列表
				rotateAngle: 0, // 旋转角度
				index: 0,
				prize: null,
			}
		},
		created() {
			let {Integral} = uni.getStorageSync('userinfo');
			this.count = Integral;
			// 初始化一些值
			this.angleList = []
			// 是否正在旋转
			this.isRotating = true
			// 基本配置
			this.config = config
			// 获取奖品列表
			this.initPrizeList();
			this.getWheel()
		},

		computed: {
			rotateStyle() {
				// 旋转的时间和旋转速度
				return `
        transition: transform ${this.config.duration}ms ${this.config.mode};
						transform: rotate(${this.rotateAngle}deg);`
						// 旋转的角度
			},
			toastTitle() {

				return this.prize && this.prize.isPrize === 1 ?
					"恭喜您，获得" +
					this.prize.Name :
					"未中奖";
			},
			toastIcon() {
				return this.prize && this.prize.isPrize === 1 ?
					require("../../static/lucky/gongxi.png") :
					require("../../static/lucky/sorry.png");
			}
		},
		methods: {
			// 获取奖项数据
			getWheel(){
				
			},
      // 点击关闭规则框
      handleRuleFalse(){
        this.isShow = false
      },
      // 点击显示规则框
      handleRule(){
        this.isShow = true
      },
			initPrizeList() {
				// 这里可以发起请求，从服务端获取奖品列表
				// 这里使用模拟数据
				common.request({
        path: "Order/getluckdraw",
        // method:'POST',
        success: res => {
					res.data.rows.forEach((elem,index)=>{
						if(index == 0){
							elem.isPrize = 0
						}else{
							elem.isPrize = 1
						}
					})
					this.prizeList = this.formatPrizeList(res.data.rows) 
          console.log(this.prizeList);
        }
      });
				 
			},
			// 格式化奖品列表，计算每个奖品的位置
			formatPrizeList(list) {
				// 记录每个奖的位置
				const angleList = []
				//获取数组的长度
				const l = list.length
				// 计算单个奖项所占的角度 360/长度
				const average = CIRCLE_ANGLE / l
				// 获取每个角度的平均值
				const half = average / 2
				// 循环计算给每个奖项添加style属性
				list.forEach((item, i) => {
					// 每个奖项旋转的位置为 当前 i * 平均值 + 平均值 / 2
					const angle = -((i * average) + half)
					// 增加 style
					item.style = `-webkit-transform: rotate(${angle}deg);
                      transform: rotate(${angle}deg);`
					// 记录每个奖项的角度范围
					angleList.push((i * average) + half)
				})
				this.angleList = angleList
				return list
			},
			beginRotate() {
				// 添加次数校验
				if (this.count < 200) {
					wx.showToast({
						title: '您的积分不足',
						icon: 'none',
						image: '',
						duration: 1500,
						mask: true,
					});
					return;
				}
				let {ID} = wx.getStorageSync('userinfo');
				common.request({
        path: "Order/updateintegral",
				// method:'POST',
				data:{
					 MemberID:ID,
					  number:200,
				},
        success: res => {
					console.log(res);
					
        }
      });
				// 开始抽奖
				// 这里这里向服务端发起请求，得到要获得的奖
				// 可以返回下标，也可以返回奖品 id，通过查询 奖品列表，最终得到下标
				// 随机获取下标
				this.index = this.random(this.prizeList.length - 1);
				// 开始旋转
				this.rotating()
			},
			// 封装一个随机函数
			random(max, min = 0) {
				return parseInt(Math.random() * (max - min + 1) + min);
			},
			rotating() {
				const {
					isRotating,
					angleList,
					config,
					rotateAngle,
					index
				} = this;
				if (!isRotating) return;
				// 点击时不可以再次点击
				this.isRotating = false
				// 减少剩余抽奖次数
				this.count-=200
				// 计算角度
				const angle =
					// 初始角度 0 
					rotateAngle +
					// 多旋转的圈数  8 * 360
					config.circle * CIRCLE_ANGLE +
					// 奖项的角度
					angleList[index] -
					(rotateAngle % CIRCLE_ANGLE)

				this.rotateAngle = angle
				// 旋转结束后，允许再次触发
				setTimeout(() => {
					this.rotateOver()
				}, config.duration + 1000)
			},
			rotateOver() {
				// 当旋转结束后可以再次点击转盘
				this.isRotating = true
				// 把得到的奖项放入到data中进行数据渲染到页面
				this.prize = this.prizeList[this.index]
				console.log(this.prize, this.index)
			},
			//关闭弹窗
			closeToast() {
				this.prize = null;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lucky {
		width: 100%;
		background: #fccf85;
		padding-top: 20px;
    
	}
.lucky_wheel{
position: relative;
}
	.tip {
		position: absolute;
    top: 0;
    background-color: rgba(11,11,11,0);
    height: 100vh;
    width: 100vw;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
		.top_wrap {
      width: 90%;
      background-color: #ffe1cd;
      letter-spacing: 4rpx;
      padding: 15rpx;
      border-radius: 15rpx;
			.tip-title {
        text-align: center;
        color: $color;
        font-size: 34rpx;
      }

			.tip-content {
        line-height: 40rpx;
      }
		}

	}

	.wheel_rule {
		display: flex;
		justify-content: center;
		margin-top: 70rpx;

		.rule_btn {
			width: 220rpx;
			height: 70rpx;
			border-radius: 35rpx;
			text-align: center;
			line-height: 70rpx;
			background-color: #fff;
			font-size: 34rpx;
			color: #f06664;
			font-weight: bolder;
		}

		.wheel_prize {
			margin-left: 40rpx;
		}
	}

	.toast-cancel {
		width: 130rpx;
		height: 40rpx;
		background-color: $color;
		color: #fff;
		border-radius: 10rpx;
		text-align: center;
	}

	/* .lucky-title {
  width: 100%;
  height: 8.125rem;
  background: url("../../static/lucky/title.png") no-repeat center top;
  background-size: 100%;
} */
	.wheel-main {
		margin: 0 auto;
		position: relative;
		width: 295px;
		height: 295px;
	}

	.wheel-bg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		color: #fff;

		.bg_zhuanpan {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%) rotate(35deg);
			width: 100%;
		}
	}

	.wheel-pointer {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 2;
		width: 85px;
		height: 85px;
		background: url("../../static/lucky/zhizhen.png") no-repeat center top;
		background-size: 100%;
		transform: translate3d(-50%, -50%, 0);
	}

	.wheel-bg div {
		text-align: center;
	}

	.prize-list {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.prize-list .prize-item {
		position: absolute;
		width: 95px;
		height: 150px;
		top: 0;
		left: 50%;
		margin-left: -47.5px;
		transform-origin: 50% 100%;
	}

	.prize-pic image {
		width: 4.0625rem;
		height: 2.5rem;
		margin-top: 1.5625rem;
	}

	.prize-count {
		font-size: 0.875rem;
	}

	.prize-type {
		font-size: 0.75rem;
		// text-align: center;
		padding-left: 35rpx;
		margin-top: 10rpx;
	}

	.main {
		position: relative;
		width: 100%;
		min-height: 14.25rem;
		background: rgb(243, 109, 86);
		padding-bottom: 1.6875rem;
	}

	.main-bg {
		width: 100%;
		height: 6.5625rem;
		position: absolute;
		top: -3.4375rem;
		left: 0;
		/* background: url("../../static/lucky/color_pillar.png") no-repeat center top; */
		/* background-size: 100%; */
	}

	.bg-p {
		width: 100%;
		height: 2.95rem;
		background: rgb(252, 207, 133);
	}

	.content {
		position: absolute;
		top: 0.175rem;
		left: 0;
		background: rgb(243, 109, 86);
		width: 100%;
		height: 5.1875rem;
		font-size: 1.125rem;
		color: #ffeb39;
		padding-left: 6.75rem;
	}

	.content div {
		text-align: left;
	}


	.toast-mask {
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 10000;
		width: 100%;
		height: 100%;
	}

	.toast {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 20000;
		transform: translate(-50%, -50%);
		width: 15.4375rem;
		background: #fff;
		border-radius: 0.3125rem;
		padding: 0.3125rem;
		background-color: rgb(252, 244, 224);
	}

	.toast-container {
		position: relative;
		width: 100%;
		height: 100%;
		border: 1px dotted #fccc6e;
	}

	.toast-picture {
		position: absolute;
		top: -6.5rem;
		left: -1.5rem;
		width: 18.75rem;
		height: 8.5625rem;
	}

	.toast-pictrue-change {
		position: absolute;
		top: -1.5rem;
		left: -1.375rem;
		width: 17.5rem;
		height: 3.125rem;
	}

	.toast-title {
		padding: 2.8125rem 0;
		font-size: 18px;
		color: #fc7939;
		text-align: center;
	}

	.toast-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 0.9375rem;
	}

	.toast-btn div {
		background-image: -moz-linear-gradient(-18deg,
			rgb(242, 148, 85) 0%,
			rgb(252, 124, 88) 51%,
			rgb(252, 124, 88) 99%);
		background-image: -ms-linear-gradient(-18deg,
			rgb(242, 148, 85) 0%,
			rgb(252, 124, 88) 51%,
			rgb(252, 124, 88) 99%);
		background-image: -webkit-linear-gradient(-18deg,
			rgb(242, 148, 85) 0%,
			rgb(252, 124, 88) 51%,
			rgb(252, 124, 88) 99%);
		box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
		width: 4.6875rem;
		height: 1.875rem;
		border-radius: 1.875rem;
		text-align: center;
		line-height: 1.875rem;
		color: #fff;
	}

	.close {
		position: absolute;
		top: -0.9375rem;
		right: -0.9375rem;
		width: 2rem;
		height: 2rem;
		background: url("../../static/lucky/bean5.png") no-repeat center top;
		background-size: 100%;
	}
</style>
