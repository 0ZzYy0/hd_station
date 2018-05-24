package com.one.modules.param.service;

import com.one.modules.param.entity.StaParamEntity;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author zy
 * @email 553224182@qq.com
 * @date 2018-05-21 15:51:13
 */
public interface StaParamService {
	
	StaParamEntity queryObject(Long paramId);
	
	List<StaParamEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(StaParamEntity staParam);
	
	void update(StaParamEntity staParam);
	
	void delete(Long paramId);
	
	void deleteBatch(Long[] paramIds);
	
	List<StaParamEntity> queryListByParams(Map<String, Object> map);
	
	List<Map<String , Object>> getNewestDetailed(Map<String, Object> map);
}
