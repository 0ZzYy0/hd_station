indexFooter();

var identity = 0;

switch(identity) {
	case 0:
		console.log('Student');
	
		// 获取微信配置
		getWxConfig();
		
		viewDataStu();
		
		$('.sgin[signState="未签到"]').on('click', function() {
			wx.scanQRCode({
				needResult: 1,
				// 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
				scanType: ["qrCode", "barCode"],
				// 可以指定扫二维码还是一维码，默认二者都有
				success: function(res) {
					result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
					// WeixinJSBridge.invoke('closeWindow',{},function(res){});
					$.ajax({
						url: "${ctx}/showCodeCourseSignInMobile.do",
						type: 'post',
						async: true,
						data: {
							"teachingActivictId": result
						},
						success: function(d) {
							if(d == "ok") {
								$('.class_wrapper_r').html('<div class="ui-body ui-corner-all ui-body-a class_tittle class_required required_tittle"><i class="iconfont">&#xe6f4;</i>必修课提醒<span class="required_date"></span></div>');
								$('.class_wrapper_e').html('');
								viewData();
							}
						},
					});
				}
			});
		});
		break;
	case 1:
		console.log('instructional');
		
		$('.class_wrapper_c').hide();
		
		$('.required_tittle').html('<i class="iconfont">&#xe6f4;</i>您的课程提醒<span class="required_date"></span>');
		
		viewDataIn();
		
		$('.sgin').on('click', function(){
			localStorage.teachingActivityId = $(this).attr('teachingactivityid');
		});
		
		break;
	case 2:
		console.log('teachingD');
		
		viewDataTeacherD();
		
		$('.required_tittle').html('<i class="iconfont">&#xe6f4;</i>今日课程提醒<span class="required_date"></span>');
		
		$('.class_wrapper_c').hide();
		
		$('.class_tips').hide();
		
		$('.class_steering').on('click',function(){
			localStorage.teachingActivityId = $(this).attr('teachingactivityid');
		});
		
		break;
	case 3:
		console.log('Teacher');
		
		$('.required_tittle').html('<i class="iconfont">&#xe6f4;</i>您的课程提醒<span class="required_date"></span>');

		$('.class_wrapper_c').hide();
		
		viewDataTeacher();
		
		break;
}


