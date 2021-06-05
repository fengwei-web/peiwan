<template>
	<view class="tabBar flex flex--row">
		<!-- 头部 -->
		<view class="index_head flex flex--row">
			<view class="status_bar"></view>
			<view class="index_head_con flex flex--align-items--center flex--justify-content--center">
				<template v-if="isShow">
					<template v-if="identity === 1">
						<view class="index_head_con_btn" @click="goApply">申请接单师</view>
					</template>
					<template v-else-if="identity === 2">
						<view class="index_head_con_btn" @click="goPlayHome">接单工作台</view>
					</template>
				</template>
				<text class="index_head_con_title">OneBan</text>
			</view>
		</view>
		<view class="box">
			<index
				v-if="isShow"
				:swiperList="swiperList"
				:labelList="labelList"
				:moneyList="moneyList"
				:userInfo="userInfo"
				:nums="nums"
				@setLabel="setLabel"
				@choiceDoWhat="choiceDoWhat"
				@goAddWeixi="goAddWeixi"
			/>
			<my
				v-else
				:addServWeixin="addServWeixin"
				:addPersonalWeixin="addPersonalWeixin"
				:codeImage="codeImage"
				:wxCode="wxCode"
				:userInfo="userInfo"
				:orderCount="orderCount"
				@returnMy = "returnMy"
				@openAddKuWeixin="openAddKuWeixin"
				@openAddPersonalWeixin="openAddPersonalWeixin"
			></my>
		</view>
		<view class="tabBar_foot flex flex--align-items--center flex--justify-content--center">
			<view class="tabBar_foot_list flex flex--row flex--align-items--center" @click.top="setSelected(1)">
				<view v-if="!isShow" style="width: 50rpx;">
					<image src="../../static/image/home_ac.png" style="width: 50rpx;" mode="widthFix"></image>
				</view>
				<view v-else style="width: 122rpx;">
					<image src="../../static/image/home.png" mode="widthFix"></image>
				</view>
				<text>首页</text>
			</view>
			<view class="tabBar_foot_list flex flex--row flex--align-items--center" @click.top="setSelected(2)" style="margin-left: 216rpx;">
				<view v-if="isShow">
					<image src="../../static/image/my.png" mode="widthFix"></image>
				</view>
				<view style="width: 122rpx;" v-else>
					<image src="../../static/image/home.png" style="width: 122rpx;" mode="widthFix"></image>
				</view>
				<text>个人中心</text>
			</view>
		</view>
	</view>
</template>

