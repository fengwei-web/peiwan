<template>
	<view class="playHome flex flex--row">
		<navBar></navBar>
		<view class="playHome_tab flex flex--align-items--center flex--justify-content--center">
			<view
				class="playHome_tab_list flex flex--align-items--center flex--justify-content--center"
				:class="{ 'active': tabIndex === index }"
				v-for="(item, index) in tabList"
				:key="item.id"
				@click="setTab(index)"
			>
				{{ item.title }}
			</view>
		</view>
		<template v-if="tabIndex === 0">
			<view class="playHome_box">
				<template v-if="playHomeList.length">
					<view class="playHome_wrap">
						<view class="playHome_wrap_list" v-for="item in playHomeList" :key="item.id">
							<template v-if="item.do.length">
								<title title="需要你做"></title>
								<view class="list_one_container flex flex--wrap">
									<view
										class="list_one_container_term"
										v-for="value in item.do"
										:key="value.id"
									>{{ value.title }}</view>
								</view>
							</template>
							
							<title title="见面时间"></title>
							<view class="list_two_container flex flex--align-items--center">
								<view class="list_two_container_date">{{ item.data.split(' ')[0] }}</view>
								<view class="list_two_container_time">{{ item.data.split(' ')[1] }}</view>
								<view class="list_two_container_length">{{ item.time }}小时</view>
							</view>
							<title title="见面地点"></title>
							<view class="list_three_container flex flex--align-items--center flex--justify-content--space-between">
								<image src="../../static/image/xiaoxi.png" mode="widthFix"></image>
								<view class="list_three_container_address">{{ item.address }}</view>
								<view class="list_three_container_num">1人</view>
							</view>
							<title title="下单用户"></title>
							<view class="list_four_container flex flex--align-items--center">
								<image :src="item.image.indexOf('http') !== -1? item.image :baseUrl + item.image" mode="aspectFill" />
								<text>愿意支付</text>
								<view
									class="list_four_container_price flex flex--align-items--center flex--justify-content--center">
									<text>¥</text>
									{{ item.price }}
								</view>
							</view>
							<view
								class="list_btn flex flex--align-items--center flex--justify-content--center"
								@click="myWantOrder(item.id)"
							>
								<text></text>
								我要接单
							</view>
						</view>
					</view>
					<view class="playHome_more flex flex--justify-content--center">— 当前城市暂无更多订单 —</view>
				</template>
				
				<!-- 暂无数据 -->
				<template v-else>
					<view
						class="playHome_box_no_list flex flex--justify-content--center"
					>
						<image src="../../static/image/no_order.png" mode=""></image>
					</view>
				</template>
			</view>
		</template>
		
		<template v-else>
			<view class="playHome_meetWrap">
				<template v-if="playHomeList.length">
					<view class="meetWrap_box">
						<view class="meetWrap_box_list" v-for="item in playReceiving" :key="item.id">
							<view class="meetWrap_box_list_order flex flex--align-items--center flex--justify-content--space-between">
								<title title="订单状态"></title>
								<view class="meetWrap_box_list_order_two">
									{{ item.state | states }}
								</view>
							</view>
							<template v-if="item.do.length">
								<title title="需要你做"></title>
								<view class="list_one_container flex flex--wrap">
									<view
										class="list_one_container_term"
										v-for="value in item.do"
										:key="value.id"
									>{{ value.title }}</view>
								</view>
							</template>
							<title title="见面时间"></title>
							<view class="list_two_container flex flex--align-items--center">
								<view class="list_two_container_date">{{ item.data.split(' ')[0] }}</view>
								<view class="list_two_container_time">{{ item.data.split(' ')[1] }}</view>
								<view class="list_two_container_length">{{ item.time }}小时</view>
							</view>
							<title title="见面地点"></title>
							<view class="list_three_container flex flex--align-items--center flex--justify-content--space-between">
								<image src="../../static/image/xiaoxi.png" mode="widthFix"></image>
								<view class="list_three_container_address">{{ item.address }}</view>
								<view class="list_three_container_num">1人</view>
							</view>
							<title title="下单用户"></title>
							<view class="list_four_container flex flex--align-items--center">
								<image :src="item.image.indexOf('http') !== -1? item.image :baseUrl + item.image" mode="aspectFill"></image>
								<text>愿意支付</text>
								<view
									class="list_four_container_price flex flex--align-items--center flex--justify-content--center">
									<text>¥</text>
									{{ item.price }}
								</view>
							</view>
						</view>
					</view>
				</template>
				
				<!-- 暂无数据 -->
				<template v-else>
					<view
						class="playHome_box_no_list flex flex--justify-content--center"
						v-if="false"
					>
						<image src="../../static/image/no_order.png" mode=""></image>
					</view>
				</template>
			</view>
		</template>
		
		<!-- 底部 -->
		<view class="playHome_foot">
			<view class="playHome_foot_con flex flex--align-items--center">
				<view class="playHome_foot_con_left flex flex--align-items--center flex--justify-content--center">
					<text>当前城市</text>
					<view>北京</view>
				</view>
				<view class="playHome_foot_con_right flex flex--align-items--center flex--justify-content--center">
					<text>正在接单</text>
					<switch :checked="switchShow" color="#000000"></switch>
				</view>
			</view>
		</view>
		<!-- 陪玩申请后审核通过 -->
		<view
			class="playHome_adopt flex flex--row flex--align-items--center"
			v-if="false"
		>
			<view class="playHome_adopt_list">恭喜，你的<text>申请通过</text></view>
			<view class="playHome_adopt_list">你现在已经是ONE的陪玩担当</view>
			<view class="playHome_adopt_list">可以开始<text>愉快的接单</text>啦</view>
			<view class="playHome_adopt_btn">好的</view>
		</view>
		<!-- 点击我要接单之后的弹框 -->
		<view
			class="playHome_meet flex flex--row flex--align-items--center"
			v-if="receivingShow"
		>
			<view class="playHome_meet_list">确认接单后，</view>
			<view class="playHome_meet_list">在<text>我的接单</text>查看订单状态。</view>
			<view class="playHome_meet_btn" @click="confirm">好的</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				switchShow: true,
				receivingShow: false,
				playHomeList: [],
				playReceiving: [],
				tabList: [
					{
						id: 1,
						title: '个人资料'
					},
					{
						id: 2,
						title: '我要接单'
					}
				],
				tabIndex: 0,
				orderId: 1
			}
		},
		onLoad() {
			this.getPlayHome()
		},
		filters: {
			states(item) {
				let str = ''
				switch(item) {
					case 1:
						str = '订单进行中'
					break;
					case 2:
						str = '订单已完成'
					break;
					case 3:
						str = '订单取消中'
					break;
					case 4:
						str = '订单已取消'
					break;
				}
				return str
			}
		},
		computed: {
			...mapState(['baseUrl'])
		},
		methods: {
			// 获取
			async getPlayHome() {
				const { data } = await this.$http('/api/play_with/order_list')
				
				data.data.forEach(v => {
					if(v.play_with_state === 0){
						this.playHomeList.push(v)
					}else {
						this.playReceiving.push(v)
					}
				})
				
			},
			// 我要接单
			myWantOrder(id) {
				this.receivingShow = true
				this.orderId = id
			},
			// 接单确认
			async confirm() {
				let that = this;
				const { data, status } = await this.$http('/api/play_with/receive_order', {
					order_id: this.orderId
				})
				if(status){
					uni.showToast({
						title: '接单成功',
						icon: 'none',
						success() {
							that.receivingShow = false
						}
					})
				}else {
					uni.showToast({
						title: '接单失败',
						icon: 'none'
					})
				}
			},
			// tab切换
			setTab(index) {
				this.tabIndex = index
			}
		}
	}
