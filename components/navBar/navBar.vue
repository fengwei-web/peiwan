<template>
	<view class="index_head flex flex--row" :style="{ height: navHeight + 'px'}">
		<view :style="{ height: statusBarHeight + 'px' }"></view>
		<view
			class="index_head_con flex flex--align-items--center flex--justify-content--center"
			:style="{ height: navHeightNoBar + 'px' }"
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
				statusBarHeight: 0,
				navHeightNoBar: 0,
				navHeight: 0,
			};
		},
		mounted() {
			let menuButtonObject = wx.getMenuButtonBoundingClientRect();
			wx.getSystemInfo({
				success: res => {
					let statusBarHeight = res.statusBarHeight,
						navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight)*2;//导航高度
					this.navHeight = navHeight;
					this.statusBarHeight = res.statusBarHeight
					this.navHeightNoBar = navHeight - statusBarHeight
				},
				fail(err) {
					console.log(err);
				}
			})
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
		.index_head_con{
			position: relative;
			image {
				width: 56rpx;
				height: 56rpx;
				position: absolute;
				left: 14rpx;
			}
			.index_head_con_title {
				font-size: 32rpx;
				font-weight: bold;
			}
		}
	}
</style>
