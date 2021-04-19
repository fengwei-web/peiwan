<template>
	<view class="detail flex flex--row">
		<navBar></navBar>
		<view class="detail_box flex flex--row flex--align-items--center">
			<!-- 填写基本信息 标题 -->
			<view class="detail_title flex flex--align-items--center flex--justify-content--center">
				<image src="../../static/image/notice.png" mode="" />
				正在进行中
			</view>
			<!-- 内容 -->
			<view class="detail_con">
				<view class="detail_con_head flex flex--align-items--center">
					<image src="../../static/logo.png" mode="aspectFill"/>
					<template v-if="false">
						<view class="detail_con_head_right">
							<view class="detail_con_head_right_title">一只小草莓</view>
							<view class="detail_con_head_right_desc">168cm / 48kg / 24 / 双子座</view>
							<view class="detail_con_head_right_address">北京  ·  朝阳区</view>
						</view>
					</template>
					<view class="detail_con_head_right_no">正在为您匹配，请等待</view>
				</view>
				<title title="喊TA做什么"></title>
				<view class="list_one_container flex flex--wrap">
					<view
						class="list_one_container_term"
						v-for="item in 6"
						:key="item"
					>干饭干饭</view>
				</view>
				<title title="见面时间"></title>
				<view class="list_two_container flex flex--align-items--center">
					<view class="list_two_container_date">2021-01-26</view>
					<view class="list_two_container_time">16:29</view>
					<view class="list_two_container_length">3小时</view>
				</view>
				<title title="见面地点"></title>
				<view class="list_three_container flex flex--align-items--center flex--justify-content--space-between">
					<image src="../../static/image/xiaoxi.png" mode="widthFix"></image>
					<view class="list_three_container_address">16:29</view>
					<view class="list_three_container_num">3人</view>
				</view>
				<title title="订单金额"></title>
				<view class="detail_con_price flex flex--align-items--center">
					<view class="detail_con_price_left">
						已完成支付
					</view>
					<view class="detail_con_price_right">
						<text>¥</text>
						500
					</view>
				</view>
				<view class="detail_con_foot flex flex--align-items--center flex--justify-content--center">
					<view class="detail_con_foot_left">取消订单</view>
					<view class="detail_con_foot_right">确认完成</view>
					<view class="detail_con_foot_right">取消状态</view>
					<view class="detail_con_foot_right">删除订单</view>
				</view>
			</view>
		</view>
		
		<!-- 进行中取消 -->
		<template v-if="false">
			<view class="detail_cancel flex flex--row flex--align-items--center">
				<view class="detail_cancel_list">进行中订单取消，可能会造成<text>订单扣款</text></view>
				<view class="detail_cancel_list">请您在考虑一下</view>
				<view class="detail_cancel_foot flex flex--align-items--center">
					<view class="detail_cancel_foot_left">返回</view>
					<view class="detail_cancel_foot_right">确认取消</view>
				</view>
			</view>
		</template>
		<!-- 进行中确认完成 -->
		<template v-if="true">
			<view class="detail_cancel flex flex--row flex--align-items--center">
				<view class="detail_cancel_list">确认完成后，<text>订单费用</text>将结算给陪玩官</view>
				<view class="detail_cancel_foot flex flex--align-items--center">
					<view class="detail_cancel_foot_left">返回</view>
					<view class="detail_cancel_foot_right">确认完成</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	.detail {
		height: 100%;
		.detail_box {
			flex: 1;
			padding-top: 34rpx;
			background: #F5F5F6;
			overflow: auto;
			.detail_title {
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
			.detail_con {
				width: 100%;
				background: #fff;
				padding: 0 22rpx;
				box-sizing: border-box;
				.detail_con_head {
					padding: 56rpx 0;
					image {
						width: 186rpx;
						height: 186rpx;
						border-radius: 50%;
					}
					.detail_con_head_right_no {
						flex: 1;
						padding-left: 60rpx;
						font-size: 42rpx;
						font-weight: bold;
					}
					.detail_con_head_right {
						flex: 1;
						padding-left: 60rpx;
						.detail_con_head_right_title {
							font-size: 48rpx;
							font-weight: bold;
						}
						.detail_con_head_right_desc,.detail_con_head_right_address {
							font-size: 28rpx;
							margin-top: 16rpx;
						}
					}
				}
				.list_one_container {
					.list_one_container_term {
						width: 200rpx;
						height: 62rpx;
						line-height: 62rpx;
						text-align: center;
						background: #F8F8F8;
						font-size: 26rpx;
						margin: 20rpx 42rpx 0 0;
						&:nth-child(3n+3) {
							margin-right: 0;
						}
						&:nth-child(-n+3) {
							margin-top: 0;
						}
					}
				}
				.list_two_container {
					.list_two_container_date {
						flex: 1.5;
						text-align: center;
						font-size: 36rpx;
					}
					.list_two_container_time {
						width: 218rpx;
						text-align: center;
						position: relative;
						font-size: 36rpx;
						color: #00C2CE;
						&::before {
							content: '';
							width: 4rpx;
							height: 24rpx;
							background: #E5E5E5;
							position: absolute;
							left: 0;
							top: 50%;
							margin-top: -12rpx;
						}
						&::after {
							content: '';
							width: 4rpx;
							height: 24rpx;
							background: #E5E5E5;
							position: absolute;
							right: 0;
							top: 50%;
							margin-top: -12rpx;
						}
					}
					.list_two_container_length {
						flex: 1;
						text-align: center;
						font-size: 36rpx;
					}
				}
				.list_three_container {
					image {
						width: 48rpx;
					}
					.list_three_container_address {
						width: 456rpx;
						height: 80rpx;
						background: #F8F8F8;
						line-height: 80rpx;
						text-align: center;
						font-size: 32rpx;
					}
					.list_three_container_num {
						width: 125rpx;
						height: 80rpx;
						background: #F8F8F8;
						line-height: 80rpx;
						text-align: center;
					}
				}
				.detail_con_price {
					width: 100%;
					height: 124rpx;
					background: #F8F8F8;
					view {
						width: 50%;
						height: 100%;
						line-height: 124rpx;
						text-align: center;
					}
					.detail_con_price_left {
						font-size: 32rpx;
					}
					.detail_con_price_right {
						font-size: 62rpx;
						color: #07ACB6;
						text {
							font-size: 32rpx;
							margin: 15rpx 10rpx 0 0;
						}
					}
				}
				.detail_con_foot {
					margin: 40rpx 0;
					view {
						width: 186rpx;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						font-size: 28rpx;
						color: #fff;
					}
					.detail_con_foot_left {
						background: #000;
					}
					.detail_con_foot_right {
						background: #0AAFB9;
						margin-left: 70rpx;
					}
				}
			}
		}
		.detail_cancel {
			padding: 108rpx 0 66rpx 0;
			background: #fff;
			box-shadow: 0 -8rpx 144rpx -26rpx rgba(0,0,0,0.50);
			border-radius: 50rpx 50rpx 0 0;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			.detail_cancel_list {
				font-size: 28rpx;
				font-weight: bold;
				text {
					color: #00C2CE;
				}
			}
			.detail_cancel_foot {
				margin-top: 50rpx;
				view {
					width: 300rpx;
					height: 90rpx;
					line-height: 90rpx;
					text-align: center;
					border-radius: 8rpx;
					font-size: 32rpx;
					color: #fff;
				}
				.detail_cancel_foot_left {
					background: #000;
				}
				.detail_cancel_foot_right {
					background: #0AAFB9;
					margin-left: 12rpx;
				}
			}
		}
	}
</style>
