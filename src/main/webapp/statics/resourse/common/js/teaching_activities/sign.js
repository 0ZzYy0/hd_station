//获取微信配置
getWxConfig();

$('.go_sign').live('click', function() {
	wx.scanQRCode({
		needResult: 1,
		// 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
		scanType: ["qrCode", "barCode"],
		// 可以指定扫二维码还是一维码，默认二者都有
		success: function(res) {
			result = res.resultStr; // 当needResult 为 1
			// 时，扫码返回的结果
			// WeixinJSBridge.invoke('closeWindow',{},function(res){});
			$.ajax({
				//url: getUrl("ClassSignIn", "saveClassSignIn", "json"),
				url: "${ctx}/saveClassSignIn.do",
				type: 'post',
				async: true,
				data: {
					"teachingActivictId": result
				},
				success: function(d) {
					window.location.reload();
				}
			});
		}
	});
});

function getNoSign(e,d) {
	var projectId = $('.class_category>div').eq(e).find('.category_tittle').attr('projectid');
	$.ajax({
		//url: getUrl("ClassSignIn","getNoSign","json"),
		url: "${ctx}/getNoSign.do",
		type: 'post',
		async: true,
		dataType: "json",
		data: {
			"teachingProjectId": d,
		},
		success: function(d) {
			if(d != null) {
				if(i < d[0].data.length != 0){
					$('.category_wrapper').html('');
					for(var i = 0; i < d[0].data.length; i++) {
						$('.category_wrapper').append(
							'<div class="" style="background:#fff;padding-bottom: 10px; display: block;"><div class="class_content class_elective"><div class="class_time class_info"><p>' + d[0].data[i].teachingDate + '</p><p class="department" deptId="' + d[0].data[i].deptId + '">' + d[0].data[i].deptName + '</p><p class="cours_time">' + d[0].data[i].teachingStartTime + '-' + d[0].data[i].teachingEndTime + '</p></div><div class="class_name class_info"><a href="javascript:void(0);" data-ajax="false"><p class="cours_name" teachingActivityId="' + d[0].data[i].teachingActivityId + '">' + d[0].data[i].teachingContent + '</p><p class="cours_info">主讲人：<span>' + d[0].data[i].teacherName + '</span></p><p class="cours_info">地点：<span>' + d[0].data[i].teachingPlace + '</span></p></a></div><div class="class_function"></div></div><!--<a href="javascript:void(0);" class="repair_sign">补签</a>--></div>');
					}
				}else{
					$('.category_wrapper').append('<div class="no_class"><i class="iconfont">&#xe6f5;</i><span>没有需要学习的课程</span></div>');
				}
			}
		}
	});
}

window.onload = function(){
	$.ajax({
		//url: getUrl("ClassSignIn","getSignInCount","json"),
		url: "${ctx}/getSignInCount.do",
		type: 'post',
		async: false,
		dataType: "json",
		success: function(d) {
			if(d != null) {
				var categoryId = d[0].data[0].projectId;
				for(var i = 0; i < d[0].data.length; i++) {
					$('.class_category').append('<div class=""><p class=""><span class="countSign">' + d[0].data[i].countSign + '</span> /<span class="count">' + d[0].data[i].count + '</span></p><p class="category_tittle" projectId="' + d[0].data[i].projectId + '">' + d[0].data[i].calssType + '</p></div>');
				}
				$('.class_category>div').eq(0).addClass('active_category');
				 getNoSign(0,categoryId);
				$('.class_category>div').click(function() {
					$(this).addClass('active_category');
					$(this).siblings().removeClass('active_category');
					getNoSign($(this).index(),d[0].data[$(this).index()].projectId);
				});
			}
		}
	});
}