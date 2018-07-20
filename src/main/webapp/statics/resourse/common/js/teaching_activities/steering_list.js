viewDataTeacherD();

function viewDataTeacherD() {
	$.ajax({
		//url: getUrl("ClassManage", "getSignClassList", "json"),
		url: "${ctx}/getSignClassList.do",
		type: 'post',
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
					$('.main').append('<div class="TeacherD" style="background:#fff;"><div class="class_content class_required"><div class="class_time class_info class_info_1"><p class="required_date">' + d[0].data.classList[i].teachingDate + '</p><p class="department">' + d[0].data.classList[i].deptName + '</p><p class="cours_time">' + d[0].data.classList[i].teachingStartTime + '-' + d[0].data.classList[i].teachingEndTime + '</p></div><div class="class_name class_info class_info_2"><a href="#popupBasic" data-rel="popup" class="" data-transition="pop" teachingActivityId="' + d[0].data.classList[i].teachingActivityId + '"><p class="cours_name">' + d[0].data.classList[i].teachingContent + '</p><p class="cours_info">主讲人：<span>' + d[0].data.classList[i].teacherName + '</span></p><p class="cours_info">地点：<span>' + d[0].data.classList[i].teachingPlace + '</span></p><p class="cours_info sgin_state" sginCountYes="'+ d[0].data.classList[i].sginCountYes +'">签到状态：<span class="sgin_state_tittle"><span class="state_content"></span></span></p></a></div><div class="class_function"><p class="cours_category">' + d[0].data.classList[i].teachingName + '</p><p class="class_state"><a href="class_steering.html" data-ajax="false" class="sgin class_steering" teachingActivityId="' + d[0].data.classList[i].teachingActivityId + '"><i class="iconfont">&#xe8d2;</i></a>	</p><p class="stu_num class_none"><span>150</span> /<span>150</span></p></div></div></div></div>' );
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
				$('.main').append('<div class="no_class" style="background:#fff;"><div class="class_content class_required"><div class="class_name class_info class_info_2"><a href="#"><p></p><p><i class="iconfont">&#xe6f5;</i><span>今天要上的课程</span></p><p class="cours_info"></p></a></div></div>');
				// 是今天提示为今天
			}
		}
	});
}

$('.filter').click(function() {
	$.ajax({
		//url: getUrl("ClassManage", "getClassCondition", "json"),
		url: "${ctx}/getClassCondition.do",
		type: 'post',
		async: true,
		dataType: "json",
		success: function(d) {
			if(d != null && $('.courses_p select option').length == 0) {
				for(var i = 0; i < d[0].data.project.length; i++) {
					$('.courses_p select').append('<option value="' + d[0].data.project[i].teachingProjectId + '" selected="selected">' + d[0].data.project[i].projectName + '</option>');
				}

				for(var i = 0; i < d[0].data.subject.length; i++) {
					$('.base_name select').append('<option value="' + d[0].data.subject[i].subjectId + '" selected="selected">' + d[0].data.subject[i].subjectName + '</option>');
				}

				for(var i = 0; i < d[0].data.dept.length; i++) {
					$('.mask_d_name select').append('<option value="' + d[0].data.dept[i].deptId + '" selected="selected">' + d[0].data.dept[i].deptName + '</option>');
				}
			}
		}
	});
});

$('.search_cours').click(function() {
	var selectVal1 = $(".courses_p select").val();
	var selectVal2 = $(".course_type select").val();
	var courses_s_val = '';
	(function($) {
		$.each($('.courses_s input:radio:checked'), function() {
			courses_s_val = $(this).val();
		});
	})(jQuery);
	var selectVal3 = $(".base_name select").val();
	var selectVal4 = $(".mask_d_name select").val();
	var mask_t_val = $('.mask_t_name input').val();
	var start_time_val = $('.start_time input').val();
	var end_time_val = $('.end_time input').val();
	var jsonStr = [{
		"teachingProjectId": selectVal1,
		"classType": selectVal2,
		"isOver": courses_s_val,
		"subjectId": selectVal3,
		"deptId": selectVal4,
		"teacherName": mask_t_val,
		"teachingStartDate": start_time_val,
		"teachingEndDate": end_time_val,
	}]
	var jsonArrayFinal = JSON.stringify(jsonStr);
	if(endThanStart(start_time_val, end_time_val) == true) {
		$(this).attr('data-rel', 'back');
		$('.main .TeacherD').remove();
		$.ajax({
			//url: getUrl("ClassManage", "getSignClassList", "json"),
			url: "${ctx}/getSignClassList.do",
			type: 'post',
			async: false,
			dataType: "json",
			data: {
				filter: jsonArrayFinal
			},
			success: function(d) {
				if(d != null) {
					viewDataTeacherD();
				}
			}
		});
	} else {
		$(this).attr('data-rel', '');
		return false;
	}
});

$('.clear_data').click(function() {
	$('.panel_mask input').val('');
	$(".my_form")[0].reset();
});