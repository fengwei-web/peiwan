<template>
	<view class="agreement flex flex--row">
		<navBar></navBar>
		<view class="agreement_title">{{ datas.title }}</view>
		<rich-text :nodes="datas.content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datas: null
			}
		},
		onLoad(option) {
			console.log(option)
			this.getAgreement(option.type)
		},
		methods: {
			async getAgreement(type) {
				const { data } = await this.$http('/api/system/info', {type})
				this.datas = data
			}
		}
	}
</script>

<style lang="less" scoped>
	.agreement {
		padding: 0 30rpx;
		.agreement_title {
			text-align: center;
			font-size: 32rpx;
			font-weight: bold;
			padding: 0 20rpx;
		}
	}
</style>
