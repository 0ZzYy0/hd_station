var vm = new Vue({
	el:'#member_div',
	data:{
		showList: true,
		title: null,
		basPatMember: {
			memberId: null,
			patId: null,
			deptId: null,
			memberCode: null,
			memberName: null,
			memberAge: null,
			memberGender: null,
			contactWay: null,
			memberAddress: null,
			remark: null,
			memberType:null
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
        this.basPatMember.deptId = this.deptList.length>0 ? this.deptList[0].id : "";
        
        var patTypeRows = [{name:"学生",id:"学生"},{name:"成人",id:"成人"}];
        this.patTypeList = patTypeRows;
        this.basPatMember.memberType = this.patTypeList.length>0 ? this.patTypeList[0].id : "";
        
        var patGenderRows = [{name:"男",id:"男"},{name:"女",id:"女"}];
        this.patGenderList = patGenderRows;
        this.patGenderList.memberGender = this.patGenderList.length>0 ? this.patGenderList[0].id : "";
    },
	mounted: function () {
		  this.$nextTick(function () {
			  this.getInfo();
		  });
	},
	methods: {
		saveOrUpdate: function (event) {
			var url = vm.basPatMember.memberId == null ? "baspatmember/save" : "baspatmember/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.basPatMember),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							window.location.href = baseURL + "modules/mobile/my_membe_list.html";
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		getInfo:function (){
        	var cxtmemberId = $("#memberId").val();
        	if(cxtmemberId != null && cxtmemberId != "" && cxtmemberId != "undefined"){
		        $.ajax({
		            type: "GET",
		            url: baseURL + "baspatmember/getinfo/"+cxtmemberId,
		            async:false,
		            success: function(r){
		            	vm.basPatMember = r.basPatMember;
		            }
		        });
        	}
        	vm.getDeptSelect();
		},
		getDeptSelect:function (){
			if(vm.basPatMember.memberType != null && vm.basPatMember.memberType != ""){
		    	var deptRowss;
		        $.ajax({
		            type: "GET",
		            url: baseURL + "baspatmember/getDeptSelect",
		            async:false,
		            success: function(data){
		        		var deptRows = '[';
		        		for(var i = 0 ; i < data.length ; i++){
		            		if((vm.basPatMember.memberType == "学生" && data[i].deptType == "学校") || (vm.basPatMember.memberType == "成人" && data[i].deptType == "社区")){
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