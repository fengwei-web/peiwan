<template>
	<view class="see flex flex--row">
		<navBar></navBar>
		<swiper class="see_box" indicator-dots="true">
			<swiper-item v-for="msg in orderDetail.play_with_list" :key="msg.id">
				<scroll-view scroll-y="true" style="height: 100%;">
					<!-- 轮播图 -->
					<template v-if="orderDetail.play_with_list.length">
						<view class="see_banner">
							<swiper
								class="swiper"
								circular="circular"
								interval="2500"
								@change="swiperChange"
							>
									<swiper-item v-for="item in msg.image" :key="item">
										<image :src="baseUrl + item" mode="aspectFill"></image>
										<view class="swiper_box">
											<view class="swiper_box_title">{{ msg.nickname }}</view>
											<view class="swiper_box_info">{{ msg.height }}cm / {{ msg.weight }}kg / {{ msg.conste || '暂无' }}</view>
											<view class="swiper_box_foot flex flex--align-items--center">
												<view class="swiper_box_foot_left">{{ msg.city !== null? msg.city : '暂无' }}</view>
											</view>
										</view>
									</swiper-item>
							</swiper>
							<view class="swiper_dots flex flex--align-items--center">{{ current }}<text>/</text>{{ msg.image.length }}</view>
						</view>
					</template>
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
								<view class="container_box_list_left">{{ orderDetail.order_state === 2 ? '已' : '预计' }}支付的金额：</view>
								<view class="container_box_list_right" style="color: #0AAFB9;">￥{{ orderDetail.price }}</view>
							</view>
							<view
								class="container_box_foot flex flex--align-items--center flex--justify-content--center">
								<view class="container_box_foot_left" @click="returnPrev">返回</view>
								<template v-if="orderDetail.order_state === 1">
									<view class="container_box_foot_right" @click="comfigChoice(msg.id)">确认选TA</view>
								</template>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 确认支付弹框 -->
		<template v-if="paymentShow">
			<view class="config_popon">
				<view class="config_popon_head flex flex--align-items--center flex flex--justify-content--space-between">
					<view class="popon_head_title">你需要支付的金额</view>
					<view class="popon_head_price flex flex--align-items--center flex--justify-content--center">
						<text>￥</text>
						{{ orderDetail.price }}
					</view>
				</view>
				<view class="config_popon_con">
					<view>支付后，TA将会在<text>订单开始前2小时内</text>添加你的微信。</view>
					<view>订单进行中有任何问题，请先联系客服！如取消订单，</view>
					<view>金额将<text>原路返回</text>到您的支付账户</view>
				</view>
				<view class="config_popon_foot flex flex--align-items--center flex--justify-content--space-between">
					<view class="popon_foot_left" @click="paymentShowReturn">返回</view>
					<view class="popon_foot_right" @click="confirmPayment">确认支付</view>
				</view>
			</view>
		</template>
		
		<!-- 支付成功弹框 -->
		<template v-if="paymentSuccess">
			<view class="pay_success flex flex--row flex--align-items--center flex--justify-content--center">
				<view class="pay_success_text">已<text>支付成功</text>，您的订单已经发送给TA</view>
				<view class="pay_success_btn" @click="paymentSuccess = false">好的</view>
			</view>
		</template>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				current: 1,
				orderDetail: null,
				paymentShow: false,
				paymentSuccess: false,
				id: 1,
				currentId: null
			}
		},
		onLoad(option) {
			this.id = option.orderId
			this.getOrderDetail(option.orderId)
		},
		computed: {
			...mapState(['baseUrl'])
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
				let arr = []
				data.do_arr.forEach(v=> {
					arr.push(v.title)
				})
				data.do = arr.join(',')
				this.orderDetail = data
			},
			// 支付返回
			paymentShowReturn() {
				this.paymentShow = false
			},
			// 返回上一页
			returnPrev() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 确认选她
			async comfigChoice(id) {
				this.currentId = id
				if(this.orderDetail.play_with_list.length){
					this.paymentShow = true
				}
			},
			// 确认支付
			async confirmPayment() {
				let that = this
				if(this.orderDetail.state === 4) {
					uni.showToast({
						title: '已取消的订单不能再次付款',
						icon: 'none'
					})
					return
				}
				const { data: res } = await this.$http('/api/order/define_play_with',{
					member_id: this.currentId,
					order_id: this.id
				})
				const { data } = await this.$http('/api/order/pay',{
					order_sn: this.orderDetail.order_sn
				})
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: data,
					timeStamp: data.timeStamp,
					nonceStr: data.nonceStr,
					package: data.package,
					signType: data.signType,
					paySign: data.paySign,
					success(res) {
						uni.showToast({
							title: '支付成功',
							icon: 'none',
							success() {
								that.paymentShow = false
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 1000)
							}
						})
					},
					fail(err) {
						console.log(err)
					}
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
							margin-left: 20rpx;
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
