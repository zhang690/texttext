<template>
  <view class="shuangse_detail">
    <view class="shuangse_detail_wrap">
      <view class="shuangse_detail_item" v-for="item in shuangse" :key="item.ID">
        <view class="shuangse_detail_header">
          <view class="shuangse_detail_title">
            <text>第{{item.PeriodsNumber}}期</text>
          </view>
          <view class="content_text black">
            <text>{{item.PrizeTime}}</text>
          </view>
        </view>
        <view class="shuangse_item_content">
          <view class="content_qiu">
            <view class="qiu-wrap"><text class="qiu_num" v-for="red in item.RedBall" :key="red">{{red}}</text><text class="qiu_num bull-num">{{item.BlueBall}}</text></view>
          </view>
          <navigator :url="item.codeUrl" class="shuangse_btn">    
            去短信选号
          </navigator>
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
      shuangse:[]
    }
  },
  onLoad(){
    _self = this;
    _self.getKaijiang()
  },
  methods: {
    // 获取双色球开奖历史
			getKaijiang() {
				common.request({
					path: "Development/getpage",
					// method:'POST',
					data: {
						rows: 5,
						page: 1,
						sidx: "PrizeTime",
						sord: "desc",
						caizhongid:"1"
					},
					success: res => {
						res.data.rows.forEach(elem => {
							if (elem.RedBall) {
								elem.RedBall = elem.RedBall.split(",");
							}
								elem.codeUrl = "../selectCode/selectCode";
						})
						_self.shuangse = res.data.rows;
						console.log(_self.shuangse);
					}
				});
				
			},
  },
}
</script>
<style lang="scss" scoped>
.shuangse_detail {
  background-color: #f6f6f6;
  height: 100vh;
  .shuangse_detail_wrap {
    margin-top: 30rpx;

    .shuangse_detail_item {
      margin-top: 20rpx;
      background-color: #fff;
      .shuangse_detail_header {
        display: flex;
        padding-left: 15rpx;
        align-items: center;
        .shuangse_detail_title {
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
      .shuangse_item_content {
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
            .bull-num {
              background-color: blue;
            }
          }
        }
        .shuangse_btn {
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