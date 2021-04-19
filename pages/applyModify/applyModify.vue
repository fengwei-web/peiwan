<template>
	<view class="modify flex flex--row">
		<navBar></navBar>
		<view class="modify_box flex flex--row flex--align-items--center">
			<!-- 填写基本信息 标题 -->
			<view class="modify_title flex flex--align-items--center flex--justify-content--center">
				<image src="../../static/image/notice.png" mode="" />
				个人资料修改
			</view>
			<!-- 相册 -->
			<view class="modify_album">
				<title title="我的图片"></title>
				<view class="modify_album_box flex flex--wrap">
					<view class="modify_album_box_list flex flex--row flex--align-items--center" v-for="item in 6" :key="item">
						<view class="modify_album_box_list_con">
							<text>添加图片</text>
						</view>
						<view class="modify_album_box_list_del">删除</view>
					</view>
				</view>
				<view class="modify_album_tip">* 请上传本人的的仙女自拍/网图不通过</view>
			</view>
			<!-- 你的生日 -->
			<view class="modify_com">
				<title title="你的生日"></title>
				<view class="modify_com_con flex flex--align-items--center">
					<view class="modify_com_con_left">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view style="width: 100%;">{{ date }}</view>
						</picker>
					</view>
					<view class="modify_com_con_right">星座</view>
				</view>
			</view>
			<!-- 你的身高 -->
			<view class="modify_com">
				<title title="你的身高"></title>
				<view class="modify_com_con flex flex--align-items--center">
					<input class="modify_com_con_left" type="text" value="168" placeholder="请输入您的身高" />
					<view class="modify_com_con_right">cm</view>
				</view>
			</view>
			<!-- 你的体重 -->
			<view class="modify_com">
				<title title="你的体重"></title>
				<view class="modify_com_con flex flex--align-items--center">
					<input class="modify_com_con_left" type="text" value="49" placeholder="请输入您的体重" />
					<view class="modify_com_con_right">kg</view>
				</view>
			</view>
			<!-- 你的职业 -->
			<view class="modify_pation">
				<title title="你的职业"></title>
				<view class="modify_pation_con flex flex--wrap">
					<view class="pation_con_list active" v-for="item in 3" :key="item">学生</view>
					<input
						class="pation_con_list"
						style="background: #07ACB6;"
						type="text"
						placeholder="自定义"
						placeholder-style="color: #fff;"/>
				</view>
			</view>
			<!-- 个人简介 -->
			<view class="modify_text">
				<title title="个人简介"></title>
				<textarea class="text_con" value="" placeholder="请输入你的个人简介，让别人记住你哈。" />
			</view>
			<!-- 底部按钮 -->
			<view class="modify_foot flex flex--align-items--center flex--justify-content--space-between">
				<view class="modify_foot_left">取消</view>
				<view class="modify_foot_right">提交审核</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				date: '2021-04-16'
			}
		},
		methods: {
			// 获取年月日
			bindDateChange(e) {
				this.date = e.target.value
			}
		}
	}
</script>

<style lang="less" scoped>
	.modify {
		height: 100%;
		.modify_box {
			flex: 1;
			overflow: auto;
			padding: 34rpx 22rpx 0 22rpx;
			.modify_title {
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
			.modify_album {
				width: 100%;
				.modify_album_box {
					padding: 44rpx 44rpx 0 44rpx;
					background: #F8F8F8;
					.modify_album_box_list {
						width: 194rpx;
						margin: 0 12rpx 54rpx 0;
						.modify_album_box_list_con {
							width: 100%;
							height: 274rpx;
							line-height: 274rpx;
							text-align: center;
							border: 1px solid #E9E9E9;
							font-size: 28rpx;
						}
						.modify_album_box_list_del {
							width: 100rpx;
							height: 36rpx;
							line-height: 36rpx;
							text-align: center;
							border: 1px solid #07ACB6;
							border-radius: 18rpx;
							font-size: 20rpx;
							color: #07ACB6;
							margin-top: 14rpx;
						}
						&:nth-child(3n+3) {
							margin-right: 0;
						}
					}
				}
				.modify_album_tip {
					text-align: center;
					margin-top: 24rpx;
					font-size: 20rpx;
					color: #07ACB6;
				}
			}
			.modify_com {
				width: 100%;
				.modify_com_con {
					height: 88rpx;
					background: #F8F8F8;
					position: relative;
					view {
						width: 50%;
						text-align: center;
						font-size: 36rpx;
					}
					.modify_com_con_left {
						text-align: center;
						color: #2F2F2F;
					}
					.modify_com_con_right {
						color: #00C2CE;
					}
					&::after {
						content: '';
						width: 2rpx;
						height: 24rpx;
						background: #E5E5E5;
						position: absolute;
						left: 50%;
					}
				}
			}
			.modify_pation {
				width: 100%;
				.modify_pation_con {
					.pation_con_list {
						width: 160rpx;
						height: 62rpx;
						line-height: 62rpx;
						text-align: center;
						background: #F8F8F8;
						font-size: 26rpx;
						margin: 20rpx 20rpx 0 0;
						&:nth-child(4n+4) {
							margin-right: 0;
						}
						&:nth-child(-n+4) {
							margin-top: 0;
						}
						&.active {
							background: #07ACB6;
							color: #fff;
						}
					}
				}
			}
			.modify_text {
				width: 100%;
				.text_con {
					width: 100%;
					height: 232rpx;
					box-sizing: border-box;
					background: #F8F8F8;
					padding: 30rpx;
					font-size: 26rpx;
					color: #060606;
				}
			}
			.modify_foot {
				width: 100%;
				margin: 34rpx 0 46rpx 0;
				view {
					width: 334rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					border-radius: 40rpx;
					font-size: 32rpx;
					color: #fff;
				}
				.modify_foot_left {
					background: #000;
				}
				.modify_foot_right {
					background: #07ACB6;
				}
			}
		}
	}
</style>
