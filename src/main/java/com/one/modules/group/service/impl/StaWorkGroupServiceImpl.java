package com.one.modules.group.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.one.modules.group.dao.StaWorkGroupDao;
import com.one.modules.group.entity.StaWorkGroupEntity;
import com.one.modules.group.service.StaWorkGroupService;



@Service("staWorkGroupService")
public class StaWorkGroupServiceImpl implements StaWorkGroupService {
	@Autowired
	private StaWorkGroupDao staWorkGroupDao;
	
	@Override
	public StaWorkGroupEntity queryObject(Long groupId){
		return staWorkGroupDao.queryObject(groupId);
	}
	
	@Override
	public List<StaWorkGroupEntity> queryList(Map<String, Object> map){
		return staWorkGroupDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return staWorkGroupDao.queryTotal(map);
	}
	
	@Override
	public void save(StaWorkGroupEntity staWorkGroup){
		staWorkGroupDao.save(staWorkGroup);
	}
	
	@Override
	public void update(StaWorkGroupEntity staWorkGroup){
		staWorkGroupDao.update(staWorkGroup);
	}
	
	@Override
	public void delete(Long groupId){
		staWorkGroupDao.delete(groupId);
	}
	
	@Override
	public void deleteBatch(Long[] groupIds){
		staWorkGroupDao.deleteBatch(groupIds);
	}
	
}
