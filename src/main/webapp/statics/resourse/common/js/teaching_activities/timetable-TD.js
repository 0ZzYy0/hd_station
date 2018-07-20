viewDataDepart();

categoryData();

function viewDataDepart() {
	$.ajax({
		//url: getUrl("ClassManage", "getHospClassList", "json"),
		url: "${ctx}/getHospClassList.do",
		type: 'post',
		async: false,
		dataType: "json",
		success: function(d) {
			if(d != null) {
				$('#projectName').html(yearStr());
				for(var i = 0; i < d[0].data.deptlist.length; i++) {
					$('.main').append(
						'<div class="class_wrapper" Id="' + d[0].data.deptlist[i].deptId + '" >' +
						'<div class="ui-body ui-corner-all ui-body-a class_tittle class_required d_name_wrapper">' +
						'<div class="department_name" deptId="' + d[0].data.deptlist[i].deptId + '" >' +
						d[0].data.deptlist[i].deptName +
						'</div><div class="department_line"><a data-ajax="false" href="more.html?deptId=' + d[0].data.deptlist[i].deptId + '" style="color: #999;" class="more_timetable" deptId="' + d[0].data.deptlist[i].deptId + '">更多</a></div></div></div>');
					for(var a = 0; a < d[0].data.deptlist[i].classList.length; a++) {
						$('#' + d[0].data.deptlist[i].deptId).append(
							'<div class="courses_wrapper" style="background:#fff;">' +
							'<div class="class_content class_elective">' +
							'<div class="class_time class_info">' +
							//													'<p class="">' +
							//													'</p>'+
							'<p class="cours_data" style="margin-top:10px;">' +
							d[0].data.deptlist[i].classList[a].teachingDate +
							'</p>' +
							'<p class="cours_time">' +
							d[0].data.deptlist[i].classList[a].teachingStartTime +
							'-' +
							d[0].data.deptlist[i].classList[a].teachingEndTime +
							'</p>' +
							'</div>' +
							'<div class="class_name class_info">' +
							'<a href="javascript:void(0);" data-ajax="false">' +
							'<p class="cours_name">' +
							'<span class="cours">' +
							d[0].data.deptlist[i].classList[a].teachingContent +
							'</span>' +
							'<span class="cours_category">' +
							d[0].data.deptlist[i].classList[a].teachingName +
							'</span>' +
							'<span class="clear"></span>' +
							'</p>' +
							'<p class="cours_info">' +
							'主讲人：<span>' +
							d[0].data.deptlist[i].classList[a].teacherName +
							'</span>' +
							'</p>' +
							'<p class="cours_info">' +
							'&nbsp;地点：<span>' +
							d[0].data.deptlist[i].classList[a].teachingPlace +
							'</span>' +
							'</p>' +
							'</a>' +
							'</div>' +
							'</div>' +
							'</div>'
						);
					}
				}
			}
		}
	});
}

function categoryData(){
	$.ajax({
		//url: getUrl("ClassSignIn","getSignInCount","json"),
		url: "${ctx}/getSignInCount.do",
		type: 'post',
		async: true,
		data:{
			teachingProjectId:localStorage.teachingProjectId
		},
		success: function(d) {
			if(d != null) {
				for(var i = 0; i < d[0].data.length; i++) {
					$('.class_category').append('<div class="" teachingProjectId="' + d[0].data[i].teachingProjectId+ '"><p class=""><span class="countSign">' + d[0].data[i].count + '</span></p><p class="category_tittle" projectId="' + d[0].data[i].projectId + '">' + d[0].data[i].calssType + '</p></div>');
				}
				$('.class_category>div').eq(0).addClass('active_category');
				$('.class_category>div').click(function() {
					$(this).addClass('active_category');
					$(this).siblings().removeClass('active_category');
					getNoSign($(this).index());
				});
			}
		}
	});
}
(function($) {
	$('.class_category>div').click(function() {
		localStorage.teachingProjectId = $(this).attr('teachingProjectId');
		$(this).addClass('active_classify');
		$(this).siblings().removeClass('active_classify');
		var courseClassify = $(this).attr('courseClassify');
		$('.class_wrapper').remove();
		viewDataDepart();
	});
})(jQuery);

