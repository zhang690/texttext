<template>
  <view class="jifen">
    <!-- 头部开始 -->
    <view class="header">
      <view class="header_bg">
        <image src="/static/mine/lijicanyu.png" mode="widthFix"></image>
      </view>
      <!-- 头部导航开始 -->
      <view class="header_nav">
        <view class="nav_item">
          <view class="nav_icon">
						<image src="/static/mine/wodejifen.png" mode="widthFix"></image>
					</view>
          <view class="nav_title">
            我的积分
          </view>
        </view>
        <navigator url="./duihuanRecord" class="nav_item">
          <view class="nav_icon">
						<image src="/static/mine/duihuan.png" mode="widthFix"></image>
					</view>
          <view class="nav_title">
            兑换记录
          </view>
        </navigator>
        <view class="nav_item">
          <view class="nav_icon">
						<image src="/static/mine/fujin.png" mode="widthFix"></image>
					</view>
          <view class="nav_title">
            附近彩票
          </view>
        </view>
      </view>
      <!-- 头部导航结束 -->
    </view>
    <!-- 头部结束 -->
    <!-- 主体内容开始 -->
    <view class="jifen_content">
      <view class="jifen_title_wrap">
        <view class="title_left">活动专场</view>
        <view class="title_right">全部<text class="iconfont icon-iconfontjiantou5"></text></view>
      </view>
      <view class="jifen_card_wrap">
        <view class="jifen_card_item" v-for="(item,index) in products" :key="item.ID">
          <view class="card_icon" @click="handleDuihuan(index)">
						<image src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=945058522,910797875&fm=26&gp=0.jpg" mode="widthFix"></image>
					</view>
          <view class="card_title">{{item.ProductName}}</view>
          <view class="card_jifen">{{item.Price}}积分</view>
        </view>
      </view>
    </view>
    <!-- 主体内容结束 -->
    <!-- 底部图片开始 -->
    <view class="footer_icon" @click="handleSelectcode">
      <image src="/static/mine/12.png" mode="widthFix"></image>
    </view>
    <!-- 底部图片结束 -->
  </view>
</template>
<script>
import common from '../../common/common';
var _self;
export default {
  data() {
    return {
      num:4,
      products:[]
    }
  },
  onLoad(){
    _self = this;
  },
  onShow(){
    _self.getData();
  },
  methods: {
    // 跳转积分兑换
    handleDuihuan(i){
      uni.setStorageSync("jifen", _self.products[i]);
      uni.navigateTo({
        url: './jifenIntegral',
      });
    },
    handleSelectcode(){
      wx.switchTab({
        url: '../getHome/getHome',
      });
    },
    getData(){
      common.request({
					path: "Development/getshopping",
					// method:'POST',
					data: {
						rows: 5,
            page: 1,
            productname:"",
						sidx: "",
						sord: "desc",
					},
					success: res => {
            _self.products = res.data.rows
						console.log(res);
					}
				})
    }
  },
}
</script>
<style lang="scss" scoped>
  .jifen{
    background-color: #e4e4e4;
    height: 100vh;
    .header{
      background-color: #000;
      position: relative;
      width: 100%;
      height: 30vh;
      .header_bg{
        width: 90%;
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
        z-index: 10;
        top: 60rpx;
      }
      .header_nav{
        position: absolute;
        background-color: #fff;
        width: 100%;
        bottom: -50%;
        padding-top: 120rpx;
        padding-bottom: 20rpx;
        display: flex;
        justify-content: space-around;
        z-index: 0;
        border-top-left-radius: 50rpx;
        border-top-right-radius: 50rpx;
        .nav_item{
          .nav_icon{

          }
          .nav_title{
            color: #999;
            font-size: 26rpx;
          }
        }
      }
    }
    .jifen_content{
      margin-top: 160rpx;
      padding: 15rpx;
      background-color: #fff;
      .jifen_title_wrap{
        display: flex;
        justify-content: space-between;
        padding: 15rpx 0;
        .title_left{
          font-size: 30rpx;
          font-weight: 600;
        }
        .title_right{
          font-size: 26rpx;
          color: #999;
        }
      }
      .jifen_card_wrap{
        display: flex;
        flex-wrap: wrap;
        .jifen_card_item{
          width: 45%;
          text-align: center;
          margin-left: 20rpx;
          padding: 20rpx 0;
          .card_icon{
            width: 100%;
            margin: 0 auto;
          }
          .card_title{
            margin: 13rpx 0;
          }
          .card_jifen{
            color: $color;
            font-size: 24rpx;
          }
        }
      }
    }
    .footer_icon{
      width: 90%;
      margin: 20rpx auto;
    }
  }
</style>