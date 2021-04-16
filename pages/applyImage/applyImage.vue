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
					<view class="image_album_box_list" v-for="item in 6" :key="item">
						<text>添加图片</text>
					</view>
				</view>
				<view class="image_album_tip">* 请上传本人的的仙女自拍/网图不通过</view>
			</view>
			<!-- 手机号 -->
			<view class="image_mobile">
				<title title="手机号"></title>
				<input class="image_mobile_phone" type="number" placeholder="输入手机号码" placeholder-style="color: #000;"/>
				<view class="image_code flex flex--align-items--center flex--justify-content--space-between">
					<input type="text" placeholder="填写验证码" placeholder-style="color: #000;"/>
					<view class="image_code_get">获取验证码</view>
				</view>
			</view>
			<!-- 操作 -->
			<view class="image_open flex flex--align-items--center flex--justify-content--space-between">
				<view class="image_open_left">上一步</view>
				<view class="image_open_right">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
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
	}
</style>