$('.filter').click(function() {
	$.ajax({
		//url: getUrl("ClassManage", "getClassCondition", "json"),
		url: "${ctx}/getClassCondition.do",
		type: 'post',
		async: true,
		dataType: "json",
		success: function(d) {
			if(d != null && $('.courses_p select option').length == 0) {
				$('.courses_p select').append('<option value="" selected="selected">请选择</option>');
				for(var i = 0; i < d[0].data.project.length; i++) {
					$('.courses_p select').append('<option value="' + d[0].data.project[i].teachingProjectId + '" selected="selected">' + d[0].data.project[i].projectName + '</option>');
				}
				$('.base_name select').append('<option value="" selected="selected">请选择</option>');
				for(var i = 0; i < d[0].data.subject.length; i++) {
					$('.base_name select').append('<option value="' + d[0].data.subject[i].subjectId + '" selected="selected">' + d[0].data.subject[i].subjectName + '</option>');
				}
				$('.mask_d_name select').append('<option value="" selected="selected">请选择</option>');
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
	var mask_t_val = $('.mask_t_name input').val()
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
		$('.main .class_wrapper').remove();
		$('.main .course_classify_w').remove();
		$.ajax({
			//url: getUrl("ClassManage", "getHospClassList", "json"),
			url: "${ctx}/getHospClassList.do",
			type: 'post',
			async: false,
			dataType: "json",
			data: {
				filter: jsonArrayFinal
			},
			success: function(d) {
				if(d != null) {
					for(var i = 0; i < d[0].data.deptlist.length; i++) {
						$('.category_wrapper').append(
							'<div class="class_wrapper" Id="' + d[0].data.deptlist[i].deptId + '" >' +
							'<div class="ui-body ui-corner-all ui-body-a class_tittle class_required d_name_wrapper">' +
							'<div class="department_name" deptId="' + d[0].data.deptlist[i].deptId + '" >' +
							d[0].data.deptlist[i].deptName +
							'</div>' +
							'<div class="department_line">' +
							'</div>' +
							'</div>' +
							'</div>');
						for(var a = 0; a < d[0].data.deptlist[i].classList.length; a++) {
							$('#' + d[0].data.deptlist[i].deptId).append(
								'<div class="courses_wrapper" style="background:#fff;">' +
								'<div class="class_content class_elective">' +
								'<div class="class_time class_info">' +
								//													'<p class="">' +
								//													'</p>'+
								'<p class="cours_data" style="margin-top:10px;">' +
								d[0].data.deptlist[i].classList[a].teachingDate +
								'</p>' +
								'<p class="cours_time">' +
								d[0].data.deptlist[i].classList[a].teachingStartTime +
								'-' +
								d[0].data.deptlist[i].classList[a].teachingEndTime +
								'</p>' +
								'</div>' +
								'<div class="class_name class_info">' +
								'<a href="javascript:void(0);" data-ajax="false">' +
								'<p class="cours_name">' +
								'<span class="cours">' +
								d[0].data.deptlist[i].classList[a].teachingContent +
								'</span>' +
								'<span class="cours_category">' +
								d[0].data.deptlist[i].classList[a].teachingName +
								'</span>' +
								'<span class="clear"></span>' +
								'</p>' +
								'<p class="cours_info">' +
								'主讲人：<span>' +
								d[0].data.deptlist[i].classList[a].teacherName +
								'</span>' +
								'</p>' +
								'<p class="cours_info">' +
								'&nbsp;地点：<span>' +
								d[0].data.deptlist[i].classList[a].teachingPlace +
								'</span>' +
								'</p>' +
								'</a>' +
								'</div>' +
								'</div>' +
								'</div>'
							);
						}
					}
				}
			}
		});
		$(this).attr('data-rel', 'close');
	} else {
		$(this).attr('data-rel', '');
		return false;
	}
});

$('.clear_data').click(function() {
	$('.panel_mask input').val('');
	$(".my_form")[0].reset();
});

$('.more_timetable').live('click', function() {
	localStorage.deptId = $(this).attr('deptId');
});

function getNoSign(e) {
	var projectId = $('.class_category>div').eq(e).find('.category_tittle').attr('projectid');
	$.ajax({
		url: "${ctx}/getProjectCount.do",
		type: 'post',
		async: true,
		dataType: "json",
		data: {
			"teachingProjectId": "projectId",
		},
		success: function(d) {
			if(d != null) {
				$('.class_wrapper').remove();
				for(var i = 0; i < d[0].data.deptlist.length; i++) {
					$('.main').append(
						'<div class="class_wrapper" Id="' + d[0].data.deptlist[i].deptId + '" >' +
						'<div class="ui-body ui-corner-all ui-body-a class_tittle class_required d_name_wrapper">' +
						'<div class="department_name" deptId="' + d[0].data.deptlist[i].deptId + '" >' +
						d[0].data.deptlist[i].deptName +
						'</div><div class="department_line"><a data-ajax="false" href="#" style="color: #999;" class="more_timetable" deptId="' + d[0].data.deptlist[i].deptId + '">更多</a></div></div></div>');
					for(var a = 0; a < d[0].data.deptlist[i].classList.length; a++) {
						$('#' + d[0].data.deptlist[i].deptId).append(
							'<div class="courses_wrapper" style="background:#fff;">' +
							'<div class="class_content class_elective">' +
							'<div class="class_time class_info">' +
							//													'<p class="">' +
							//													'</p>'+
							'<p class="cours_data" style="margin-top:10px;">' +
							d[0].data.deptlist[i].classList[a].teachingDate +
							'</p>' +
							'<p class="cours_time">' +
							d[0].data.deptlist[i].classList[a].teachingStartTime +
							'-' +
							d[0].data.deptlist[i].classList[a].teachingEndTime +
							'</p>' +
							'</div>' +
							'<div class="class_name class_info">' +
							'<a href="javascript:void(0);" data-ajax="false">' +
							'<p class="cours_name">' +
							'<span class="cours">' +
							d[0].data.deptlist[i].classList[a].teachingContent +
							'</span>' +
							'<span class="cours_category">' +
							d[0].data.deptlist[i].classList[a].teachingName +
							'</span>' +
							'<span class="clear"></span>' +
							'</p>' +
							'<p class="cours_info">' +
							'主讲人：<span>' +
							d[0].data.deptlist[i].classList[a].teacherName +
							'</span>' +
							'</p>' +
							'<p class="cours_info">' +
							'&nbsp;地点：<span>' +
							d[0].data.deptlist[i].classList[a].teachingPlace +
							'</span>' +
							'</p>' +
							'</a>' +
							'</div>' +
							'</div>' +
							'</div>'
						);
					}
				}
			}
		}
	});
}