function viewDataStu() {
	$.ajax({
		url: "${ctx}/listFilterCourseManagementMobile.do",
		type: "post",
		async: true,
		dataType: 'json',
		success: function(d) {
			$('.userName').html(d[0].data.userName + '同学');
			if(d[0].data.dayList.length != 0) {
				$('.today_date').html(d[0].data.dayList[0].teachingDate);
				$('.dayCount').html(d[0].data.dayList[0].dayCount);
				// 判断必修课提醒是不是今天
				if(d[0].data.dayList[0].dayCount != 0) {
					// 不是今天正常输出
					$('.className').html(d[0].data.dayList[0].className);
				} else {
					// 是今天提示为今天
					$('.class_tips p').html('<i class="iconfont">&#xe661;</i>今天有一门必修课<span class="className" style="margin: 0 5px;color: #FF0000; font-size: 20px;">' + d[0].data.dayList[0].className + '</span>');
				}
			}

			// 判断今天有没有必修课
			if(d[0].data.requiredList.length != 0) {
				for(var i = 0; i < d[0].data.requiredList.length; i++) {
					$('.class_wrapper_r').append('<div class="" style="background:#fff;"><div class="class_content class_required"><div class="class_time class_info class_info_1"><p class="required_date">' + d[0].data.requiredList[i].teachingDate + '</p><p class="department">' + d[0].data.requiredList[i].deptName + '</p><p class="cours_time">' + d[0].data.requiredList[i].teachingStartTime + '-' + d[0].data.requiredList[i].teachingEndTime + '</p></div><div class="class_name class_info class_info_2"><a href="#popupBasic" data-rel="popup" class="" data-transition="pop" teachingActivityId="' + d[0].data.requiredList[i].teachingActivityId + '"><p class="cours_name">' + d[0].data.requiredList[i].teachingContent + '</p><p class="cours_info">主讲人：<span>' + d[0].data.requiredList[i].teacherName + '</span></p><p class="cours_info">地点：<span>' + d[0].data.requiredList[i].teachingPlace + '</span></p></a></div><div class="class_function"><p class="cours_category">' + d[0].data.requiredList[i].classType + '</p></p><p class="class_state"><a href="javascript:void(0);" class="sgin" signState="' + d[0].data.requiredList[i].signState + '">' + d[0].data.requiredList[i].signState + '</a></p><p class="stu_num class_hidden"><span>150</span> /<span>150</span></p></div></div></div>');
               }
				// 不是今天正常输出
			} else {
				$('.class_wrapper_r').append('<div class="no_class" style="background:#fff;"><div class="class_content class_required"><div class="class_name class_info class_info_2"><a href="#"><p></p><p><i class="iconfont">&#xe6f5;</i><span>今天没有需要学习的课程</span></p><p class="cours_info"></p></a></div></div>');
				// 是今天提示为今天
			}

			for(var i = 0; i < d[0].data.electiveList.length; i++) {
				if(d[0].data.electiveList.length != 0) {
					$('.class_wrapper_c').append('<div class="class_content class_elective"><div class="class_time class_info class_info_1"><p class="required_date">' + d[0].data.electiveList[i].teachingDate + '</p><p class="department" teachingActivityId="' + d[0].data.electiveList[i].teachingActivityId + '">' + d[0].data.electiveList[i].deptName + '</p><p class="cours_time">' + d[0].data.electiveList[i].teachingStartTime + '-' + d[0].data.electiveList[i].teachingEndTime + '</p></div><div class="class_name class_info class_info_2"><a href="#popupBasic" data-rel="popup" class="" data-transition="pop" ><p class="cours_name">' + d[0].data.electiveList[i].teachingContent + '</p><p class="cours_info">主讲人：<span>' + d[0].data.electiveList[i].teacherName + '</span></p><p class="cours_info">地点：<span>' + d[0].data.electiveList[i].teachingPlace + '</span></p></a></div><div class="class_function"><p class=""></p><p class="class_state class_hidden"><a href="javascript:void(0);" class="sgin">签到</a>	</p><p class="stu_num class_hidden"><span>150</span> /<span>150</span></p></div></div>');
					// 不是今天正常输出
				} else {
					$('.class_wrapper_c').append('<div class="no_class" style="background:#fff;"><div class="class_content class_required"><div class="class_name class_info class_info_2"><a href="#"><p></p><p><i class="iconfont">&#xe6f5;</i><span>今天没有需要学习的课程</span></p><p class="cours_info"></p></a></div></div>');
					// 是今天提示为今天
				}
			}
		}
	});
}

