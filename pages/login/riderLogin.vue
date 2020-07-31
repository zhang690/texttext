<template>
  <view class="rider-login">
    <view class="rider-name">
      <view class="name">用户名：</view>
      <input type="text" :value="username" placeholder="请输入用户名" />
    </view>
    <view class="rider-name word">
      <view class="name">密码：</view>
      <input type="password" :value="password" placeholder="请输入密码" />
    </view>
    <view class="login-btn" @click="handleLogin">登录</view>
  </view>
</template>
<script>
import common from "../../common/common";
import md5 from 'js-md5';
var _self;
export default {
  data() {
    return {
      username: "15802694503",
      password: "123456789"
    };
  },
  onLoad() {
    _self = this;
  },
  methods: {
    handleLogin() {
      common.request({
        path: "userlogin/loginbyoutlets",
        method: "GET",
        data: {
          // username:_self.username,
          // password:_self.password
          username: "15802694503",
          password: md5("yiruit888")
        },
        success: res => {
          console.log(res);
          if(res.code == 200){
            wx.setStorageSync("riderinfo", res.data);
            wx.navigateTo({
              url: '../rider/riderList',
            });
          }else{
            wx.showToast({
              title: res.info,
              icon: 'none',
              duration: 1500,
              mask: true,
            });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.rider-login {
  padding: 30rpx;
  .rider-name {
    display: flex;
    padding: 10rpx 20rpx;
    justify-content: center;
    .name {
    }
    input {
      border: 2rpx solid #666;
    }
  }
  .word {
    margin-top: 20rpx;
    input {
      margin-left: 24rpx;
    }
  }

  .login-btn {
    width: 200rpx;
    height: 60rpx;
    border-radius: 10rpx;
    margin: 0 auto;
    margin-top: 30rpx;
    background-color: $color;
    text-align: center;
    line-height: 60rpx;
    font-size: 30rpx;
    letter-spacing: 2rpx;
  }
}
</style>