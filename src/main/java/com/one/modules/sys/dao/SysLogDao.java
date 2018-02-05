package com.one.modules.sys.dao;


import org.apache.ibatis.annotations.Mapper;

import com.one.modules.sys.entity.SysLogEntity;

/**
 * 系统日志
 * 
 * @author zy
 * @email 553224182@qq.com
 * @date 2017-03-08 10:40:56
 */
@Mapper
public interface SysLogDao extends BaseDao<SysLogEntity> {
	
}
