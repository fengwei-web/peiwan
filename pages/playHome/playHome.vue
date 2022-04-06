<template>
	<view class="playHome flex flex--row">
		<navBar></navBar>
		<view class="playHome_tab flex flex--align-items--center flex--justify-content--space-around">
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
			<view class="modify">
				<!-- 相册 -->
				<view class="modify_album">
					<title title="我的图片"></title>
					<view class="modify_album_box flex flex--wrap">
						<view
							class="modify_album_box_list flex flex--row flex--align-items--center"
							v-for="(item, index) in imageList"
							:key="index"
						>
							<view class="modify_album_box_list_con" @click="uploadImage(index)">
								<text v-if="item == ''">添加图片</text>
								<image v-else :src="baseUrl + item" mode="aspectFill"></image>
							</view>
							<view class="modify_album_box_list_del" @click="deleteImage(index)">删除</view>
						</view>
					</view>
					<view class="modify_album_tip">* 请小可爱们务必上传本人照片哦～（网图等不予通过）</view>
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
						<view class="modify_com_con_right">
							{{ listing || '星座' }}
							<!-- <picker mode="date" :value="date" @change="bindDateChange">
								<view style="width: 100%;">{{ date }}</view>
							</picker> -->
						</view>
					</view>
				</view>
				<!-- 你的身高 -->
				<view class="modify_com">
					<title title="你的身高"></title>
					<view class="modify_com_con flex flex--align-items--center">
						<input class="modify_com_con_left" type="number" v-model="heights" placeholder="请输入您的身高" />
						<view class="modify_com_con_right">cm</view>
					</view>
				</view>
				<!-- 你的体重 -->
				<view class="modify_com">
					<title title="你的体重"></title>
					<view class="modify_com_con flex flex--align-items--center">
						<input class="modify_com_con_left" type="number" v-model="weights" placeholder="请输入您的体重" />
						<view class="modify_com_con_right">kg</view>
					</view>
				</view>
				<!-- 你的性别 -->
				<view class="modify_pation">
					<title title="你的性别"></title>
					<view class="modify_pation_con flex flex--wrap">
						<view
							class="pation_con_list"
						>{{ sex == 1 ? '男' : '女' }}</view>
					</view>
				</view>
				<!-- 你的职业 -->
				<view class="modify_pation">
					<title title="你的职业"></title>
					<view class="modify_pation_con flex flex--wrap">
						<view
							class="pation_con_list"
						>{{ pationText }}</view>
						<input
							class="pation_con_list"
							style="background: #07ACB6;"
							type="text"
							placeholder="自定义"
							v-model="job"
							placeholder-style="color: #fff;"
						/>
					</view>
				</view>
				<!-- 个人简介 -->
				<view class="modify_pation">
					<title title="个人简介"></title>
					<view class="modify_pation_con flex flex--wrap">
						<view
							class="pation_con_list"
							:class="{ 'active' : item.isShow }"
							v-for="(item, index) in detailList"
							:key="item.id"
							@click="setDetail(index)"
						>{{ item.title }}</view>
					</view>
					<!-- <textarea class="text_con" v-model="intro" placeholder="请输入你的个人简介，让别人记住你哈。" /> -->
				</view>
				<!-- 底部按钮 -->
				<view class="modify_foot flex flex--align-items--center flex--justify-content--space-between">
					<view class="modify_foot_left">取消</view>
					<view class="modify_foot_right" @click="modifyInfo">提交审核</view>
				</view>
			</view>
		</template>
		
		<template v-else-if="tabIndex === 1">
			<view class="playHome_box">
				<template v-if="playHomeList.length">
					<view class="playHome_wrap">
						<view class="playHome_wrap_list" v-for="item in playHomeList" :key="item.id">
							<view class="meetWrap_box_list_order flex flex--align-items--center flex--justify-content--space-between">
								<title title="订单状态"></title>
								<view
									class="meetWrap_box_list_order_two"
									:class="{ 'meetWrap_box_list_order_one': item.state === 1 || item.state === 2 }"
								>
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
								v-if="item.play_with_state === 0 && item.state === 1"
								@click="myWantOrder(item.id)"
							>
								<text></text>
								我要接单
							</view>
							<view
								class="list_btn flex flex--align-items--center flex--justify-content--center"
								v-if="item.play_with_state === 2 && item.state === 1"
							>您已被用户选中</view>
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
		
		<template v-else-if="tabIndex === 2">
			<view class="playHome_box">
				<template v-if="orderList.length">
					<view class="playHome_wrap">
						<view class="playHome_wrap_list" v-for="item in orderList" :key="item.id">
							<view class="meetWrap_box_list_order flex flex--align-items--center flex--justify-content--space-between">
								<title title="订单状态"></title>
								<view
									class="meetWrap_box_list_order_two"
									:class="{ 'meetWrap_box_list_order_one': item.state === 1 || item.state === 2 }"
								>
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
								<image :src="item.image.indexOf('http') !== -1? item.image :baseUrl + item.image" mode="aspectFill" />
								<text>{{ item.order_state == 2 ? '已支付' : '愿意支付' }} </text>
								<view
									class="list_four_container_price flex flex--align-items--center flex--justify-content--center">
									<text>¥</text>
									{{ item.price }}
								</view>
							</view>
							<view
								class="list_wx flex flex--align-items--center flex--justify-content--space-between"
								v-if="item.play_with_state === 2 && item.state === 1"
							>
								<view class="flex flex--align-items--center">
									<image src="../../static/image/wxs.jpg" mode="widthFix"></image>
									<text style="margin-left: 95rpx;">{{ item.wx_code }}</text>
								</view>
								<view></view>
								<image :src="baseUrl + item.wx_image" mode="aspectFill" @click="setBoxImage(baseUrl + item.wx_image)"></image>
							</view>
							<view
								class="list_btn flex flex--align-items--center flex--justify-content--center"
								v-if="item.play_with_state === 0 && item.state === 1"
								@click="myWantOrder(item.id)"
							>
								<text></text>
								我要接单
							</view>
							<view
								class="list_btn flex flex--align-items--center flex--justify-content--center"
								v-if="item.play_with_state === 2 && item.state === 1"
							>您已被用户选中</view>
							
							<view
								class="list_btn flex flex--align-items--center flex--justify-content--center"
								v-if="item.state == 2 && item.settle == 1 && item.settle_state == 1"
								@click="withdrawal(item.id)"
							>我要提现</view>
						</view>
					</view>
					<!-- <view class="playHome_more flex flex--justify-content--center">— 当前城市暂无更多订单 —</view> -->
				</template>
				<!-- 暂无数据 -->
				<template v-else>
					<view class="playHome_box_no_list flex flex--justify-content--center">
						<image src="../../static/image/no_order.png" mode=""></image>
					</view>
				</template>
			</view>
		</template>
		<!-- 底部 -->
		<template v-if="tabIndex === 1">
			<view class="playHome_foot">
				<view class="playHome_foot_con flex flex--align-items--center">
					<view class="playHome_foot_con_left flex flex--align-items--center flex--justify-content--center">
						<text>当前城市</text>
						<view>{{ currentCity }}</view>
					</view>
					<view class="playHome_foot_con_right flex flex--align-items--center flex--justify-content--center">
						<text>正在接单</text>
						<switch :checked="switchShow" color="#000000"></switch>
					</view>
				</view>
			</view>
		</template>
		
		<!-- 陪玩申请后审核通过 -->
		<view
			class="playHome_adopt flex flex--row flex--align-items--center"
			v-if="false"
		>
			<view class="playHome_adopt_list">恭喜，你的<text>申请通过</text></view>
			<view class="playHome_adopt_list">你现在已经是ONE的接单员担当</view>
			<view class="playHome_adopt_list">可以开始<text>愉快的接单</text>啦</view>
			<view class="playHome_adopt_btn">好的</view>
		</view>
		<!-- 点击我要接单之后的弹框 -->
		<view
			class="playHome_meet flex flex--row flex--align-items--center"
			v-if="receivingShow"
		>
			<view class="playHome_meet_list">确认接单后，</view>
			<view class="playHome_meet_list">在<text>我的订单</text>查看订单状态。</view>
			<view class="playHome_meet_btn" @click="confirm">好的</view>
		</view>
		
		<view class="boxImage flex flex--align-items--center" v-if="boxShow" @click="boxShow = false">
			<image :src="boxImage" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import QQMapWX from '../../static/qqmap-wx-jssdk.min.js'
	export default {
		data() {
			return {
				switchShow: true,
				receivingShow: false,
				playHomeList: [],
				orderList: [],
				tabList: [
					{
						id: 1,
						title: '个人资料'
					},
					{
						id: 2,
						title: '订单列表'
					},
					{
						id: 3,
						title: '我的订单'
					}
				],
				tabIndex: 1,
				orderId: 1,
				date: '2021-05-25',
				heights: '',
				weights: '',
				intro: [],
				imageList: ['','','','','',''],
				pationText: '',
				job: '',
				mobile: '',
				currentCity: '北京',
				listing: '',
				boxImage: '',
				sex: 1,
				boxShow: false,
				detailList: []
			}
		},
		onLoad() {
			this.getPlayWith()
			this.getPlayHome()
			this.getAddress()
			this.getOrderLists()
			this.getListing('5.25')
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
			// 获取个人简介
			async getDetail() {
				const { data } = await this.$http('/api/tags_detail/lists')
				data.forEach(v => {
					v['isShow'] = false
					this.intro.forEach(m => {
						if(m == v.title) {
							v.isShow = true
						}
					})
				})
				
				this.detailList = data
				console.log(this.detailList)
			},
			setDetail(index) {
				let arr = this.detailList
				this.intro = []
				arr[index].isShow = !arr[index].isShow
				arr.forEach(v => {
					if(v.isShow) {
						this.intro.push(v.title)
					}
				})
				console.log(this.intro)
			},
			// 我要提现
			withd(order_id) {
				uni.showModal({
					title: '提示',
					content: '您确定要提现吗？',
					success(res) {
						if(res.confirm) {
							that.withdrawal(order_id)
						}
					}
				})
			},
			async withdrawal(order_id) {
				const { data, status } = await this.$http('/api/play_with/settle', {
					order_id: order_id
				})
				if(status) {
					uni.showToast({
						title: '提交成功',
						icon: 'none',
						success() {
							setTimeout(() => {
								this.getOrderLists()
								this.tabIndex = 2
							}, 1000)
						}
					})
				}else {
					uni.showToast({
						title: '提交失败',
						icon: 'none'
					})
				}
			},
			// 放大图片
			setBoxImage(src) {
				this.boxImage = src
				this.boxShow = true
			},
			// 获取我的订单数据
			async getOrderLists() {
				const { data } = await this.$http('/api/play_with/order_list_finish')
				this.orderList = data
			},
			// 获取星座
			async getListing(newDate){
				const { data } = await this.$http('/api/conste/listing', {
					data: newDate
				})
				if(data.title){
					this.listing = data.title
				}
			},
			// 获取
			async getPlayHome() {
				const { data } = await this.$http('/api/play_with/order_list')
				this.playHomeList = data.data
			},
			async getPlayWith() {
				const { data } = await this.$http('/api/play_with/info')
				if(data.id) {
					this.imageList = data.images.split(',')
					this.date = data.birthday
					this.heights = data.height
					this.weights = data.weight
					this.pationText = data.job
					this.sex = data.sex
					this.intro = data.intro.split(',')
					this.mobile = data.mobile
				}
				this.getDetail()
			}, 
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
									success(res) {
										that.currentCity = res.result.address_component.city
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
			// 日期
			bindDateChange(e) {
				this.date = e.detail.value
				let date = this.date.split('-')
				date[1] = parseInt(date[1]) < 10 ? date[1].split('')[1] : date[1]
				date[2] = parseInt(date[2]) < 10 ? date[2].split('')[1] : date[2]
				let newDate = date[1] + '.' + date[2]
				this.getListing(newDate)
			},
			// 上传图片
			uploadImage(index) {
				let that = this;
				uni.chooseImage({
					count: 1,
					success(res) {
						uni.uploadFile({
							url: that.baseUrl + '/api/member/upload',
							filePath: res.tempFilePaths[0],
							name: 'file',
							success(data) {
								let arr = JSON.parse(data.data)
								that.$set(that.imageList,index,arr.data)
							}
						})
					}
				})
			},
			// 删除图片
			deleteImage(index) {
				if(this.imageList[index].length){
					this.$set(this.imageList, index, '')
				}else {
					uni.showToast({
						title: '您要删除的项没有图片，请重新选择',
						icon: 'none'
					})
				}
			},
			// 我要接单
			myWantOrder(id) {
				let that = this
				uni.showModal({
					title: '提示',
					content: '您确定要接单吗？',
					success(res) {
						if(res.confirm) {
							that.receivingShow = true
							that.orderId = id
						}
					}
				})
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
			// 接单确认
			async confirm() {
				let that = this;
				const { data, status,msg } = await this.$http('/api/play_with/receive_order', {
					order_id: this.orderId
				})
				if(status){
					uni.showToast({
						title: '接单成功',
						icon: 'none',
						success() {
							that.receivingShow = false
							that.getPlayHome()
							that.getOrderLists()
							that.getDingYue()
						}
					})
				}else {
					uni.showToast({
						title: msg,
						icon: 'none'
					})
				}
			},
			// 修改信息
			async modifyInfo() {
				let images = ''
				let indexImage = []
				let job = ''
				let that = this
				this.imageList.forEach((v,i) => {
					if(v) {
						indexImage.push(i)
						uni.setStorageSync('indexImage',indexImage)
					}
				})
				images = this.imageList.join(',');
				if(!images){
					uni.showToast({
						title: '请添加图片',
						icon: 'none'
					})
					return
				}
				if(this.job) {
					job = this.job
				}else {
					job = this.pationText
				}
				uni.showModal({
					title: '提示',
					content: '是否确定重新提交审核',
					async success(res) {
						if(res.confirm){
							const { status, msg } = await that.$http('/api/play_with/edit',{
								birthday: that.date,
								height: that.heights,
								weight: that.weights,
								job,
								sex: that.sex,
								intro: that.intro.join(','),
								images,
								mobile: that.mobile,
								conste: that.listing
							})
							if(status) {
								uni.showToast({
									title: '修改成功',
									icon: 'none'
								})
								setTimeout(() => {
									uni.reLaunch({
										url: '/pages/tabBar/tabBar'
									})
								},1000)
							}else {
								uni.showToast({
									title: msg,
									icon: 'none'
								})
							}
						}
					}
				})
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
				width: 200rpx;
				height: 70rpx;
				background: #fff;
				border-radius: 45rpx;
				font-size: 28rpx;
				&.active {
					color: #07ACB6;
				}
			}
		}
		.modify {
			flex: 1;
			padding: 0 30rpx;
			overflow: auto;
			.modify_album {
				width: 100%;
				.modify_album_box {
					padding: 44rpx 42rpx 0 42rpx;
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
							image {
								width: 100%;
								height: 100%;
							}
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
						font-size: 28rpx;
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
						// &:nth-child(-n+4) {
						// 	margin-top: 0;
						// }
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
		.playHome_box {
			flex: 1;
			background: #F5F5F6;
			overflow: auto;
			.playHome_wrap {
				width: 100%;
				padding-bottom: 80rpx;
				.playHome_wrap_list {
					padding: 0 26rpx 156rpx 26rpx;
					background: #fff;
					margin-top: 68rpx;
					position: relative;
					.meetWrap_box_list_order {
						view {
							width: 442rpx;
							height: 46rpx;
							line-height: 46rpx;
							text-align: center;
							font-size: 26rpx;
							color: #fff;
						}
						.meetWrap_box_list_order_two {
							background: #8C8C8C;
						}
						.meetWrap_box_list_order_one {
							background: #07ACB6;
						}
					}
					.list_wx {
						margin-top: 40rpx;
						padding-left: 55rpx;
						view {
							font-size: 28rpx;
							font-weight: bold;
							image {
								width: 80rpx;
							}
						}
						image {
							width: 180rpx;
							height: 180rpx;
						}
					}
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
						max-width: 110rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
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
		.boxImage {
			width: 100%;
			height: 100%;
			background: #000;
			position: fixed;
			top: 0;
			left: 0;
			image {
				width: 100%;
			}
		}
	}
</style>
