<template>
  <view class="my_jifen">
    <!-- 头部开始 -->
    <view class="header">
      <view class="header_bg">
				<image src="/static/mine/jifen.png" mode="widthFix"></image>
			</view>
      <view class="header_content">
        <view class="header_title">积分</view>
        <view class="header_num">7020</view>
      </view>
    </view>
    <!-- 头部结束 -->
    <!-- 内容开始 -->
    <view class="myjifen_container">
      <view class="myjifen_btn_wrap">
        <navigator url="./jifen" class="btn_item">积分商城</navigator>
        <view class="btn_item btn_bg">积分规则</view>
      </view>
      <view class="myjifen_list">
        <view class="myjifen_item" v-for="item in jifenList" :key="item.ID">
          <view class="myjifen_item_icon">
						<!-- <image :src="item.types == '1'?require('../../static/mine/已完成.png'):require('../../static/mine/购物.png')" mode="widthFix"></image> -->
            <image src="/static/mine/yiwancheng.png" mode="widthFix"></image>
					</view>
          <view class="myjifen_item_info">
            <view class="info_text">{{item.Remarks}}</view>
            <view class="info_time">{{item.ProduceTime}}</view>
          </view>
          <view class="myjifen_item_num">+{{item.Number}}</view>
        </view>
      </view>
    </view>
    <!-- 内容结束 -->
  </view>
</template>
<script>
import common from '../../common/common';
var _self;
export default {
  data() {
    return {
      num:5,
      jifenList:[]
    }
  },
  onLoad(){
    _self = this;
    _self.getJifen()
  },
  methods: {
    getJifen(){
      
      let {ID} = uni.getStorageSync('userinfo');
      console.log(ID);
      
      common.request({
        path:'Development/getcralit',
        data:{
          rows:6,
          page:1,
          memberid:ID
        },
        success:res=>{
          console.log(res);
          _self.jifenList = res.data.rows
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
  .my_jifen{
    height: 100vh;
    background-color: #f5f3f4;
    .header{
      position: relative;
      .header_bg{
        width: 80%;
        margin: 0 auto;
      }
      .header_content{
        position: absolute;
        top: 50%;
        left: 15%;
        transform: translateY(-50%);
        color: #fff;
        .header_title{

        }
        .header_num{
          font-size: 40rpx;
          font-weight: 700;
        }
      }
    }
    .myjifen_container{
      background-color: #fff;
      margin-top: 20rpx;
      padding: 20rpx;
      .myjifen_btn_wrap{
        display: flex;
        justify-content: center;
        .btn_item{
          width: 200rpx;
          height: 60rpx;
          border-radius: 30rpx;
          background-color: $color;
          color: #fff;
          text-align: center;
          line-height: 60rpx;
        }
        .btn_bg{
          background-color: #ffb403;
          margin-left: 50rpx;
        }
      }
      .myjifen_list{
        margin-top: 20rpx;
        padding: 0 15rpx;
        .myjifen_item{
          border-bottom: 2rpx solid #eee;
          padding: 20rpx 0;
          display: flex;
          .myjifen_item_icon{
            // flex: 1;
            width: 50rpx;
            margin-right: 20rpx;
          }
          .myjifen_item_info{
            flex: 3;
            .info_text{

            }
            .info_time{
              font-size: 24rpx;
              color: #999;
            }
          }
          .myjifen_item_num{
            flex: 1;
            text-align: right;
            line-height: 60rpx;
            font-weight: 700;
          }
        }
      }
    }
  }
</style>