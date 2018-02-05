var vm = new Vue({
	el:'#myinfo_div',
	data:{
		title: null,
		basPatient:{
			patId : "",
			deptId : "",
			patCode : "",
			patType : "",
			patName : "",
			patAge : "",
			patGender : "",
			contactWay : "",
			patAddress : "",
			remark : ""
		},
		deptList:[],
		patTypeList:[],
		patGenderList:[]
	},
    created:function () {
    	var deptRowss;
        $.ajax({
            type: "GET",
            url: baseURL + "baspatient/getDeptSelect",
            async:false,
            success: function(data){
        		var deptRows = '[';
        		for(var i = 0 ; i < data.length ; i++){
        			deptRows += '{name:\''+data[i].name+'\',id:\''+data[i].deptId+'\'},';
        		}
        		deptRows = deptRows.substring(0, deptRows.length - 1);
        		deptRows += ']';
        		deptRowss = eval("("+deptRows+")");
            }
        });

		this.deptList = deptRowss;
        this.basPatient.deptId = this.deptList.length>0 ? this.deptList[0].id : "";
        
        
        var patTypeRows = [{name:"学生",id:"学生"},{name:"成人",id:"成人"}];
        this.patTypeList = patTypeRows;
        this.basPatient.patType = this.patTypeList.length>0 ? this.patTypeList[0].id : "";
        
        var patGenderRows = [{name:"男",id:"男"},{name:"女",id:"女"}];
        this.patGenderList = patGenderRows;
        this.patGenderList.patGender = this.patGenderList.length>0 ? this.patGenderList[0].id : "";
    },
	mounted: function () {
		  this.$nextTick(function () {
			  this.getInfo();
		  });
	},
	methods: {
		saveOrUpdate: function (event) {
			var url = "baspatient/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.basPatient),
			    success: function(r){
			    	if(r.code === 0){
						alert('保存成功', function(index){
							window.location.href = baseURL + "modules/mobile/home.html";
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		getInfo:function (){
            $.get(baseURL + "baspatient/getInfo", function(r){
            	vm.basPatient = r.basPatient;
            	vm.getDeptSelect();
            });
		},
		getDeptSelect:function (){
			if(vm.basPatient.patType != null && vm.basPatient.patType != ""){
		    	var deptRowss;
		        $.ajax({
		            type: "GET",
		            url: baseURL + "baspatient/getDeptSelect",
		            async:false,
		            success: function(data){
		        		var deptRows = '[';
		        		for(var i = 0 ; i < data.length ; i++){
		            		if((vm.basPatient.patType == "学生" && data[i].deptType == "学校") || (vm.basPatient.patType == "成人" && data[i].deptType == "社区")){
		            			deptRows += '{name:\''+data[i].name+'\',id:\''+data[i].deptId+'\'},';
		            		}
		        		}
	        			deptRows = deptRows.substring(0, deptRows.length - 1);
	        			deptRows += ']';
        				deptRowss = eval("("+deptRows+")");
		            }
		        });
		        this.deptList = deptRowss;
			}
		}
	}
});