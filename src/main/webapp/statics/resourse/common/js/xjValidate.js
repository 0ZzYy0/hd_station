/*
 * 公共js验证方法4.0
 * @author 王瑾 homeabc@126.com
 *
 */
var xj = {
	extArrayNotAllowed : new Array('.php','.php3','.php5','.phtml','.asp','.aspx','.ascx','.jsp','.cfm','.cfc','.pl','.bat','.exe','.dll','.reg','.cgi','.htm','.html','.shtml'),
	extArrayAllowed  :null,
	//当前需验证的formId
	formId : null ,
	theForm : null ,
	//是否alert进行提示
	showNotice : null ,
	messageMap : null,
	//忽略不存在
	ignoreNotExistElment : false,
	//使用复选树时指定为true，由树形标签进行赋值;
	checkBoxTree : false,
	//数组条件进行循环判断
	CheckAll : function (objArray)
	{
		xj.messageMap = new Map();
		xj.messageMap.clear();
		if(this.formId!=null)
			this.theForm = document.getElementById(this.formId);
		var runValue=true;
		var ex = true;
		var i;
		//循环进行验证，每循环一次验证一个或一组对象
		for (i=0; i < objArray.length; i++)
		{
			//验证未通过返回false，否则不进行操作
			runValue = this.CheckOne(objArray[i][0],objArray[i][1],objArray[i][2],objArray[i][3]);
			if(!runValue)
				ex = false;
		}
		if(!ex){
			if(this.showNotice==true)
				alert("当前表单有校验未通过的数据项，请检查后再进行提交！");
			//显示消息内容
			xj.showNotice();
			return false;
		}
		var fileObj = getElementFromDocumentOrForm(this.theForm,"upload");
		
		for(var i=0;i<fileObj.length;i++)
		{
			
			var allowSubmit = true;
			var filePath = fileObj[i].value;
			if(filePath=="")
				continue;
			while (filePath.indexOf("\\") != -1)
			filePath = filePath.slice(filePath.indexOf("\\") + 1);
			ext = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
			if(this.extArrayAllowed!=null)
			{
				allowSubmit=false;
				for (var j = 0; j < this.extArrayAllowed.length; j++) {
					if (this.extArrayAllowed[j] == ext) { allowSubmit = true; }
				}
			}
			else
			{
				for (var j = 0; j < this.extArrayNotAllowed.length; j++) {
					if (this.extArrayNotAllowed[j] == ext) { allowSubmit = false; }
				}
			}
			if(allowSubmit==false)
			{
				var fileType = "";
				if(this.extArrayAllowed!=null)
				for(var i=0;i<this.extArrayAllowed.length;i++)
					fileType+=this.extArrayAllowed[i]+",";
				var msg="所上传的文件类型不符合系统要求";
				if(fileType.length==0)
				{
					for(var i=0;i<this.extArrayNotAllowed.length;i++)
						fileType+=this.extArrayNotAllowed[i]+",";
					if(fileType.length>0)
						fileType = fileType.substring(0,fileType.length-1);
					msg+="，当前功能不允许上传"+fileType+"类型文件！";
				}
				else
				{
					if(fileType.length>0)
						fileType = fileType.substring(0,fileType.length-1);
					msg+="，当前功能只允许上传"+fileType+"类型文件！";
				}
				alert(msg);
				return false
			}
		}
		return true;
	},
	CheckOne : function (objName,msg,role,compareValue)
	{
//	alert("objName:"+objName+"   msg:"+msg+"  role:"+role+"   compareValue:"+compareValue);
		
		var e=getElementFromDocumentOrForm(this.theForm,objName);
		var test=true;
		try{
			var objlen=e.length;
			var objtype;
			var chkcnt=0;
			var objValue;
			if(objlen==0&&!this.ignoreNotExistElment)
			{
				alert("对象'"+objName+"'不存在！");
				return false;
			}
			//----------------------循环对象--------------------------
			for(var i=0;i<e.length;i++)
			{
				xj.removeNotice(e[i]);
				objtype=e[i].type;
				
//			    alert(e[i].name);
				//根据不同的对象类型进行取值
				if(e[i].type=="text"||e[i].type=="password"||e[i].type=="textarea" ||e[i].type=="hidden"||e[i].type=="file")//文本框，密码框
				{
					
					objValue=e[i].value;
					objValue=objValue.trim();
					try{
						e[i].value = objValue.trim();
					}catch(e){}
					if(role == "notEmpty")
					{
						if(this.IsEmpty(objValue))
						{
							xj.createNotice(e[i],msg+"不能为空！");
							test = false;
						}
					}else if(role == "date")
					{
						if(!this.isDate(objValue))
						{
							xj.createNotice(e[i],msg+"输入日期格式不符合系统规则，请按照yyyy-MM-dd格式输入！");
							test = false;
						}
					}else if(role == "dateTime")
					{
						if(!this.isDateTime(objValue))
						{
							xj.createNotice(e[i],msg+"输入日期格式不符合系统规则，请按照yyyy-MM-dd hh:mm:ss格式输入！");
							test = false;
						}
					}else if(role == "int")
					{
						if(!this.isInt(objValue,msg,compareValue,e[i]))
						{
							test = false;
						}
					}else if(role == "float")
					{
						if(!this.IsFloatLength(objValue,msg,compareValue,e[i]))
						{
							test = false;
						}
					}
					else if(role == "email")
					{
						if(!this.isEmail(objValue))
						{
							xj.createNotice(e[i],msg+"所输入的格式不正确！");
							test = false;
						}
					}
					else if(role == "phone")
					{
						if(!this.isPhone(objValue))
						{
							xj.createNotice(e[i],msg+"所输入的格式不正确！");
							test = false;
						}
					}
					else if(role == "cardNo")
					{
						if(!this.isIdCardNo(objValue,e[i]))
						{
							//alert(msg+"，所输入的格式不正确！");
							test = false;
						}
					}
					else if(role == "eqO")
					{
						var cObj = getElementFromDocumentOrForm(this.theForm,compareValue);
						
						if(cObj.length==0&&!this.ignoreNotExistElment)
						{
							alert("对象"+compareValue+"不存在");
							return false;
						}
						for(var c=0;c<cObj.length;c++)
						{
							if(objValue!=cObj[c].value)
							{
								xj.createNotice(e[i],msg);
								test = false;
							}
						}
					}
					else if(role == "neO")
					{
						var cObj = getElementFromDocumentOrForm(this.theForm,compareValue);
						
						if(cObj.length==0&&!this.ignoreNotExistElment)
						{
							alert("对象"+compareValue+"不存在");
							return false;
						}
						for(var c=0;c<cObj.length;c++)
						{
							if(objValue==cObj[c].value)
							{
								xj.createNotice(e[i],msg);
								test = false;
							}
						}
					}
					else if(role == "eqV")
					{
						if(objValue!=compareValue)
						{
							xj.createNotice(e[i],msg);
							test = false;
						}
					}
					else if(role == "neV")
					{
						if(objValue==compareValue)
						{
							xj.createNotice(e[i],msg);
							test = false;
						}
					}
					else if(role == "max")
					{
						if(!this.isMax(objValue,compareValue,msg,e[i]))
						{
							test = false;
						}
					}
					else if(role == "min")
					{
						if(!this.isMin(objValue,compareValue,msg,e[i]))
						{
							test = false;
						}
					}else if(role=="function"){
						var returnMessage = eval(msg+"('"+e[i].value+"','"+e[i].id+"')");
						if(returnMessage!=compareValue)
						{
							xj.createNotice(e[i],returnMessage);
							test = false;
						}
					}
				}
				else if(e[i].type=="select-one")//下拉选择框
				{
					objValue=e[i].options[e[i].selectedIndex].value;
					if(role == "notEmpty")
					{
						if(this.IsEmpty(objValue))
						{
							xj.createNotice(e[i],msg+"不能为空！");
							test = false;
						}
					}else if(role=="function"){
						var returnMessage = eval(msg+"('"+objValue+"','"+e[i].id+"')");
						if(returnMessage!=compareValue)
						{
							xj.createNotice(e[i],returnMessage);
							test = false;
						}
					}	
					
					
				}
				else if(e[i].type=="checkbox"||objtype=="radio")//复选框，单选按钮
				{
					if(e[i].checked==true)
					{
						chkcnt+=1;
					}
								
					//已迭代到最后一个
					if(i==e.length-1)
					{
						//还没有选中的
						if(chkcnt==0)
						{
							if(this.checkBoxTree!=true)
							{
								xj.createNotice(e[i],msg+"必须选择！");
								test = false;
							}
							else
							{
								xj.createNotice(e[i],msg+"必须选择！");
								test = false;
							}
						}
						else
						{
							if(role=="function"){
								var returnMessage = eval(msg+"()");
								if(returnMessage!=compareValue)
								{
									xj.createNotice(e[i],returnMessage);
									test = false;
								}
							}
						}
					}
					
				}
			}
			
		}catch(e)
		{
			alert(e);
		}
		return test;
	},
//***************************功能分区，以下为内部工具性方法********************************

	/**
	 *名    称：setFocus
	 *功    能：设置对象焦点
	 *入口参数：对象元素
	 *示    例：xj.setFocus(document.getElementById("userName"));
	 */
	setFocus : function(getObj){
		if(getObj.type!="hidden"){
			getObj.focus();
		}
	},
	
	/**
	 *名　　称：IsEmpty
	 *功    能：判断是否为空
	 *入口参数：fData：要检查的数据
	 *出口参数：True：空  False：非空
	 *示    例：xj.IsEmpty(document.getElementById("userName").value);
	 */
	IsEmpty : function (fData)
	{
		return ((fData==null) || typeof(fData)=="undefined" || (fData.length==0) )
	},
	/**
	 *名　　称：getDataLength
	 *功    能：返回传入数据的字符型长度,
	 *入口参数：fData：需要计算的数据 
	 *出口参数：返回数据长度，支持中文字符数量判断
	 *示    例：xj.getDataLength(document.getElementById("userName").value);
	 */
	getDataLength : function (fData)
	{
		var intLength=0;
		for (var i=0;i<fData.length;i++){
			if ((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255))
				intLength=intLength+2;
			else
				intLength=intLength+1;
		}
		return intLength

	},
	/**
	 *名　　称：greaterLength
	 *功    能：计算数据的长度,
	 *入口参数：fData：需要计算的数据 msg 验证对象返回消息使用的名称 elen:指定的长度
	 *出口参数：数据长度小于指定长度返回true,大于返回false
	 *示    例：xj.greaterLength(document.getElementById("userName").value,"用户名称",20);
	 */
	greaterLength : function (fData,msg,elen,obj)
	{
		var intLength=this.getDataLength(fData);
		if (parseInt(intLength,10)<=parseInt(elen,10)){
			return true
		}else{
			xj.createNotice(obj,msg+"长度超出限定"+elen+"位范围");
			return false;
		}
	},
	/**
	 *名　　称：lessThanLength
	 *功    能：计算数据的长度,
	 *入口参数：fData：需要计算的数据 msg 验证对象返回消息使用的名称 elen:指定的长度
	 *出口参数：数据长度小于指定长度返回true,大于返回false
	 *示    例：xj.lessThanLength(document.getElementById("userName").value,"用户名称",20);
	 */
	lessThanLength : function (fData,msg,elen,obj)
	{
		var intLength=this.getDataLength(fData);
		if (parseInt(intLength,10)>=parseInt(elen,10)){
			return true
		}else{
			xj.createNotice(obj,msg+"长度小于限定"+elen+"位范围");
			return false;
		}
	},
	/**
	 *名　　称：isInt
	 *功    能：判断是否为整数
	 *入口参数：objValue：需要计算的数据 msg 验证对象返回消息使用的名称 elen:指定的长度
	 *出口参数：为整数返回true,非整数返回false，长度超过制定length返回false
	 *示    例：xj.isInt(document.getElementById("age").value,"年龄",20);
	 */
	isInt : function(objValue,msg,elen,obj){
		if(objValue=="")
			return true;
		
		var regex= "^-?\\d+$";
		var test = this.isRegex(objValue,regex);
		if(test)
			test=this.greaterLength(objValue,msg,elen,obj);
		else
		{
			xj.createNotice(obj,msg+"必须输入整数！");
			test = false;

		}
		return test;
	},
	/**
	 *名　　称：IsFloatLength
	 *功    能：计算浮点数据的长度,数据长度小于指定长度返回真,大于返回假
	 *入口参数：fData：需要计算的数据 msg 验证对象返回消息使用的名称 elen:指定的长度
	 *出口参数：为浮点数返回true,非整数返回false，整数或小数长度超过指定length返回false
	 *示    例：xj.isFloatLength(document.getElementById("age").value,"年龄",20);
	 */
	IsFloatLength : function (fData,msg,elen,obj)
	{
		if(fData=="")
			return true;
		if(!this.isNumber(fData))
		{
			xj.createNotice(obj,msg+"必须输入数值型数据！");
			return false;
		}
		var len = elen.split('.');
		var data = fData.split('.');
		var src = "";
		for(var i=0;i<data.length;i++){
			if (parseInt(data[i].length,10)>parseInt(len[i],10)){
				src = i==0?"所输入的整数位长度超出限定"+len[i]+"位范围":"所输入的小数位长度超出限定"+len[i]+"位范围";
				xj.createNotice(obj,msg+src);
				return false;
			}
		}
		return true
	},
	/**
	 *名　　称：isNumber
	 *功    能：判断是否为实数
	 *入口参数：objValue：需要计算的数据
	 *出口参数：为实数数返回true,否则返回false
	 *示    例：xj.isNumber(document.getElementById("price").value);
	 */
	isNumber : function(objValue){
		var test = !isNaN(objValue);
		if(test)
		{
			var regex = "^(-?\\d+)(\.\\d+)?$";
			return this.isRegex(objValue,regex);
		}
		else
			return false;
	},
	/**
	 *名　　称：isDate
	 *功    能：判断是短日期，形如 (yyyy-MM-dd)
	 *入口参数：str：需要计算的数据
	 *出口参数：格式匹配返回true,否则返回false
	 *示    例：xj.isDate(document.getElementById("bornDate").value);
	 */
	isDate : function(str)
	{
		if(str=="")
			return true;
		var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
		if(r==null)return false; 
		var d= new Date(r[1], r[3]-1, r[4]); 
		return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
	},
	/**
	 *名　　称：isDateTime
	 *功    能：判断是长时间，形如(yyyy-MM-dd hh:mm:ss)
	 *入口参数：str：需要计算的数据
	 *出口参数：格式匹配返回true,否则返回false
	 *示    例：xj.isDateTime(document.getElementById("bornDate").value);
	 */
	isDateTime : function(str)
	{
		if(str=="")
			return true;
		var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
		var r = str.match(reg); 
		if(r==null) return false; 
		var d= new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]); 
		return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]);
	},
	/**
	 *名　　称：isRegex
	 *功    能：判断是否符合传入的正则规则
	 *入口参数：objValue：需要计算的数据 regex正则表达式
	 *出口参数：格式匹配返回true,否则返回false
	 *示    例：xj.isRegex(document.getElementById("price").value,"^(-?\\d+)(\.\\d+)?$");
	 */
	isRegex : function(objValue,regex){
		if(objValue.match(regex)!=null) 
			return true;
		else
			return false;
	},
	/**
	 *名　　称：isEmail
	 *功    能：判断是否是email
	 *入口参数：objValue：需要判断的数据
	 *出口参数：格式匹配返回true,否则返回false
	 *示    例：xj.isEmail(document.getElementById("email").value);
	 */
	isEmail : function(objValue){
		if(objValue=="")
			return true;
		var regex = "\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\.\\w+([-.]\\w+)*";
		return this.isRegex(objValue,regex);
	},
	/**
	 *名　　称：isPhone
	 *功    能：判断是否是电话号码
	 *入口参数：objValue：需要判断的数据
	 *出口参数：格式匹配返回true,否则返回false
	 *示    例：xj.isPhone(document.getElementById("email").value);
	 */
	isPhone : function(objValue){
		if(objValue=="")
			return true;
		var telReg = !!objValue.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
		return telReg;
	},
	/**
	 *名　　称：isIdentityCard
	 *功    能：判断是否是身份证
	 *入口参数：objValue：需要判断的数据
	 *出口参数：格式匹配返回true,否则返回false
	 *示    例：xj.isIdentityCard(document.getElementById("identityCard").value);
	 */
	isIdentityCard : function(objValue){
		if(objValue=="")
			return true;
		var regex = "(^(\\d{2,4}[-_－—]?)?\\d{3,8}([-_－—]?\\d{3,8})?([-_－—]?\\d{1,7})?$)|(^0?1[35]\\d{9}$)";
		return this.isRegex(objValue,regex);
	},
	/**
	 *名　　称：isMax
	 *功    能：判断所输入的值不能超过max值的限制
	 *入口参数：objValue：需要判断的数据，maxValue，带有类型标识的值，msg控件显示消息
	 *出口参数：不大于返回true,否则返回false
	 *示   例1：xj.isMax(document.getElementById("name").value,"String:20","用户名");
	 *示   例2：xj.isMax(document.getElementById("price").value,"number:100","用户名");
	 */
	isMax : function(objValue,maxStr,msg,obj){
		var str = maxStr.split(":")
		if(str.length!=2)
		{
			xj.createNotice(obj,msg+"验证标识输入不合法，示例(字符型String:20或数值型number:100)");
			return false;
		}
		if(str[0]=="String")
		{
			return this.greaterLength(objValue,msg,str[1],obj);
		}
		else if(str[0]=="number")
		{
			if(parseFloat(objValue)>parseFloat(str[1]))
			{
				xj.createNotice(obj,msg+"不能大于最大值"+str[1]);
				return false;
			}
		}
		else
		{
			xj.createNotice(obj,msg+"不合法的验证规则!");
			return false;
		}
		return true;
	},
	/**
	 *名　　称：isMin
	 *功    能：判断所输入的值不能小于min值的限制
	 *入口参数：objValue：需要判断的数据，maxValue，带有类型标识的值，msg控件显示消息
	 *出口参数：不大于返回true,否则返回false
	 *示   例1：xj.isMin(document.getElementById("name").value,"String:20","用户名");
	 *示   例2：xj.isMin(document.getElementById("price").value,"number:100","用户名");
	 */
	isMin : function(objValue,maxStr,msg,obj){
		var str = maxStr.split(":")
		if(str.length!=2)
		{
			xj.createNotice(obj,msg+"验证标识输入不合法，示例(字符型String:20或数值型number:100)");
			return false;
		}
		if(str[0]=="String")
		{
			return this.lessThanLength(objValue,msg,str[1],obj);
		}
		else if(str[0]=="number")
		{
			if(parseFloat(objValue)<parseFloat(str[1]))
			{
				xj.createNotice(obj,msg+"不能小于最小值"+str[1]);
				return false;
			}
		}
		else
		{
			xj.createNotice(obj,msg+"不合法的验证规则!");
			return false;
		}
		return true;
	},
	/**
	*移除消息tooltip
	*/
	removeNotice : function(obj)
	{
		$(".validateMsg").prev().show();
		$(".errorInput").removeClass("errorInput");
		$(".validateMsg").remove();
		$(".has-error").removeClass("has-error");
	},
	/**
	*创建消息显示tooltip
	*/
	createNotice : function(obj,message)
	{
		if(xj.messageMap.containsKey(obj))
		{
		
			var msg = xj.messageMap.get(obj);
			xj.messageMap.remove(obj);
			xj.messageMap.put(obj,msg+" "+message);
		}
		else
			xj.messageMap.put(obj,message);
	},
	showNotice : function()
	{
		var arr=xj.messageMap.keys();  
		for(var i=0;i<arr.length;i++){  
			var noticeHtml = "<label for=\"inputError\" class=\"control-label validateMsg\"><i class=\"fa fa-times-circle-o\"></i>"+xj.messageMap.get(arr[i])+"</label>";
			$(arr[i]).addClass("errorInput");
			$(arr[i]).prev().hide();
			$(arr[i]).before(noticeHtml)
			if($(arr[i]).parent().hasClass("form-group"))
				$(arr[i]).parent().addClass("has-error");
	    }
	},
	//时间随机数
	getTimeStamp : function()
	{
	    // 声明变量。
	    var d, s;
	
	    // 创建 Date 对象。
	    d = new Date();
	    s = ("0"+d.getHours()).slice(-2) + "";
	    s += ("0"+d.getMinutes()).slice(-2) + "";
	    s += ("0"+d.getSeconds()).slice(-2) + "";
	    s += ("00"+d.getMilliseconds()).slice(-3);
		var tmp = parseInt(Math.random()*1000000+1);
	    return s+tmp;
	},
	//身份证验证
	isIdCardNo : function (num,obj)
{
	if(num=="")
		return true;
    var factorArr = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1);
    var error;
    var varArray = new Array();
    var intValue;
    var lngProduct = 0;
    var intCheckDigit;
    var intStrLen = num.length;
    var idNumber = num;   
    // initialize
    if ((intStrLen != 15) && (intStrLen != 18)) {
    	xj.createNotice(obj,"输入身份证号码长度不对！");
        return false;
    }   
    // check and set value
    for(i=0;i<intStrLen;i++) {
        varArray[i] = idNumber.charAt(i);
        if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
        	xj.createNotice(obj,"错误的身份证号码！");
            return false;
        } else if (i < 17) {
            varArray[i] = varArray[i]*factorArr[i];
        }
    }
    if (intStrLen == 18) {
        //check date
        var date8 = idNumber.substring(6,14);
        
        if (this.checkDate(date8) == false) {
        	xj.createNotice(obj,"身份证中日期信息不正确！");
            return false;
        }       
        // calculate the sum of the products
        for(i=0;i<17;i++) {
            lngProduct = lngProduct + varArray[i];
        }       
        // calculate the check digit
        intCheckDigit = 12 - lngProduct % 11;
        switch (intCheckDigit) {
            case 10:
                intCheckDigit = 'X';
                break;
            case 11:
                intCheckDigit = 0;
                break;
            case 12:
                intCheckDigit = 1;
                break;
        }       
        // check last digit
/*        if (varArray[17].toUpperCase() != intCheckDigit) {
        	div_id.style.display="";
			div_id.innerHTML="身份证效验位错误!";
            //error = "身份证效验位错误!...正确为： " + intCheckDigit + ".";
            //alert(error);
            return false;
        }*/
    }
    else{
		//length is 15
        //check date
        var date6 = idNumber.substring(6,12);
        if (this.checkDate(date6) == false) {
			xj.createNotice(obj,"身份证日期信息不正确！");
            return false;
        }
    }
    //alert ("Correct.");
    return true;
},
	checkDate : function (strDate){
	    if(strDate.length != 6 && strDate.length != 8){
	       // alert("日期格式不正确!");
	        return false;
	    }
	    var year;
	    var month;
	    var date;
	    if (strDate.length == 6) {
	        year = strDate.substr(0, 2);
	        month = strDate.substr(2, 2);
	        date = strDate.substr(4, 2);
	    } else {
	        year = strDate.substr(0, 4);
	        month = strDate.substr(4, 2);
	        date = strDate.substr(6, 2);
	    }
	    var year = year.length == 2 ? '19' + year : year;
	    if(!this.checkYear(year)){return false;}
	    if(!this.checkMonth(month)){return false;}
	    if(!this.checkDateSplit(year,month,date)){return false;}
	    return true;
	},
	//日期的验证---------------(0)
	checkYear : function checkYear(year){
	    if(isNaN(parseInt(year)))
	    {
	        //alert("年份输入有误,请重新输入!");
	        return false;
	    }
	    if(parseInt(year)<1000 || parseInt(year) >3050)
	    {
	       // alert("年份应该在1000-3050之间!");
	        return false;
	    }
	    else return true;
	},
	checkMonth : function (month){
	    if(isNaN(parseInt(month,10))){
		    xj.createNotice(obj,"月份输入有误,请重新输入!");
		    return false;
	    }
	    else if(parseInt(month,10)<1 || parseInt(month,10) >12)
	    { 
		    //alert("月份应该在1-12之间!");
		    return false;
	    }
	    else return true;
	},
	checkDateSplit : function (year,month,date){
	    var daysOfMonth=this.calDays(parseInt(year),parseInt(month));
	    if(isNaN(parseInt(date)))
	    {
	    	//alert("日期输入有误,请重新输入!"); 
	    	return false;
	    }
	    else if(parseInt(date,10)<1||parseInt(date,10)>daysOfMonth)
	    {
	     	//alert(parseInt("08",10)+"日期应该在1-"+daysOfMonth+"之间!"); 
	     	return false;
	    }
	    else 
	    	return true;
	},
	calDays : function (year,month){
	    var date= new Date(year,month,0);
	    return date.getDate();
	}
}
	/**
	 *名　　称：trim
	 *功    能：去除空格
	 *出口参数：返回去除空格后的结果
	 *示    例：str.trim();
	 */
