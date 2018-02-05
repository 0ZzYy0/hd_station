package com.one.modules.oss.dao;


import org.apache.ibatis.annotations.Mapper;

import com.one.modules.oss.entity.SysOssEntity;
import com.one.modules.sys.dao.BaseDao;

/**
 * 文件上传
 * 
 * @author zy
 * @email 553224182@qq.com
 * @date 2017-03-25 12:13:26
 */
@Mapper
public interface SysOssDao extends BaseDao<SysOssEntity> {
	
}
