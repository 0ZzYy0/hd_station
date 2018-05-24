package com.one.modules.param.dao;

import com.one.modules.param.entity.StaParamEntity;
import com.one.modules.sys.dao.BaseDao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 
 * 
 * @author zy
 * @email 553224182@qq.com
 * @date 2018-05-21 15:51:13
 */
@Mapper
public interface StaParamDao extends BaseDao<StaParamEntity> {

	List<StaParamEntity> queryListByParams(Map<String, Object> map);
	
	List<Map<String ,Object>> getNewestDetailed(Map<String, Object> map);
}
