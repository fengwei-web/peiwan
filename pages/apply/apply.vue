<template>
	<view class="apply flex flex--row">
		<navBar></navBar>
		<view class="apply_con">
			<image :src="baseUrl + back" mode=""></image>
			<view class="apply_con_btn" @click="goApplyOrderReceiver">申请成为首席陪玩官</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				back: ''
			}
		},
		onLoad() {
			this.getBackground()
		},
		computed: {
			...mapState(['baseUrl'])
		},
		methods: {
			// 背景图
			async getBackground() {
				const { data } = await this.$http('/api/system/info',{
					type: 6
				})
				this.back = data.content
			},
			// 进入申请接单师
			goApplyOrderReceiver() {
				uni.navigateTo({
					url: '/pages/applyOrderReceiver/applyOrderReceiver'
				})
			}
		}
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
