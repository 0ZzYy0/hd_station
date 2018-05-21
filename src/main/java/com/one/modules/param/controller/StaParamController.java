package com.one.modules.param.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.one.common.utils.PageUtils;
import com.one.common.utils.Query;
import com.one.common.utils.R;
import com.one.modules.group.entity.StaWorkGroupEntity;
import com.one.modules.param.entity.StaParamEntity;
import com.one.modules.param.service.StaParamService;


/**
 * 
 * 
 * @author zy
 * @email 553224182@qq.com
 * @date 2018-05-21 15:51:13
 */
@RestController
@RequestMapping("staparam")
public class StaParamController {
	@Autowired
	private StaParamService staParamService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	@RequiresPermissions("staparam:list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<StaParamEntity> staParamList = staParamService.queryList(query);
		int total = staParamService.queryTotal(query);
		
		PageUtils pageUtil = new PageUtils(staParamList, total, query.getLimit(), query.getPage());
		
		return R.ok().put("page", pageUtil);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{paramId}")
	@RequiresPermissions("staparam:info")
	public R info(@PathVariable("paramId") Long paramId){
		StaParamEntity staParam = staParamService.queryObject(paramId);
		
		return R.ok().put("staParam", staParam);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("staparam:save")
	public R save(@RequestBody StaParamEntity staParam){
		staParamService.save(staParam);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("staparam:update")
	public R update(@RequestBody StaParamEntity staParam){
		staParamService.update(staParam);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("staparam:delete")
	public R delete(@RequestBody Long[] paramIds){
		staParamService.deleteBatch(paramIds);
		
		return R.ok();
	}
	
	/**
	 * 当前机组下的所有参数
	 */
	@RequestMapping("/listByGroup")
	public R listByGroup(@RequestParam Map<String, Object> params){
		//Map<String,Object> map = new HashMap<String,Object>();
		
		List<StaParamEntity> staParamList = staParamService.queryListByParams(params);
		
		return R.ok().put("staParamList", staParamList);
	}
}
