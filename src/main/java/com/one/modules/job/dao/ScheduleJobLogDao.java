package com.one.modules.job.dao;

import org.apache.ibatis.annotations.Mapper;

import com.one.modules.job.entity.ScheduleJobLogEntity;
import com.one.modules.sys.dao.BaseDao;

/**
 * 定时任务日志
 * 
 * @author zy
 * @email 553224182@qq.com
 * @date 2016年12月1日 下午10:30:02
 */
@Mapper
public interface ScheduleJobLogDao extends BaseDao<ScheduleJobLogEntity> {
	
}
