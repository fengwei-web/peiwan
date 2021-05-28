<template>
	<view class="image flex flex--row">
		<navBar></navBar>
		<!-- 内容 -->
		<view class="image_box flex flex--row flex--align-items--center">
			<!-- 填写基本信息 标题 -->
			<view class="image_box_title flex flex--align-items--center flex--justify-content--center">
				<image src="../../static/image/notice.png" mode="" />
				上传照片和手机号
			</view>
			<!-- 相册 -->
			<view class="image_album">
				<title title="相册"></title>
				<view class="image_album_box flex flex--wrap">
					<view
						class="image_album_box_list"
						v-for="(item,index) in imageList"
						:key="index"
						@click="uploadImage(index)"
					>
						<text v-if="item == ''">添加图片</text>
						<image v-else :src="baseUrl + item" mode="aspectFit"></image>
					</view>
				</view>
				<view class="image_album_tip">* 请上传本人的仙女自拍（网图）不通过</view>
			</view>
			<!-- 手机号 -->
			<view class="image_mobile">
				<title title="手机号"></title>
				<input
					class="image_mobile_phone"
					type="number"
					maxlength="11"
					placeholder="输入手机号码"
					placeholder-style="color: #000;"
					v-model="phone"
				/>
				<view class="image_code flex flex--align-items--center flex--justify-content--space-between">
					<input
						type="text"
						placeholder="填写验证码"
						placeholder-style="color: #000;"
						v-model="code"
					/>
					<view v-if="!timeShow" class="image_code_get" @click="getCode">获取验证码</view>
					<view v-else class="image_code_get">{{ time }}s</view>
				</view>
			</view>
			<!-- 操作 -->
			<view class="image_open flex flex--align-items--center flex--justify-content--space-between">
				<view class="image_open_left" @click="returnPrev">上一步</view>
				<view class="image_open_right" @click="setSubmit">提交</view>
			</view>
		</view>
		<!-- 弹出框1 提交审核 -->
		<view
			class="image_one flex flex--row flex--align-items--center flex--justify-content--center"
			v-if="submitShow"
		>
			<view class="image_one_list">
				已经提交审核，审核结果将在<text>24小时</text>后，
			</view>
			<view class="image_one_list">
				以<text>短信的形式</text>通知到你哈~
			</view>
			<view class="image_one_btn" @click="submitShowFalse">好的</view>
		</view>
		<!-- 弹出框2 审核未通过 -->
		<view
			class="image_one flex flex--row flex--align-items--center flex--justify-content--center"
			v-if="false"
		>
			<view class="image_one_list">
				您的审核<text>未通过</text>
			</view>
			<view class="image_one_list">
				不通过原因：<text>使用网图/图片不清晰</text>
			</view>
			<view class="image_one_btn">重新修改</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				params: null,
				time: 60,
				timer: null,
				timeShow: false,
				imageList: ['','','','','',''],
				phone: '',
				code: '',
				submitShow: false
			}
		},
		onLoad(option) {
			this.params = JSON.parse(option.data)
		},
		computed: {
			...mapState(['baseUrl'])
		},
		methods: {
			// 上传图片
			uploadImage(index) {
				let that = this;
				uni.chooseImage({
					count: 1,
					success(res) {
						uni.uploadFile({
							url: that.baseUrl + '/api/member/upload',
							filePath: res.tempFilePaths[0],
							name: 'file',
							success(data) {
								let arr = JSON.parse(data.data)
								that.$set(that.imageList,index,arr.data)
							}
						})
					}
				})
			},
			// 上一步 
			returnPrev() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 获取验证码
			getCode() {
				if(/^1[34578]\d{9}$/.test(this.phone)){
					this.timeShow = true
					this.timer = setInterval(() => {
						--this.time
						this.timeShow = true
					},1000)
					setTimeout(() => {
						clearInterval(this.timer)
						this.time = 60
						this.timeShow = false
					}, 60000)
				}else {
					uni.showToast({
						title: '手机号错误',
						icon: 'none'
					})
				}
			},
			// 提交
			async setSubmit() {
				let that = this
				let images = ''
				images = this.imageList.join(',')
				if(!images){
					uni.showToast({
						title: '请选择图片',
						icon: 'none'
					})
					return
				}
				if(!this.phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				if(!this.code) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return
				}
				this.params.images = images
				this.params.mobile = this.phone
				this.params.code = this.code
				
				this.$store.commit('setApplyData',this.params)
				const { data,status } = await this.$http('/api/play_with/apply',this.params)
				if(status) {
					uni.showToast({
						title: '提交成功',
						icon: 'none',
						success() {
							that.submitShow = true
						}
					})
				}else {
					uni.showToast({
						title: '提交失败',
						icon: 'none'
					})
				}
			},
			submitShowFalse(){
				this.submitShow = false
				uni.reLaunch({
					url: '/pages/tabBar/tabBar'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.image {
		height: 100%;
		.image_box {
			flex: 1;
			overflow: auto;
			padding: 34rpx 22rpx 0 22rpx;
			.image_box_title {
				width: 392rpx;
				height: 94rpx;
				background: #FDFDFD;
				border: 6rpx solid #F3F3F3;
				font-size: 28rpx;
				color: #FF4E4E;
				margin-bottom: 28rpx;
				flex-shrink: 0;
				image {
					width: 80rpx;
					height: 46rpx;
					margin-right: 48rpx;
				}
			}
			.image_album {
				width: 100%;
				.image_album_box {
					padding: 44rpx;
					background: #F8F8F8;
					.image_album_box_list {
						width: 194rpx;
						height: 274rpx;
						line-height: 274rpx;
						text-align: center;
						border: 1px solid #E9E9E9;
						margin: 12rpx 12rpx 0 0;
						font-size: 28rpx;
						&:nth-child(3n+3) {
							margin-right: 0;
						}
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
				.image_album_tip {
					text-align: center;
					margin-top: 24rpx;
					font-size: 20rpx;
					color: #07ACB6;
				}
			}
			.image_mobile {
				width: 100%;
				.image_mobile_phone {
					width: 100%;
					height: 88rpx;
					text-align: center;
					background: #F8F8F8;
					font-size: 28rpx;
				}
				.image_code {
					margin-top: 18rpx;
					input {
						width: 496rpx;
						height: 88rpx;
						text-align: center;
						background: #F8F8F8;
						font-size: 28rpx;
					}
					.image_code_get {
						width: 196rpx;
						height: 88rpx;
						line-height: 88rpx;
						text-align: center;
						background: #F8F8F8;
						font-size: 28rpx;
						color: #07ACB6;
					}
				}
			}
			.image_open {
				width: 100%;
				margin: 38rpx 0 130rpx 0;
				view {
					width: 334rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					border-radius: 40rpx;
					font-size: 32rpx;
					color: #fff;
				}
				.image_open_left {
					background: #000;
				}
				.image_open_right {
					background: #07ACB6;
				}
			}
		}
		.image_one {
			padding: 110rpx 0 62rpx 0;
			background: #FFF;
			box-shadow: 0 -8rpx 144rpx -26rpx rgba(0,0,0,0.50);
			border-radius: 50rpx 50rpx 0 0;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 2;
			.image_one_list {
				font-size: 28rpx;
				font-weight: bold;
				text {
					color: #07ACB6;
				}
			}
			.image_one_btn {
				width: 334rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background: #000;
				border-radius: 40rpx;
				font-size: 32rpx;
				color: #fff;
				margin-top: 64rpx;
			}
		}
	}
</style>
