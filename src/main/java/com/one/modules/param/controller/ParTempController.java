package com.one.modules.param.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

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
	public R info(@PathVariable("tempId") Long tempId){
		ParTempEntity parTemp = parTempService.queryObject(tempId);
		
		return R.ok().put("parTemp", parTemp);
	}
	
	
	/**
	 * 温度
	 */
	@RequestMapping("/query")
	public R query(){
		//ParTempEntity parTemp = parTempService.queryLastOne();
		List<Map> list = new ArrayList<Map>();
		Map tempMap = new HashMap();
		
		Random rand = new Random();
		  
		for (int i = 1; i <= 3; i++) {
			tempMap.put("deviceId", "1");
			tempMap.put("tempName", "温度"+i);
			tempMap.put("tempValue", rand.nextInt(100));
			tempMap.put("tempDate", new Date());
			
		}
		list.add(tempMap);
		
		return R.ok().put("parTemp", list);
	}
	
	/**
	 * 振摆信息
	 */
	@RequestMapping("/queryShock")
	public R queryShock(){
		List<Map> list = new ArrayList<Map>();
		Map shockMap = new HashMap();
		Random rand = new Random();
		
		for (int i = 1; i <= 3; i++) {
			shockMap.put("shockDeviceId", "1");
			shockMap.put("shockName", "振摆"+i);
			shockMap.put("shockValue", rand.nextInt(20));
			shockMap.put("shockDate", new Date());
		}
		
		list.add(shockMap);
		
		return R.ok().put("parShock", list);
	}
	
	/**
	 * 振动信息
	 */
	@RequestMapping("/queryVibration")
	public R queryVibration(){
		List<Map> list = new ArrayList<Map>();
		Map tempMap = new HashMap();
		Random rand = new Random();
		
		for (int i = 1; i <= 3; i++) {
			tempMap.put("deviceId", "1");
			tempMap.put("tempName", "振动"+i);
			tempMap.put("tempValue", rand.nextInt(30));
			tempMap.put("tempDate", new Date());
			
		}
		
		list.add(tempMap);
		
		return R.ok().put("parVibration", list);
	}	
	
	/**
	 * 转速信息
	 */
	@RequestMapping("/querySpeed")
	public R querySpeed(){
		List<Map> list = new ArrayList<Map>();
		Map tempMap = new HashMap();
		Random rand = new Random();
		
		for (int i = 1; i <= 3; i++) {
			tempMap.put("deviceId", "1");
			tempMap.put("tempName", "转速"+i);
			tempMap.put("tempValue", rand.nextInt(30));
			tempMap.put("tempDate", new Date());
			
		}
		
		list.add(tempMap);
		
		return R.ok().put("parSpeed", list);
	}	
	
	/**
	 * ZDL轴电流信息
	 */
	@RequestMapping("/queryZDL")
	public R queryZDL(){
		List<Map> list = new ArrayList<Map>();
		Map tempMap = new HashMap();
		Random rand = new Random();
		
		for (int i = 1; i <= 3; i++) {
			tempMap.put("deviceId", "1");
			tempMap.put("tempName", "ZDL轴电流"+i);
			tempMap.put("tempValue", rand.nextInt(30));
			tempMap.put("tempDate", new Date());
			
		}
		
		list.add(tempMap);
		
		return R.ok().put("parZDL", list);
	}	
	
	
	/**
	 * 电参量信息
	 */
	@RequestMapping("/queryElectric")
	public R queryElectric(){
		List<Map> list = new ArrayList<Map>();
		Map tempMap = new HashMap();
		Random rand = new Random();
		
		for (int i = 1; i <= 3; i++) {
			tempMap.put("deviceId", "1");
			tempMap.put("tempName", "电参量"+i);
			tempMap.put("tempValue", rand.nextInt(300));
			tempMap.put("tempDate", new Date());
			
		}
		
		list.add(tempMap);
		
		return R.ok().put("parElectric", list);
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
