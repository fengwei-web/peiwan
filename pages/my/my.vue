<template>
	<view class="my">
		<!-- 头部 头像 昵称 -->
		<view class="my_head flex flex--align-items--center">
			<image :src="userInfo.image" mode="" />
			<text>{{ userInfo.nickname }}</text>
		</view>
		<!-- 我的订单 -->
		<view class="my_order">
			<view class="my_order_title">我的订单</view>
			<view class="my_order_box flex flex--align-items--center flex--justify-content--space-around">
				<block v-for="item in orderTabList" :key="item.id">
					<view
						class="my_order_box_list flex flex--row flex--align-items--center"
						@click="goOrder(item.id)"
					>
						<text>1</text>
						<view>{{ item.title }}</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 菜单-操作 -->
		<view class="my_box">
			<block v-for="(item, index) in boxList" :key="item.id">
				<view
					class="my_box_list flex flex--align-items--center"
					@click="menuOpen(item.id)"
				>
					<image :src="item.src" mode=""></image>
					<view class="my_box_list_cen">
						<view class="my_box_list_cen_top">{{ item.title }}</view>
						<view class="my_box_list_cen_bot">{{ item.desc }}</view>
					</view>
					<text>0</text>
				</view>
			</block>
		</view>
		<!-- 添加微信 -->
		<template v-if="addPersonalWeixin">
			<view class="my_addWx flex flex--row flex--align-items--center">
				<view class="my_addWx_title">请提交微信号和微信二维码</view>
				<view class="my_addWx_desc">当您下单完成时，陪玩官将需要通过您本次添加的微信号和微信二维码来完成您的订单任务。</view>
				<input type="text" v-model="weixinNumber" placeholder="请输入微信号">
				<view
					class="my_addWx_code flex flex--align-items--center flex--justify-content--center"
					@click="clickWeixinCode"
				>
					<text v-if="!codeImageData">点击添加微信二维码</text>
					<image v-else :src="baseUrl + codeImageData" mode=""></image>
				</view>
				<view class="my_addWx_foot flex flex--align-items--center flex--justify-content--space-between">
					<view class="my_addWx_foot_left" @click="$emit('returnMy',1)">返回</view>
					<view class="my_addWx_foot_right" @click="preservation">保存</view>
				</view>
			</view>
		</template>
		<!-- 添加客服 -->
		<template v-if="addServWeixin">
			<view class="my_kf">
				<view class="my_kf_head flex flex--align-items--center flex--justify-content--space-between">
					<view class="my_kf_head_title">客服微信号</view>
					<text class="my_kf_head_code">{{ wxCode }}</text>
					<view class="my_kf_head_btn" @click="oneKeyCopy">一键复制</view>
				</view>
				<view class="my_kf_code flex flex--align-items--center flex--justify-content--center">
					<image :src="baseUrl + codeImage" mode=""></image>
				</view>
				<view class="my_kf_foot flex flex--align-items--center flex--justify-content--space-between">
					<view class="my_kf_foot_left" @click="$emit('returnMy',2)">返回</view>
					<view class="my_kf_foot_right" @click="preseCode">保存二维码</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'my',
		props: {
			addServWeixin: {
				type: Boolean
			},
			addPersonalWeixin: {
				type: Boolean
			},
			codeImage: {
				type: String
			},
			wxCode: {
				type: String
			},
			userInfo: {
				type: Object
			}
		},
		data() {
			return {
				boxList: [
					{
						id: 1,
						src: '../../static/image/wx.png',
						title: '添加微信',
						desc: '完善资料，让陪玩官更准确效率的找到你'
					},
					{
						id: 2,
						src: '../../static/image/kf.png',
						title: '我的客服',
						desc: '24小时在线解决所有问题'
					},
					{
						id: 3,
						src: '../../static/image/fx.png',
						title: '分享给好友',
						desc: '也许你的朋友，也刚好需要'
					}
				],
				orderTabList: [
					{
						id: 1,
						title: '进行中'
					},
					{
						id: 2,
						title: '已完成'
					},
					{
						id: 3,
						title: '取消中'
					},
					{
						id: 4,
						title: '已取消'
					}
				],
				weixinNumber: '',
				codeImageData: '',
				myCode: ''
			}
		},
		computed: {
			...mapState(['baseUrl'])
		},
		methods: {
			// 进入订单
			goOrder(id) {
				uni.navigateTo({
					url: '/pages/orderDetail/orderDetail?type=' + id
				})
			},
			// 一键复制
			oneKeyCopy() {
				let that = this
				uni.setClipboardData({
					data: this.wxCode,
					success() {
						uni.showToast({
							title: '复制成功',
							icon: 'none'
						})
					}
				})
			},
			// 保存二维码
			preseCode() {
				let that = this;
				uni.getSetting({
					success(res) {
						let data = res.authSetting['scope.writePhotosAlbum']
						if (data) { return }
						uni.authorize({
							scope: 'scope.writePhotosAlbum',
							success() {
								uni.downloadFile({
									url: 'http://139.159.148.119' + that.codeImage,
									success(val) {
										uni.saveImageToPhotosAlbum({
											filePath: val.tempFilePath,
											success() {
												uni.showToast({
													title: "保存成功",
													duration: 2000
												})
											}
										})
									}
								})
							},
							fail(err) {
								console.log(err)
								uni.showToast({
									title: '您没有开启相册权限',
									icon: 'none'
								})
							}
						})
					}
				})
			},
			menuOpen(id) {
				switch(id) {
					case 1:
						this.$emit('openAddPersonalWeixin')
					break;
					case 2:
						this.$emit('openAddKuWeixin')
					break;
					case 3:
					console.log('分享')
					break;
				}
			},
			// 点击上传二维码
			clickWeixinCode() {
				let that = this;
				uni.chooseImage({
					count: 1,
					success(res) {
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: that.baseUrl + '/api/member/upload',
							name: 'file',
							filePath: tempFilePaths[0],
							fileType: 'image',
							async success(res) {
								that.myCode = JSON.parse(res.data).data
								const { data } = await that.$http('/api/system/info',{
									type: 2
								})
								that.codeImageData = data.content
							}
						})
						// const { data } = await this.$http
					}
				});
			},
			// 添加微信
			async preservation() {
				let that = this
				if(!this.weixinNumber){
					uni.showToast({
						title: '请输入微信号',
						icon: 'none'
					})
					return
				}
				if(!this.myCode){
					uni.showToast({
						title: '请添加二维码',
						icon: 'none'
					})
					return
				}
				const { status } = await this.$http('/api/member/wx_info',{
					wx_num: this.weixinNumber,
					wx_image: this.myCode
				})
				if(status){
					uni.showToast({
						title: '添加成功',
						icon: 'none',
						success() {
							that.$emit('returnMy',1)
						}
					})
				}
			}
		}
	}
