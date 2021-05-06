<template>
	<view class="login flex flex--row">
		<navBar></navBar>
		<view class="login_con flex flex--row flex--align-items--center">
			<view class="login_con_title flex flex--row flex--align-items--center">
				<view>One Ban</view>
				<text>为有趣而生</text>
			</view>
			<button open-type="getUserInfo" @getuserinfo="getUserInfo">微信登录</button>
			<view class="login_con_agreement">
				登录即表明同意 <text @click="agreement(4)">用户协议</text> 和 <text @click="agreement(5)">隐私协议</text> 
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		computed: {
			...mapState(['baseUrl'])
		},
		methods: {
			getUserInfo() {
				let that = this;
				uni.login({
					success(res) {
						uni.getUserInfo({
							async success(user) {
								const parmst = {
									image: user.userInfo.avatarUrl,
									nickname: user.userInfo.nickName,
									code: res.code
								}
								const { data } = await that.$http('/api/member/login',parmst);
								if(data !== ''){
									uni.showToast({
										title: '登录成功',
										icon: 'none',
										success() {
											setTimeout(() => {
												uni.navigateBack({
													delta: 1
												})
											}, 1000)
										}
									})
									uni.setStorageSync('token',data.token)
								}
							}
						})
					}
				})
			},
			agreement(type) {
				uni.navigateTo({
					url: '/pages/agreement/agreement?type=' + type
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.login {
		height: 100%;
		.login_con {
			flex: 1;
			background: #000;
			padding-top: 200rpx;
			.login_con_title {
				color: #fff;
				view {
					font-size: 78rpx;
				}
				text {
					font-size: 22rpx;
				}
			}
			button {
				width: 440rpx;
				height: 89rpx;
				line-height: 89rpx;
				background: #0AAFB9;
				font-size: 36rpx;
				color: #fff;
				margin-top: 550rpx;
			}
			.login_con_agreement {
				font-size: 24rpx;
				color: #fff;
				margin-top: 46rpx;
				text {
					color: #0AAFB9;
					margin: 0 10rpx;
				}
			}
		}
	}
</style>
