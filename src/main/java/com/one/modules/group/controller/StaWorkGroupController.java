package com.one.modules.group.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.one.common.utils.PageUtils;
import com.one.common.utils.Query;
import com.one.common.utils.R;
import com.one.modules.group.entity.StaWorkGroupEntity;
import com.one.modules.group.service.StaWorkGroupService;
import com.one.modules.sys.shiro.ShiroUtils;


/**
 * 
 * 
 * @author zy
 * @email 553224182@qq.com
 * @date 2018-04-29 11:20:04
 */
@Controller
@RequestMapping("staworkgroup")
public class StaWorkGroupController {
	@Autowired
	private StaWorkGroupService staWorkGroupService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	@RequiresPermissions("staworkgroup:list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<StaWorkGroupEntity> staWorkGroupList = staWorkGroupService.queryList(query);
		int total = staWorkGroupService.queryTotal(query);
		
		PageUtils pageUtil = new PageUtils(staWorkGroupList, total, query.getLimit(), query.getPage());
		
		return R.ok().put("page", pageUtil);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{groupId}")
	@RequiresPermissions("staworkgroup:info")
	public R info(@PathVariable("groupId") Long groupId){
		StaWorkGroupEntity staWorkGroup = staWorkGroupService.queryObject(groupId);
		
		return R.ok().put("staWorkGroup", staWorkGroup);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("staworkgroup:save")
	public R save(@RequestBody StaWorkGroupEntity staWorkGroup){
		staWorkGroupService.save(staWorkGroup);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("staworkgroup:update")
	public R update(@RequestBody StaWorkGroupEntity staWorkGroup){
		staWorkGroupService.update(staWorkGroup);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("staworkgroup:delete")
	public R delete(@RequestBody Long[] groupIds){
		staWorkGroupService.deleteBatch(groupIds);
		
		return R.ok();
	}
	
	/**
	 * 当前用户所在部门列表
	 */
	@RequestMapping("/listByDept")
	@RequiresPermissions("staworkgroup:list")
	@ResponseBody
	public R listByDept(@RequestParam Long deptId){
		List<StaWorkGroupEntity> workGroupList = staWorkGroupService.queryListByDeptId(deptId);
		return R.ok().put("workGroupList", workGroupList);
	}
	
	/**
	 * 跳转到group_type
	 */
	@RequestMapping("/toGroupType")
	public String toGroupType(@RequestParam Long groupId,HttpServletRequest request){
		ShiroUtils.getSession().setAttribute("groupId", request.getParameter("groupId"));
		return "redirect:/modules/mobile/group_type.html";
	}
	
}
