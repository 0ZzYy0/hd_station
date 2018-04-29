package com.one.modules.group.service;

import com.one.modules.group.entity.StaWorkGroupEntity;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author zy
 * @email 553224182@qq.com
 * @date 2018-04-29 11:20:04
 */
public interface StaWorkGroupService {
	
	StaWorkGroupEntity queryObject(Long groupId);
	
	List<StaWorkGroupEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(StaWorkGroupEntity staWorkGroup);
	
	void update(StaWorkGroupEntity staWorkGroup);
	
	void delete(Long groupId);
	
	void deleteBatch(Long[] groupIds);
}
