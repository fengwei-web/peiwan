<template>
	<view class="playList flex flex--row">
		<navBar></navBar>
		<view class="playListHead flex flex--align-items--center">
			<block v-for="(item, index) in playList" :key="item.id">
				<view
					class="playListHeadItem"
					:class="{ 'active': playIndex === index }"
					@click="playIndex = index"
				>
					<image :src="baseUrl + item.images[0]" mode="aspectFill" />
				</view>
			</block>
		</view>
		
		
		
		<view class="swiper">
			<swiper class="content" :circular="true">
				<swiper-item v-for="(item, index) in playList[playIndex].images" :key="index">
					<image :src="baseUrl + item" mode="aspectFill" />
				</swiper-item>
			</swiper>
			<view class="playInfo">
				<view class="playInfoTitle">{{ playList[playIndex].nickname }}</view>
				<view class="playInfoDesc">
					{{ playList[playIndex].height + 'cm' }}
					/
					{{ playList[playIndex].weight + 'kg' }}
					/
					{{ playList[playIndex].conste }}
				</view>
				<view class="playInfoCity">
					<text>{{ playList[playIndex].province }}</text> · {{ playList[playIndex].city }}
				</view>
			</view>
		</view>
		
		
		<view class="playBtn" @click="returnPage">立即下单</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				playList: [],
				playIndex: 0
			}
		},
		onLoad() {
			this.getPlayList()
		},
		computed: {
			...mapState(['baseUrl'])
		},
		methods: {
			async getPlayList() {
				const { data } = await this.$http('/api/play_with/lists')
				this.playList = data
			},
			returnPage() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.playList {
		height: 100%;
		.playListHead {
			.playListHeadItem {
				width: 135rpx;
				height: 135rpx;
				margin-right: 20rpx;
				image {
					width: 100%;
					height: 100%;
					vertical-align: middle;
				}
				&:last-of-type {
					margin-right: 0;
				}
				&.active {
					position: relative;
					&::after {
						content: '';
						width: 115rpx;
						height: 115rpx;
						border: 10rpx solid #0AAFB9;
						position: absolute;
						top: 0;
						left: 0;
					}
					// border: 4rpx solid red;
				}
			}
		}
		.swiper {
			flex: 1;
			// background: #ff0;
			margin-top: 20rpx;
			position: relative;
			.content {
				width: 100%;
				height: 100%;
				image {
					width: 100%;
					height: 100%;
					vertical-align: middle;
				}
			}
			.playInfo {
				position: absolute;
				top: 100rpx;
				left: 60rpx;
				.playInfoTitle {
					display: inline-block;
					padding: 10rpx 20rpx;
					background: #000;
					font-size: 30rpx;
					font-weight: bold;
					color: #fff;
				}
				.playInfoDesc {
					font-size: 28rpx;
					color: #fff;
					margin-top: 30rpx;
				}
				.playInfoCity {
					font-size: 28rpx;
					color: #fff;
					margin-top: 20rpx;
					text {
						color: #0AAFB9;
					}
				}
			}
		}
		.playBtn {
			width: 280rpx;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			background: #0AAFB9;
			border-radius: 10rpx;
			position: fixed;
			left: 50%;
			margin-left: -140rpx;
			bottom: 100rpx;
			font-size: 28rpx;
			color: #fff;
		}
	}
</style>
