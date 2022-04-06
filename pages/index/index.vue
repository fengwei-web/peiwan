<template>
	<view class="index">
		<!-- 轮播图 -->
		<view class="index_banner">
			<!-- 公告 -->
			<template v-if="!accountShow">
				<view
					class="index_notice flex flex--align-items--center flex--justify-content--center"
					@click="goPlayList"
				>
					<image src="../../static/image/notice.png" mode="widthFix"></image>
					<!-- <text>附近 {{ nums }} 陪玩在线</text> -->
					<view>点我查看<text>{{ nums }}</text>位在线接单员</view>
				</view>
			</template>
			<!-- 轮播 -->
			<swiper
				class="swiper"
				indicator-dots="indicatorDots"
				autoplay="autoplay"
				circular="circular"
				interval="2500"
			>
				<template v-if="baseUrl">
					<swiper-item v-for="item in swiperList" :key="item.id">
						<image :src="baseUrl + item.image" mode=""></image>
					</swiper-item>
				</template>
			</swiper>
		</view>
		<!-- 第一部分 -->
		<view class="index_box" v-if="!accountShow">
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
				<view class="index_box_title">时间</view>
				<view class="index_box_desc">* 时间为约定对方的时间，请按照行程合理选择</view>
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
		<!-- 性别 -->
		<view class="index_box" v-if="!accountShow">
			<!-- 标题 -->
			<view class="index_box_head flex flex--align-items--center flex--justify-content--space-between">
				<view class="index_box_title">我想喊Ta</view>
				<view class="index_box_desc"></view>
			</view>
			<!-- 内容 -->
			<view class="index_box_con flex flex--wrap">
				<view
					v-for="(item,index) in sexList"
					:key="item.id"
					class="index_box_con_list"
					:class="{'index_box_con_list_active': sexIndex == index}"
					@click="setCheckSex(index)"
				>{{ item.title }}</view>
			</view>
		</view>
		<!-- 第三部分 -->
		<view class="index_box" v-if="!accountShow">
			<!-- 标题 -->
			<view class="index_box_head flex flex--align-items--center flex--justify-content--space-between">
				<view class="index_box_title">地点</view>
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
					:class="{'index_box_con_list_active': item.isShow}"
					v-for="(item,index) in moneyList"
					:key="index"
					@click="choiceDoWhat(index)"
				>{{ item.title }}</view>
				<view class="index_box_con_list">
					<input
						class="index_box_con_list_active"
						type="number"
						v-model="moneyText"
						placeholder="自定义"
						placeholder-style="color: #fff;"
						@blur="moneyBlur"
					/>
				</view>
			</view>
		</view>
		<!-- 发布按钮 -->
		<view class="index_btn" @click="releaseOrder">发布订单</view>
		<!-- 弹出框1 -->
		<template v-if="oneShow">
			<view class="index_one">
				<view class="index_one_title">下单必填</view>
				<view class="index_one_con">需要先添加<text>微信</text>，才能和Ta愉快的玩耍</view>
				<view class="index_one_foot flex flex--align-items--center flex--justify-content--space-between">
					<view class="index_one_foot_left" @click="oneShow = false">不需要</view>
					<view class="index_one_foot_right" @click="goAddWeixi">去添加微信</view>
				</view>
			</view>
		</template>
		
		<!-- 弹出框2 -->
		<template v-if="twoShow">
			<view class="index_one" >
				<view class="index_one_con">订单已经发布，请到<text>我的订单</text>查看订单</view>
				<view class="index_one_foot flex flex--align-items--center flex--justify-content--space-between">
					<view class="index_one_foot_left" @click="twoShow = false">好的</view>
					<view class="index_one_foot_right" @click="goMyOrder">我的订单</view>
				</view>
			</view>
		</template>
		
		<!-- 弹出框3 -->
		<template v-if="threeShow">
			<view class="index_two">
				<view class="index_two_title">订单信息</view>
				<view class="index_two_box">
					<view class="index_two_box_list">
						<view class="index_two_box_list_title">喊TA做什么：</view>
						<view class="index_two_box_list_desc">{{ checkboxText1 }}</view>
					</view>
					<view class="index_two_box_list">
						<view class="index_two_box_list_title">见面地点：</view>
						<view class="index_two_box_list_desc">{{ cityText }}</view>
					</view>
					<view class="index_two_box_list">
						<view class="index_two_box_list_title">见面时间：</view>
						<view class="index_two_box_list_desc">{{ date }}</view>
					</view>
				</view>
				<view class="index_two_price">
					预计支付的金额：
					<text>￥{{ moneyCon }}</text>
				</view>
				<view class="index_two_foot flex flex--align-items--center flex--justify-content--space-between">
					<view class="index_two_foot_left" @click="threeShow = false">我再想想</view>
					<view class="index_two_foot_right" @click="confirmRelease">确认发布</view>
				</view>
			</view>
		</template>
		
		
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		name: 'index',
		props: {
			swiperList: {
				type: Array
			},
			labelList: {
				type: Array
			},
			moneyList: {
				type: Array
			},
			userInfo: {
				type: Object
			},
			nums: {
				type: Number
			},
			address: {
				type: String
			}
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: '',
				time: '13:00',
				hourArray: [2,3,4,5,6,7,8],
				hour: '2',
				cityText: '请选择见面地址',
				moneyText: '',
				checkboxText: '', // 选择做什么的字符串
				checkboxText1: '',
				moneyCon: '',
				accountShow: false,
				oneShow: false,
				twoShow: false,
				threeShow: false,
				sexList: [
					{
						id: 1,
						title: '男生'
					},
					{
						id: 2,
						title: '女生'
					},
					{
						id: 3,
						title: '不限'
					}
				],
				sex: 2,
				sexIndex: 1
			}
		},
		computed: {
			startDate() {
			  return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			...mapState(['baseUrl'])
		},
		watch: {
			moneyText(e){
				let str = e.replace(/\s*/g,'');
				this.moneyText = str
			}
		},
		created() {
			// 初始化时间
			this.getCurrentDate()
			let releaseData = this.$store.state.releaseData;
			if(releaseData !== null){
				let date = releaseData.data.split(' ')
				this.date = date[0]
				this.time = date[1]
				this.hour = releaseData.time
				this.cityText = releaseData.address
				this.checkboxText = releaseData.do
				this.moneyCon = releaseData.price,
				this.sex = releaseData.sex
			}else {
				this.cityText = this.address
			}
			
			
			const accountInfo = wx.getAccountInfoSync();
			// env类型
			const env = accountInfo.miniProgram.envVersion;
			if(env === 'release') {
				this.accountShow = true
			}else {
				// this.accountShow = true
				this.accountShow = true
			}
		},
		updated() {
			let data = {
				address: this.cityText,
				data: this.date + ' ' + this.time,
				time: this.hour,
				do: this.checkboxText,
				price: this.moneyCon,
				sex: this.sex
			}
			this.$store.commit('setReleaseData',data);
		},
		methods: {
			
			// 进入陪玩列表页面
			goPlayList() {
				uni.navigateTo({
					url: '/pages/playList/playList'
				})
			},
			// 初始化时间
			getCurrentDate() {
				let date = new Date();
				let year = date.getFullYear()
				let month = date.getMonth() + 1;
				let day = date.getDate()
				let hour = date.getHours()
				let minute = date.getMinutes()
				month = month < 10 ? `0${ month }` : month
				day = day < 10 ? `0${ day }` : day
				hour = hour < 10 ? `0${ hour }` : hour
				minute = minute < 10 ? `0${ minute }` : minute
				this.date = year + '-' + month + '-' + day
				this.time = hour + ':' + minute
			},
			// 选择做什么
			setCheckbox(index) {
				let labelList = this.labelList;
				labelList[index].isShow = !labelList[index].isShow
				let arr = [];
				let newArr = []
				labelList.forEach(v=>{
					if(v.isShow){
						newArr.push(v.title)
						arr.push(v.id)
					} 
				})
				this.checkboxText = arr.join(',')
				this.checkboxText1 = newArr.join(',')
				this.$emit('setLabel',labelList);
			},
			setCheckSex(index) {
				this.sexIndex = index
				this.sex = this.sexList[index].id
			},
			// 选择支付金额
			choiceDoWhat(index) {
				this.moneyCommon(2,index)
			},
			// 自定义获取焦点
			moneyBlur() {
				this.moneyCommon(1)
			},
			// 金额公共代码
			moneyCommon(type,index=-1) {
				let moneyList = this.moneyList;
				moneyList.forEach(v => {
					v.isShow = false
				})
				if(type !== 1) {
					moneyList[index].isShow = !moneyList[index].isShow
					moneyList.forEach(v=>{
						if(v.isShow) {
							this.moneyCon = v.title
						};
					})
				}else{
					if(parseInt(this.moneyText) < 600) {
						this.moneyCon = 600
						this.moneyText = 600
					}else {
						this.moneyCon = this.moneyText
					}
				}
				this.$emit('choiceDoWhat',moneyList)
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
				this.hour = this.hourArray[e.detail.value]
			},
			// 选择地区
			bindCityChange(e) {
				this.cityText = e.detail.value.join('-')
			},
			// 首页发布订单
			releaseOrder() {
				if(this.accountShow) return uni.showToast({ title: '暂未开通', icon: 'none' })
				if(!this.checkboxText){
					uni.showToast({
						title: '请选择服务内容',
						icon: 'none'
					})
					return;
				}
				if(this.cityText === '请选择见面地址'){
					uni.showToast({
						title: '请选择见面地址',
						icon: 'none'
					})
					return;
				}
				if(!this.moneyCon){
					uni.showToast({
						title: '请选择金额',
						icon: 'none'
					})
					return;
				}
				if(!uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return
				}
				if(!this.userInfo.wx_num){
					this.oneShow = true
				}else {
					this.threeShow = true
				}
			},
			// 去添加微信
			goAddWeixi() {
				let data = {
					address: this.cityText,
					data: this.date + ' ' + this.time,
					time: this.hour,
					do: this.checkboxText,
					price: this.moneyCon
				}
				this.$store.commit('setReleaseData',data);
				this.$emit('goAddWeixi', data)
			},
			// 获取订阅
			getDingYue() {
				let tmplIds = 'VQVd9k7i_T4FfxWlB_knQ2FSByXPCdNIcjQQQK__KYM'
				wx.getSetting({
					withSubscriptions: true,   //  这里设置为true,下面才会返回mainSwitch
					success: function(res){   
						// 调起授权界面弹窗
						if (res.subscriptionsSetting.mainSwitch) {  // 用户打开了订阅消息总开关
							if (res.subscriptionsSetting.itemSettings != null) {   // 用户同意总是保持是否推送消息的选择, 这里表示以后不会再拉起推送消息的授权
								let moIdState = res.subscriptionsSetting.itemSettings[tmplIds];  // 用户同意的消息模板id
								if(moIdState === 'accept'){   
									console.log('接受了消息推送');
					
								}else if(moIdState === 'reject'){
									console.log("拒绝消息推送");
					
								}else if(moIdState === 'ban'){
									console.log("已被后台封禁");
					
								}
							}else {
								// 当用户没有点击 ’总是保持以上选择，不再询问‘  按钮。那每次执到这都会拉起授权弹窗
								wx.showModal({
									title: '提示',
									content:'请授权开通服务通知',
									showCancel: true,
									success: function (ress) {
										if (ress.confirm) {  
											wx.requestSubscribeMessage({   // 调起消息订阅界面
												tmplIds: [tmplIds],
												success (res) { 
													console.log('订阅消息 成功 ');
													console.log(res);
												},
												fail (er){
													console.log("订阅消息 失败 ");
													console.log(er);
												}
											})     
														
										}
									}
								})
							}
					
						}else {
							console.log('订阅消息未开启')
						}      
					},
					fail: function(error){
						console.log(error);
					},
				})
			},
			// 确认发布
			async confirmRelease() {
				let that = this
				let data = {
					address: this.cityText,
					data: this.date + ' ' + this.time,
					time: this.hour,
					do: this.checkboxText,
					price: this.moneyCon,
					sex: this.sex
				}
				this.$store.commit('setReleaseData',data);
				const { status, msg } = await this.$http('/api/order/create_order',data);
				if(status) {
					uni.showToast({
						title: '发布成功',
						icon: 'none',
						success() {
							that.threeShow = false
							that.twoShow = true
							setTimeout(() => {
								that.getDingYue()
							}, 1000)
						}
					})
				}else{
					uni.showToast({
						title: msg,
						icon: 'none',
						success() {
							that.threeShow = false
						}
					})
				}
			},
			goMyOrder() {
				uni.navigateTo({
					url: '/pages/orderDetail/orderDetail?type=1'
				})
				this.twoShow = false
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
			// height: 446rpx;
			position: relative;
			swiper {
				padding: 0 28rpx;
				height: 246rpx;
				swiper-item {
					height: 100%;
					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
						overflow: hidden;
					}
				}
			}
			.index_notice {
				padding: 20rpx 20rpx;
				background: #fff;
				// border-radius: 40rpx;
				// border: 3rpx solid #F3F3F3;
				// position: absolute;
				// top: 22rpx;
				// left: 24rpx;
				image {
					width: 61rpx;
					height: 31rpx;
				}
				view {
					margin-left: 10rpx;
					font-size: 24rpx;
					color: #FF4E4E;
					text {
						font-size: 34rpx;
					}
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
				.index_box_time_sex {
					width: 100%;
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
		.moren {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
		}
	}
</style>
