<template>
	<view class="select-order">
		<!-- 获取地址开始 -->
		<view class="select-adress">
			<text class="iconfont icon-dizhi"></text>
			<navigator url="../giveSelect/giveSelect" class="adress-title">
				<view class="adress-title-top">{{name}}</view>
				<view class="adress-title-bottom" v-if="juli != null">距您{{juli}}km</view>
				<view class="adress-title-text">点击选择其它地址</view>
			</navigator>
			
			<view class="tabs">
				<segmented :tabs="tabs" @handleParent="handleChild"></segmented>
			</view>
		</view>
		<view class="wangdian" v-if="current == 1">
				<view class="wangdian-title">{{wdTitle}}</view>
				<view class="wangdian-text" @click="handleSelect">请选择网点</view>
		</view>
		<!-- 获取地址结束 -->

		<!-- 七彩乐内容开始 -->
		<view class="select-order-content">
			<image class="order-bg" src="/static/selectOrder/net-bg.png" mode="widthFix"></image>
			<view class="order-info">
				<view class="order-info-title">{{type}}</view>
				<view class="order-num-wrap">
					<view class="order-info-num">
						<view class="info-num-item" v-for="(item,index) in saveNum" :key="index">
							<text v-for="(qiu,index1) in item.caipiao" :class="qiu.name == 'blue'?'qiu-color':''" :key="index1">{{qiu.num}}</text>
							<view class="info_num_content">
								<view class="order-footer-btn">
									定投
									<view class="buy_wrap">
										<button @click="handleDingtou(index,-1)">-</button>
										<text class="buy_text">{{item.dingtou}}</text>
										<button @click="handleDingtou(index,+1)">+</button>
									</view>
									期
								</view>
								<!-- 倍数 -->
								<view class="order-footer-btn btn2">
									乘以
									<view class="buy_wrap">
										<button @click="handleBeishu(index,-1)">-</button>
										<text class="buy_text">{{item.beishu}}</text>
										<button @click="handleBeishu(index,+1)">+</button>
									</view>
									倍
								</view>
							</view>
						</view>

					</view>
				</view>

			</view>
		</view>
		<!-- 七彩乐内容结束 -->
		<!-- 底部确认按钮开始 -->
		<view class="select-order-footer">
			<view class="footer-info">
				<view class="footer-price">{{total}}元</view>
			</view>
			<view class="footer-btn" @click="handleBuy">生成短信</view>
		</view>
		<!-- 底部确认按钮结束 -->
	</view>
