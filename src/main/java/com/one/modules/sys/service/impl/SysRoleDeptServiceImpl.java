package com.one.modules.sys.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.one.modules.sys.dao.SysRoleDeptDao;
import com.one.modules.sys.service.SysRoleDeptService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * 角色与部门对应关系
 *
 * @author zy
 * @email 553224182@qq.com
 * @date 2017年6月21日 23:42:30
 */
@Service("sysRoleDeptService")
public class SysRoleDeptServiceImpl implements SysRoleDeptService {
	@Autowired
	private SysRoleDeptDao sysRoleDeptDao;

	@Override
	@Transactional
	public void saveOrUpdate(Long roleId, List<Long> deptIdList) {
		//先删除角色与菜单关系
		sysRoleDeptDao.delete(roleId);

		if(deptIdList.size() == 0){
			return ;
		}

		//保存角色与菜单关系
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("roleId", roleId);
		map.put("deptIdList", deptIdList);
		sysRoleDeptDao.save(map);
	}

	@Override
	public List<Long> queryDeptIdList(Long roleId) {
		return sysRoleDeptDao.queryDeptIdList(roleId);
	}

}
