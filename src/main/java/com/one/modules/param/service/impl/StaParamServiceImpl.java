package com.one.modules.param.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.one.modules.param.dao.StaParamDao;
import com.one.modules.param.entity.StaParamEntity;
import com.one.modules.param.service.StaParamService;



@Service("staParamService")
public class StaParamServiceImpl implements StaParamService {
	@Autowired
	private StaParamDao staParamDao;
	
	@Override
	public StaParamEntity queryObject(Long paramId){
		return staParamDao.queryObject(paramId);
	}
	
	@Override
	public List<StaParamEntity> queryList(Map<String, Object> map){
		return staParamDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return staParamDao.queryTotal(map);
	}
	
	@Override
	public void save(StaParamEntity staParam){
		staParamDao.save(staParam);
	}
	
	@Override
	public void update(StaParamEntity staParam){
		staParamDao.update(staParam);
	}
	
	@Override
	public void delete(Long paramId){
		staParamDao.delete(paramId);
	}
	
	@Override
	public void deleteBatch(Long[] paramIds){
		staParamDao.deleteBatch(paramIds);
	}

	@Override
	public List<StaParamEntity> queryListByParams(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return staParamDao.queryListByParams(map);
	}
	
}
