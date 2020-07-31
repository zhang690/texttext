<template>
  <view class="my-caiquan">
    <view class="caiquan-wrap">
      <view class="caiquan-item" v-for="item in caiquanList" :key="item.ID">
        <image src="/static/index/caiquan.png" class="caiquan-icon"></image>
        <view class="caiquan-content">
          <view class="caiquan-money">
¥
            <text class="money-num">{{item.FaceValue}}</text>
          </view>
          <view class="caiquan-info">
            <view class="caiquan-youhui">元优惠券</view>
            <!-- <view class="caiquan-man">满20元可使用(不含配送费)</view> -->
            <view class="caiquan-time">有效期{{item.RelationTime + '-' + item.OverdueTime}}</view>
          </view>
          <view class="caiquan-btn">
            <text>{{item.state == '1'?'已过期':'立即使用'}}</text>
            <view class="iconfont icon-xiajiantou"></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import common from '../../common/common';
var _self;
export default {
  data() {
    return {
      caiquanList:[]
    }
  },
  onLoad(){
    _self = this;
    _self.getCaiquan();
  },
  onShow(){
   
  },
  methods: {
    getCaiquan(){
     let {ID} = uni.getStorageSync('userinfo');
      common.request({
        path:'Development/getcoupon',
        data:{
          rows:6,
          page:1,
          memberid:ID
        },
        success:res=>{
          console.log(res);
          res.data.rows.forEach(element => {
            element.OverdueTime = element.OverdueTime.split(" ")[0];
            element.RelationTime = element.RelationTime.split(" ")[0]
          });
          _self.caiquanList = res.data.rows
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
  .my-caiquan{
    height: 100vh;
    background-color: #f7f5f6;
    padding: 30rpx;
    .caiquan-wrap{
      .caiquan-item{
        position: relative;
				.caiquan-icon{
					height: 160rpx;
				}
        .caiquan-content{
          position: absolute;
          top: 0;
          width: 100%;
          display: flex;
          .caiquan-money{
            flex: 1;
            color: $color;
            font-size: 20rpx;
            text{
              font-size: 120rpx;
							color: $color;
            }
          }
          .caiquan-info{
            flex: 3;
            border-left: 1rpx dotted $color;
            height: 130rpx;
            padding-top: 20rpx;
            color: $color;
            padding-left: 20rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .caiquan-youhui{

            }
            .caiquan-man{
              width: 80%;
              border-top: 1rpx solid $color;
              border-bottom: 1rpx solid $color;
              padding: 5rpx 0;
              font-size: 24rpx;
            }
            .caiquan-time{
              margin-top: 5rpx;
              color: #999;
              font-size: 20rpx;
            }
          }
          .caiquan-btn{
            flex: 1;
            text{
              display: block;
							color: $color;
              font-size: 35rpx;
              letter-spacing: 4rpx;
              width: 100rpx;
              margin:15rpx auto 0;
              text-align: center;
            }
            .iconfont{
              text-align: center;
							color: $color;
            }
          }
        }
      }
    }
  }
</style>