var identity = 0,
	ajaxWay= "";

switch(identity) {
	case 0:
		console.log('student');
		//学生
		(function($) {
			var markDate = '';
			$.ajax({
				//url: getUrl("ClassManage", "getClassDate", "json"),
				url: "${ctx}/getClassDate.do",
				type: "post",
				async: true,
				dataType: 'json',
				success: function(d) {
					jeDate(d[0].data);
				}
			});
		})(jQuery);
		ajaxWay = "getClassList";
		searchDate(ajaxWay);
		break;
	case 1:
		console.log('instructional');
		//教秘
		(function($) {
			var markDate = '';
			$.ajax({
				//url: getUrl("ClassManage", "getClassDate", "json"),
				url: "${ctx}/getClassDate.do",
				type: "post",
				async: true,
				dataType: 'json',
				success: function(d) {
					jeDate(d[0].data);
				}
			});
		})(jQuery);
		ajaxWay = "getTeacherClassList";
		searchDate(ajaxWay);
		break;
	case 2:
		console.log('teachingD');
		// 教学部
		(function($) {
			var markDate = '';
			$.ajax({
				//url: getUrl("ClassManage", "getClassDate", "json"),
				url: "${ctx}/getClassDate.do",
				type: "post",
				async: true,
				dataType: 'json',
				success: function(d) {
					jeDate(d[0].data);
				}
			});
		})(jQuery);
		ajaxWay = "getHospClassList";
		searchDate(ajaxWay);
		break;
	case 3:
		console.log('Teacher');
		// 老师
		(function($) {
			var markDate = '';
			$.ajax({
				//url: getUrl("ClassManage", "getClassDate", "json"),
				url: "${ctx}/getClassDate.do",
				type: "post",
				async: true,
				dataType: 'json',
				success: function(d) {
					jeDate(d[0].data);
				}
			});
		})(jQuery);
		ajaxWay = "getTecClassList";
		searchDate(ajaxWay);
		break;
}

function jeDate(data) {
	$("#datefix").jeDate({
		fixedCell: "refix",
		isClear: true,
		isok: true,
		//marks: data,
		marks: ['2017-06-16'],
		minDate: '2017-01-01',
		maxDate: '2027-01-01',
		format: "YYYY-MM-DD",
		zIndex: 3000,
		choosefun: function(elem, val, date) {
			//		console.log(val)
		},
		okfun: function(elem, val, date) {
			//		console.log(val)
		}
	})
}

function searchDate(ajaxWay) {
	$('.search_date').click(function() {
		$('.class_wrapper_e').html('');
		var teachingDate = $("#datefix").val();
		if($("#datefix").val() != '') {
			$.ajax({
				//url: getUrl("ClassManage", ajaxWay , "json"),
				url: "${ctx}/'+ ajaxWay + '.do",
				type: "post",
				async: true,
				dataType: 'json',
				data: {
					teachingDate: teachingDate
				},
				success: function(d) {
					if(d != null) {
						if(d[0].data.deptlist.length != 0) {
							for(var i = 0; i < d[0].data.deptlist.length; i++) {
								for(var a = 0; a < d[0].data.deptlist[i].classList.length; a++) {
									$('.class_wrapper_e').append('<div class="class_content class_elective"><div class="class_time class_info class_info_1"><p class="required_date">' + d[0].data.deptlist[i].classList[a].teachingDate + '</p><p class="department" teachingActivityId="' + d[0].data.deptlist[i].classList[a].teachingActivityId + '">' + d[0].data.deptlist[i].classList[a].deptName + '</p><p class="cours_time">' + d[0].data.deptlist[i].classList[a].teachingStartTime + '-' + d[0].data.deptlist[i].classList[a].teachingEndTime + '</p></div><div class="class_name class_info class_info_2"><a href="#popupBasic" data-rel="popup" class="" data-transition="pop" ><p class="cours_name">' + d[0].data.deptlist[i].classList[a].teachingContent + '</p><p class="cours_info">主讲人：<span>' + d[0].data.deptlist[i].classList[a].teacherName + '</span></p><p class="cours_info">地点：<span>' + d[0].data.deptlist[i].classList[a].teachingPlace + '</span></p></a></div><div class="class_function"><p class=""></p><p class="class_state class_hidden"><a href="javascript:void(0);" class="sgin">签到</a>	</p><p class="stu_num class_hidden"><span>150</span> /<span>150</span></p></div></div>');
								}
							}
						} else {
							$('.class_wrapper_e').append('<div class="no_class" style="background:#fff;"><div class="class_content class_required"><div class="class_name class_info class_info_2"><a href="#"><p></p><p><i class="iconfont">&#xe6f5;</i><span>今天没有需要学习的课程</span></p><p class="cours_info"></p></a></div></div>');
						}
					}
				}
			});
		} else {
			alert("搜索日期不能为空");
		}
	});

}

