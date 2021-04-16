<template>
	<view class="apply flex flex--row">
		<navBar></navBar>
		<view class="apply_con">
			<image src="../../static/logo.png" mode=""></image>
			<view class="apply_con_btn">申请成为首席陪玩官</view>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="less" scoped>
	.apply {
		height: 100%;
		.apply_con {
			flex: 1;
			position: relative;
			image {
				width: 100%;
				height: 100%;
			}
			.apply_con_btn {
				width: 588rpx;
				height: 104rpx;
				line-height: 104rpx;
				text-align: center;
				background: #000;
				border-left: 2px solid #4EFFCF;
				border-right: 2px solid #FF4E4E;
				font-size: 28rpx;
				color: #fff;
				border-radius: 52rpx;
				position: absolute;
				bottom: 274rpx;
				left: 50%;
				margin-left: -294rpx;
			}
		}
	}
</style>
