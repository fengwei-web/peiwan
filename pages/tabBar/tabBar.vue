<template>
	<view class="tabBar flex flex--row">
		<!-- 头部 -->
		<view class="index_head flex flex--row">
			<view class="status_bar"></view>
			<view class="index_head_con flex flex--align-items--center flex--justify-content--center">
				<template v-if="isShow">
					<view class="index_head_con_btn">申请接单师</view>
				</template>
				<text class="index_head_con_title">OneFun</text>
			</view>
		</view>
		<view class="box">
			<index
				v-if="isShow"
				:swiperList="swiperList"
				:labelList="labelList"
				:moneyList="moneyList"
				:userInfo="userInfo"
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
				@returnMy = "returnMy"
				@openAddKuWeixin="openAddKuWeixin"
				@openAddPersonalWeixin="openAddPersonalWeixin"
			></my>
		</view>
		<view class="tabBar_foot flex flex--align-items--center flex--justify-content--center">
			<view class="tabBar_foot_list flex flex--row flex--align-items--center" @click.top="setSelected(1)">
				<view>
					<image src="../../static/image/home.png" mode="widthFix"></image>
				</view>
				<text>首页</text>
			</view>
			<view class="tabBar_foot_list flex flex--row flex--align-items--center" @click.top="setSelected(2)" style="margin-left: 216rpx;">
				<view>
					<image src="../../static/image/my.png" mode="widthFix"></image>
				</view>
				<text>个人中心</text>
			</view>
		</view>
	</view>
</template>

<script>
	import index from '../index/index'
	import my from '../my/my'
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
				userInfo: null
			}
		},
		watch: {
			isShow(e) {
				if(this.isShow){
					return
				}
				console.log('离开当前页面')
			}
		},
		onLoad(option) {
			this.getBanner()
			// this.login()
			this.getLabel()
			this.getMoney()
			this.getUserInfo()
		},
		onHide() {
			
		},
		methods: {
			login() {
				let that = this;
				uni.login({
					success(res) {
						uni.getUserInfo({
							async success(user) {
								const parmst = {
									image: user.userInfo.avatarUrl,
									nickname: user.userInfo.nickName,
									code: res.code
								}
								const { data } = await that.$http('/api/member/login',parmst);
								uni.setStorageSync('token',data.token)
							}
						})
					}
				})
			},
			// 获取轮播图
			async getBanner() {
				const { data } = await this.$http('/api/banner/lists')
				this.swiperList = data
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
				
			},
			async getUserInfo() {
				const { data } = await this.$http('/api/member/info')
				this.userInfo = data
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
			height: 124rpx;
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
					font-size: 22rpx;
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
						width: 40rpx;
					}
				}
				text {
					margin-top: 8rpx;
					font-size: 20rpx;
				}
				&:first-of-type image {
					width: 122rpx;
				}
			}
		}
	}
</style>
