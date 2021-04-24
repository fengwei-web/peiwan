<template>
	<view class="see flex flex--row">
		<navBar></navBar>
		<view class="see_box">
			<!-- 轮播图 -->
			<view class="see_banner">
				<swiper
					class="swiper"
					circular="circular"
					autoplay="autoplay"
					interval="2500"
					@change="swiperChange"
				>
					<swiper-item v-for="item in orderDetail.play_with_list" :key="item">
						<image :src="item.image" mode=""></image>
						<view class="swiper_box">
							<view class="swiper_box_title">{{ item.nickname }}</view>
							<view class="swiper_box_info">168cm / 48kg / 24 / 双子座</view>
							<view class="swiper_box_foot flex flex--align-items--center">
								<view class="swiper_box_foot_left">北京</view>
								<text>·</text>
								<view>朝阳区</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
				<view class="swiper_dots flex flex--align-items--center">{{ current }}<text>/</text>3</view>
			</view>
			<!-- 内容 -->
			<view class="see_box_container">
				<view class="container_title">订单信息</view>
				<view class="container_box">
					<view class="container_box_list flex flex--align-items--center">
						<view class="container_box_list_left">喊TA做什么：</view>
						<view class="container_box_list_right">{{ orderDetail.do }}</view>
					</view>
					<view class="container_box_list flex flex--align-items--center">
						<view class="container_box_list_left">见面地点：</view>
						<view class="container_box_list_right">{{ orderDetail.address }}</view>
					</view>
					<view class="container_box_list flex flex--align-items--center">
						<view class="container_box_list_left">见面时间：</view>
						<view class="container_box_list_right">{{ orderDetail.data }} {{orderDetail.time}}小时</view>
					</view>
					<view class="container_box_list flex flex--align-items--center">
						<view class="container_box_list_left">预计支付的金额：</view>
						<view class="container_box_list_right" style="color: #0AAFB9;">￥{{ orderDetail.price }}</view>
					</view>
					<view class="container_box_foot flex flex--align-items--center flex--justify-content--space-between">
						<view class="container_box_foot_left" @click="returnPrev">返回</view>
						<view class="container_box_foot_right">确认选TA</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 确认支付弹框 -->
		<view class="config_popon" v-if="false">
			<view class="config_popon_head flex flex--align-items--center flex flex--justify-content--space-between">
				<view class="popon_head_title">你需要支付的金额</view>
				<view class="popon_head_price flex flex--align-items--center flex--justify-content--center">
					<text>￥</text>
					800
				</view>
			</view>
			<view class="config_popon_con">
				<view>支付后，TA将会在<text>30分钟内</text>添加你的微信。</view>
				<view>订单进行中有任何问题，请先联系客服！如取消订单，</view>
				<view>金额将<text>原路返回</text>到您的支付账户</view>
			</view>
			<view class="config_popon_foot flex flex--align-items--center flex--justify-content--space-between">
				<view class="popon_foot_left">返回</view>
				<view class="popon_foot_right">确认支付</view>
			</view>
		</view>
		<!-- 支付成功弹框 -->
		<template v-if="false">
			<view class="pay_success flex flex--row flex--align-items--center flex--justify-content--center">
				<view class="pay_success_text">已<text>支付成功</text>，您的订单已经发送给TA</view>
				<view class="pay_success_btn">好的</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 1,
				orderDetail: null
			}
		},
		onLoad(option) {
			this.getOrderDetail(option.orderId)
		},
		methods: {
			// 获取当前轮播下标
			swiperChange(e) {
				this.current = e.detail.current + 1
			},
			// 获取订单详情
			async getOrderDetail(orderId) {
				const { data } = await this.$http('/api/order/info',{
					order_id: orderId
				})
				this.orderDetail = data
			},
			// 返回上一页
			returnPrev() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.see {
		height: 100%;
		.see_box {
			flex: 1;
			overflow: auto;
			.see_banner {
				position: relative;
				swiper {
					height: 846rpx;
					swiper-item {
						height: 100%;
						position: relative;
						image {
							width: 100%;
							height: 100%;
						}
						.swiper_box {
							position: absolute;
							bottom: 42rpx;
							left: 38rpx;
							.swiper_box_title {
								padding: 12rpx 22rpx;
								background: #000;
								text-align: center;
								font-size: 48rpx;
								color: #fff;
							}
							.swiper_box_info {
								font-size: 28rpx;
								color: #fff;
								margin-top: 32rpx;
							}
							.swiper_box_foot {
								margin-top: 10rpx;
								view {
									font-size: 28rpx;
									color: #fff;
								}
								text {
									font-size: 28rpx;
									color: #fff;
									margin: 0 20rpx;
								}
								.swiper_box_foot_left {
									color: #07ACB6;
								}
							}
						}
					}
				}
				.swiper_dots {
					position: absolute;
					top: 40rpx;
					right: 32rpx;
					font-size: 26rpx;
					color: #fff;
					text {
						margin: 0 10rpx;
					}
				}
			}
			
			.see_box_container {
				padding: 40rpx 36rpx 66rpx 36rpx;
				.container_title {
					width: 186rpx;
					height: 46rpx;
					background: #000;
					line-height: 46rpx;
					text-align: center;
					font-size: 28rpx;
					color: #fff;
				}
				.container_box {
					padding: 0 26rpx;
					.container_box_list {
						margin-top: 40rpx;
						.container_box_list_left {
							font-size: 34rpx;
							font-weight: bold;
						}
						.container_box_list_right {
							font-size: 30rpx;
							margin-left: 15rpx;
						}
					}
					.container_box_foot {
						margin-top: 56rpx;
						view {
							width: 300rpx;
							height: 89rpx;
							line-height: 89rpx;
							text-align: center;
							border-radius: 8rpx;
							color: #fff;
							font-size: 36rpx;
						}
						.container_box_foot_left {
							background: #000;
						}
						.container_box_foot_right {
							background: #0AAFB9;
						}
					}
				}
			}
		}
		.config_popon {
			padding: 44rpx 62rpx 67rpx 62rpx;
			background: #fff;
			border-top-left-radius: 50rpx;
			border-top-right-radius: 50rpx;
			box-shadow: 0 -8rpx 144rpx -26rpx rgba(0,0,0,0.50);
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			.config_popon_head {
				.popon_head_title {
					width: 258rpx;
					height: 46rpx;
					background: #000;
					line-height: 46rpx;
					text-align: center;
					font-size: 28rpx;
					color: #fff;
				}
				.popon_head_price {
					width: 300rpx;
					height: 126rpx;
					background: #F8F8F8;
					color: #0AAFB9;
					font-size: 60rpx;
					font-weight: bold;
					text {
						font-size: 30rpx;
						margin-top: 15rpx;
					}
				}
			}
			.config_popon_con {
				margin-top: 48rpx;
				view {
					font-size: 26rpx;
					font-weight: bold;
					margin-top: 10rpx;
					text {
						color: #0AAFB9;
					}
				}
			}
			.config_popon_foot {
				margin-top: 80rpx;
				view {
					width: 300rpx;
					height: 89rpx;
					line-height: 89rpx;
					text-align: center;
					font-size: 36rpx;
					color: #fff;
					border-radius: 8rpx;
				}
				.popon_foot_left {
					background: #000;
				}
				.popon_foot_right {
					background: #0AAFB9;
				}
			}
		}
		.pay_success {
			padding: 0 62rpx 67rpx 62rpx;
			background: #fff;
			border-top-left-radius: 50rpx;
			border-top-right-radius: 50rpx;
			box-shadow: 0 -8rpx 144rpx -26rpx rgba(0,0,0,0.50);
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			.pay_success_text {
				font-size: 28rpx;
				font-weight: bold;
				margin-top: 108rpx;
				text {
					color: #0AAFB9;
				}
			}
			.pay_success_btn {
				width: 300rpx;
				height: 89rpx;
				background: #000;
				border-radius: 8rpx;
				line-height: 89rpx;
				text-align: center;
				font-size: 36rpx;
				color: #fff;
				margin-top: 90rpx;
			}
		}
	}
</style>
