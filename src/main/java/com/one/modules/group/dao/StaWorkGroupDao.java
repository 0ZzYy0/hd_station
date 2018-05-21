package com.one.modules.group.dao;

import com.one.modules.group.entity.StaWorkGroupEntity;
import com.one.modules.sys.dao.BaseDao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

/**
 * 
 * 
 * @author zy
 * @email 553224182@qq.com
 * @date 2018-04-29 11:20:04
 */
@Mapper
public interface StaWorkGroupDao extends BaseDao<StaWorkGroupEntity> {
	List<StaWorkGroupEntity> queryListByDeptId(Long deptId);
}
