const baseUrl = 'https://oneban.cn';

export default {
	request(url,data = {},header={}) {
		data.token = uni.getStorageSync('token')
		return new Promise((resolve,reject) => {
			uni.showLoading({
				mask: true,
				success() {
					uni.request({
						url: baseUrl + url,
						method: 'GET',
						data: data,
						header: header,
						success: res => {
							uni.hideLoading()
							if(res.statusCode === 200){
								resolve(res.data)
							}else{
								//加入接口参数错误或接口地址错误时 我们返回原错误提示
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								})
								reject(res.data.msg)
							}
						}
					})
				}
			})
		})
	}
}
