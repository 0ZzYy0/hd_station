package com.one.modules.group.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 
 * 
 * @author zy
 * @email 553224182@qq.com
 * @date 2018-04-29 11:20:04
 */
public class StaWorkGroupEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Long groupId;
	//
	private Long deptId;
	//
	private String groupCode;
	//
	private String groupName;
	//
	private String groupPerson;
	//
	private String remark;

	/**
	 * 设置：
	 */
	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}
	/**
	 * 获取：
	 */
	public Long getGroupId() {
		return groupId;
	}
	/**
	 * 设置：
	 */
	public void setDeptId(Long deptId) {
		this.deptId = deptId;
	}
	/**
	 * 获取：
	 */
	public Long getDeptId() {
		return deptId;
	}
	/**
	 * 设置：
	 */
	public void setGroupCode(String groupCode) {
		this.groupCode = groupCode;
	}
	/**
	 * 获取：
	 */
	public String getGroupCode() {
		return groupCode;
	}
	/**
	 * 设置：
	 */
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	/**
	 * 获取：
	 */
	public String getGroupName() {
		return groupName;
	}
	/**
	 * 设置：
	 */
	public void setGroupPerson(String groupPerson) {
		this.groupPerson = groupPerson;
	}
	/**
	 * 获取：
	 */
	public String getGroupPerson() {
		return groupPerson;
	}
	/**
	 * 设置：
	 */
	public void setRemark(String remark) {
		this.remark = remark;
	}
	/**
	 * 获取：
	 */
	public String getRemark() {
		return remark;
	}
}
