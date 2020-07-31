<template>
  <view class="rider-list">
    <!-- 自定义导航栏 -->
    <view class="nav">
      <uni-nav-bar fixed @clickLeft="handleBack" left-text="返回登录" title="我的配送"></uni-nav-bar>
    </view>
    <!-- 分段器 -->
    <view class="tabs">
      <segmented :tabs="tabs" @handleParent="handleChild"></segmented>
    </view>
    <view class="content" v-if="current === 0">
      <view class="list-wrap">
        <view class="list-item" v-for="(item,index) in waitList" :key="item.ID">
          <view class="item-left">
            <view class="item-adress">
              <text>{{item.orde.Address}}</text>
            </view>
            <view class="item-user">
              <text>{{item.orde.Name}}</text>
              <text class="user-phone">{{item.orde.Phone}}</text>
            </view>
          </view>
          <view class="item-right" @click="handleDetail(index)">待领取</view>
        </view>
      </view>
    </view>
    <view class="content" v-if="current === 1">
      <view class="list-wrap">
        <view class="list-item" v-for="(item,index) in waitList" :key="item.ID">
          <view class="item-left">
            <view class="item-adress">
              <text>{{item.orde.Address}}</text>
            </view>
            <view class="item-user">
              <text>{{item.orde.Name}}</text>
              <text class="user-phone">{{item.orde.Phone}}</text>
            </view>
          </view>
          <view class="item-right" @click="handlLook(index)">查看</view>
        </view>
      </view>
    </view>
    <view class="content" v-if="current === 2">
      <view class="list-wrap">
        <view class="list-item" v-for="(item,index) in waitList" :key="item.ID">
          <view class="item-left">
            <view class="item-adress">
              <text>{{item.orde.Address}}</text>
            </view>
            <view class="item-user">
              <text>{{item.orde.Name}}</text>
              <text class="user-phone">{{item.orde.Phone}}</text>
            </view>
          </view>
          <view class="item-right" @click="handlSongda(index)">已送达</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import segmented from "@/components/tabs/segmented.vue";
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import common from '../../common/common'
var _self;
export default {
  components: { uniNavBar, segmented },
  data() {
    return {
      tabs: [
        { id: 0, name: "待领取", isActive: true },
        { id: 1, name: "待配送", isActive: false },
        { id: 2, name: "已送达", isActive: false }
      ],
      current: 0,
      waitList:[]
    };
  },
  onLoad() {
    _self = this;
    
  },
  onShow(){
   if(_self.current == 0){
      _self.getRuderlist(2)
   }else if(_self.current == 1){
     _self.getRuderlist(1)
   }else {
     _self.getRuderlist(3)
   }
    console.log( _self.current);
  },
  methods: {
    handleChild(e) {
      console.log(e);
      _self.tabs.forEach(element => {
        element.id === e
          ? (element.isActive = true)
          : (element.isActive = false);
      });
      _self.current = e;
    },
    // 点击跳转登录页
    handleBack(){
      wx.redirectTo({
        url: '../login/riderLogin',
      });
    },
    // 点击查看配送订单
    handlLook(i){
      uni.setStorageSync('peisong', _self.waitList[i]);
      uni.navigateTo({
        url: './riderPeisong',
      });
    },
    handlSongda(i){
      uni.setStorageSync('wancheng', _self.waitList[i]);
      uni.navigateTo({
        url: './riderWancheng',
      });
    },
    // 点击跳转详情页
    handleDetail(i){
      uni.setStorageSync("riderdetail", _self.waitList[i]);
      uni.navigateTo({
        url: './riderDetail',
      });
    },
    getRuderlist(i){
      let {F_UserId} = wx.getStorageSync("riderinfo");
      common.request({
        path:"UserOrder/getpage",
        data:{
          riderid:F_UserId,
          // orderstate:"1"
          self_delivery:"2",
          outletsid :"",
          rows:5,
          page :1,
          sidx:"",
          sord :"LssueTime",
          DistributionState:i
        },
        success:res=>{
          _self.waitList =  res.data.rows;
          
          console.log(res);
        }
      })
    }
  },
  watch: {
    current(val){
      if(val == 0){
        _self.getRuderlist("2")
      }else if(val == 1){
        _self.getRuderlist("1")
      }else{
        _self.getRuderlist("3")
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.rider-list {
  .nav {
    height: 100rpx;
    margin-top: 40rpx;
  }
  .tabs {
    width: 80vw;
    margin: 20rpx auto 0;
  }
  .list-wrap {
    .list-item {
      margin-top: 15rpx;
      display: flex;
      background-color: #fff;
      justify-content: space-between;
      padding: 30rpx;
      height: 110rpx;
      border-radius: 8rpx;
      .item-left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item-adress {
          text {
            font-size: 32rpx;
          }
          .juli {
            font-size: 28rpx;
            color: $color;
            margin-left: 20rpx;
          }
        }
        .item-user {
          color: #999;
          .user-phone {
            margin-left: 20rpx;
          }
        }
      }
      .item-right {
        display: flex;
        align-items: center;
        color: $color;
      }
    }
  }
}
</style>