String.prototype.trim=function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
	/**
	 *名　　称：ltrim
	 *功    能：去除左侧空格
	 *出口参数：返回去除空格后的结果
	 *示    例：str.ltrim();
	 */
String.prototype.ltrim=function(){
	return this.replace(/(^\s*)/g,"");
}
	/**
	 *名　　称：rtrim
	 *功    能：去除右侧空格
	 *出口参数：返回去除空格后的结果
	 *示    例：str.rtrim();
	 */
String.prototype.rtrim=function(){
	return this.replace(/(\s*$)/g,"");
}

//获取表单指定名称元素
function getElementFromDocumentOrForm(obj,name){
	var formTmp=null;
		if(obj!=null){
			formTmp  = obj.elements[name];
			if((formTmp==null) || typeof(formTmp)=="undefined" || (formTmp.length==0)){
				fileObj = new Array();
			}else if(typeof(formTmp.length)=="undefined"){
				fileObj = new Array(formTmp);
			}else if(formTmp.length>0){
				if(typeof(formTmp.type)=="undefined"){
					fileObj = formTmp;
				}else{
					fileObj = new Array(formTmp);
				}
			}else{
				fileObj = new Array();
			}
		}else
			fileObj  = document.getElementsByName(name);
	return fileObj;
		
}
/*   
 * MAP对象，实现MAP功能   
 *   
 * 接口：   
 * size()     获取MAP元素个数   
 * isEmpty()    判断MAP是否为空   
 * clear()     删除MAP所有元素   
 * put(key, value)   向MAP中增加元素（key, value)    
 * remove(key)    删除指定KEY的元素，成功返回True，失败返回False   
 * get(key)    获取指定KEY的元素值VALUE，失败返回NULL   
 * element(index)   获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL   
 * containsKey(key)  判断MAP中是否含有指定KEY的元素   
 * containsValue(value) 判断MAP中是否含有指定VALUE的元素   
 * values()    获取MAP中所有VALUE的数组（ARRAY）   
 * keys()     获取MAP中所有KEY的数组（ARRAY）   
 *   
 * 例子：   
 * var map = new Map();   
 *   
 * map.put("key", "value");   
 * var val = map.get("key")   
 * ……   
 *   
 */     