</template>
<script>
	import segmented from "@/components/tabs/segmented.vue";
	import common from '../../common/common'
	var _self;
	export default {
		components: {
			segmented
		},
		data() {
			return {
				wdTitle:"",//外送的网点名字
				waiId:"",//外送的网点id
				num: [], //每一组彩票
				type: "", //彩票的类型
				ischange: false,
				saveNum: [], //保存所有彩票的数组
				tabs: [{
						id: 0,
						name: "自提",
						isActive: true
					},
					{
						id: 1,
						name: "外送",
						isActive: false
					},
					{
						id: 2,
						name: "托管",
						isActive: false
					}
				],
				current: 0,
				total: 0,
				delivery: "",
				juli: null,
				name: "",
				id:"",
				outlets:{}
			}
		},
		onLoad(options) {
			_self = this;
			console.log(options);
			let par = options.num.split(",");
			let index = par.findIndex(elem => {
				return elem == 'i'
			})
			let red = [];
			let blue = []
			if (index != -1) {
				par.forEach((element, i) => {
					if (i < index) {
						_self.num.push({
							num: element,
							name: 'red'
						})
						red.push(element)
					} else if (i > index) {
						_self.num.push({
							num: element,
							name: 'blue'
						})
						blue.push(element)
					}
				});
			} else {
				par.forEach((element, i) => {
					_self.num.push({
						num: element,
						name: 'red'
					})
					red.push(element)
				});
			}
			red = red.join(",");
			blue = blue.join(",")
			getApp().globalData.saveNum.push({
				qiu: _self.num,
				price: options.price,
				red,
				blue
			})
			let saveNum = getApp().globalData.saveNum;
			console.log(saveNum);
			saveNum.forEach(elem => {
				_self.saveNum.push({
					caipiao: elem.qiu,
					dingtou: 1,
					beishu: 1,
					price: elem.price,
					red: elem.red,
					blue: elem.blue
				})
				_self.total += parseInt(elem.price);
			})
			console.log(index, _self.saveNum);
			_self.type = options.type;
			
		},
		onShow(){
			let outlets =	uni.getStorageSync("outlets");
			_self.outlets = outlets;
			console.log(_self.outlets.id,outlets);
			if(_self.outlets.id != undefined){
				_self.juli = outlets.juli
				_self.name = outlets.name
				_self.id = outlets.id;
				_self.current = outlets.current;
				_self.tabs.forEach((elme)=>{
					elme.id == outlets.current?elme.isActive = true:elme.isActive = false;
				})
			}else{
				console.log(111111111);
				if(_self.current == 0){
					_self.getWangdian();
				}else if(_self.current == 1){
					_self.getAdress();
				}
			}
			let wangdian = uni.getStorageSync("wangdian");
			if(wangdian !=null || wangdian != undefined){
				_self.wdTitle = wangdian.name;
				_self.waiId = wangdian.id
			}
			let now = new Date();
				let day = now.getDay(); //得到周几
				console.log(day);
		},
		methods: {
			// 选择外送的网点
			handleSelect(){
				wx.navigateTo({
					url: '../giveSelect/giveSelect?id=1',
				});
			},
			// 获取网点
			getWangdian(){
				const {latitude,longitude} = uni.getStorageSync("jingwei");
      console.log(latitude,longitude);
        common.request({
          path:"Order/getoutlets",
          data:{
            name:"",
            longitude,
            latitude,
            rows:1,
            page:1,
            sidx:"",
            sord:""
          },
          success:res=>{
            let index;
            res.data.rows.forEach(elem=>{
              if(elem.distance != null){
               index = elem.distance.indexOf(".");
              elem.distance = elem.distance.slice(0,index + 2); 
              }
            })
            _self.name = res.data.rows[0].F_FullName;
						_self.juli = res.data.rows[0].distance;
						_self.id = res.data.rows[0].F_CompanyId
            console.log(res);
          }
        })
			},
			//获取地址
			getAdress() {
				let {
					ID
				} = uni.getStorageSync("userinfo");
				console.log(ID);
				common.request({
					path: "Development/getaddress",
					data: ID,
					success: res => {
						console.log(res);
						if(res.data.rows.length > 0){
								_self.name = res.data.rows[0].Address;
						_self.id = res.data.rows[0].ID
						}else{
							_self.name = ""
						}
					
					}
				});
			},
			// 点击购买
			handleBuy() {
				if(_self.current == 1 && _self.wdTitle == undefined){
					wx.showToast({
						title: '请选择外送网点',
						icon: 'none',
						image: '',
						duration: 1500,
						mask: true,
					});
					return;
				}
				console.log(_self.wdTitle,_self.current);
				let {
					ID,Balance
				} = uni.getStorageSync('userinfo');
				// if(Balance < _self.total){
				// 	wx.showToast({
				// 		title: '余额不足，请充值',
				// 		icon: 'none',
				// 		image: '',
				// 		duration: 1500,
				// 		mask: true,
				// 	});
				// 	return;
				// }
				let buyList = [];
				_self.tabs.forEach(elem => {
					if (elem.isActive) {
						_self.delivery = elem.name
					}
				})
				_self.saveNum.forEach(elem => {
					console.log(elem.red);
					buyList.push({
						// ProductName:elem.money,
						RedBall: elem.red, //红球
						BlueBall: elem.blue, //蓝球
						FixedState: "", //定投状态
						Fixed: parseInt(elem.dingtou), //定投第几期
						Multiple: elem.beishu //倍数
					})
					console.log(elem.blue);
				})
				let now = new Date();
				let year = now.getFullYear(); //得到年份
				let month = now.getMonth(); //得到月份
				let date = now.getDate(); //得到日期
				let day = now.getDay(); //得到周几
				let hour = now.getHours(); //得到小时
				let minu = now.getMinutes(); //得到分钟
				let sec = now.getSeconds(); //得到秒
				if (hour < 10) {
					hour = "0" + hour
				}
				if (minu < 10) {
					minu = "0" + minu
				}
				if (sec < 10) {
					sec = "0" + sec
				}
				month = month + 1;
				let time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
				console.log(time);
				switch (_self.delivery) {
					case '自提':
						_self.delivery = 1
						break;
					case '外送':
						_self.delivery = 2
						break;
					case '托管':
						_self.delivery = 3
						break;
				}
				console.log(_self.saveNum.length);
				if(_self.current == 0){
					common.request({
					path: 'Order/addorder',
					data: {
						AddTime: time,
						Number: _self.saveNum.length,
						MemberID: ID,
						Self_Delivery: _self.delivery, //外送或自提
						Price: _self.total, //价格
						// OutletsID :"",
						LotteryType: _self.type, //彩种
						list: buyList,
						OrderState: 1,
						Product:"goumai",
						OutletsID: _self.id //网点地址
					},
					success: res => {
						uni.showToast({
							title: res.info,
							icon: 'none',
							duration: 1500,
							mask: true,
						});
							uni.reLaunch({
							url: '../order/myOrder?id=1',
						});
						console.log(res,1111);
						console.log(buyList);
					}
				})
				}else if(_self.current == 1){
					console.log(_self.id,_self.waiId);
					common.request({
					path: 'Order/addorder',
					data: {
						AddTime: time,
						Number: _self.saveNum.length,
						MemberID: ID,
						Self_Delivery: _self.delivery, //外送或自提
						Price: _self.total, //价格
						// OutletsID :"",
						LotteryType: _self.type, //彩种
						list: buyList,
						OrderState: 1,
						DistributionState:"2",
						AddressID: _self.id, //地址id
						OutletsID: _self.waiId, //网点地址
					},
					success: res => {
						uni.showToast({
							title: res.info,
							icon: 'none',
							duration: 1500,
							mask: true,
						});
						uni.reLaunch({
							url: '../order/myOrder?id=1',
						});
						console.log(res,2222);
						console.log(buyList);
					}
				})
				}

			},
			// 自提分段器
			handleChild(e) {
				console.log(e);
				// if(_self.outlets.id != undefined){
				// 	return;
				// }
				_self.tabs.forEach(element => {
					element.id === e ?
						(element.isActive = true) :
						(element.isActive = false);
				});
				_self.current = e;
			},
			// 点击加减定投的期数
			handleDingtou(i, num) {
				if (num == -1) {
					_self.saveNum.forEach((elem, index) => {
						if (i == index && elem.dingtou > 1) {
							elem.dingtou--;
						}
					})
				} else {
					_self.saveNum.forEach((elem, index) => {
						if (i == index) {
							elem.dingtou++;
						}
					})
				}
			},
			// 点击加减彩票的倍数
			handleBeishu(i, num) {
				if (num == -1) {
					_self.saveNum.forEach((elem, index) => {
						if (i == index && elem.beishu > 1) {
							elem.beishu--;
						}
					})
				} else {
					_self.saveNum.forEach((elem, index) => {
						if (i == index) {
							elem.beishu++;
						}
					})
				}
			}
		},
		watch: {
			current(val) {
				if (val == 0) {
						if(_self.outlets.id === undefined){
								_self.getWangdian();
								_self.adress = ""
						}else{
							let outlets =	uni.getStorageSync("outlets");
			_self.juli = outlets.juli
				_self.name = outlets.name
				_self.id = outlets.id;
				_self.current = outlets.current;
						}
				} else if (val == 1) {
					console.log(val);
					_self.getAdress();
					_self.wangdian = ""
					_self.juli = null
				}
			}
		},
	}
