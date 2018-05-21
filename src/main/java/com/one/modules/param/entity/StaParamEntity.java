package com.one.modules.param.entity;

import java.io.Serializable;
import java.util.Date;



/**
 * 
 * 
 * @author zy
 * @email 553224182@qq.com
 * @date 2018-05-21 15:51:13
 */
public class StaParamEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//参数ID
	private Long paramId;
	//水电站ID
	private Long deptId;
	//机组ID
	private Long groupId;
	//参数类型
	private String paramType;
	//参数值
	private String paramValue;
	//参数日期
	private Date paramDate;

	/**
	 * 设置：参数ID
	 */
	public void setParamId(Long paramId) {
		this.paramId = paramId;
	}
	/**
	 * 获取：参数ID
	 */
	public Long getParamId() {
		return paramId;
	}
	/**
	 * 设置：水电站ID
	 */
	public void setDeptId(Long deptId) {
		this.deptId = deptId;
	}
	/**
	 * 获取：水电站ID
	 */
	public Long getDeptId() {
		return deptId;
	}
	/**
	 * 设置：机组ID
	 */
	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}
	/**
	 * 获取：机组ID
	 */
	public Long getGroupId() {
		return groupId;
	}
	/**
	 * 设置：参数类型
	 */
	public void setParamType(String paramType) {
		this.paramType = paramType;
	}
	/**
	 * 获取：参数类型
	 */
	public String getParamType() {
		return paramType;
	}
	/**
	 * 设置：参数值
	 */
	public void setParamValue(String paramValue) {
		this.paramValue = paramValue;
	}
	/**
	 * 获取：参数值
	 */
	public String getParamValue() {
		return paramValue;
	}
	/**
	 * 设置：参数日期
	 */
	public void setParamDate(Date paramDate) {
		this.paramDate = paramDate;
	}
	/**
	 * 获取：参数日期
	 */
	public Date getParamDate() {
		return paramDate;
	}
}
