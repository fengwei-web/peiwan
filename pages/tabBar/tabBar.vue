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
			<index v-if="isShow"></index>
			<my v-else></my>
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
				isShow: true
			}
		},
		methods: {
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
