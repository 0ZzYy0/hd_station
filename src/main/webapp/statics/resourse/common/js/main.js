// JavaScript Document

var k1=0;
var k2=0;
	//替换表单中默认的submit方法为ajax提交
//	$(document).on("submit","form",defaultSubmitForm);
	//submit表单提交的替换动作
//	function defaultSubmitForm(e){
//		alert("1111");
//		if(k1==k2){
//			k1=k1+1;
//			e.preventDefault();
//			var theform  = e.target;
//			//追加url随机数标识，控制缓存
//			var tmp = parseInt(Math.random()*1000000+1);
//			if($("#__ntKey").length==0)
//				$(theform).append("<input type='hidden' name='__ntKey' id='__ntKey' value='"+tmp+"'>");
//			else
//				$("#__ntKey").val(tmp);
//			var htmlstr = $(theform).serialize().replace(/</gi, '&lt;').replace(/>/gi, '&gt;');
//			//htmlstr = $(theform).serialize().replace(new RegExp('%3C', 'g'), '＜');
//			
//			
//			//当前提交动作是否使用了附件上传，手动为未上传的附件进行提交
//			if(typeof(xjUpload)!="undefined"&&document.getElementsByName("annex").length!=0)
//			{
//				xjUpload.manaulUploadCallBackFunction = function(){
//					$.post($(theform).attr("action"),  htmlstr,function (data, textStatus){
//						k2=k2+1;
//						$("#_bodyContent").html(data);
//					});
//				}
//				xjUpload.manaulUpload();
//			}
//			else
//			{
//				$.post($(theform).attr("action"),  htmlstr,function (data, textStatus){
//					k2=k2+1;
//					$("#_bodyContent").html(data);
//				});
//			}
//		}
//	}
	
	//左侧菜单与footer页的页面点击方法
	function goPage(url,funcId){
		sessionStorage.menu_index = funcId;
		window.location.href=url;
	}
	
	
	
	
	
	//是否确认按钮被触发
	var _confirmBtnShowState = false;
	//上一个触发确认显示的按钮
	var _preConfirmBtn = null;
	/*
	*按钮确认
	*/
	function btnConfirm(the_button,callBackFunc)
	{
		if(_confirmBtnShowState==true)
		{
			$("#_confirmBtn").remove();
			$(_preConfirmBtn).show("fade");
		}
		$(the_button).hide();
		var confirmBtn = '<button id="_confirmBtn" class="btn btn-sm btn-danger" name="q" type="button" title="确认">确认</button>';
		if(the_button.tagName=="A")
		{
			confirmBtn = '<a href="#" id="_confirmBtn" class="nav-btn text-red"><i class="fa fa-question"></i>确认</a>';
		}
		$(the_button).after(confirmBtn);
		_confirmBtnShowState = true;
		_preConfirmBtn = the_button;
		$("#_confirmBtn").on("click", function(){
			callBackFunc();
			$("#_confirmBtn").remove();
			$(the_button).show("fade");
			_confirmBtnShowState = false;
			_preConfirmBtn = null;
		});

	}
	/*
	*退出
	*/
	function _quit()
	{
		window.top.location.href="quit.do";
	}
	/*
	*	修改密码
	*/
	function _updatePassword()
	{
		loadPage("updateSettingUser.do",null);
	}