function viewDataIn() {
	$.ajax({
		url: "${ctx}/listTecIndexCourseManagementMobile.do",
		type: "post",
		async: true,
		dataType: 'json',
		success: function(d) {
			$('.userName').html(d[0].data.userName + '教秘');
			if(d[0].data.dayList.length != 0) {
				$('.today_date').html(d[0].data.dayList[0].teachingDate);
				$('.dayCount').html(d[0].data.dayList[0].dayCount);
				// 判断必修课提醒是不是今天
				if(d[0].data.dayList[0].dayCount != 0) {
					// 不是今天正常输出
					$('.className').html(d[0].data.dayList[0].className);
				} else {
					// 是今天提示为今天
					$('.class_tips p').html('<i class="iconfont">&#xe661;</i>今天有一门要上的课程<span class="className" style="margin: 0 5px;color: #FF0000; font-size: 20px;">' + d[0].data.dayList[0].className + '</span>');
				}
			}

			// 判断今天有没有课
			if(d[0].data.classList.length != 0) {
				$.each(d[0].data.classList, function(i) {
					$('.class_wrapper_r').append('<div class="instructional" style="background:#fff;"><div class="class_content class_required"><div class="class_time class_info class_info_1"><p class="required_date">' + d[0].data.classList[i].teachingDate + '</p><p class="department">' + d[0].data.classList[i].deptName + '</p><p class="cours_time">' + d[0].data.classList[i].teachingStartTime + '-' + d[0].data.classList[i].teachingEndTime + '</p></div><div class="class_name class_info class_info_2"><a href="#popupBasic" data-rel="popup" class="" data-transition="pop" teachingActivityId="' + d[0].data.classList[i].teachingActivityId + '"><p class="cours_name">' + d[0].data.classList[i].teachingContent + '</p><p class="cours_info">主讲人：<span>' + d[0].data.classList[i].teacherName + '</span></p><p class="cours_info">地点：<span>' + d[0].data.classList[i].teachingPlace + '</span></p><p class="cours_info sgin_state" sginCountYes="'+ d[0].data.classList[i].sginCountYes +'">签到状态：<span class="sgin_state_tittle"><span class="state_content"></span></span></p></a></div><div class="class_function"><p class="cours_category">' + d[0].data.classList[i].teachingName + '</p><p class="class_state"><a href="sgin_code.html" data-ajax="false" class="sgin class_steering" teachingActivityId="' + d[0].data.classList[i].teachingActivityId + '">签到</a>	</p><p class="stu_num class_none"><span>150</span> /<span>150</span></p></div></div></div></div>');
					$('.sgin_state').each(function(){
						if($(this).attr('sginCountYes') != 0){
							$(this).children('.sgin_state_tittle').html('已签到' + '&nbsp;<span class="state_content"></span>');
							$(this).find('.state_content').html(d[0].data.classList[i].sginCountYes + '/' + d[0].data.classList[i].sginCount);
						}else{
							$(this).children('.sgin_state_tittle').html('未签到');
						}
					});
					$('.class_required p.cours_name').css('color','#666666');
				});
				// 不是今天正常输出
			} else {
				$('.class_wrapper_r').append('<div class="no_class" style="background:#fff;"><div class="class_content class_required"><div class="class_name class_info class_info_2"><a href="#"><p></p><p><i class="iconfont">&#xe6f5;</i><span>今天要上的课程</span></p><p class="cours_info"></p></a></div></div>');
				// 是今天提示为今天
			}
		}
	});
}

function viewDataTeacherD() {
	$.ajax({
		url: "${ctx}/listTecIndexCourseManagementMobile.do",
		type: "post",
		async: true,
		dataType: 'json',
		success: function(d) {
			$('.userName').html(d[0].data.userName + '督导老师');
			if(d[0].data.dayList.length != 0) {
				$('.today_date').html(d[0].data.dayList[0].teachingDate);
				$('.dayCount').html(d[0].data.dayList[0].dayCount);
				// 判断必修课提醒是不是今天
				if(d[0].data.dayList[0].dayCount != 0) {
					// 不是今天正常输出
					$('.className').html(d[0].data.dayList[0].className);
				} else {
					// 是今天提示为今天
					$('.class_tips p').html('<i class="iconfont">&#xe661;</i>今天有一门要上的课程<span class="className" style="margin: 0 5px;color: #FF0000; font-size: 20px;">' + d[0].data.dayList[0].className + '</span>');
				}
			}

			// 判断今天有没有课
			if(d[0].data.classList.length != 0) {
				$.each(d[0].data.classList,function(i){
					$('.class_wrapper_r').append('<div class="TeacherD" style="background:#fff;"><div class="class_content class_required"><div class="class_time class_info class_info_1"><p class="required_date">' + d[0].data.classList[i].teachingDate + '</p><p class="department">' + d[0].data.classList[i].deptName + '</p><p class="cours_time">' + d[0].data.classList[i].teachingStartTime + '-' + d[0].data.classList[i].teachingEndTime + '</p></div><div class="class_name class_info class_info_2"><a href="#popupBasic" data-rel="popup" class="" data-transition="pop" teachingActivityId="' + d[0].data.classList[i].teachingActivityId + '"><p class="cours_name">' + d[0].data.classList[i].teachingContent + '</p><p class="cours_info">主讲人：<span>' + d[0].data.classList[i].teacherName + '</span></p><p class="cours_info">地点：<span>' + d[0].data.classList[i].teachingPlace + '</span></p><p class="cours_info sgin_state" sginCountYes="'+ d[0].data.classList[i].sginCountYes +'">签到状态：<span class="sgin_state_tittle"><span class="state_content"></span></span></p></a></div><div class="class_function"><p class="cours_category">' + d[0].data.classList[i].teachingName + '</p><p class="class_state"><a href="class_steering.html" data-ajax="false" class="sgin class_steering" teachingActivityId="' + d[0].data.classList[i].teachingActivityId + '"><i class="iconfont">&#xe8d2;</i></a>	</p><p class="stu_num class_none"><span>150</span> /<span>150</span></p></div></div></div></div>' );
					$('.sgin_state').each(function(){
						if($(this).attr('sginCountYes') != 0){
							$(this).children('.sgin_state_tittle').html('已签到' + '&nbsp;<span class="state_content"></span>');
							$(this).find('.state_content').html(d[0].data.classList[i].sginCountYes + '/' + d[0].data.classList[i].sginCount);
						}else{
							$(this).children('.sgin_state_tittle').html('未签到');
						}
					});
					$('.class_required p.cours_name').css('color','#666666');
				});
				// 不是今天正常输出
			} else {
				$('.class_wrapper_r').append('<div class="no_class" style="background:#fff;"><div class="class_content class_required"><div class="class_name class_info class_info_2"><a href="#"><p></p><p><i class="iconfont">&#xe6f5;</i><span>今天要上的课程</span></p><p class="cours_info"></p></a></div></div>');
				// 是今天提示为今天
			}
		}
	});
}

