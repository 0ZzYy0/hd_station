$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'partemp/list',
        datatype: "json",
        colModel: [			
			{ label: 'tempId', name: 'tempId', index: 'temp_id', width: 50, key: true },
			{ label: '', name: 'deviceId', index: 'device_id', width: 80 }, 			
			{ label: '', name: 'tempName', index: 'temp_name', width: 80 }, 			
			{ label: '', name: 'tempValue', index: 'temp_value', width: 80 }, 			
			{ label: '', name: 'tempDate', index: 'temp_date', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		parTemp: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.parTemp = {};
		},
		update: function (event) {
			var tempId = getSelectedRow();
			if(tempId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(tempId)
		},
		saveOrUpdate: function (event) {
			var url = vm.parTemp.tempId == null ? "partemp/save" : "partemp/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.parTemp),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		del: function (event) {
			var tempIds = getSelectedRows();
			if(tempIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "partemp/delete",
				    contentType: "application/json",
				    data: JSON.stringify(tempIds),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(tempId){
			$.get(baseURL + "partemp/info/"+tempId, function(r){
                vm.parTemp = r.parTemp;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});