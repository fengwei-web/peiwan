<template>
	<view class="index_head flex flex--row">
		<view class="status_bar"></view>
		<view
			class="index_head_con flex flex--align-items--center flex--justify-content--center"
			@click="returnPrev"
		>
			<image src="../../static/image/return.png" mode=""></image>
			<text class="index_head_con_title">OneBan</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			returnPrev() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="less">
	.index_head {
		height: 144rpx;
		flex-shrink: 0;
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}
		.index_head_con{
			flex: 1;
			position: relative;
			image {
				width: 56rpx;
				height: 56rpx;
				position: absolute;
				left: 14rpx;
			}
			.index_head_con_title {
				font-size: 22rpx;
			}
		}
	}
</style>