function Map() {     
    this.elements = new Array();     
       
    //获取MAP元素个数     
    this.size = function() {     
        return this.elements.length;     
    }     
       
    //判断MAP是否为空     
    this.isEmpty = function() {     
        return(this.elements.length < 1);     
    }     
       
    //删除MAP所有元素     
    this.clear = function() {     
        this.elements = new Array();     
    }     
       
    //向MAP中增加元素（key, value)      
    this.put = function(_key, _value) {     
        this.elements.push( {     
            key : _key,     
            value : _value     
        });     
    }     
       
    //删除指定KEY的元素，成功返回True，失败返回False     
    this.remove = function(_key) {     
        var bln = false;     
        try{     
            for(i = 0; i < this.elements.length; i++) {     
                if(this.elements[i].key == _key) {     
                    this.elements.splice(i, 1);     
                    return true;     
                }     
            }     
        } catch(e) {     
            bln = false;     
        }     
        return bln;     
    }     
       
    //获取指定KEY的元素值VALUE，失败返回NULL     
    this.get = function(_key) {     
        try{     
            for(i = 0; i < this.elements.length; i++) {     
                if(this.elements[i].key == _key) {     
                    return this.elements[i].value;     
                }     
            }     
        } catch(e) {     
            return null;     
        }     
    }     
       
    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL     
    this.element = function(_index) {     
        if(_index < 0 || _index >= this.elements.length) {     
            return null;     
        }     
        return this.elements[_index];     
    }     
       
    //判断MAP中是否含有指定KEY的元素     
    this.containsKey = function(_key) {     
        var bln = false;     
        try{     
            for(i = 0; i < this.elements.length; i++) {     
                if(this.elements[i].key == _key) {     
                    bln = true;     
                }     
            }     
        } catch(e) {     
            bln = false;     
        }     
        return bln;     
    }     
       
    //判断MAP中是否含有指定VALUE的元素     
    this.containsValue = function(_value) {     
        var bln = false;     
        try{     
            for(i = 0; i < this.elements.length; i++) {     
                if(this.elements[i].value == _value) {     
                    bln = true;     
                }     
            }     
        } catch(e) {     
            bln = false;     
        }     
        return bln;     
    }     
       
    //获取MAP中所有VALUE的数组（ARRAY）     
    this.values = function() {     
        var arr = new Array();     
        for(i = 0; i < this.elements.length; i++) {     
            arr.push(this.elements[i].value);     
        }     
        return arr;     
    }     
       
    //获取MAP中所有KEY的数组（ARRAY）     
    this.keys = function() {     
        var arr = new Array();     
        for(i = 0; i < this.elements.length; i++) {     
            arr.push(this.elements[i].key);     
        }     
        return arr;     
    }     
} 