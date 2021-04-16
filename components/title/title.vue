<template>
	<view class="title">{{ title }}</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="less">
	.title {
		display: inline-block;
		padding: 4rpx 41rpx;
		background: #000;
		font-size: 28rpx;
		color: #fff;
		margin: 28rpx 0;
	}
</style>
