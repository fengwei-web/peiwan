<template>
	<view class="index">
		<!-- 轮播图 -->
		<view class="index_banner">
			<!-- 轮播 -->
			<swiper
				class="swiper"
				indicator-dots="indicatorDots"
				autoplay="autoplay"
				circular="circular"
				interval="2500"
			>
				<swiper-item v-for="item in swiperList" :key="item.id">
					<image :src="'http://139.159.148.119' +item.image" mode=""></image>
				</swiper-item>
			</swiper>
			<!-- 公告 -->
			<view class="index_notice flex flex--align-items--center">
				<image src="../../static/image/notice.png" mode=""></image>
				<text>附近 182 陪玩在线</text>
			</view>
		</view>
		<!-- 第一部分 -->
		<view class="index_box">
			<!-- 标题 -->
			<view class="index_box_head flex flex--align-items--center flex--justify-content--space-between">
				<view class="index_box_title">喊TA做什么</view>
				<view class="index_box_desc"></view>
			</view>
			<!-- 内容 -->
			<view class="index_box_con flex flex--wrap">
				<view
					v-for="(item,index) in labelList"
					:key="item.id"
					class="index_box_con_list"
					:class="{'index_box_con_list_active': item.isShow}"
					@click="setCheckbox(index)"
				>{{ item.title }}</view>
			</view>
		</view>
		<!-- 第二部分 -->
		<view class="index_box">
			<!-- 标题 -->
			<view class="index_box_head flex flex--align-items--center flex--justify-content--space-between">
				<view class="index_box_title">见面时间</view>
				<view class="index_box_desc">* 见面时间为约定对方的时间，请按照行程合理选择</view>
			</view>
			<!-- 内容 -->
			<view class="index_box_time flex flex--align-items--center">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="index_box_time_date">{{ date }}</view>
				</picker>
				<picker mode="time" :value="time" @change="bindTimeChange">
					<view class="index_box_time_what">{{ time }}</view>
				</picker>
				<picker mode="selector" :range="hourArray" @change="bindHourChange">
					<view class="index_box_time_hour">{{ hour }}小时</view>
				</picker>
			</view>
		</view>
		<!-- 第三部分 -->
		<view class="index_box">
			<!-- 标题 -->
			<view class="index_box_head flex flex--align-items--center flex--justify-content--space-between">
				<view class="index_box_title">见面地点</view>
				<view class="index_box_desc">* 该任务将匹配同一状态的用户，请认真选择，提高匹配率</view>
			</view>
			<!-- 内容 -->
			<view class="index_box_time flex flex--align-items--center flex--justify-content--space-between">
				<image class="index_box_time_pic" src="../../static/image/xiaoxi.png" mode=""></image>
				<picker mode="region" @change="bindCityChange">
					<view class="index_box_time_address">{{ cityText }}</view>
				</picker>
				<text class="index_box_time_number">1人</text>
			</view>
		</view>
		<!-- 第四部分 -->
		<view class="index_box">
			<!-- 标题 -->
			<view class="index_box_head flex flex--align-items--center flex--justify-content--space-between">
				<view class="index_box_title">预计支付金额</view>
				<view class="index_box_desc"></view>
			</view>
			<!-- 内容 -->
			<view class="index_box_con flex flex--wrap">
				<view
					class="index_box_con_list"
					:class="{'index_box_con_list_active': index == doWhatIndex}"
					v-for="(item,index) in 3"
					:key="index"
					@click="choiceDoWhat(index)"
				>1200</view>
				<view class="index_box_con_list">
					<input class="index_box_con_list_active" type="text" value="自定义" />
				</view>
			</view>
		</view>
		<!-- 发布按钮 -->
		<view class="index_btn">发布订单</view>
		<!-- 弹出框1 -->
		<template v-if="false">
			<view class="index_one">
				<view class="index_one_title">下单必填</view>
				<view class="index_one_con">需要先添加<text>微信</text>，才能和Ta愉快的玩耍</view>
				<view class="index_one_foot flex flex--align-items--center flex--justify-content--space-between">
					<view class="index_one_foot_left">不需要</view>
					<view class="index_one_foot_right">去添加微信</view>
				</view>
			</view>
		</template>
		
		<!-- 弹出框2 -->
		<template v-if="false">
			<view class="index_one" >
				<view class="index_one_con">订单已经发布，请到<text>我的订单</text>查看订单</view>
				<view class="index_one_foot flex flex--align-items--center flex--justify-content--space-between">
					<view class="index_one_foot_left">好的</view>
					<view class="index_one_foot_right">我的订单</view>
				</view>
			</view>
		</template>
		
		<!-- 弹出框3 -->
		<template v-if="false">
			<view class="index_two">
				<view class="index_two_title">订单信息</view>
				<view class="index_two_box">
					<view class="index_two_box_list">
						<view class="index_two_box_list_title">喊TA做什么：</view>
						<view class="index_two_box_list_desc">摄影、海底捞、王者荣耀</view>
					</view>
					<view class="index_two_box_list">
						<view class="index_two_box_list_title">喊TA做什么：</view>
						<view class="index_two_box_list_desc">摄影、海底捞、王者荣耀</view>
					</view>
					<view class="index_two_box_list">
						<view class="index_two_box_list_title">喊TA做什么：</view>
						<view class="index_two_box_list_desc">摄影、海底捞、王者荣耀</view>
					</view>
				</view>
				<view class="index_two_price">
					预计支付的金额：
					<text>￥800</text>
				</view>
				<view class="index_two_foot flex flex--align-items--center flex--justify-content--space-between">
					<view class="index_two_foot_left">我再想想</view>
					<view class="index_two_foot_right">我要发布</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		name: 'index',
		props: {
			swiperList: {
				type: Array
			},
			labelList: {
				type: Array
			}
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				doWhatIndex: 0,
				date: new Date().toLocaleDateString().split('/').join('-'),
				time: '请选择时间',
				hourArray: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
				hour: '0',
				cityText: ''
			}
		},
		onLoad() {
			
		},
		computed: {
			startDate() {
			  return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			// 选择做什么
			setCheckbox(index) {
				let labelList = this.labelList;
				labelList[index].isShow = !labelList[index].isShow
				this.$emit('setLabel',labelList);
			},
			// 选择支付金额
			choiceDoWhat(index) {
				this.doWhatIndex = index
			},
			// 选择日期
			bindDateChange(e) {
				this.date = e.target.value
			},
			// 选择时间
			bindTimeChange(e) {
				this.time = e.detail.value
			},
			// 选择小时
			bindHourChange(e) {
				this.hour = e.detail.value
			},
			// 选择地区
			bindCityChange(e) {
				this.cityText = e.detail.value.join('')
			},
			// 日期选择器计算开始与结束时间
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
						year = year - 60;
				} else if (type === 'end') {
						year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style lang="less" scoped>
	.index_two {
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 58rpx 68rpx 66rpx 68rpx;
		box-sizing: border-box;
		background: #fff;
		box-shadow: 0 -16rpx 288rpx -52rpx rgba(0,0,0,0.50);
		border-radius: 50rpx 50rpx 0 0;
		.index_two_title {
			width: 186rpx;
			height: 46rpx;
			line-height: 46rpx;
			text-align: center;
			background: #000;
			font-size: 28rpx;
			color: #fff;
		}
		.index_two_box {
			margin-top: 16rpx;
			overflow: hidden;
			.index_two_box_list {
				margin-top: 28rpx;
				.index_two_box_list_title {
					font-size: 34rpx;
					font-weight: 600;
				}
				.index_two_box_list_desc {
					font-size: 30rpx;
					margin-top: 10rpx;
				}
			}
		}
		.index_two_price {
			font-size: 34rpx;
			font-weight: bold;
			margin-top: 38rpx;
			text {
				color: #0AAFB9;
				margin-left: 20rpx;
			}
		}
		.index_two_foot {
			margin-top: 64rpx;
			view {
				width: 300rpx;
				height: 89rpx;
				line-height: 89rpx;
				text-align: center;
				font-size: 36rpx;
				color: #fff;
				border-radius: 8rpx;
			}
			.index_two_foot_left {
				background: #000;
			}
			.index_two_foot_right {
				background: #0AAFB9;
			}
		}
	}
	.index {
		height: 100%;
		.index_banner {
			height: 446rpx;
			position: relative;
			swiper {
				height: 100%;
				swiper-item {
					height: 100%;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
			.index_notice {
				padding: 15rpx 20rpx;
				background: #fff;
				border: 3rpx solid #F3F3F3;
				border-radius: 40rpx;
				position: absolute;
				top: 22rpx;
				left: 24rpx;
				image {
					width: 61rpx;
					height: 31rpx;
				}
				text {
					margin-left: 10rpx;
					font-size: 18rpx;
					color: #FF4E4E;
				}
			}
		}
		.index_box {
			padding: 0 28rpx;
			.index_box_head {
				margin-top: 28rpx;
				.index_box_title {
					width: 186rpx;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					background: #000;
					font-size: 28rpx;
					color: #fff;
				}
				.index_box_desc {
					font-size: 18rpx;
					color: #878787;
				}
			}
			.index_box_con {
				.index_box_con_list {
					width: 160rpx;
					height: 62rpx;
					line-height: 62rpx;
					text-align: center;
					background: #F8F8F8;
					font-size: 26rpx;
					color: #060606;
					margin: 24rpx 19rpx 0 0;
					input {
						width: 100%;
						height: 100%;
					}
					&:nth-child(4n+4) {
						margin-right: 0;
					}
				}
				.index_box_con_list_active {
					background: #07ACB6;
					color: #FFFFFF;
				}
			}
			.index_box_time {
				padding: 20rpx 0 0 16rpx;
				.index_box_time_date {
					font-size: 36rpx;
					color: #2F2F2F;
				}
				.index_box_time_what {
					width: 218rpx;
					// border: 1px solid red;
					text-align: center;
					position: relative;
					margin: 0 66rpx 0 53rpx;
					color: #00C2CE;
					&::before {
						content: '';
						width: 2px;
						height: 24rpx;
						background: #E5E5E5;
						position: absolute;
						left: 0;
						top: 50%;
						margin-top: -12rpx;
					}
					&::after {
						content: '';
						width: 2px;
						height: 24rpx;
						background: #E5E5E5;
						position: absolute;
						right: 0;
						top: 50%;
						margin-top: -12rpx;
					}
				}
				.index_box_time_hour {
					font-size: 36rpx;
					color: #2F2F2F;
				}
				.index_box_time_pic {
					width: 48rpx;
					height: 48rpx;
				}
				.index_box_time_address {
					width: 456rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					background: #F8F8F8;
					font-size: 32rpx;
				}
				.index_box_time_number {
					width: 118rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					background: #F8F8F8;
					font-size: 32rpx;
				}
			}
		}
		.index_btn {
			width: 696rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 32rpx;
			color: #fff;
			background: #000;
			border-radius: 40rpx;
			margin: 0 auto;
			margin-top: 44rpx;
		}
		.index_one {
			position: fixed;
			bottom: 0;
			width: 100%;
			padding: 68rpx;
			box-sizing: border-box;
			background: #fff;
			box-shadow: 0 -16rpx 288rpx -52rpx rgba(0,0,0,0.50);
			border-radius: 50rpx 50rpx 0 0;
			.index_one_title {
				width: 186rpx;
				height: 46rpx;
				background: #000;
				line-height: 46rpx;
				text-align: center;
				font-size: 28rpx;
				color: #fff;
			}
			.index_one_con {
				text-align: center;
				font-size: 28rpx;
				margin-top: 88rpx;
				text {
					color: #0AAFB9;
				}
			}
			.index_one_foot {
				margin-top: 90rpx;
				view {
					width: 300rpx;
					height: 89rpx;
					line-height: 89rpx;
					text-align: center;
					font-size: 36rpx;
					color: #fff;
					border-radius: 8rpx;
				}
				.index_one_foot_left {
					background: #000;
				}
				.index_one_foot_right {
					background: #0AAFB9;
				}
			}
		}
	}
</style>
