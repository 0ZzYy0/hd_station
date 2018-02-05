package com.one.modules.sys.dao;

import org.apache.ibatis.annotations.Mapper;

import com.one.modules.sys.entity.SysDeptEntity;

import java.util.List;

/**
 * 部门管理
 * 
 * @author zy
 * @email 553224182@qq.com
 * @date 2017-06-20 15:23:47
 */
@Mapper
public interface SysDeptDao extends BaseDao<SysDeptEntity> {

    /**
     * 查询子部门ID列表
     * @param parentId  上级部门ID
     */
    List<Long> queryDetpIdList(Long parentId);
}