</script>

<style lang="less" scoped>
	.playHome {
		height: 100%;
		.playHome_tab {
			height: 134rpx;
			background: #F5F5F6;
			.playHome_tab_list {
				width: 250rpx;
				height: 90rpx;
				background: #fff;
				border-radius: 45rpx;
				font-size: 28rpx;
				&:last-of-type {
					margin-left: 48rpx;
				}
				&.active {
					color: #07ACB6;
				}
			}
		}
		.playHome_box {
			flex: 1;
			background: #F5F5F6;
			overflow: auto;
			.playHome_wrap {
				width: 100%;
				padding-bottom: 90rpx;
				.playHome_wrap_list {
					padding: 0 26rpx 156rpx 26rpx;
					background: #fff;
					margin-top: 68rpx;
					position: relative;
					.list_btn {
						width: 250rpx;
						height: 90rpx;
						background: #FFFFFF;
						box-shadow: 0 -8rpx 14rpx -9rpx rgba(0,0,0,0.24);
						border-radius: 46rpx;
						font-size: 28rpx;
						position: absolute;
						bottom: -45rpx;
						left: 50%;
						margin-left: -125rpx;
						text {
							width: 52rpx;
							height: 52rpx;
							background: #07ACB6;
							border-radius: 50%;
							margin-right: 20rpx;
						}
					}
					&:first-of-type {
						margin-top: 0;
					}
				}
			}
			.playHome_more {
				margin-bottom: 50rpx;
				font-size: 20rpx;
				color: #BFBFBF;
			}
			
		}
		.playHome_meetWrap {
			flex: 1;
			background: #F5F5F6;
			overflow: auto;
			.meetWrap_box {
				.meetWrap_box_list {
					background: #fff;
					padding: 0 26rpx 56rpx 26rpx;
					margin-top: 16rpx;
					.meetWrap_box_list_order {
						view {
							width: 442rpx;
							height: 46rpx;
							line-height: 46rpx;
							text-align: center;
							font-size: 26rpx;
							color: #fff;
						}
						.meetWrap_box_list_order_one {
							background: #07ACB6;
						}
						.meetWrap_box_list_order_two {
							background: #8C8C8C;
						}
					}
					&:first-of-type {
						margin-top: 0;
					}
				}
			}
		}
		.playHome_foot {
			height: 150rpx;
			background: #F5F5F6;
			padding: 0 10rpx;
			.playHome_foot_con {
				height: 90rpx;
				background: #FFFFFF;
				box-shadow: 0 -8rpx 14rpx -9rpx rgba(0,0,0,0.24);
				border-radius: 45rpx;
				margin-top: 10rpx;
				.playHome_foot_con_left {
					width: 50%;
					position: relative;
					text {
						font-size: 28rpx;
						color: #2B3039;
					}
					view {
						padding: 6rpx 28rpx;
						background: #000;
						border-radius: 40rpx;
						font-size: 28rpx;
						color: #fff;
						margin-left: 26rpx;
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
				.playHome_foot_con_right {
					width: 50%;
					text {
						font-size: 28rpx;
						color: #2B3039;
					}
					switch {
						color: #000;
						transform: scale(.7,.7);
						margin-left: 10rpx;
					}
				}
			}
		}
		.playHome_adopt {
			padding: 78rpx 0 62rpx 0;
			background: #fff;
			border-top-left-radius: 50rpx;
			border-top-right-radius: 50rpx;
			box-shadow: 0 -8rpx 144rpx -26rpx rgba(0,0,0,0.50);
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			.playHome_adopt_list {
				font-size: 28rpx;
				font-weight: bold;
				margin-top: 10rpx;
				text {
					color: #07ACB6;
				}
			}
			.playHome_adopt_btn {
				width: 334rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background: #000000;
				border-radius: 44rpx;
				font-size: 32rpx;
				color: #fff;
				margin-top: 52rpx;
			}
		}
		.playHome_meet {
			padding: 110rpx 0 62rpx 0;
			background: #FFFFFF;
			box-shadow: 0 -8px 144px -26px rgba(0,0,0,0.50);
			border-radius: 50rpx 50rpx 0 0;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			.playHome_meet_list {
				font-size: 28rpx;
				font-weight: bold;
				text {
					color: #07ACB6;
				}
			}
			.playHome_meet_btn {
				width: 334rpx;
				height: 80rpx;
				background: #000;
				border-radius: 40rpx;
				line-height: 80rpx;
				text-align: center;
				font-size: 32rpx;
				color: #fff;
				margin-top: 64rpx;
			}
		}
		.playHome_box_no_list {
			padding-top: 200rpx;
			image {
				width: 520rpx;
				height: 292rpx;
				padding: 100rpx 50rpx;
				box-sizing: border-box;
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
		.list_four_container {
			image {
				width: 114rpx;
				height: 114rpx;
				border-radius: 50%;
				overflow: hidden;
				margin-left: 40rpx;
			}
			text {
				margin: 0 52rpx 0 68rpx;
			}
			.list_four_container_price {
				width: 270rpx;
				height: 124rpx;
				background: #F8F8F8;
				font-size: 62rpx;
				font-weight: bold;
				text {
					font-size: 32rpx;
					font-weight: normal;
					margin: 15rpx 20rpx 0 0;
				}
			}
		}
	}
</style>
