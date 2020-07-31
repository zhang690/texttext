<template>
	<view class="duihuan">
		<view class="duihuan-wrap">
			<view class="duihuan-item" v-for="(item,index) in duihuanList" :key="index">

					<view class="duihuan-icon">
						<image mode="widthFix" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1280325423,1024589167&fm=26&gp=0.jpg"></image>
					</view>
					<view class="duihuan-info"> 
						<view class="info-title">{{item.list[0].ProductName}}</view>
						<view class="info-text">{{item.orde.AddTime}}</view>
					</view>
	
				<view class="duihuan-right">
					待完成 <text class="iconfont icon-iconfontjiantou5"></text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import common from '../../common/common'
var _self;
	export default {
    data() {
      return {
        duihuanList:[]
      }
    },
    onLoad(){
      _self = this;
      _self.handleList();
    },
    methods: {
      handleList(){
        let {ID} = uni.getStorageSync("userinfo");
        common.request({
					path: "Order/getpage",
					data: {
						memerid: ID,
            // orderstate:"",
            product:"jifen",
						rows: 5,
						page: 1,
						sidx: "",
						sord: ""
          },
          success:res=>{
            _self.duihuanList = res.data.rows
            console.log(res);
          }
        })
      }
    },
	}
</script>
<style lang="scss" scoped>
	.duihuan {
		.duihuan-wrap {
			.duihuan-item {
        display: flex;
        border-bottom: 1rpx solid #ddd;
        padding: 20rpx;
        align-items: center;
          .duihuan-icon{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            image{
              width: 80rpx;
              height: 80rpx;
              border-radius: 50%;
            }
          }
          .duihuan-info{
            flex: 3;
            margin-left: 20rpx;
            .info-title{

            }
            .info-text{
              font-size: 24rpx;
              color: #999;
            }
          }
        
        .duihuan-right{
          flex: 1;
          color: #666;
        }
      }
		}
	}
</style>
