<template>
  <view class="scraping">
    <!-- 页面背景开始 -->
    <image src="/static/index/bg.png" class="page-bg"></image>
    <!-- 页面背景结束 -->
    <!-- 页面内容开始 -->
    <view class="scrap-container">
      <view class="scrap-title">
        <image mode="widthFix" src="/static/index/title.png"></image>
      </view>
      <!-- 选择商品卡片开始 -->
      <view class="scrap-content">
          <image class="content-header" src="/static/index/man.png"></image>
          <!-- 商品开始 -->
        <view class="scrap-wrap">
          
          <view class="scrap-item" v-for="(item,index) in scrap" :key="index">
            <image class="item-bg" src="/static/index/item-bg.png"></image>
            <view class="item-info">
              <view class="item-text">{{item.money}}</view>
            <view class="item-btn" @click="handleClick(item.id)" v-if="!item.isClick">选择数量</view>
             <view class="item-btn item-change" v-else>
               <view class="jian" @click="handleOperation(item.id,1)">-</view>
               <view class="chang-text">{{item.num}}</view>
               <view class="jia" @click="handleOperation(item.id,2)">+</view>
             </view>
            </view>
          </view>
          
        </view>
        <!-- 商品结束 -->
      </view>
      
      <!-- 选择商品卡片结束 -->
      <!-- 确认购买按钮开始 -->
        <view class="sure-buy" @click="handleBuy">确认购买</view>
      <!-- 确认购买按钮结束 -->
    </view>
    <!-- 页面内容结束 -->
  </view>
</template>
<script>
import common from '../../common/common'
var _self;
export default {
  
  data() {
    return {
      scrap:[
        {
          id:0,
          isClick:false,
          money:"2元",
          num:0,
          price:2
        },
        {
          id:1,
          isClick:false,
          money:"5元",
          num:0,
          price:5
        },
        {
          id:2,
          isClick:false,
          money:"10元",
          num:0,
          price:10
        },
        {
          id:3,
          isClick:false,
          money:"20元",
          num:0,
          price:20
        },
        {
          id:4,
          isClick:false,
          money:"30元",
          num:0,
          price:30
        },
        {
          id:5,
          isClick:false,
          money:"50元",
          num:0,
          price:50
        },
      ],
      total:0
    }
  },
  onLoad(){
    _self = this;
  },
  methods: {
    // 点击购买刮刮乐
    handleBuy(){
      _self.scrap.forEach(elme=>{
        _self.total +=(elme.price * elme.num)
      })
      if(_self.total == 0){
        wx.showToast({
          title: '请选择商品',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: true,
        });
        return;
      }
      let {ID} = wx.getStorageSync('userinfo');
      let buyList = [];
      _self.scrap.forEach(elem=>{
        buyList.push({
          ProductName:elem.money,
          Number:elem.num,
          RedBall:"",
          BlueBall:"",
          FixedState:"",
          Fixed:0,
          Multiple:0
        })
      })
      common.request({
        path:'Order/addorder',
        data:{
          MemberID:ID,
          Price:_self.total,
          // OutletsID :"",
          LotteryType :"",
          list:buyList,
          Product:"goumai",
        },
        success:res=>{
          uni.showToast({
            title: res.info,
            icon: 'none',
            duration: 1500,
            mask: true,
          });
          _self.scrap.forEach(elem=>{
            elem.num = 0;
          })
          console.log(res);
          console.log(buyList);
        }
      })
    },
    // 点击时改变选择数量的文字
    handleClick(i){
      _self.scrap.forEach(element => {
        element.id === i?element.isClick = true:"";
      });
    },
    // 点击时改变数量加减
    handleOperation(id,type){
      if(type == 1){
        _self.scrap.forEach(elem=>{
          if(elem.id == id && elem.num > 1){
            elem.num-=1;
          }
        })
      }else if(type == 2){
        _self.scrap.forEach(elem=>{
          if(elem.id == id){
            elem.num+=1;
          }
        })
      }
    }
  },
}
</script>
<style lang="scss" scoped>
  .scraping{
    position: relative;
    .page-bg{
      height: 100vh;
    }
    .scrap-container{
      position: absolute;
      top: 0;
      width: 100%;
      padding-top: 80rpx;
      .scrap-title{
        width: 80%;
        margin: 0 auto;
      }
      .scrap-content{
        width: 95%;
        background-color: rgba(235, 155, 195, 0.4);
        margin: 30rpx auto 0;
        padding-top: 25rpx;
        .content-header{
          width: 260rpx;
          height: 50rpx;
          margin: 0 auto;
        }
        .scrap-wrap{
          display: flex;
          flex-wrap: wrap;
          margin-top: 30rpx;
          justify-content: space-around;
          padding: 0 20rpx 20rpx;
          .scrap-item{
            width: 45%;
            height: 200rpx;
            position: relative;
            margin-top: 20rpx;
            .item-bg{
              height: 100%;
            }
            .item-info{
              position: absolute;
              top: 0;
              width: 100%;
              text-align: center;
              .item-text{
                width: 180rpx;
                color: #e7905b;
                font-size: 36rpx;
                letter-spacing: 4rpx;
                margin: 25rpx auto 0;
              }
              .item-change{
                display: flex;
                justify-content: space-around;
                .jian{
                  color: #fff;
                  width: 40rpx;
                }
                .chang-text{
                  color: #fff;
                }
                .jia{
                  color: #fff;
                  width: 40rpx;
                }
              }
              .item-btn{
                margin: 25rpx auto 0;
                background-color: #e7905b;
                width: 180rpx;
                height: 50rpx;
                line-height: 50rpx;
                border-radius: 25rpx;
                color: #fff;
              }
            }
          }
        }
      }
      .sure-buy{
        width: 300rpx;
        height: 70rpx;
        background-color: #fec44b;
        text-align: center;
        line-height: 70rpx;
        border-radius: 35rpx;
        margin: 20rpx auto 0;
        box-shadow: 2rpx 6rpx  #df763e;
        color: #fff;
      }
    }
  }
</style>