<script>
	import index from '../index/index'
	import my from '../my/my'
	import QQMapWX from '../../static/qqmap-wx-jssdk.min.js'
	export default {
		components: {
			index,
			my
		},
		data() {
			return {
				isShow: true,
				swiperList: [],
				labelList: [],
				moneyList: [],
				// my
				addServWeixin: false,
				addPersonalWeixin: false,
				codeImage: '',
				wxCode: '',
				userInfo: null,
				orderCount: null,
				identity: null,
				nums: 0
			}
		},
		watch: {
			isShow(e) {
				if(!this.isShow){
					this.getOrderCount()
					return
				}
			}
		},
		onLoad(option) {
			this.getBanner()
			this.getLabel()
			this.getMoney()
			this.getAddress()
		},
		onShow() {
			if(!uni.getStorageSync('token')){
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				},3000)
			}else {
				this.getUserInfo()
				this.getOrderCount()
			}
		},
		onShareAppMessage(res) {
			return {
				title: 'ONE BAN  让快乐加伴',
				path: '/pages/tabBar/tabBar',
				imageUrl: '../../static/image/share.jpg'
			}
		},
		methods: {
			goApply() {
				if(this.userInfo.wx_num === '' || this.userInfo.wx_num === null){
					uni.showToast({
						title: '请添加微信信息',
						icon: 'none'
					})
				}else {
					uni.navigateTo({
						url: '/pages/apply/apply'
					})
				}
			},
			async goPlayHome() {
				const { data } = await this.$http('/api/play_with/info')
				if(data.state === 2) {
					uni.navigateTo({
						url: '/pages/playHome/playHome'
					})
				}else {
					if(data.state === 1){
						uni.showToast({
							title: '审核中',
							icon: 'none'
						})
					}else {
						uni.showToast({
							title: data.state_intro || '已驳回',
							icon: 'none',
							duration: 1500,
							success() {
								setTimeout(()=>{
									uni.navigateTo({
										url: '/pages/applyOrderReceiver/applyOrderReceiver'
									})
								}, 1500)
							}
						})
					}
				}
			},
			// 获取轮播图
			async getBanner() {
				const { data } = await this.$http('/api/banner/lists')
				this.swiperList = data
			},
			// 获取订单数量
			async getOrderCount() {
				const { data } = await this.$http('/api/order/order_count')
				this.orderCount = data
			},
			// 获取标签
			async getLabel() {
				const { data } = await this.$http('/api/tags_do/lists')
				data.forEach(v => {
					v['isShow'] = false
				})
				this.labelList = data
			},
			// 获取金额
			async getMoney() {
				const { data } = await this.$http('/api/tags_price/lists')
				data.forEach(v => {
					v['isShow'] = false
				})
				this.moneyList = data
			},
			// 获取当前位置
			getAddress() {
				let that = this
				uni.authorize({
					scope: "scope.userLocation",
					success() {
						let qqmapsdk = new QQMapWX({
							key: 'ZCFBZ-UFVRJ-SY4FQ-KX55X-N46K3-DNBNR'
						});
						uni.getLocation({
							type: 'gcj02',
							success(res) {
								qqmapsdk.reverseGeocoder({
									location: {
										latitude: res.latitude,
										longitude: res.longitude
									},
									async success(res) {
										// 
										const { data } = await that.$http('/api/member/play_with_num', {
											province: res.result.address_component.province,
											city: res.result.address_component.city
										})
										that.nums = data || 0
										await that.$http('/api/member/address', {
											province: res.result.address_component.province,
											city: res.result.address_component.city
										})
									}
								})	
							},
							fail(res){
								uni.showToast({
									icon :"none",
									title: '注意：需要获取您的定位授权,否则部分功能将无法使用',
									duration: 2000
								})
							}
						})
					}
				})
			},
			// 获取个人信息
			async getUserInfo() {
				const { data } = await this.$http('/api/member/info')
				this.userInfo = data
				this.identity = data.identity
			},
			
			// index页面（标签）传过来的值
			setLabel(labelList) {
				this.labelList = labelList;
			},
			// 更新金额数据
			choiceDoWhat(moneyList) {
				this.moneyList = moneyList;
			},
			// 从index页面调用的打开添加我的微信
			goAddWeixi(){
				this.isShow = false;
				this.addPersonalWeixin = true
				// this.keFuWeixi()
			},
			// my 返回
			returnMy(type) {
				if(type == 1){
					this.addPersonalWeixin = false
				}else {
					this.addServWeixin = false
				}
				this.getUserInfo()
			},
			// 获取客户信息
			async getSevrInfo(type) {
				const { data } = await this.$http('/api/system/info',{
					type: type
				})
				if(type == 2) {
					this.codeImage = data.content
				}else {
					this.wxCode = data.content
				}
			},
			// 在我的页面打开客服
			openAddKuWeixin(){
				this.keFuWeixi()
			},
			// 打开添加微信
			openAddPersonalWeixin() {
				this.addPersonalWeixin = true
			},
			// 打开客服弹框公共代码
			keFuWeixi() {
				this.addServWeixin = true
				this.getSevrInfo(2)
				this.getSevrInfo(3)
			},
			// tabBar切换页面
			setSelected(type) {
				type === 1 ? this.isShow = true : this.isShow = false;
			}
		}
	}
</script>

<style lang="less">
	.tabBar {
		height: 100%;
		.index_head {
			height: 144rpx;
			flex-shrink: 0;
			.status_bar {
				height: var(--status-bar-height);
				width: 100%;
			}
			.index_head_con{
				flex: 1;
				position: relative;
				.index_head_con_btn {
					padding: 12rpx 32rpx;
					background: #000;
					border-radius: 32rpx;
					font-size: 22rpx;
					color: #fff;
					position: absolute;
					left: 14rpx;
				}
				.index_head_con_title {
					font-size: 24rpx;
					font-weight: bold;
				}
			}
		}
		.box {
			flex: 1;
			overflow: auto;
		}
		.tabBar_foot {
			height: 164rpx;
			.tabBar_foot_list {
				view {
					height: 58rpx;
					image {
						width: 45rpx;
					}
				}
				text {
					margin-top: 8rpx;
					font-size: 26rpx;
				}
				&:first-of-type image {
					width: 122rpx;
				}
			}
		}
	}
</style>
