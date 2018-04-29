var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "deptId",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url:"nourl"
        }
    }
};
var ztree;
$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'staworkgroup/list',
        datatype: "json",
        colModel: [			
			{ label: '机组ID', name: 'groupId', index: 'group_id', width: 50, key: true },
			{ label: '所属机构', name: 'deptId', index: 'dept_id', width: 80 }, 			
			{ label: '机组编号', name: 'groupCode', index: 'group_code', width: 80 }, 			
			{ label: '机组名称', name: 'groupName', index: 'group_name', width: 80 }, 			
			{ label: '负责人', name: 'groupPerson', index: 'group_person', width: 80 }, 			
			{ label: '备注', name: 'remark', index: 'remark', width: 80 }			
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
		staWorkGroup: {
				deptName:null,
				deptId:0
			}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.staWorkGroup = {deptName:null,deptId:0};
			vm.getDept();
		},
		update: function (event) {
			var groupId = getSelectedRow();
			if(groupId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(groupId);
		},
		saveOrUpdate: function (event) {
			var url = vm.staWorkGroup.groupId == null ? "staworkgroup/save" : "staworkgroup/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.staWorkGroup),
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
			var groupIds = getSelectedRows();
			if(groupIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "staworkgroup/delete",
				    contentType: "application/json",
				    data: JSON.stringify(groupIds),
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
		getInfo: function(groupId){
            $.ajax({
                type: "GET",
                url: baseURL + "staworkgroup/info/"+groupId,
                async:false,
                success: function(r){
                	vm.staWorkGroup = r.staWorkGroup;
                    vm.getDept();
                }
            });
            
			/*$.get(baseURL + "staworkgroup/info/"+groupId, function(r){
                vm.staWorkGroup = r.staWorkGroup;
                vm.getDept();
            });*/
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		},
        deptTree: function(){
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择机构",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#deptLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztree.getSelectedNodes();
                    //选择上级机构
                    vm.staWorkGroup.deptId = node[0].deptId;
                    vm.staWorkGroup.deptName = node[0].name;

                    layer.close(index);
                }
            });
        },
        getDept: function(){
            $.ajax({
                type: "GET",
                url: baseURL + "sys/dept/select",
                async:false,
                success: function(r){
                    ztree = $.fn.zTree.init($("#deptTree"), setting, r.deptList);
                    var node = ztree.getNodeByParam("deptId", vm.staWorkGroup.deptId);
                    ztree.selectNode(node);
                    
                    vm.staWorkGroup.deptName = node.name;
                }
            });
            //加载机构树
            /*$.get(baseURL + "sys/dept/select", function(r){
                ztree = $.fn.zTree.init($("#deptTree"), setting, r.deptList);
                var node = ztree.getNodeByParam("deptId", vm.staWorkGroup.deptId);
                ztree.selectNode(node);
                
                vm.staWorkGroup.deptName = node.name;
            })*/
        }
	}
});