var c = {
	popover:function(btnId,html,placement,trigger){
		$("#"+btnId).attr("data-container","body");
		$("#"+btnId).attr("data-toggle","popover");
		$("#"+btnId).attr("data-placement",placement);
		$("#"+btnId).attr("data-trigger",trigger);
		$("#"+btnId).attr("data-container","form");
		$("#"+btnId).attr("data-html",true);
		$("#"+btnId).attr("data-content",html);
		$("#"+btnId).popover();
	},
	open:function(url) 
	{
        var newA = document.createElement("a");
        newA.id='newUrl'
        newA.target='_blank';
        newA.href=url;
        document.body.appendChild(newA);
        newA.click();
        document.body.removeChild(newA);

	},
	resetSubmitKey : function(formId)
	{
		var form = document.getElementById(formId);
		var submitKeyId = document.getElementsByName("xunj_submitKeyId");
		if(submitKeyId.length>0)
		{
			submitKeyId[0].value=parseInt(Math.random()*1000000+1);
		}
	},
	checkAll : function (objName,containerId) {
		try {
			var checkedcount = 0;
			var checkObj = null;
			if(containerId!=null&&containerId!="")
				checkObj = $("#"+containerId).find("input[name='"+objName+"']");
			else
				checkObj = $(document).find("input[name='"+objName+"']");
			for (var i = 0; i < checkObj.length; i++) {
				if ($(checkObj[i]).is(':checked')) {
					checkedcount++;
				}
			}
			if (checkedcount == checkObj.length) {
				for (var i = 0; i < checkObj.length; i++) {
					$(checkObj[i]).iCheck('uncheck');
				}
			} else {
				for (var i = 0; i < checkObj.length; i++) {
					$(checkObj[i]).iCheck('check');
				}
			}
		}
		catch (ex) {
		}
	}}


//调试信息输出
function _d(message)
{
	if(typeof window.console=="undefined")
	{
		if($("#xjMessageBox").length==0)
			$("body").append("<div id=\"xjMessageBox\" style=\"position:absolute;left:300px;top:300px;z-index:9999;\"></div>");
		$("#xjMessageBox").html(message);
	}
	else
	{
		console.log(message)
	}
}
String.prototype.replaceAll = function(s1,s2){ 
	return this.replace(new RegExp(s1,"gm"),s2); 
}
//对Date的扩展，将 Date 转化为指定格式的String   
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
//例子：   
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.format = function(fmt)   
{
var o = {   
"M+" : this.getMonth()+1,                 //月份   
"d+" : this.getDate(),                    //日   
"h+" : this.getHours(),                   //小时   
"m+" : this.getMinutes(),                 //分   
"s+" : this.getSeconds(),                 //秒   
"q+" : Math.floor((this.getMonth()+3)/3), //季度   
"S"  : this.getMilliseconds()             //毫秒   
};   
if(/(y+)/.test(fmt))   
fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
for(var k in o)   
if(new RegExp("("+ k +")").test(fmt))   
fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
return fmt;   
}  

//禁用返回，调用goBack方法
var dialog_flag = true;
if (window.history && window.history.pushState) {
	$(window).on('popstate', function() {
		window.history.pushState('forward', null, '#');
		window.history.forward(1);
		if (typeof (goBack) == 'function' && dialog_flag == true) {
			goBack();
		}
	});
}
window.history.pushState('forward', null, '#'); // 在IE中必须得有这两行
window.history.forward(1);

//弹出对话框
function openPopup(jsonparam){
	dialog_flag = false;
	var id = jsonparam.id;
    $("#"+id).popup({
    	afterclose: function( event, ui ) {
    		dialog_flag = true;
    	}
    });
	$("#"+id).popup("open");
}

//跳转消息提示页面
//param.back_url = "${ctx }/mobile/main/menu/menu.jsp";
//param.icon = "fa-close";
//param.title = "提示信息"
//param.sub_title = "保存成功";
//var buttons = new Array();
//var button = {};
//button.color = "clr-btn-blue";
//button.url = "${ctx }/mobile/main/menu/menu.jsp";
//button.text = "返回";
//buttons[0] = button;
//param.buttons = buttons;

function showMess(param){
	var str = JSON.stringify(param);
	sessionStorage.param = str;
	window.location.href = ctx + "/mobile/mess.jsp";
}

function setBackUrl(backUrl){
 	var backUrls = sessionStorage.backUrls;
 	if(backUrls==null || backUrls==''){
 		backUrls = "";
 	}
 	backUrls += backUrl + ",";
 	sessionStorage.backUrls = backUrls;
}

function goBack(){
	var backUrls = sessionStorage.backUrls;
	backUrls = backUrls.substring(0,backUrls.length-1);
	var urls = backUrls.split(",");
	backUrls = "";
	var backUrl = "";
	for(var i=0;i<urls.length;i++){
		if(i<urls.length-1){
			backUrls += urls[i] + ",";
		}else{
			backUrl = urls[i];
		}
	}
	sessionStorage.backUrls = backUrls;
	window.location.href = backUrl;
}

