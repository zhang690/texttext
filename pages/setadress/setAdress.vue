<template>
  <view class="setAdress">
    <view class="setAdress_wrap">
      <!-- 联系人开始 -->
      <view class="input_item">
        <view class="input_title">联系人</view>
        <view class="input">
          <input type="text" placeholder="用于送货时对您的称呼" v-model="name" />
        </view>
      </view>
      <!-- 联系人结束 -->
      <view class="input_item">
        <view class="input_title">手机号</view>
        <view class="input">
          <input type="text" placeholder="请输入您的手机号码" v-model="phone" />
        </view>
      </view>
      <view class="input_item">
        <view class="input_title">详细地址</view>
        <view class="input">
          <input type="text" placeholder="请输入详细地址" v-model="adress" />
        </view>
      </view>
    </view>
    <view class="setAdress_btn">
      <view class="btn_text" @click="handleAdd">保存</view>
    </view>
  </view>
</template>
<script>
import common from "../../common/common";
var _self;
export default {
  data() {
    return {
      name: "",
      phone: "",
      adress: "",
      id: "0"
    };
  },
  onLoad(options) {
    _self = this;
    _self.id = options.id;
    console.log( _self.id);
    let user = wx.getStorageSync("adress");
    if(user != null || user != undefined){
      _self.name = user.Name;
      _self.adress = user.Address;
      _self.phone = user.Phone;
    }
  },
  methods: {
    handleAdd() {
      let { ID } = wx.getStorageSync("userinfo");
      console.log(_self.id);

      if (_self.id === undefined) {
        common.request({
          path: "Development/addupadderss",
          data: {
            MemberID: ID,
            Address: _self.adress,
            Name: _self.name,
            Phone: _self.phone
          },
          success: res => {

          }
        });
      } else {
        common.request({
          path: "Development/addupadderss",
          data: {
            ID:_self.id,
            MemberID: ID,
            Address: _self.adress,
            Name: _self.name,
            Phone: _self.phone
          },
          success: res => {}
        });
      }
      uni.navigateBack({
        delta: 1
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.setAdress {
  background-color: #f7f5f6;
  height: 100vh;
  .setAdress_wrap {
    background-color: #fff;
    .input_item {
      display: flex;
      padding: 20rpx;
      border-bottom: 1rpx solid #eee;
      .input_title {
        font-weight: bold;
      }
      .input {
        margin-left: 50rpx;
        color: #999;
      }
    }
  }
  .setAdress_btn {
    position: fixed;
    bottom: 50rpx;
    width: 100%;
    .btn_text {
      width: 85%;
      height: 60rpx;
      background-color: $color;
      color: #fff;
      margin: 0 auto;
      text-align: center;
      line-height: 60rpx;
      border-radius: 30rpx;
    }
  }
}
</style>