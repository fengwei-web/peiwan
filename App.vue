<script>
	export default {
		async onLaunch() {
			// const { data } = await this.$http('/api/member/info')
			// if(data.identity === 2){
			// 	uni.reLaunch({
			// 		url: '/pages/playHome/playHome'
			// 	})
			// }
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./static/css/flex.css");
	@import url("./static/css/icon.css");
	page {
		height: 100%;
	}
</style>
