<template>
	<view class="playHome flex flex--row">
		<navBar></navBar>
		<view class="playHome_tab flex flex--align-items--center flex--justify-content--center">
			<view class="playHome_tab_list flex flex--align-items--center flex--justify-content--center">
				个人资料
			</view>
			<view class="playHome_tab_list flex flex--align-items--center flex--justify-content--center">
				我要接单
			</view>
		</view>
		<view class="playHome_box">
			<view class="playHome_wrap">
				<view class="playHome_wrap_list">
					
				</view>
			</view>
			<!-- 暂无数据 -->
			<view class="playHome_box_no_list flex flex--justify-content--center">
				<image src="../../static/image/no_order.png" mode=""></image>
			</view>
		</view>
		<!-- 陪玩申请后审核通过 -->
		<view class="playHome_adopt flex flex--row flex--align-items--center">
			<view class="playHome_adopt_list">恭喜，你的<text>申请通过</text></view>
			<view class="playHome_adopt_list">你现在已经是ONE的陪玩担当</view>
			<view class="playHome_adopt_list">可以开始<text>愉快的接单</text>啦</view>
			<view class="playHome_adopt_btn">好的</view>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="less" scoped>
	.playHome {
		height: 100%;
		.playHome_tab {
			height: 134rpx;
			background: #F5F5F6;
			.playHome_tab_list {
				width: 250rpx;
				height: 90rpx;
				background: #fff;
				border-radius: 45rpx;
				&:last-of-type {
					margin-left: 48rpx;
				}
			}
		}
		.playHome_box {
			flex: 1;
			background: #F5F5F6;
			overflow: auto;
			.playHome_box_no_list {
				padding-top: 200rpx;
				image {
					width: 520rpx;
					height: 292rpx;
					padding: 100rpx 50rpx;
					box-sizing: border-box;
				}
			}
		}
		.playHome_adopt {
			padding: 78rpx 0 62rpx 0;
			background: #fff;
			border-top-left-radius: 50rpx;
			border-top-right-radius: 50rpx;
			box-shadow: 0 -8rpx 144rpx -26rpx rgba(0,0,0,0.50);
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			.playHome_adopt_list {
				font-size: 28rpx;
				font-weight: bold;
				margin-top: 10rpx;
				text {
					color: #07ACB6;
				}
			}
			.playHome_adopt_btn {
				width: 334rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background: #000000;
				border-radius: 44rpx;
				font-size: 32rpx;
				color: #fff;
				margin-top: 52rpx;
			}
		}
	}
</style>
