package com.one.modules.param.service;

import com.one.modules.param.entity.ParTempEntity;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author zy
 * @email 553224182@qq.com
 * @date 2018-02-11 21:09:45
 */
public interface ParTempService {
	
	ParTempEntity queryObject(Long tempId);
	
	List<ParTempEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(ParTempEntity parTemp);
	
	void update(ParTempEntity parTemp);
	
	void delete(Long tempId);
	
	void deleteBatch(Long[] tempIds);
	
	ParTempEntity queryLastOne();
}
