<template>
	<view class="receiver flex flex--row">
		<navBar></navBar>
		<!-- 内容 -->
		<view class="receiver_box flex flex--row flex--align-items--center">
			<!-- 填写基本信息 标题 -->
			<view class="receiver_box_title flex flex--align-items--center flex--justify-content--center">
				<image src="../../static/image/notice.png" mode="" />
				填写基本信息
			</view>
			<!-- 你的生日 -->
			<view class="receiver_box_com">
				<title title="你的生日"></title>
				<view class="receiver_box_com_con flex flex--align-items--center">
					<view class="receiver_box_com_con_left">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view style="width: 100%;">{{ date }}</view>
						</picker>
					</view>
					<view class="receiver_box_com_con_right">{{ listing || '星座' }}</view>
				</view>
			</view>
			<!-- 你的身高 -->
			<view class="receiver_box_com">
				<title title="你的身高"></title>
				<view class="receiver_box_com_con flex flex--align-items--center">
					<input
						class="receiver_box_com_con_left"
						type="number"
						placeholder="请输入您的身高"
						v-model="heights"
					/>
					<view class="receiver_box_com_con_right">cm</view>
				</view>
			</view>
			<!-- 你的体重 -->
			<view class="receiver_box_com">
				<title title="你的体重"></title>
				<view class="receiver_box_com_con flex flex--align-items--center">
					<input
						class="receiver_box_com_con_left"
						type="number"
						placeholder="请输入您的体重"
						v-model="weight"
					/>
					<view class="receiver_box_com_con_right">kg</view>
				</view>
			</view>
			<view class="receiver_box_pation">
				<title title="你的性别"></title>
				<view class="receiver_box_pation_con flex flex--wrap">
					<view
						class="box_pation_con_list"
						:class="{ 'active': sexIndex === index }"
						v-for="(item,index) in sexList"
						:key="item.id"
						@click="setSex(index,item.id)"
					>{{ item.title }}</view>
				</view>
			</view>
			<!-- 你的职业 -->
			<view class="receiver_box_pation">
				<title title="你的职业"></title>
				<view class="receiver_box_pation_con flex flex--wrap">
					<view
						class="box_pation_con_list"
						:class="{ 'active': pationIndex === index }"
						v-for="(item,index) in jobList"
						:key="item.id"
						@click="setPation(index,item.title)"
					>{{ item.title }}</view>
					<input
						class="box_pation_con_list"
						style="background: #07ACB6;color: #fff;"
						type="text"
						placeholder="自定义"
						placeholder-style="color: #fff;"/>
				</view>
			</view>
			<!-- 个人简介 -->
			<view class="receiver_box_pation">
				<title title="个人简介"></title>
				<view class="receiver_box_pation_con flex flex--wrap">
					<view
						class="box_pation_con_list"
						:class="{ 'active': item.isShow  }"
						v-for="(item,index) in detailList"
						:key="item.id"
						@click="setDetail(index,item.title)"
					>{{ item.title }}</view>
				</view>
				<!-- <textarea
					class="box_text_con"
					placeholder="请输入你的个人简介，让别人记住你哈。"
					v-model="text"
				/> -->
			</view>
			<view class="receiver_box_btn" @click="setNext">下一步</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				date: '2021-05-25',
				heights: '',
				weight: '',
				pationIndex: 0,
				pationText: '',
				listing: '',
				jobList: [],
				sexList: [
					{
						id: 1,
						title: '男'
					},
					{
						id: 2,
						title: '女'
					}
				],
				sexIndex: 0,
				sex: 1,
				detailList: [],
				detailText: ''
			}
		},
		onLoad() {
			this.getListing('5.25')
			this.getJob()
			this.getDetail()
		},
		methods: {
			// 获取个人简介
			async getDetail() {
				const { data } = await this.$http('/api/tags_detail/lists')
				data.forEach(v => v['isShow'] = false)
				this.detailList = data
			},
			// 获取职业标签
			async getJob() {
				const { data } = await this.$http('/api/tags_job/lists')
				this.pationText = data[0].title
				this.jobList = data
			},
			// 获取年月日
			bindDateChange(e) {
				this.date = e.target.value
				let date = this.date.split('-')
				date[1] = parseInt(date[1]) < 10 ? date[1].split('')[1] : date[1]
				date[2] = parseInt(date[2]) < 10 ? date[2].split('')[1] : date[2]
				let newDate = date[1] + '.' + date[2]
				this.getListing(newDate)
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
			// 选择标签
			setPation(index,title) {
				this.pationIndex = index
				this.pationText = title
			},
			setSex(index, id) {
				this.sex = id
				this.sexIndex = index
			},
			setDetail(index, title) {
				this.detailList[index].isShow = !this.detailList[index].isShow
				let arr = []
				this.detailList.forEach(v=>{
					if(v.isShow){
						arr.push(v.title)
					} 
				})
				this.detailText = arr.join(',')
			},
			// 下一步
			setNext() {
				if(this.heights === '') {
					this.showToasts('请输入身高')
					return
				}
				if(this.weight === '') {
					this.showToasts('请输入体重')
					return
				}
				if(this.text === '') {
					this.showToasts('请输入简介')
					return
				}
				let data = {
					birthday: this.date,
					height: this.heights,
					weight: this.weight,
					job: this.pationText,
					intro: this.detailText,
					conste: this.listing,
					sex: this.sex
				}
				this.$store.commit('setApplyData',data)
				uni.navigateTo({
					url: '/pages/applyImage/applyImage?data=' + JSON.stringify(data)
				})
			},
			showToasts(title) {
				uni.showToast({
					title: title,
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.receiver {
		height: 100%;
		.receiver_box {
			flex: 1;
			overflow: auto;
			padding: 34rpx 22rpx 0 22rpx;
			.receiver_box_title {
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
			.receiver_box_com {
				width: 100%;
				.receiver_box_com_con {
					height: 88rpx;
					background: #F8F8F8;
					position: relative;
					view {
						width: 50%;
						text-align: center;
						font-size: 36rpx;
					}
					.receiver_box_com_con_left {
						text-align: center;
						color: #2F2F2F;
					}
					.receiver_box_com_con_right {
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
			.receiver_box_pation {
				width: 100%;
				.receiver_box_pation_con {
					.box_pation_con_list {
						width: 160rpx;
						height: 62rpx;
						line-height: 62rpx;
						text-align: center;
						background: #F8F8F8;
						font-size: 26rpx;
						color: #333;
						margin: 20rpx 20rpx 0 0;
						&:nth-child(4n+4) {
							margin-right: 0;
						}
						&:nth-child(-n+4) {
							margin-top: 0;
						}
						&.active {
							background: #07ACB6;
							color: #fff;
						}
					}
				}
			}
			.receiver_box_text {
				width: 100%;
				.box_text_con {
					width: 100%;
					height: 232rpx;
					box-sizing: border-box;
					background: #F8F8F8;
					padding: 30rpx;
					font-size: 26rpx;
					color: #060606;
				}
			}
			.receiver_box_btn {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				border-radius: 40rpx;
				background: #000;
				font-size: 32rpx;
				color: #fff;
				margin: 32rpx 0;
			}
		}
	}
</style>