</script>
<style lang="scss" scoped>
	.select-order {
		.wangdian{
			padding: 20rpx 30rpx;

			.wangdian-title{
				font-size: 30rpx;
			}
			.wangdian-text{
				color: blue;
			}
		}
		.select-adress {
			width: 90%;
			margin: 20rpx auto 0;
			display: flex;
			justify-content: space-between;
			padding: 20rpx 20rpx;
			border: 1rpx solid #eee;
			box-shadow: 2rpx 2rpx #ddd;

			.tabs {
				width: 300rpx;
				height: 50rpx;
			}

			.iconfont {
				flex: 1;
				color: #999;
				text-align: center;
				line-height: 60rpx;
			}

			.adress-title {
				margin-left: 10rpx;
				flex: 3;

				.adress-title-top {}

				.adress-title-bottom {
					font-size: 24rpx;
					color: #999;
				}

				.adress-title-text {
					color: $color;
					font-size: 24rpx;
					margin-top: 5rpx;
				}
			}

			.adress-btn {
				width: 260rpx;
				height: 60rpx;
				background-color: $color;
				border-radius: 30rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				line-height: 60rpx;
				color: #fff;

				.btn-ziti {
					width: 80rpx;
					height: 55rpx;
					background-color: #fff;
					color: $color;
					text-align: center;
					border-radius: 25rpx;
				}
			}
		}

		.select-order-content {
			position: relative;
			width: 90%;
			margin: 20rpx auto 0;

			.order-bg {}

			.order-info {

				position: absolute;
				top: 40rpx;
				width: 80%;
				left: 50%;
				transform: translateX(-50%);
				padding: 20rpx;

				.order-info-title {
					text-align: center;
					font-weight: bold;
					font-size: 34rpx;
				}

				.order-num-wrap {
					margin-top: 20rpx;
					height: 330rpx;
					overflow-y: scroll;

					.order-info-num {
						.info_num_content {
							display: flex;
							justify-content: space-around;
							font-size: 24rpx;
							color: #999;

							.btn2 {
								margin-left: 20rpx;
							}

							.order-footer-btn {
								display: flex;
								text-align: center;
								margin-top: 10rpx;
								justify-content: center;
								align-items: center;

								.buy_wrap {
									width: 130rpx;
									height: 40rpx;
									border: 2rpx solid #eee;
									display: flex;
									justify-content: space-between;
									margin: 0 10rpx;

									.buy_text {
										display: block;
										width: 50rpx;
										border-right: 1rpx solid #ddd;
										border-left: 1rpx solid #ddd;
										line-height: 40rpx;
										margin: 0;
									}

									button {
										flex: 1;
										height: 40rpx;
										line-height: 40rpx;
										border-radius: 0rpx;
									}

									button::after {
										border: 0;
									}
								}
							}
						}

						.info-num-item {
							color: $color;
							display: flex;
							flex-wrap: wrap;
							margin-top: 20rpx;

							text {
								display: block;
								margin-left: 20rpx;
							}
						}

						.qiu-color {
							color: blue;
						}

						.info-num-multiple {
							margin-left: 20rpx;
							letter-spacing: 4rpx;
							color: #666;
						}




					}
				}


			}
		}

		.select-order-footer {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			display: flex;

			.footer-info {
				flex: 1;
				background-color: #eee;
				text-align: center;
				font-weight: bold;

				.footer-price {
					letter-spacing: 4rpx;
					margin-top: 10rpx;
					line-height: 100rpx;
				}
			}

			.footer-btn {
				width: 180rpx;
				background-color: $color;
				color: #fff;
				text-align: center;
				line-height: 100rpx;
			}
		}
	}
</style>