function viewDataTeacher() {
	$.ajax({
		url: "${ctx}/listTecIndexCourseManagementMobile.do",
		type: "post",
		async: true,
		dataType: 'json',
		success: function(d) {
			$('.userName').html(d[0].data.userName + '老师');
			if(d[0].data.dayList.length != 0) {
				$('.today_date').html(d[0].data.dayList[0].teachingDate);
				$('.dayCount').html(d[0].data.dayList[0].dayCount);
				// 判断必修课提醒是不是今天
				if(d[0].data.dayList[0].dayCount != 0) {
					// 不是今天正常输出
					$('.className').html(d[0].data.dayList[0].className);
				} else {
					// 是今天提示为今天
					$('.class_tips p').html('<i class="iconfont">&#xe661;</i>今天有一门要上的课程<span class="className" style="margin: 0 5px;color: #FF0000; font-size: 20px;">' + d[0].data.dayList[0].className + '</span>');
				}
			}

			// 判断今天有没有课
			if(d[0].data.classList.length != 0) {
				$.each(d[0].data.classList, function(i) {
					$('.class_wrapper_r').append('<div class="Teacher" style="background:#fff;"><div class="class_content class_required"><div class="class_time class_info class_info_1"><p class="required_date">' + d[0].data.classList[i].teachingDate + '</p><p class="department">' + d[0].data.classList[i].deptName + '</p><p class="cours_time">' + d[0].data.classList[i].teachingStartTime + '-' + d[0].data.classList[i].teachingEndTime + '</p></div><div class="class_name class_info class_info_2"><a href="#popupBasic" data-rel="popup" class="" data-transition="pop" teachingActivityId="' + d[0].data.classList[i].teachingActivityId + '"><p class="cours_name">' + d[0].data.classList[i].teachingContent + '</p><p class="cours_info">主讲人：<span>' + d[0].data.classList[i].teacherName + '</span></p><p class="cours_info">地点：<span>' + d[0].data.classList[i].teachingPlace + '</span></p></a></div><div class="class_function"><p class="cours_category">' + d[0].data.classList[i].teachingName + '</p><p class="class_state class_hidden"><a href="javascript:void(0);" class="sgin"></a>	</p><p class="stu_num class_hidden"><span>150</span> /<span>150</span></p></div></div></div>');
				});
				// 不是今天正常输出
			} else {
				$('.class_wrapper_r').append('<div class="no_class" style="background:#fff;"><div class="class_content class_required"><div class="class_name class_info class_info_2"><a href="#"><p></p><p><i class="iconfont">&#xe6f5;</i><span>今天要上的课程</span></p><p class="cours_info"></p></a></div></div>');
				// 是今天提示为今天
			}
		}
	});
}