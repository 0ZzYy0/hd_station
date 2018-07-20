$(document).ready(function() {
	$.mobile.loading("show");
	$.ajax({
		url: "${ctx}/queryWxConfigMainMobile.do",
		type: 'post',
		async: true,
		dataType: "json",
		data: {
			htmlUrl: window.location.href
		},
		success: function(data) {
			wx.config({
				debug: false,
				appId: data[0].appId,
				timestamp: data[0].timestamp,
				nonceStr: data[0].nonceStr,
				signature: data[0].signature,
				jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard']
			});
			$.mobile.loading("hide");
		}
	});
});