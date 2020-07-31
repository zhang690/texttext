<template>
  <view class="qilecai_detail">
    <view class="qilecai_detail_wrap">
      <view class="qilecai_detail_item" v-for="item in qicai" :key="item.ID">
        <view class="qilecai_detail_header">
          <view class="qilecai_detail_title">
            <text>第{{item.PeriodsNumber}}期</text>
          </view>
          <view class="content_text black">
            <text>{{item.PrizeTime}}</text>
          </view>
        </view>
        <view class="qilecai_item_content">
          <view class="content_qiu">
            <view class="qiu-wrap">
              <text class="qiu_num" v-for="red in item.RedBall" :key="red">{{red}}</text>
            </view>
          </view>
          <navigator :url="item.codeUrl" class="qilecai_btn">去短信选号</navigator>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import common from "../../common/common";
var _self;
export default {
  data() {
    return {
      num: 3,
      qicai: []
    };
  },
  onLoad() {
    _self = this;
    _self.getQicai();
  },
  methods: {
    getQicai() {
      common.request({
        path: "Development/getpage",
        // method:'POST',
        data: {
          rows: 5,
          page: 1,
          sidx: "PrizeTime",
          sord: "desc",
          caizhongid: "3"
        },
        success: res => {
          res.data.rows.forEach(elem => {
            elem.RedBall = elem.RedBall.split(",");
            elem.codeUrl = "../selectCode/selectCodeqicai";
          });
          _self.qicai = res.data.rows;
          console.log(_self.qicai);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.qilecai_detail {
  background-color: #f6f6f6;
  height: 100vh;
  .qilecai_detail_wrap {
    margin-top: 30rpx;

    .qilecai_detail_item {
      margin-top: 20rpx;
      background-color: #fff;
      .qilecai_detail_header {
        display: flex;
        padding-left: 15rpx;
        align-items: center;
        .qilecai_detail_title {
          border-left: 10rpx solid $color;
          font-size: 34rpx;
          font-weight: bolder;
          letter-spacing: 2rpx;
          text {
            margin-left: 15rpx;
          }
        }
        .content_text {
          font-size: 26rpx;
          margin-left: 15rpx;
          text {
            margin-left: 8rpx;
          }
        }
      }
      .qilecai_item_content {
        margin-top: 25rpx;
        padding: 0 10rpx;
        .content_qiu {
          display: flex;
          align-items: center;
          margin-top: 20rpx;
          .qiu-wrap {
            display: flex;
            .qiu_num {
              width: 55rpx;
              height: 55rpx;
              background-color: $color;
              border-radius: 50%;
              display: flex;
              color: #fff;
              justify-content: center;
              align-items: center;
              margin-left: 10rpx;
            }
          }
        }
        .qilecai_btn {
          font-size: 26rpx;
          text-align: center;
          padding: 15rpx 0;
          border-top: 1rpx solid #eee;
          margin-top: 15rpx;
          color: #999;
        }
      }
    }
  }
}
</style>