package com.one.modules.param.controller;

import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.one.common.utils.*;
import com.one.modules.param.entity.ParTempEntity;
import com.one.modules.param.service.ParTempService;


/**
 * 
 * 
 * @author zy
 * @email 553224182@qq.com
 * @date 2018-02-11 21:09:45
 */
@RestController
@RequestMapping("partemp")
public class ParTempController {
	@Autowired
	private ParTempService parTempService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	@RequiresPermissions("partemp:list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);

		List<ParTempEntity> parTempList = parTempService.queryList(query);
		int total = parTempService.queryTotal(query);
		
		PageUtils pageUtil = new PageUtils(parTempList, total, query.getLimit(), query.getPage());
		
		return R.ok().put("page", pageUtil);
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{tempId}")
	@RequiresPermissions("partemp:info")
	public R info(@PathVariable("tempId") Long tempId){
		ParTempEntity parTemp = parTempService.queryObject(tempId);
		
		return R.ok().put("parTemp", parTemp);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	public R save(@RequestBody ParTempEntity parTemp){
		System.out.println("数据进入服务器");
		parTempService.save(parTemp);
		System.out.println("存储完成");
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("partemp:update")
	public R update(@RequestBody ParTempEntity parTemp){
		parTempService.update(parTemp);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("partemp:delete")
	public R delete(@RequestBody Long[] tempIds){
		parTempService.deleteBatch(tempIds);
		
		return R.ok();
	}
	
}
