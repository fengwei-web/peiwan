<template>
	<view class="detail flex flex--row">
		<navBar></navBar>
		<view class="detail_box flex flex--row flex--align-items--center">
			<!-- 填写基本信息 标题 -->
			<view class="detail_title flex flex--align-items--center flex--justify-content--center">
				<image src="../../static/image/notice.png" mode="" />
				{{ typeText }}
			</view>
			<!-- 内容 -->
			<template v-if="orderData.data.length">
				<block v-for="item in orderData.data" :key="item.id">
					<view class="detail_con">
						<view class="detail_con_head flex flex--align-items--center" @click="goPeiWan(item)">
							<image :src="item.play_with_list[0].image ? item.play_with_list[0].image :'../../static/image/onelogo.png'" mode="aspectFill"/>
							<template v-if="item.little_state == 2">
								<view class="detail_con_head_right">
									<view class="detail_con_head_right_title">
										{{ item.play_with_list[0].nickname? item.play_with_list[0].nickname : '暂无' }}
									</view>
									<view class="detail_con_head_right_desc">
										{{ item.play_with_list[0].height }}cm / {{ item.play_with_list[0].weight }}kg
									</view>
									<view class="detail_con_head_right_address">
										{{ item.play_with_list[0].address? item.play_with_list[0].address : '暂无' }}
									</view>
								</view>
							</template>
							<template v-else>
								<view class="detail_con_head_right_no">正在为您匹配，请等待</view>
							</template>
						</view>
						<title title="喊TA做什么" @click="goPeiWan(item)"></title>
						<view class="list_one_container flex flex--wrap" @click="goPeiWan(item)">
							<view
								class="list_one_container_term"
								v-for="msg in item.do"
								:key="msg"
							>{{msg}}</view>
						</view>
						<title title="见面时间" @click="goPeiWan(item)"></title>
						<view class="list_two_container flex flex--align-items--center" @click="goPeiWan(item)">
							<view class="list_two_container_date">{{ item.data[0] }}</view>
							<view class="list_two_container_time">{{ item.data[1] }}</view>
							<view class="list_two_container_length">{{ item.time }}小时</view>
						</view>
						<title title="见面地点" @click="goPeiWan(item)"></title>
						<view class="list_three_container flex flex--align-items--center flex--justify-content--space-between" @click="goPeiWan(item)">
							<image src="../../static/image/xiaoxi.png" mode="widthFix"></image>
							<view class="list_three_container_address">{{ item.address }}</view>
							<view class="list_three_container_num">1人</view>
						</view>
						<title title="订单金额" @click="goPeiWan(item)"></title>
						<view class="detail_con_price flex flex--align-items--center" @click="goPeiWan(item)">
							<view class="detail_con_price_left">
								{{ item.order_state == 1 ? '待支付' : '已完成支付' }}
							</view>
							<view class="detail_con_price_right">
								<text>¥</text>
								{{ item.price }}
							</view>
						</view>
						<view class="detail_con_foot flex flex--align-items--center flex--justify-content--center">
							<template v-if="item.state === 1">
								<template v-if="item.order_state === 1">
									<!-- 未支付 -->
									<view
										class="detail_con_foot_left"
										@click="cancelShowClick(item.state,item.id,item.order_state)"
									>取消订单</view>
								</template>
								<template v-else>
									<!-- 已支付 -->
									<view
										class="detail_con_foot_left"
										@click="cancelShowClick(item.state,item.id,item.order_state)"
									>取消订单</view>
								</template>
							</template>
							
							<view
								class="detail_con_foot_right"
								v-if="item.state === 1 && item.order_state !== 1"
								@click="confirmShowTrue(item.id)"
							>确认完成</view>
							<view class="detail_con_foot_right" v-if="item.state === 3">取消状态</view>
							<view class="detail_con_foot_right" v-if="item.state === 4">删除订单</view>
						</view>
					</view>
				</block>
			</template>
			<template v-else>
				<view style="font-size: 28rpx; marign-top: 200rpx;">暂无数据</view>
			</template>
		</view>
		
		<!-- 进行中取消 -->
		<template v-if="cancelShow">
			<view class="detail_cancel flex flex--row flex--align-items--center">
				<view class="detail_cancel_list">进行中订单取消，可能会造成<text>订单扣款</text></view>
				<view class="detail_cancel_list">请您在考虑一下</view>
				<view class="detail_cancel_foot flex flex--align-items--center">
					<view class="detail_cancel_foot_left" @click="cancelShowReturn">返回</view>
					<view class="detail_cancel_foot_right" @click="cancelShowComfig">确认取消</view>
				</view>
			</view>
		</template>
		<!-- 进行中确认完成 -->
		<template v-if="confirmShow">
			<view class="detail_cancel flex flex--row flex--align-items--center">
				<view class="detail_cancel_list">确认完成后，<text>订单费用</text>将结算给陪玩官</view>
				<view class="detail_cancel_foot flex flex--align-items--center">
					<view class="detail_cancel_foot_left" @click="confirmShow = false">返回</view>
					<view class="detail_cancel_foot_right" @click="confirmOrder">确认完成</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				orderData: null,
				cancelShow: false,
				confirmShow: false,
				type: 1,
				typeText: '',
				cancelState: 1,
				cancelId: 0,
				cancelOrder: 1,
				confirmId: null
			}
		},
		onLoad(option) {
			switch(option.type){
				case '1':
					this.typeText = '正在进行中'
				break;
				case '2':
					this.typeText = '已完成订单'
				break;
				case '3':
					this.typeText = '取消中订单'
				break;
				case '4':
					this.typeText = '已取消订单'
				break;
			}
			this.type = option.type
			this.getOrederList(option.type)
		},
		computed: {
			...mapState(['baseUrl'])
		},
		methods: {
			// 获取订单列表
			async getOrederList(type) {
				const { data } = await this.$http('/api/order/order_list',{
					state: type
				})
				data.data.forEach(v=>{
					v.do = v.do.split(',')
					v.data = v.data.split(' ')
				})
				this.orderData = data
			},
			// 取消订单显示
			cancelShowClick(state,orderId,orderState) {
				this.cancelState = state
				this.cancelId = orderId
				this.cancelOrder = orderState
				this.cancelShow = true
			},
			// 取消订单返回
			cancelShowReturn() {
				this.cancelShow = false
			},
			// 打开确认弹窗
			confirmShowTrue(id) {
				this.confirmId = id
				this.confirmShow = true
			},
			// 确认订单
			async confirmOrder() {
				const { data,status } = await this.$http('/api/order/order_finish',{
					order_id: this.confirmId
				})
				if(status) {
					uni.showToast({
						title: '确认订单成功',
						icon: 'none'
					})
				}
				this.confirmShow = false
			},
			async cancelShowComfig() {
				let that = this
				if(this.cancelOrder == 1) {
					const { status } = await this.$http('/api/order/cancel_order',{
						order_id: this.cancelId
					})
					if(status) {
						uni.showToast({
							title: '取消成功',
							icon: 'none',
							success() {
								that.cancelShow = false
								that.getOrederList(that.type)
							}
						})
					}else {
						uni.showToast({
							title: '取消失败',
							icon: 'none',
							success() {
								that.cancelShow = false
							}
						})
					}
				}else {
					const { status } = await this.$http('/api/order/cancel_order_pay',{
						order_id: this.cancelId
					})
					if(status) {
						uni.showToast({
							title: '取消成功',
							icon: 'none',
							success() {
								that.cancelShow = false
								that.getOrederList(that.type)
							}
						})
					}else {
						uni.showToast({
							title: '取消失败',
							icon: 'none',
							success() {
								that.cancelShow = false
							}
						})
					}
				}
			},
			// 跳转选择查看陪玩
			goPeiWan(item) {
				if(item.little_state === 1) {
					uni.showToast({
						title: '还没有陪玩接单',
						icon: 'none'
					})
				}else {
					uni.navigateTo({
						url: '/pages/see/see?orderId='+item.id
					})
				}
			}
		}
	}
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
				margin-bottom: 20rpx;
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
