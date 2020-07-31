<template>
  <view class="wait-lingqu">
    <view class="lingqu-adress">
      <view class="adress-title">{{orde.Address}}</view>
      <view class="adress-info">
        <text>陈女士</text><text class="info-phone">{{orde.Phone}}</text>
      </view>
    </view>
    <view class="lingqu-content">
      <view class="content-title">
        <view class="title-left">站点</view>
        <text>福才到家{{orde.OutletsName}}投注站</text>
      </view>
      <view class="content-info">
        <view class="info-icon">
          <image :src="orde.icon"></image>
        </view>
        
        <view class="info-name">{{orde.LotteryType}}</view>
        <view class="info-num">*{{orde.Number}}</view>
      </view>
      <view class="content-total">共{{orde.Number}}件商品</view>
    </view>
    <view class="order-time">
      下单时间：{{orde.AddTime}}
    </view>
    <view class="lingqu-btn" @click="handleLingqu">确认领取</view>
  </view>
</template>
<script>
import common from '../../common/common'
var _self;
export default {
  data() {
    return {
      orde:{}
    }
  },
  onLoad(){
    _self = this;
    
  },
  onShow(){
    let detail = uni.getStorageSync("riderdetail");
    console.log(detail);
    if(detail.orde.LotteryType == "七乐彩"){
      detail.orde.icon = "/static/index/qilecai.png"
    }else if(detail.orde.LotteryType == "双色球"){
      detail.orde.icon = "/static/index/shuangseqiu.png"
    }else if(detail.orde.LotteryType == "福彩3D"){
      detail.orde.icon = "/static/index/fucai3d.png"
    }
    _self.orde = detail.orde;
  },
  methods: {
    handleLingqu(){
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
      common.request({
        path:"UserOrder/uapdatepage",
        data:{
           id:_self.orde.ID,
           distributionstate:"1",
           receivetime:time
        },
        success:res=>{
          wx.showToast({
            title: '领取成功',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: true,
          });
          console.log(res);
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
  .wait-lingqu{
    padding: 35rpx;
    .lingqu-adress{
      height: 100rpx;
      border-radius: 5rpx;
      box-shadow: 2rpx 2rpx 2rpx #bbb;
      background-color: #fff;
      padding: 20rpx;
      .adress-title{
        font-size: 30rpx;
      }
      .adress-info{
        margin-top: 20rpx;
        font-size: 26rpx;
        color: #999;
        .info-phone{
          margin-left: 30rpx;
        }
      }
    }
    .lingqu-content{
      margin-top: 20rpx;
      border-radius: 10rpx;
      background-color: #fff;
      box-shadow: 2rpx 2rpx 2rpx #eee;
      .content-title{
        display: flex;
        border-bottom: 2rpx solid #eee;
        padding-bottom: 10rpx;
        padding: 20rpx 20rpx;
        align-items: center;
        .title-left{
          background-color: $color;
          width: 80rpx;
          height: 35rpx;
          text-align: center;
          line-height: 35rpx;
          border-radius: 5rpx;
          margin-right: 15rpx;
          color: #fff;
          font-size: 24rpx;
        }
      }
      .content-info{
        display: flex;
        padding: 25rpx 20rpx;
        border-bottom: 1rpx solid #eee;

        .info-icon{
          flex: 2;
          text-align: center;
          image{
            width: 60rpx;
            height: 60rpx;
          }
          
        }
        .info-name{
          flex: 7;
          margin-left: 15rpx;
          display: flex;
          align-items: center;
        }
        .info-num{
          flex: 1;
          display: flex;
          align-items: center;
          color: #999;
          text-align: right;
        }
      }
      .content-total{
        padding: 10rpx 20rpx;
        height: 65rpx;
        font-size: 30rpx;
        text-align: right;
        line-height: 65rpx;
      }
    }
    .order-time{
      margin-top: 20rpx;
      background-color: #fff;
      color: #999;
      height: 50rpx;
      line-height: 50rpx;
      padding: 20rpx;
      border-radius: 5rpx;
    }
    .lingqu-btn{
      position: fixed;
      bottom: 20rpx;
      width: 90%;
      left: 50%;
      transform: translateX(-50%);
      height: 60rpx;
      text-align: center;
      background-color: $color;
      color: #fff;
      line-height: 60rpx;
      border-radius: 30rpx;
    }
  }
</style>