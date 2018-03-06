package com.one.modules.param.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.one.modules.param.dao.ParTempDao;
import com.one.modules.param.entity.ParTempEntity;
import com.one.modules.param.service.ParTempService;



@Service("parTempService")
public class ParTempServiceImpl implements ParTempService {
	@Autowired
	private ParTempDao parTempDao;
	
	@Override
	public ParTempEntity queryObject(Long tempId){
		return parTempDao.queryObject(tempId);
	}
	
	@Override
	public List<ParTempEntity> queryList(Map<String, Object> map){
		return parTempDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return parTempDao.queryTotal(map);
	}
	
	@Override
	public void save(ParTempEntity parTemp){
		parTempDao.save(parTemp);
	}
	
	@Override
	public void update(ParTempEntity parTemp){
		parTempDao.update(parTemp);
	}
	
	@Override
	public void delete(Long tempId){
		parTempDao.delete(tempId);
	}
	
	@Override
	public void deleteBatch(Long[] tempIds){
		parTempDao.deleteBatch(tempIds);
	}

	@Override
	public ParTempEntity queryLastOne() {
		// TODO Auto-generated method stub
		return parTempDao.queryLastOne();
	}
	
}
