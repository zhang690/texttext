<template>
  <view class="giveSelect">
    <!-- <view class="giveselect_tabs"> -->
      <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#ff3c35"></uni-segmented-control>
        <view class="content">
          <!-- 门店自提开始 -->
            <view v-if="current === 0">
              <view class="give_search">
                <text class="iconfont icon-dizhi"></text>湘潭
                <view class="search">
                  <uni-search-bar  :radius="20" placeholder="搜索附近门店" @confirm="search"  @input="input"></uni-search-bar>
                </view>
              </view>
            <!-- 搜索列表开始 -->
            <view class="search_wrap">
              <view class="search_item" v-for="(item) in adressList" :key="item.F_CompanyId">
                <view class="search_item_left">
                  <view class="search_left_title">{{item.F_FullName}}</view>
                  <view class="search_left_text">{{item.F_Address}}</view>
                </view>
                <view class="search_item_right">
                  <view class="search_right_num">{{item.distance}}km</view>
                  <view class="search_right_btn" @click="handleSuer(item.F_CompanyId,item.F_FullName,item.distance)">确认选择</view>
                </view>
              </view>
            </view>
            <!-- 搜索列表结束 -->
            </view>
          <!-- 门店自提结束 -->
            <view v-if="current === 1">
                <view class="songhuo_wrap">
                  <view class="songhuo_item" v-for="(item,index) in shouhuoList" :key="index">
                    <view class="songhuo_item_left">
                      <view class="songhuo_title">{{item.Address}}</view>
                      <view class="songhuo_info">{{item.Name}}<text>{{item.Phone}}</text></view>
                    </view>
                    <view class="songhuo_btn">
                      <view class="songhuo_item_right" @click="handleUpdate(index)">编辑</view>
                    <view class="songhuo_btn_item" @click="handlequeding(item.Address,item.ID)">确认选择</view>
                    </view>
                  </view>
                </view>
            </view>
        </view>
  </view>
</template>
<script>
import uniSegmentedControl from "../../components/uni-segmented-control/uni-segmented-control.vue";
import uniSearchBar from '../../components/uni-search-bar/uni-search-bar/uni-search-bar.vue';
import common from '../../common/common';
var _self;
export default {
    components: {uniSegmentedControl,uniSearchBar},
    data() {
        return {
            items: ['门店自提','送货上门'],
            current: 0,
            shouhuoList:[],
            adressList:[],
            id:""
        }
    },
    onLoad(options){
      _self = this;
      _self.getWanddian();
      _self.id = options.id;
      console.log(options.id);
    },
    methods: {
      // 确认选择外送地址
      handlequeding(name,id){
        uni.setStorageSync("outlets",{id,name,juli:null,current:_self.current} );
        uni.navigateBack({
          delta: 1
        });
      },
      onClickItem(e) {
        console.log(1111111);
        if(_self.id == 1){
          return;
        }
        
        if (this.current !== e.currentIndex) {
            this.current = e.currentIndex;
        }
      }, 
      // 确认选择网点
      handleSuer(id,name,juli){
        if(_self.id == 1){
          uni.setStorageSync("wangdian", {id,name});
          uni.navigateBack({
            delta: 1
          });
          return;
        }
        uni.setStorageSync("outlets", {id,name,juli,current:_self.current});
        wx.navigateBack({
          delta: 1
        });
      },
      search(e){
        e.value = "";
      },
      input(e){
        // if(e.value.trim()){
          _self.getWanddian(e.value)
        // }else{
        //   _self.adressList = []
        // }
        console.log(e); 
      },
      getWanddian(val){
      const {latitude,longitude} = uni.getStorageSync("jingwei");
      console.log(latitude,longitude);
        common.request({
          path:"Order/getoutlets",
          data:{
            name:val,
            longitude,
            latitude,
            rows:5,
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
            _self.adressList = res.data.rows
            console.log(res);
          }
        })
      },
      // 点击修改地址
      handleUpdate(i){
        let id = "";
        _self.shouhuoList.forEach((element,index) => {
          if(i == index){
            uni.setStorageSync("adress", element);
            id = element.ID
          }
        });
        wx.navigateTo({
          url: '../setadress/setAdress?id=' + id,
        });
      },
      // 获取地址列表
      getAdress() {
        let { ID } = uni.getStorageSync("userinfo");
        console.log(ID);
        common.request({
          path: "Development/getaddress",
          data: ID,
          success: res => {
            console.log(res);
            _self.shouhuoList = res.data.rows;
          }
        });
        
      }
    },
    watch: {
      current(val){
        if(val == 0){
          _self.getWanddian()
        }else{
          _self.getAdress();
        }
      }
    },
}
</script>
<style lang="scss" scoped>
  .giveSelect{
    background-color: #f7f5f6;
    height: 100vh;
    .giveselect_tabs{
      width: 80%;
      height: 36rpx;
      border-radius: 18rpx;
    }
    .content{
      .give_search{
        display: flex;
        align-items: center;
        background-color: #fff;
        width: 90%;
        margin: 20rpx auto 0;
        padding-left: 20rpx;
        // border-radius: 8rpx;
        .search{
          width: 70%;
          margin-left: 20rpx;
        }
      }
      .search_wrap{
        .search_item{
          display: flex;
          justify-content: space-between;
          width: 88%;
          margin: 20rpx auto 0;
          padding: 20rpx;
          align-items: center;
          background-color: #fff;
          border-radius: 8rpx;
          .search_item_left{
            .search_left_title{
              
            }
            .search_left_text{
              color: #999;
              margin-top: 10rpx;
            }
          }
          .search_item_right{
            text-align: right;
            .search_right_num{
              color: #999;
            }
            .search_right_btn{
              color: $color;
              margin-top: 10rpx;
            }
          }
        }
      }
      .songhuo_wrap{
        .songhuo_item{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 auto;
          padding: 20rpx;
          margin-top: 15rpx;
          background-color: #fff;
          width: 90%;
          
          .songhuo_item_left{

            .songhuo_title{
              font-size: 30rpx;
            }
            .songhuo_info{
              font-size: 24rpx;
              color: #999;
              margin-top: 20rpx;
            }
          }
          .songhuo_btn{
            .songhuo_item_right{
            color: #999;
            font-size: 24rpx;
          }
          .songhuo_btn_item{
            color: $color;
            margin-top: 10rpx;
          }
          }
          
        }
      }
    }
  }
</style>