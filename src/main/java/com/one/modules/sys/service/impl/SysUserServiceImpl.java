package com.one.modules.sys.service.impl;


import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.one.common.annotation.DataFilter;
import com.one.modules.sys.dao.SysUserDao;
import com.one.modules.sys.entity.SysUserEntity;
import com.one.modules.sys.service.SysUserRoleService;
import com.one.modules.sys.service.SysUserService;
import com.one.modules.sys.shiro.ShiroUtils;
import com.weixin.pojo.SNSUserInfo;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * 系统用户
 * 
 * @author zy
 * @email 553224182@qq.com
 * @date 2016年9月18日 上午9:46:09
 */
@Service("sysUserService")
public class SysUserServiceImpl implements SysUserService {
	@Autowired
	private SysUserDao sysUserDao;
	@Autowired
	private SysUserRoleService sysUserRoleService;

	@Override
	public List<String> queryAllPerms(Long userId) {
		return sysUserDao.queryAllPerms(userId);
	}

	@Override
	public List<Long> queryAllMenuId(Long userId) {
		return sysUserDao.queryAllMenuId(userId);
	}

	@Override
	public SysUserEntity queryByUserName(String username) {
		return sysUserDao.queryByUserName(username);
	}
	
	@Override
	public SysUserEntity queryObject(Long userId) {
		return sysUserDao.queryObject(userId);
	}

	@Override
	@DataFilter(tableAlias = "u", user = false)
	public List<SysUserEntity> queryList(Map<String, Object> map){
		return sysUserDao.queryList(map);
	}
	
	@Override
	@DataFilter(tableAlias = "u", user = false)
	public int queryTotal(Map<String, Object> map) {
		return sysUserDao.queryTotal(map);
	}

	@Override
	@Transactional
	public void save(SysUserEntity user) {
		
		user.setRemark(user.getPassword());
		user.setCreateTime(new Date());
		//sha256加密
		String salt = RandomStringUtils.randomAlphanumeric(20);
		user.setSalt(salt);
		user.setPassword(ShiroUtils.sha256(user.getPassword(), user.getSalt()));
		sysUserDao.save(user);
		
		//保存用户与角色关系
		sysUserRoleService.saveOrUpdate(user.getUserId(), user.getRoleIdList());
	}

	@Override
	@Transactional
	public void update(SysUserEntity user) {
		if(StringUtils.isBlank(user.getPassword())){
			user.setPassword(null);
			user.setRemark(null);
		}else{
			user.setRemark(user.getPassword());
			user.setPassword(ShiroUtils.sha256(user.getPassword(), user.getSalt()));
		}
		sysUserDao.update(user);
		
		//保存用户与角色关系
		sysUserRoleService.saveOrUpdate(user.getUserId(), user.getRoleIdList());
	}

	@Override
	@Transactional
	public void deleteBatch(Long[] userId) {
		sysUserDao.deleteBatch(userId);
	}

	@Override
	public int updatePassword(Long userId, String password, String newPassword,String remark) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		map.put("password", password);
		map.put("newPassword", newPassword);
		map.put("remark", remark);
		return sysUserDao.updatePassword(map);
	}

	@Override
	public void addUser(SNSUserInfo snsUserInfo,Long infoId,String operateTable) {
		SysUserEntity user = new SysUserEntity();
		user.setUsername(snsUserInfo.getOpenId());
		user.setPassword("123456");
		user.setOpenId(snsUserInfo.getOpenId());
		user.setNickName(snsUserInfo.getNickname());
		user.setHeadImgUrl(snsUserInfo.getHeadImgUrl());
		user.setCreateTime(new Date());
		user.setStatus(1);
		user.setDeptId((long) 13);
		user.setInfoId(infoId);
		user.setOperateTable(operateTable);
		List<Long> roleIdList = new ArrayList<Long>();
		roleIdList.add((long) 3);
		user.setRoleIdList(roleIdList);
		
		this.save(user);
	}

	@Override
	public SysUserEntity queryByUserOpenId(String openId,String operateTable) {
		// TODO Auto-generated method stub
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("openId", openId);
		map.put("operateTable", operateTable);
		return sysUserDao.queryByUserOpenId(map);
	}

	@Override
	public void updateWxInfo(SysUserEntity user) {
		sysUserDao.update(user);
	}

}