</script>

<style lang="less">
	
	.my {
		height: 100%;
		background: #F8FAFF;
		padding: 12rpx 18rpx 0 18rpx;
		box-sizing: border-box;
		.my_head {
			height: 176rpx;
			background: #fff;
			padding: 0 20rpx;
			image {
				width: 136rpx;
				height: 136rpx;
				border-radius: 50%;
			}
			text {
				margin-left: 46rpx;
				font-size: 48rpx;
				font-weight: bold;
			}
		}
		.my_order {
			background: #fff;
			margin-top: 16rpx;
			padding: 22rpx 20rpx 52rpx 20rpx;
			.my_order_title {
				width: 186rpx;
				height: 46rpx;
				background: #000;
				line-height: 46rpx;
				text-align: center;
				font-size: 28rpx;
				color: #fff;
			}
			.my_order_box {
				margin-top: 52rpx;
				.my_order_box_list {
					text {
						font-size: 48rpx;
					}
					view {
						height: 44rpx;
						padding: 0 15rpx;
						line-height: 44rpx;
						text-align: center;
						background: #f8f8f8;
						font-size: 28rpx;
						margin-top: 38rpx;
					}
				}
			}
		}
		.my_box {
			width: 100%;
			.my_box_list {
				padding: 34rpx 46rpx;
				background: #fff;
				margin-top: 16rpx;
				image {
					width: 82rpx;
					height: 82rpx;
				}
				.my_box_list_cen {
					flex: 1;
					padding-left: 48rpx;
					.my_box_list_cen_top {
						font-size: 32rpx;
						color: #2B3039;
					}
					.my_box_list_cen_bot {
						font-size: 20rpx;
						color: #D7D7D7;
					}
				}
				text {
					font-size: 28rpx;
					color: #BFBFBF;
				}
			}
		}
		.my_addWx {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			padding: 98rpx 70rpx 66rpx 70rpx;
			box-sizing: border-box;
			background: #fff;
			box-shadow: 0 -16rpx 288rpx -52rpx rgba(0,0,0,0.50);
			border-radius: 50rpx 50rpx 0 0;
			.my_addWx_title {
				padding: 5rpx 82rpx;
				background: #000;
				font-size: 28rpx;
				color: #fff;
			}
			.my_addWx_desc {
				width: 530rpx;
				font-size: 24rpx;
				color: #7B7B7B;
				margin-top: 32rpx;
			}
			input {
				text-align: center;
				font-size: 28rpx;
				color: #0AAFB9;
				margin-top: 36rpx;
			}
			.my_addWx_code {
				width: 530rpx;
				height: 290rpx;
				background: #F7F7F7;
				border-radius: 20rpx;
				margin: 64rpx 0;
				text {
					font-size: 28rpx;
				}
				image {
					width: 260rpx;
					height: 260rpx;
				}
			}
			.my_addWx_foot {
				width: 100%;
				view {
					width: 300rpx;
					height: 89rpx;
					line-height: 89rpx;
					text-align: center;
					font-size: 36rpx;
					color: #fff;
					border-radius: 8rpx;
				}
				.my_addWx_foot_left {
					background: #000;
				}
				.my_addWx_foot_right {
					background: #0AAFB9;
				}
			}
		}
		.my_kf {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			padding: 86rpx 70rpx 68rpx 70rpx;
			box-sizing: border-box;
			background: #fff;
			box-shadow: 0 -16rpx 288rpx -52rpx rgba(0,0,0,0.50);
			border-radius: 50rpx 50rpx 0 0;
			.my_kf_head {
				.my_kf_head_title {
					padding: 5rpx 32rpx;
					background: #000;
					font-size: 28rpx;
					color: #fff;
				}
				.my_kf_head_code {
					flex: 1;
					padding: 0 20rpx;
					box-sizing: border-box;
					text-align: center;
					font-size: 28rpx;
					color: #07ACB6;
					overflow: hidden;
					white-space: normal;
					text-overflow: ellipsis;
				}
				.my_kf_head_btn {
					width: 156rpx;
					height: 54rpx;
					line-height: 54rpx;
					text-align: center;
					border: 1px solid #000;
					font-size: 28rpx;
					color: #242424;
				}
			}
			.my_kf_code {
				width: 100%;
				height: 474rpx;
				background: #F7F7F7;
				border-radius: 20rpx;
				margin-top: 48rpx;
				image {
					width: 400rpx;
					height: 400rpx;
				}
			}
			.my_kf_foot {
				width: 100%;
				margin-top: 66rpx;
				view {
					width: 300rpx;
					height: 89rpx;
					line-height: 89rpx;
					text-align: center;
					font-size: 36rpx;
					color: #fff;
					border-radius: 8rpx;
				}
				.my_kf_foot_left {
					background: #000;
				}
				.my_kf_foot_right {
					background: #0AAFB9;
				}
			}
		}
	}
</style>
