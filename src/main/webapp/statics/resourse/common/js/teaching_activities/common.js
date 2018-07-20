//结束时间不能小于开始时间 
function endThanStart(startTime, endTime) {
	var startdate = new Date((startTime).replace(/-/g, "/"));
	var enddate = new Date((endTime).replace(/-/g, "/"));
	if(enddate < startdate && startdate != '' && enddate != '') {
		alert('结束时间不能小于开始时间');
		return false;
	} else {
		return true;
	}
}

function show() {
	var mydate = new Date();
	var str = "" + mydate.getFullYear() + "年";
	str += (mydate.getMonth() + 1) + "月";
	str += mydate.getDate() + "日";
	return str;
}

function yearStr(){
	var mydate = new Date();
	var yearStr = mydate.getFullYear();
	var monthStr = mydate.getMonth() + 1;
	if(monthStr > 6 && monthStr <= 12) {
		yearStr += "下半年全院课程表";
		//console.log(yearStr);
	}
	if(monthStr <= 6 && monthStr >= 1) {
		yearStr += "上半年全院课程表";
		//console.log(yearStr);
	}
	return yearStr;
}

function dateReduce() {
	var date1 = new Date();
	var date2 = new Date('2017-5-29');
	var date = (date1.getTime() - date2.getTime()) / (24 * 60 * 60 * 1000);
	alert(parseInt(date));
}


function getWxConfig() {
	//访问后台获取加载微信接口必须的参数
	$.ajax({
		url: "${ctx}/queryWxConfigMainMobile.do",
		type: 'post',
		async: false,
		dataType: "json",
		data: {
			htmlUrl: window.location.href
		},
		success: function(data) {
			wx.config({
				debug: true,
				appId: data[0].appId,
				timestamp: data[0].timestamp,
				nonceStr: data[0].nonceStr,
				signature: data[0].signature,
				jsApiList: ['chooseImage', 'previewImage', 'uploadImage', 'scanQRCode']
			});
		}
	});
}
