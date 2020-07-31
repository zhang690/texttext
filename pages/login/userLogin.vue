<template>
  <view class="user-login">
    <view class="input-wrap" v-if="isRegister == 'false'">
      <view class="user-input">
        <text>手机号：</text>
        <input type="text" placeholder="请输入手机号" v-model="phone" />
      </view>
      <view class="user-input">
        <text>姓名：</text>
        <input type="text" placeholder="请输入真实姓名" v-model="realname" />
      </view>
      <view class="user-input">
        <text>邀请码：</text>
        <input type="text" placeholder="请输入邀请码" v-model="code" />
      </view>
    </view>
    <button v-if="isRegister == true" open-type="getUserInfo" @click="handleGetUserInfo">登录</button>
    <button v-else @click="handleRegiter">注册</button>
  </view>
</template>

<script>
// import { request } from "../../common/request";
import common from "../../common/common";
var _self;
export default {
  data() {
    return {
      phone: "",
      realname: "",
      code: "",
      isRegister: true,
      userInfo: {},
      city: ""
    };
  },
  onLoad() {
    _self = this;
    _self.getAdress();
  },
  methods: {
    // 用户注册
    handleRegiter() {
      let openId = uni.getStorageSync("openid");
      _self.userLogin(
        _self.userInfo.nickName,
        openId,
        _self.phone,
        _self.realname,
        _self.userInfo.avatarUrl,
        _self.userInfo.gender
      );
    },
    // 用户登录的接口
    userLogin(nickName, openId, phone, realname, avatarUrl, invite, gender) {
      common.request({
        path: "login/loginbyopenid",
        method: "GET",
        data: {
          nickName: nickName, //微信名
          openId: openId,
          phone: phone,
          realname: realname, //真实姓名
          avatarUrl: avatarUrl,
          invite: "", //邀请人id
          gender: gender
        },
        success: result => {
          console.log(result);
          console.log(
            nickName,
            openId,
            phone,
            realname,
            avatarUrl,
            invite,
            gender
          );
          wx.showToast({
            title: "登陆成功",
            icon: "none",
            image: "",
            duration: 1500,
            mask: true
          });
          uni.setStorageSync("userinfo", result.data);
          common.setstate(result.data);
          wx.switchTab({
            url: "/pages/index/index"
          });
        }
      });
    },
    // 获取用户的经纬度
    getAdress() {
      uni.getLocation({
        type: "gcj02",
        success(res1) {
          const latitude = res1.latitude;
          const longitude = res1.longitude;
          uni.setStorageSync("jingwei", { latitude, longitude });
          wx.request({
            url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=5XTBZ-SXL6R-7OYWX-WTOCF-M7BUK-TSFBQ`,
            data: {},
            header: { "content-type": "application/json" },
            method: "GET",
            dataType: "json",
            responseType: "text",
            success: result => {
              console.log(result);
              _self.city = result.data.result.address_component.city;
            }
          });
        },
        fail: err => {
          console.log(err);
        }
      });
    },
    // 用户登录
    handleGetUserInfo() {
      // if(_self.city != "湘潭市"){
      //   wx.showToast({
      //     title: '您不在湘潭市，暂时无法登陆',
      //     icon: 'none',
      //     duration: 1500,
      //     mask: true,
      //   });
      //   return;
      // }
      uni.login({
        success: loginRes => {
          console.log(loginRes);
          // 获取用户信息
          let openid = uni.getStorageSync("openid");
          if (!openid) {
            let appid = "wxb29c33d16f4649b6";
            let secret = "0718872a9f071ed53dfdbff0599a6444";
            let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${loginRes.code}&grant_type=authorization_code`;
            uni.request({
              url,
              method: "GET",
              success: opendres => {
                console.log(opendres);
                _self.openid = opendres.data.openid;
                uni.setStorageSync("openid", opendres.data.openid);
              }
            });
          }
          uni.getUserInfo({
            provider: "weixin",
            success: infores => {
              console.log(infores);
              _self.userInfo = infores.userInfo;
              // setstate(infores.userInfo)
              common.request({
                path: "login/selecttoken",
                method: "GET",
                data: openid,
                success: resInfo => {
                  wx.showToast({
                    title: resInfo.info,
                    icon: "none",
                    duration: 1500,
                    mask: true
                  });
                  _self.isRegister = resInfo.info;
                  if (resInfo.info == "false") {
                    console.log(_self.isRegister);
                    wx.showToast({
                      title: "请先注册",
                      icon: "none",
                      duration: 1500,
                      mask: false
                    });
                  } else {
                    console.log(_self.isRegister);
                    wx.showToast({
                      title: "resInfo.info",
                      icon: "none",
                      duration: 1500,
                      mask: false
                    });
                    _self.userLogin("", openid, "", "", "", "", "");
                  }
                }
              });
            },
            fail: err => {
              console.log(err);
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.user-login {
  .user-input {
    display: flex;
    padding: 20rpx;
    align-items: center;

    input {
      height: 65rpx;
      width: 300rpx;
      border: 2rpx solid #eee;
      border-radius: 10rpx;
    }
  }
}
</style>
